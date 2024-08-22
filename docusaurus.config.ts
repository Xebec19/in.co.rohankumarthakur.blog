import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

const config: Config = {
  title: "Rohan Kumar Thakur",
  tagline: "Welcome to my blogging website!",
  favicon: "img/favicon.ico",

  // Set the production url of your site here
  url: "https://rohankumarthakur.co.in",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "xebec19", // Usually your GitHub org/user name.
  projectName: "docusauras-blog", // Usually your repo name.

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      {
        gtag: {
          trackingID: "G-L2CG4VF8C3",
          anonymizeIP: true,
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ["rss", "atom"],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: "https://github.com/Xebec19/docusauras-blog/tree/main/blog",
          // Useful options to enforce blogging best practices
          onInlineTags: "warn",
          onInlineAuthors: "warn",
          onUntruncatedBlogPosts: "warn",
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
        sitemap: {
          changefreq: "weekly",
          priority: 0.5,
          ignorePatterns: ["/tags/**"],
          filename: "sitemap.xml",
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    [
      "@gracefullight/docusaurus-plugin-microsoft-clarity",
      { projectId: "gqkh1r5ux0" },
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: "img/blog-social-card.png",
    navbar: {
      title: "About",
      logo: {
        alt: "My Site Logo",
        src: "img/blog-logo.png",
      },
      items: [
        { to: "/blog", label: "Blog", position: "left" },
        {
          href: "https://github.com/Xebec19",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Community",
          items: [
            {
              label: "Stack Overflow",
              href: "https://stackoverflow.com/users/13674513/rohan-kumar-thakur",
            },
            {
              label: "Linkedin",
              href: "https://www.linkedin.com/in/rohan-kumar-thakur",
            },
            {
              label: "Twitter",
              href: "https://twitter.com/tweets_thakur",
            },
          ],
        },
        {
          title: "More",
          items: [
            {
              label: "Blog",
              to: "/blog",
            },
            {
              label: "RSS",
              href: "https://rohankumarthakur.co.in/blog/rss.xml",
            },
            {
              label: "GitHub",
              href: "https://github.com/Xebec19",
            },
          ],
        },
      ],
      // copyright: `Rohan Kumar Thakur`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
    algolia: {
      // The application ID provided by Algolia
      appId: "6BZNA2ZUTJ",

      // Public API key: it is safe to commit it
      apiKey: "266d7de21942228da46d006fd349ce2d",

      indexName: "rohankumarthakur-co",

      // Optional: see doc section below
      contextualSearch: true,

      // Optional: Specify domains where the navigation should occur through window.location instead on history.push. Useful when our Algolia config crawls multiple documentation sites and we want to navigate with window.location.href to them.
      // externalUrlRegex: "external\\.com|domain\\.com",

      // Optional: Replace parts of the item URLs from Algolia. Useful when using the same search index for multiple deployments using a different baseUrl. You can use regexp or string in the `from` param. For example: localhost:3000 vs myCompany.com/docs
      replaceSearchResultPathname: {
        from: "/docs/", // or as RegExp: /\/docs\//
        to: "/",
      },

      // Optional: Algolia search parameters
      searchParameters: {},

      // Optional: path for search page that enabled by default (`false` to disable it)
      searchPagePath: "search",
    },
    metadata: [
      {
        name: "keywords",
        content: "rohan kumar thakur, developer, blogs",
      },
    ],
  } satisfies Preset.ThemeConfig,
};

export default config;
