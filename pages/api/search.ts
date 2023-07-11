import { HTTP_CODES } from "@/lib";
import algoliasearch from "algoliasearch";

const client = algoliasearch(
  process.env.NEXT_PUBLIC_APPLICATION_ID + "",
  process.env.NEXT_PUBLIC_SEARCH_KEY + ""
);
const index = client.initIndex(process.env.NEXT_PUBLIC_INDEX_NAME + "");

export default async function handler(req: any, res: any) {
  if (req.method == "POST") {
    let { hits } = await index.search("");
    res.status(HTTP_CODES.ACCEPTED).json({
      status: true,
      data: hits,
      message: "Search results fetched",
    });
  }

  res.status(HTTP_CODES.BAD_REQUEST).json({
    status: false,
    data: null,
    message: "Bad Request",
  });
  return;
}
