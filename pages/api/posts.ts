// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import dbConnect from "@/lib/dbConnect";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
      } catch (error) {}
      break;
    case "POST":
      try {
      } catch (error) {}
      break;
    default:
      res.status(HTTP_CODES.BAD_REQUEST);
  }

  res.status(200).json({ name: "John Doe" });
}
