import { HTTP_CODES } from "@/lib";
import algoliasearch from "algoliasearch";

const client = algoliasearch(
  process.env.NEXT_PUBLIC_APPLICATION_ID + "",
  process.env.NEXT_PUBLIC_SEARCH_KEY + ""
);
const index = client.initIndex(process.env.NEXT_PUBLIC_INDEX_NAME + "");

export default async function handler(req: any, res: any) {
  if (req.method == "POST") {
    let { searchText } = req.body;
    let { hits } = await index.search(searchText);
    res.status(HTTP_CODES.ACCEPTED).json({
      status: true,
      payload: hits,
      message: "Search results fetched",
    });
    return;
  }

  res.status(HTTP_CODES.BAD_REQUEST).json({
    status: false,
    payload: null,
    message: "Bad Request",
  });
  return;
}
