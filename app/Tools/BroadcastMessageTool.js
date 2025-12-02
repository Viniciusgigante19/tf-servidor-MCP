// app/Tools/broadcastMessage.js

import { z } from "zod";
import FirstJob from "../Jobs/FirstJob.js";

export function broadcastMessage(server) {
    server.registerTool(
        broadcastMessage.name, // ← string, é isso que o SDK espera

        {
            description: "Envia uma mensagem para todos os clientes conectados.",
            // Agora é Zod, não JSON Schema
            inputSchema: z.object({
                name: z.string().describe("Nome do usuário que está mandando a mensagem").optional(),
                text: z.string().describe("Mensagem de texto a ser enviada"),
            }),
        },

        // Handler
        async (args, ctx) => {
            const { name = "anonymous", text } = args;

            // dispara o job para mandar via socket
            await FirstJob.dispatchSocket({
                type: "message",
                name,
                text,
            });

            return {
                content: [
                    {
                        type: "text",
                        text: `Mensagem enviada para "${name}": ${text}`,
                    },
                ],
            };
        }
    );
}
