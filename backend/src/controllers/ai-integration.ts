import { Request, Response } from "express";

import dotenv from 'dotenv';

const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;
const DEEPSEEK_API_URL = "https://api.deepseek.com/v1/chat/completions";

export const generateCharacterDescription = async (req: Request, res: Response) => {
    const { trait, flaw, bond, ideal, name } = req.body;
    const maxTokens = 80;
    const prompt = `Write a concise backstory for a Dungeons & Dragons character named ${name} that strictly fits within ${maxTokens} tokens. The backstory must:
    - Incorporate these traits: ${trait}, flaw: ${flaw}, bond: ${bond}, ideal: ${ideal}
    - Explain how these traits influence the character
    - Be exactly ${maxTokens} tokens or less (DO NOT exceed this limit)
    - End with a complete sentence (never cut off mid-thought)
    - Use plain text only (no formatting)

    Make absolutely certain the output doesn't exceed the token limit. If needed, make it shorter to ensure completion within the limit.`;
    
    try {
        const response = await fetch(DEEPSEEK_API_URL,
            {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${process.env.DEEPSEEK_API_KEY}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    model: "deepseek-chat",
                    messages: [{ role: "user", content: prompt }],
                    max_tokens: 80,
                    response_format: { type: "text" },
                }),
            }
        );

        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        res.status(200).json({ description: data.choices[0].message.content });
    } catch (error) {
        console.error("Error generating character description:", error);
        res.status(500).json({ error: "Failed to generate character description" });
    };
};