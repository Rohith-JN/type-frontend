import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const response = await fetch(process.env.BACKEND_URL as string, {
            method: req.method,
            headers: {
                "Content-Type": "application/json",
            },
            body: req.body,
        });

        const data = await response.json();
        res.status(response.status).json(data);
    } catch (error) {
        console.error("Error proxying GraphQL request:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
