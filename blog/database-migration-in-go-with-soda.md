---
slug: database-migration-in-go-with-soda
title: "Database Migration with Soda"
date: 08/13/2023
authors: rohan
tags: ["web development", "go", "database"]
---

## Introduction

In the world of software development, effectively managing database schema changes is crucial as applications evolve over time. To ensure a smooth transition between different versions of the database schema, it's essential to use database migration tools that provide a systematic way to apply and track these changes. In this article, we'll explore how to set up database migration for a Go application using the popular migration tool called "Soda." Whether you're an experienced Go developer or new to the language, we'll guide you through the process in a clear and concise manner. Let's dive in!

![Photo by Jan Antonin Kolar on Unsplash](/img/jan-antonin-kolar-lRoX0shwjUQ-unsplash.jpg)

<!-- truncate -->

### Prerequisites

Before we begin, having some knowledge of the Go programming language would be helpful. Additionally, make sure you have Go installed on your system and a working database (e.g., PostgreSQL, MySQL) to which you want to apply migrations.

## Steps

### Step 1: Project Initialization

To get started with database migrations, let's first initialize our Go project. Open your terminal or command prompt and navigate to the directory where you want to create your project. Run the following command:

    go mod init example.com/myproject

For example:

```
go mod init github.com/Xebec19/soda-example
```

This command initializes a new Go module for our project.

### Step 2: Installing Soda

Soda is a powerful database migration and query library for Go. To install Soda, execute the following command in your terminal:

```
 go install github.com/gobuffalo/pop/v6/soda@latest
```

You can find more information about Soda [link](https://gobuffalo.io/documentation/database/soda/)

### Step 3: Setting up Database Connection

Before we proceed, let's ensure we have a database ready. In this example, we'll assume a database named "sodademo" already exists.

![screenshot](/img/migration-create-database.png)

Next, we need to create a `database.yml` file to specify the connection details:

```
development:
	dialect: postgres
	url: "postgresql://username:your_password@127.0.0.1:5432/sodademo"
	pool: 5

production:
	url: "postgres://username:your_password@127.0.0.1:5432/sodademo"
```

In the above configuration, make sure to replace `<your_password>` with the actual password for your database user. Also, feel free to adjust the address and other settings based on your environment (e.g., development, production).

### Step 4: Creating a Migration

Now, let's create our first migration. Run the following command:

```sh
soda generate sql migration-name
```

Replace `<migration_name>` with a descriptive name for your migration. This command will generate two migration files: an "up" migration file and a corresponding "down" migration file. The "up" file contains the changes we want to apply to the database schema, while the "down" file specifies how to revert those changes.

For the "up" migration, let's create a table:

```
create table users (

user_id serial primary key,

first_name text not null,

last_name text,

email varchar not null unique,

phone integer,

password varchar not null,

created_on timestamptz DEFAULT now(),

updated_on timestamptz DEFAULT now(),

status varchar(10) default 'active'

)
```

For the "down" migration, let's drop the table:

```
drop table users;
```

### Step 5: Applying Migrations

Now it's time to apply the migrations and update our database schema. Execute the following command:

```sh
    soda migrate
```

This command will execute all pending migrations. You can find more information about migration commands [here](https://gobuffalo.io/documentation/database/migrations/).

Let's run our migration file.

![screenshot](/img/migration-up-mig.png)

After running the "up" migration script, the table will be created in our database.

![screenshot](/img/migrate-up.png)

### Step 6: Rolling Back Migrations

If we need to roll back the last applied migration, we can use the following command:

```sh
    soda migrate down
```

Executing the "down" script allows us to revert the changes made by the "up" script.

![screenshot](/img/migrate-down.png)

Now, if we check our database, the user table has been deleted.

![screenshot](/img/migrate-db.png)

Congratulations on successfully setting up database migration for your Go application using Soda!

Happy migrating!
