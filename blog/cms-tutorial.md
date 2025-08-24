---
slug: cms-tutorial
title: "Introduction to CMS: Building a Simple Blog with Strapi"
description: "Learn how to build a simple blog using Strapi, a popular headless CMS. This tutorial covers installation, setup, and creating content types."
date: 08/24/2025
authors: rohan
tags: ["cms", "strapi", "web development"]
image: /img/cms-tutorial/hero-image.jpg
---

> **TL;DR**: Learn how to set up a basic blog using Strapi, a headless CMS. We&apos;ll go through installing Strapi, creating content types, adding posts, and fetching them via API.

### Introduction

Content Management Systems (CMS) help you manage digital content without diving into code every time. Strapi is a **headless CMS**, meaning it provides an API to manage and deliver content, making it flexible for modern web apps.

In this tutorial, we&apos;ll build a simple blog with Strapi: set it up, create content types, add posts, and fetch them via API.

![CMS Hero Image](/img/cms-tutorial/hero-image.jpg)

<!-- truncate -->

### Setup

First, install **Node.js** and **npm** from the official [Node.js website](https://nodejs.org/).

Then, create a new Strapi project by running:

```bash
npx create-strapi-app@latest
```

![Strapi Installation](/img/cms-tutorial/install-strapi.png)

This will install Strapi and start a development server.

Now we can start the server by below command:

```bash
npm  run develop
```

Next, open **http://localhost:1337/admin** in your browser to create an admin user for the Strapi dashboard.

![Strapi Admin Setup](/img/cms-tutorial/setup-user.png)

### Creating Content Types

Inside the dashboard, go to **Content-Types Builder → Create new collection type.**

For our blog, let&apos;s create a collection called Post with these fields:

- Title (Text)
- Content (Rich Text)
- Author (Text)

Save the collection type, and you&apos;re ready to add posts.

<video width="600" controls>
  <source src="/img/cms-tutorial/creating-schema.webm" type="video/webm" />
  Your browser does not support the video tag.
</video>

### Adding Content

Go to **Content Manager → Post → Create new entry.**

Fill in your blog post details (title, content, author) and save it.

<video width="600" controls>
  <source src="/img/cms-tutorial/creating-entries.webm" type="video/webm" />
  Your browser does not support the video tag.
</video>

### Fetching Content

Strapi automatically generates a REST API for each content type. For our blog posts, the endpoint is:

```http
http://localhost:1337/api/posts
```

To access it securely, you&apos;ll need an **API token**:

- Go to **Settings → API Tokens** in the dashboard.
- Create a new token with read access to Posts.

<video width="600" controls>
  <source src="/img/cms-tutorial/creating-api-token.webm" type="video/webm" />
  Your browser does not support the video tag.
</video>

Now you can fetch posts from your frontend using this endpoint.

![API Request Example](/img/cms-tutorial/http-requests.png)

Now you can use this endpoint to fetch and display the blog posts in your frontend application.

### Conclusion

You&apos;ve just built a basic blog with Strapi! 🎉

- Installed Strapi
- Created a Post content type
- Added blog entries
- Fetched them through the REST API

This setup gives you a foundation to expand further — add categories, images, authentication, or even switch to Strapi&apos;s GraphQL plugin.
