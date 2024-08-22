---
slug: upload-to-s3-in-go
title: "How to Upload a File to S3: A Step-by-Step Guide"
date: 06/10/2024
authors:
  - name: Rohan Thakur
    title: Author
    url: https://github.com/Xebec19
    image_url: https://github.com/Xebec19.png
    tags: ["web development", "go", "aws", "s3"]
---

## Introduction

Amazon S3 (Simple Storage Service) is a scalable object storage service used widely for various data storage needs. This guide will walk you through the process of uploading a file to an S3 bucket, from creating the bucket and setting up the necessary permissions, to writing and testing the code that performs the upload. Let's get started!

## Create an S3 Bucket

First we need to create a bucket in S3.

![create a bucket](/img/utsig-create-bucket.png)

## Create a Policy

Next, we need to create a policy that grants access to this bucket.

1. Navigate to the IAM section of AWS.

![iam dashboard](/img/utsig-iam-dashboard.png)

2. Go to the policy section in the left sidebar.

![policy dashboard](/img/utsig-policy-dashboard.png)

3. Create a new policy.

![create policy](/img/utsig-create-policy.png)

4. Set the resource to S3 and check "All S3 actions" in the "actions allowed" section.

![set resource and actions](/img/utsig-set-resource-and-permissions.png)

5. In the Resources section, input the ARN (Amazon Resource Name) of your S3 bucket opposite the bucket label. You can find the ARN in the properties section of the bucket.

![arn](/img/utsig-arn.png)

![resource section](/img/utsig-resources-section.png)

![add bucket arn](/img/utsig-add-bucket-arn.png)

![added bucket arn](/img/utsig-added-bucket-arn.png)

6. Scroll down and select "Any" for the object label, which grants permission on any object inside the bucket.

![set object label to any](/img/utsig-set-object.png)

7. Provide a name and description for your policy.

![add details in policy](/img/utsig-add-details-in-policy.png)

## Create an IAM User

After creating the policy, we need to create an IAM user and assign this policy to the user.

1. Go to the user section in the IAM Dashboard.

![create iam user](/img/utsig-iam-create-user.png)

2. Enter a name for the IAM user.

![enter name for iam user](/img/utsig-iam-create-user-2.png)

3. Skip the AWS Management console access since we only need programmatic access for this user. Attach the policy created earlier to this user.

![attach policy](/img/utsig-attach-policy-1.png)

![attach policy](/img/utsig-attach-policy-2.png)

4. Review the details and create the user.

![review iam user](/img/utsig-review-iam-user.png)

5. Create access keys for the user so that our API can access the bucket on behalf of the created user. Go to the "Security Credentials" section.

![move to security credentials section](/img/utsig-visit-security-credentials.png)

6. Scroll down to "Access Keys" and create a new access key.

![scroll down to access key](/img/utsig-move-to-access-keys.png)

![create access key](/img/utsig-create-access-key.png)

7. Optionally, add a description to the access key. Make sure to save the secret access key as it will not be retrievable later.

![add description to access key](/img/utsig-set-description-access-key.png)

![access key creds](/img/utsig-access-key-creds.png)

## Create a web server

To handle file uploads, we will create a web server using the Go programming language and the go-fiber package.

1. Download the required packages:

```
go get github.com/gofiber/fiber/v2
```

```
go get github.com/aws/aws-sdk-go/aws github.com/aws/aws-sdk-go/aws/credentials github.com/aws/aws-sdk-go/aws/session github.com/aws/aws-sdk-go/service/s3/s3manager
```

![download packages](/img/utsig-download-packages.png)

2. Create a web server listening on port 3000:

![create web server](/img/utsig-web-server.png)

3. Initialize the AWS SDK:

```

import (
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/credentials"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/s3/s3manager"
)

var Uploader *s3manager.Uploader

func NewAWS() {

	var region string = ""    // AWS Region
	var accessKey string = "" // access key
	var secretKey string = "" // secret access key

	awsSession, err := session.NewSessionWithOptions(
		session.Options{
			Config: aws.Config{
				Region: aws.String(region),
				Credentials: credentials.NewStaticCredentials(
					accessKey,
					secretKey,
					"",
				),
			},
		})

	if err != nil {
		panic(err)
	}

	Uploader = s3manager.NewUploader(awsSession)
}
```

Initialize this function in main.go:

```
package main

import (
	"github.com/Xebec19/psychic-enigma/internal"
	"github.com/gofiber/fiber/v2"
)

func main() {

	internal.NewAWS() // initialize AWS SDK

	app := fiber.New()

	app.Get("/", func(c *fiber.Ctx) error {
		return c.SendString("Hello, World!")
	})

	app.Listen(":3000")
}

```

4. Create a function to upload a file to S3:

```

type Result struct {
	Value string
	Err   error
}

func UploadImage(file *multipart.FileHeader) <-chan Result {
	ch := make(chan Result)

	go func() {
		defer close(ch)
		src, err := file.Open()
		if err != nil {
			return
		}
		defer src.Close()

		var bucketName string = "" // bucket name

		_, err = Uploader.Upload(&s3manager.UploadInput{
			Bucket: aws.String(bucketName),
			Key:    aws.String(file.Filename),
			Body:   src, // add file body here
		})
		if err != nil {
			ch <- Result{Value: "", Err: err}
			return
		}

		url := fmt.Sprintf("https://%s.s3.amazonaws.com/%s", bucketName, file.Filename)

		ch <- Result{Value: url, Err: nil}
	}()

	return ch
}

```

5. Create an API endpoint to handle file uploads:

```
app.Post("/upload", func(c *fiber.Ctx) error {

		form, err := c.MultipartForm()

		if err != nil {
            return err
		}

		ch := internal.UploadImage(form.File["image"][0])

		response := <-ch
		if response.Err != nil {
			return response.Err
		}

		c.SendString(response.Value)
		return nil
})
```

## Testing the Code

1. Use Postman to test the file upload endpoint:

![postman request](/img/utsig-s3-object.png)

2. Verify the file has been uploaded to the S3 bucket:

![s3 files](/img/utsig-s3-object.png)

Congratulations! You have successfully uploaded a file to S3. You can find the source code https://github.com/Xebec19/psychic-enigma.

## Conclusion

Uploading files to S3 involves creating a bucket, setting up the appropriate IAM policies and user, and writing code to handle the file upload. By following this guide, you should now be able to upload files to S3 using Go and the AWS SDK. Happy coding!
