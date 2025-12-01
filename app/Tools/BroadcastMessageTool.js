// app/Tools/broadcastMessage.js

import FirstJob from "../Jobs/FirstJob.js";

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
            const { name, text } = args;

            await FirstJob.dispatchSocket({
                type: "message",
                name: name,
                text: text
            })

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
