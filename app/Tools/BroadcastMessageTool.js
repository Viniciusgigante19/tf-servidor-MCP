// app/Tools/broadcastMessage.js

export function broadcastMessage(server) {
    server.registerTool(
        broadcastMessage.name, // "broadcastMessage"
        {
            title: "Broadcast message",
            description: "Envia uma mensagem para todos os clientes conectados.",
            inputSchema: {
                type: "object",
                properties: {
                    text: { type: "string" },
                },
                required: ["text"],
                additionalProperties: false,
            },
        },
        async (args, ctx) => {
            const text = args.text;

            // aqui você pluga Rabbit/WebSocket se quiser
            // publishToRabbit({ type: "message", name: "MCP", text });

            return {
                content: [
                    {
                        type: "text",
                        text: `Mensagem enviada: ${text}`,
                    },
                ],
            };
        }
    );
}
