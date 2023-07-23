import {
  SITEMAP_SLUG_LENGTH,
  STATIC_SLUG_LENGTH,
} from "@/config/default-values";
import { ISlugEntity } from "@/interfaces/post";
import { environments } from "@/utils/environments";

const EXTERNAL_DATA_URL = "https://rohankumarthakur.co.in/";

function generateSiteMap(slugs: string[]) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <url>
       <loc>${EXTERNAL_DATA_URL}</loc>
     </url>
     ${slugs
       .map((slug) => {
         return `
       <url>
           <loc>${`${EXTERNAL_DATA_URL}${slug}`}</loc>
       </url>
     `;
       })
       .join("")}
   </urlset>
 `;
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }: { res: any }) {
  try {
    let url = environments.baseUrl + "posts/slugs/" + SITEMAP_SLUG_LENGTH;
    let response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    let data = await response.json();
    if (!data.status) {
      // TODO handle error
    }
    let payload: ISlugEntity[] = data?.payload;
    let slugs = payload.map((s: ISlugEntity) => s.String);
    const sitemap = generateSiteMap(slugs);

    res.setHeader("Content-Type", "text/xml");
    res.write(sitemap);
    res.end();

    return {
      props: {},
    };
  } catch (error) {
    console.log(error);
    return {
      notFound: true,
    };
  }
}

export default SiteMap;
