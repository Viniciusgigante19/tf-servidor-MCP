import express from 'express';
import chalk from 'chalk';

import CorsMiddleware from "./app/Http/Middlewares/CorsMiddleware.js";
import "./bootstrap/app.js";
import routes from "./routes/routes.js";
import initRelations from "./config/sequelize_relations.js";

// MCP SDK
import { Server } from "@modelcontextprotocol/sdk";
import { HttpServerTransport } from "@modelcontextprotocol/sdk/http";
import registerGetProductsTool from "./app/tools/getProductsTool.js";

/** Iniciar roteador Express */
const app = express();
app.use(CorsMiddleware);
app.use("/", routes);

initRelations();

/** Criar MCP server e registrar Tool */
const server = new Server();
registerGetProductsTool(server);

/** Conectar MCP via HTTP (porta 8080) */
const transport = new HttpServerTransport({ port: 8080 });
server.connect(transport);

/** Configuração de portas */
const nodePort = process.env.NODEWEB_PORT;
const webPort = process.env.IS_CONTAINER ? 8080 : nodePort;

app.listen(nodePort, () => {
  console.log(process.env.TESTE);
  console.log(chalk.green(`Servidor Express: http://localhost:${webPort}`));
  console.log(chalk.yellow(`Apis Swagger: http://localhost:${webPort}/docs`));
  console.log(chalk.blue(`MCP rodando em http://localhost:8080/mcp`));
});
