---
slug: overview
title: "Web development basics"
date: 11/14/2023
authors: rohan
tags: ["web development", "html", "javascript", "css", "web"]
---

## Overview

Web development is an exciting field that empowers us to create and maintain websites and web applications. It involves leveraging various technologies such as HTML, CSS, and JavaScript to construct the visual and interactive elements of a website.

When it comes to the front-end, we're focused on refining the user interface, ensuring both an aesthetically pleasing design and user-friendly experience. This is where HTML (Hypertext Markup Language) takes the stage, defining the structure of our web content. Meanwhile, CSS (Cascading Style Sheets) steps in to stylize and arrange our content, providing the desired appearance and feel.

On the flip side, the back-end encompasses server-side logic that grants dynamism and functionality to our website. This is where programming languages like Python, Ruby, PHP, or JavaScript (Node.js) come into play. It's also where we manage databases, handling user data and other essential information our website requires.

Now, let's delve into the fundamentals of web browsing and how the internet works.

## Browsing the web

As we enter "www.google.com" in our browser's address bar, the query journeys to the ISP (Internet Service Provider), which looks up the query in the DNS (Domain Name Service). ISPs are substantial entities providing internet services to users like us, and DNS acts as a registry mapping domain names to unique IP addresses. These IP addresses serve as distinctive identifiers for each computer connected to the internet.

Upon locating the requested resource in the DNS, the ISP returns the IP address of the server hosting that resource. Subsequently, the server transmits HTML, CSS, and JavaScript files back to us. Once received, these files are executed in our browser, culminating in the display of a complete web page.

![searching the web](/img/Web-search.png)

For further insight into ISPs, you can refer to this informative article on [Internet Service Provider Hierarchy](https://www.geeksforgeeks.org/internet-service-provider-isp-hierarchy/).

When we have the IP address, we're able to establish a direct connection with the server. Wondering how we achieve this connection? Refer to the illustrative diagram below:

![internet-backbone drawio](https://user-images.githubusercontent.com/65282610/246672467-fb025138-7249-47d9-941e-838065ad8d87.png)

Our connection to the ISP initiates a connection to the Internet Backbone, which in turn links us to the server. The Internet Backbone is essentially the core of the internet, comprising high-speed networks interlinked by fiber-optic connections and efficient routers. You can explore the intricate network of the Internet Backbone through this [submarine cable map](https://www.submarinecablemap.com/)

## Introduction to html, css and javascript

Let's now explore a basic example of HTML, CSS, and JavaScript integration.

To create an HTML file, we begin by saving a file with a ".html" extension. This file should open with a:

```
<!DOCTYPE html>
```

tag, indicating adherence to the HTML5 standard. Within the file, the root element is the `<html>` tag, housing two crucial tags: `<head>` and `<body>`. The `<head>` section contains metadata about the webpage (e.g., title, keywords, description), while the `<body>` section houses the webpage's content.

Here's a simplified example using an `<h1>` tag to display a heading:

```
<!doctype html>
<html>
<head>
<title>Web page</title>
</head>
<body>
<h1>Hello world</h1>
</body>
</html>
```

![Screenshot from 2023-06-18 20-37-14](https://user-images.githubusercontent.com/65282610/246673283-7d56be7c-115d-4cdd-9a77-468e7719290c.png)

However, a plain webpage lacks visual appeal. This is where CSS steps in, offering the means to introduce colors and other stylistic elements that enhance interactivity. Don't worry about the syntax just yet; we'll delve into that in upcoming articles. Here's a simple demonstration of how we'd create basic styling:

```
.root {
    background-color: blue;
}
```

This styling can then be applied to our document:

```
<!doctype html>
<html>
<head>
<title>Web page</title>
<style>
.root {
    background-color: blue;
}
</style>
</head>
<body>
<h1 class="root">Hello world</h1>
</body>
</html>
```

As you'll notice, we've assigned a class property to the `<h1>` tag. We'll explore this concept further in our CSS discussions.

For interactivity, let's add a button that displays a message box when clicked:

```
<button onclick="handleClick()">Click me</button>

<script>
function handleClick() {
    prompt("hello world");
}
</script>
```

Incorporating the above code into our webpage:

```
<!doctype html>
<html>
<head>
<title>Web page</title>
<style>
.root {
    background-color: blue;
}
</style>
</head>
<body>
<h1 class="root">Hello world</h1>
<button onclick="handleClick()">Click me</button>

<script>
function handleClick() {
    prompt("hello world");
}
</script>
</body>
</html>
```

![Screenshot from 2023-06-18 20-50-44](https://user-images.githubusercontent.com/65282610/246674033-33ae54fc-8282-424f-abc5-986372fa8d56.png)

## Conclusion

In the vast landscape of web development, we've uncovered the core mechanics of crafting captivating websites and applications. Armed with HTML, CSS, and JavaScript, we've navigated the blend of structure, style, and interactivity that defines modern web experiences.

As you embark on your web development journey, remember that every line of code is a step toward mastery. Embrace the evolving nature of the field, stay curious, and let your passion drive your progress. The world of web development holds endless opportunities for innovation and growth.

May your coding be crisp, your designs engaging, and your journey fulfilling. Happy coding.
