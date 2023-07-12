import { useState } from "react";

import { IResponse } from "@/interfaces";

const fetcher = async (searchText: string): Promise<IResponse> => {
  let url = "/api/search";
  let payload = {
    searchText,
  };
  let options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  };
  const response = await fetch(url, options);
  const data = await response.json();
  return data;
};

export default function useSearch() {
  const [searchResults, setSearchResults] = useState([]);

  async function searchHandler(text: string) {
    let searchText = text;
    if (!searchText) {
      return;
    }
    const response: IResponse = await fetcher(searchText);
    if (response.status) {
      let results = [...(response.payload || [])].map((rec) => ({
        label: rec.title,
        value: rec.slug,
      }));
      if (results.length) {
        setSearchResults(results);
      }
    }
  }

  return { results: searchResults, search: searchHandler };
}
