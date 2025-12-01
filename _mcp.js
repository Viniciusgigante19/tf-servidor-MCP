// _mcp.js
import "./bootstrap/app.js";

import fs from "node:fs/promises";
import { fileURLToPath } from "node:url";

import express from "express";
import { z } from "zod";

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";

// ====================== MCP SERVER ======================

const server = new McpServer({
    name: "devweb-mcp-http",
    version: "1.0.0",
});

// ---- loader: chama todas as funções exportadas em ./app/Tools ----

async function registerToolsFromDir(dirUrl) {
    const dirPath = fileURLToPath(dirUrl);
    const entries = await fs.readdir(dirPath, { withFileTypes: true });

    const registered = [];

    for (const entry of entries) {
        if (!entry.isFile()) continue;
        if (!entry.name.endsWith(".js") && !entry.name.endsWith(".mjs")) continue;

        const fullUrl = new URL(entry.name, dirUrl);
        const mod = await import(fullUrl.href);

        // cada export que for função vira uma "definição de tool"
        for (const value of Object.values(mod)) {
            if (typeof value !== "function") continue;

            // a função é responsável por fazer server.registerTool(...)
            value(server);
            registered.push(value.name);
        }
    }

    console.log("[MCP] Tools registradas:", registered);
}

// registra as tools
await registerToolsFromDir(new URL("./app/Tools/", import.meta.url));

// transport MCP HTTP
const transport = new StreamableHTTPServerTransport({
    sessionIdGenerator: undefined,
});

await server.connect(transport);

// ====================== HTTP (Express + Zod) ======================

const app = express();
const PORT = Number(process.env.MCP_PORT ?? 7777);

app.use(express.json({ limit: "1mb" }));

// JSON-RPC 2.0 bem mínimo
const jsonRpcSchema = z.object({
    jsonrpc: z.literal("2.0"),
    id: z.union([z.string(), z.number(), z.null()]).optional(),
    method: z.string(),
    params: z.any().optional(),
});

const jsonRpcError = (id, code, message) => ({
    jsonrpc: "2.0",
    error: { code, message },
    id: id ?? null,
});

// health
app.get("/health", (_req, res) => {
    res.json({ ok: true, mcp: server.name });
});

// endpoint MCP
app.post("/", async (req, res) => {
    const parsed = jsonRpcSchema.safeParse(req.body ?? {});

    if (!parsed.success) {
        return res
            .status(400)
            .json(jsonRpcError(null, -32700, "Invalid JSON-RPC request"));
    }

    const payload = parsed.data;

    try {
        // req/res do Express ainda são os nativos do Node, o transport aceita
        await transport.handleRequest(req, res, payload);
    } catch (err) {
        console.error("[MCP] Erro ao tratar request MCP:", err);
        if (res.headersSent) return;

        res
            .status(500)
            .json(jsonRpcError(payload.id, -32603, "Internal server error"));
    }
});

// 404 em JSON
app.use((_req, res) => {
    res.status(404).json(jsonRpcError(null, -32601, "Not found"));
});

// só Express, sem http.createServer
app.listen(PORT, () => {
    console.log(`[MCP] MCP HTTP em http://127.0.0.1:${PORT}`);
});
