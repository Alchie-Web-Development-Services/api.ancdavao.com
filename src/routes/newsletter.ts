import axios from "axios";
import {Request, Response} from "express";

export const newsletter = async (req: Request, res: Response) => {
  const body = JSON.parse(req.body || "{}");
  const {email} = body;

  if (req.method !== "POST") {
    return res.status(405).json({error: "Method Not Allowed"});
  }

  if (!email) return res.status(400).json({error: "Email is required"});

  try {
    await axios.post(
      "https://api.brevo.com/v3/contacts",
      {
        email,
        listIds: [Number(process.env.BREVO_LIST_ID)],
        updateEnabled: true,
      },
      {
        headers: {
          "api-key": process.env.BREVO_API_KEY || "",
          "Content-Type": "application/json",
        },
      },
    );

    return res.status(200).json({message: "Successfully subscribed!"});
  } catch (err: unknown) {
    console.error((err as Error).message);
    return res.status(500).json({error: "Failed to subscribe"});
  }
};
