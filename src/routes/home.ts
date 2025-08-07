import {Request, Response} from "express";

export const home = async (_: Request, res: Response) => {
  return res.status(200).json({message: "Nothing here!"});
};
