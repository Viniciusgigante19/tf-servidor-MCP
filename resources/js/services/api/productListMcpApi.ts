import { ListApi, ProductModel } from "@app/js/app.types";

// Usa o prefixo do Nginx que encaminha para o MCP
const MCP_URL = "http://localhost:8080/mcp";

export default async function productListMcpApi(
  limit: number
): Promise<ListApi<ProductModel> | { error: true }> {
  try {
    const response = await fetch(MCP_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json, text/event-stream",
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: 1,
        method: "getProducts",
        params: { limit },
      }),
    });

    const data = await response.json();

    // 👉 Aqui você vê exatamente o que o MCP retornou
    console.log("Resposta MCP:", data);

    if (data.error) {
      return { error: true };
    }

    return data.result as ListApi<ProductModel>;
  } catch (err) {
    return { error: true };
  }
}
