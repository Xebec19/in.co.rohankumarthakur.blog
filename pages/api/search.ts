import { HTTP_CODES } from "@/lib";

export default function handler(req: any, res: any) {
  if (req.method == "POST") {
  }

  res.status(HTTP_CODES.BAD_REQUEST).json({
    status: false,
    data: null,
    message: "Bad Request",
  });
  return;
}
