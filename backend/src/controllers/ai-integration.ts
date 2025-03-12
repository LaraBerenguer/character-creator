import { Request, Response } from "express";
import dotenv from 'dotenv';

const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;
const DEEPSEEK_API_URL = "https://api.deepseek.com/v1/chat/completions";

export const generateCharacterDescription = async (req: Request, res: Response) => {
    const { trait, flaw, bond, ideal, name } = req.body;
    const prompt = `Create a short and concise backstory for a Dungeons & Dragons character with the following traits: trait: ${trait}, flaw: ${flaw}, bond: ${bond} and ideal: ${ideal}. The backstory should be 2 to 3 sentences long and explain how these traits influence the character's personality and actions.`;

    try {
        const response = await fetch(DEEPSEEK_API_URL,
            {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${process.env.DEEPSEEK_API_KEY}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    prompt: prompt,
                    max_tokens: 70,
                }),
            }
        );

        if (!response.ok) {
            throw new Error (`Error: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        return data.choices[0].text;
    } catch (error) {
        console.error("Error generating character description:", error);
        return res.status(500).json({ error: "Failed to generate character description" });
    };
};