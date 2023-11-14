---
slug: html-sse
title: "HTML Server Sent Events"
authors:
  - name: Rohan Thakur
    title: Author
    url: https://github.com/Xebec19
    image_url: https://github.com/Xebec19.png
    tags: ["web development", "html", "javascript", "nodejs"]
---

### Why HTML SSE ?

It always make me curious that how codeforces provide real time notifications to users during contests. Does it use any tool like firebase to set pub/sub ? Does it use long polling ? Sending repeat requests to server to fetch notifications does not sound like a bright idea. Though I am still not very clear about how codeforces handles all those timely prompts but I have came across a way which might serve the purpose and that is HTML Server Sent Events.

![](/img/volodymyr-hryshchenko-V5vqWC9gyEU-unsplash.jpg)

### What is HTML SSE ?

As mentioned by w3schools "Server-Sent Events (SSE) allow a web page to get updates from a server". Allright! we do not need to send repeated request to the server for fetching update. We can use Server-Sent Events through which our server will send update to the website. Before we dig further, let's have a look on the list of browsers which supports Server-Sent Events.

![](/img/can-i-use-html-sse.png)

### Implementation

Let's move to the fun part and learn how to implement SSE. First we will create a nodeJs application and create a route as follows:

![index.js](/img/route.png)

As we can see we only need to set "Content-Type" header as "text/event-stream" and send our data. In our case we will be sending a timestamp. Now lets create a simple html page which will receive updates from our server.

![index.html](/img/sse-1.png)

In the above code, we have created an EventSource which is connected to "http://localhost:3000/sse" route. We have used onmessage event to get messages. Some other events are as follows:

1. onopen: When a connection to the server is opened
2. onmessage: When a message is received
3. onerror: When an error occurs

Let's start our server with below command.

```
node index.js
```

Now, we will checkout our web page.

![page.html](/img/sse-final.gif)

Awesome! We are automatically receiving those timestamps from our server. Hope you find this article helpful. You can find the source code on [github](https://github.com/Xebec19/html-sse). Happy coding!
