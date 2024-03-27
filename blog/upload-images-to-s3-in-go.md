---
slug: upload-images-to-s3-in-go
title: "Uploading Images to Amazon S3 in Go: A Developer's Guide"
authors:
  - name: Rohan Thakur
    title: Author
    url: https://github.com/Xebec19
    image_url: https://github.com/Xebec19.png
    tags: ["go", "s3", "aws"]
---

Hey there, fellow developers! Ever wondered how to effortlessly upload images to Amazon S3 using Go? Well, wonder no more because we're about to dive into a fun and intuitive guide on how to do just that. Amazon S3 (Simple Storage Service) provides a highly scalable, reliable, and low-latency data storage infrastructure, making it perfect for storing and serving images in your web applications.

### Prerequisites

Before we get started, ensure you have the following prerequisites:

- Basic understanding of Go programming language.
- An AWS account with access to S3.
- Go installed on your machine.

### Let's Get Rolling!

- **Step 1**: Set Up Your AWS Account
  If you haven't already, sign in to your AWS account and navigate to the IAM (Identity and Access Management) dashboard.

  ![IAM Dashboard](/img/iam-dashboard.png)

  Then navigate to the User subsection, using left sidebar

  ![IAM Users Dashboard](/img/iam-users-dashboard.png)

  Let's create a new user
