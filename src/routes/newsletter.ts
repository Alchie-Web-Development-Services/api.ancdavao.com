import axios from "axios";
import {Request, Response} from "express";

export const newsletter = async (req: Request, res: Response) => {
  const {email} = req.body;

  if (!email) return res.status(400).json({error: "Email is required"});

  try {
    await axios.post(
      "https://api.brevo.com/v3/contacts",
      {
        email,
        listIds: [2],
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
