import { Request, Response } from "express";

import dotenv from 'dotenv';

const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;
const DEEPSEEK_API_URL = "https://api.deepseek.com/v1/chat/completions";

export const generateCharacterDescription = async (req: Request, res: Response) => {
    const { trait, flaw, bond, ideal, name } = req.body;
    const maxTokens = 80;
    const prompt = `Create a short and concise backstory for a Dungeons & Dragons character named ${name} with the following traits: trait: ${trait}, flaw: ${flaw}, bond: ${bond} and ideal: ${ideal}. The backstory should explain how these traits influence the character's personality and actions. The backstory MUST be no more than 50 words and should fit within ${maxTokens} tokens. It should be self-contained, not cut off mid-sentence, and formatted as plain text without bold, italics, or Markdown styling.`;

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
                }),
            }
        );

        if (!response.ok) {
            throw new Error (`Error: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();        
        res.status(200).json({ description: data.choices[0].message.content});
    } catch (error) {
        console.error("Error generating character description:", error);
        res.status(500).json({ error: "Failed to generate character description" });
    };
};