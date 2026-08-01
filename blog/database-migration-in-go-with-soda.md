---

slug: database-migration-in-go-with-go-migrate
title: "Database Migrations in Go with go-migrate"
date: 08/01/2026
authors: rohan
tags: ["web development", "go", "database"]
-------------------------------------------

## Introduction

As applications evolve, database schemas change as well. You might need to add new tables, modify existing columns, or remove outdated ones. Managing these changes manually quickly becomes difficult, especially when multiple developers are working on the same project.

Database migration tools solve this problem by keeping track of schema changes and applying them in a predictable way. They also make it easy to roll back changes if something goes wrong.

In this article, we'll learn how to manage database migrations in Go using **go-migrate**. We'll install the CLI, create migration files, apply them to a PostgreSQL database, and roll them back.

![Photo by Jan Antonin Kolar on Unsplash](/img/jan-antonin-kolar-lRoX0shwjUQ-unsplash.jpg)

<!-- truncate -->

## Prerequisites

Before we begin, make sure you have:

* A PostgreSQL database (or any supported database)
* Docker (optional, if you want to run PostgreSQL in a container)
* Basic familiarity with SQL

---

## Step 1: Install go-migrate

We'll use the **go-migrate CLI** to create and run migrations.

Install it using:

```sh
curl -L https://github.com/golang-migrate/migrate/releases/latest/download/migrate.linux-amd64.tar.gz | tar xvz
sudo mv migrate /usr/local/bin/
```

![Install go-migrate](https://ik.imagekit.io/n8rtlkdw8/blogs/golang-migrate/install-script.png?updatedAt=1785054634321)

Verify that the installation was successful:

```sh
migrate -version
```

![Verify installation](https://ik.imagekit.io/n8rtlkdw8/blogs/golang-migrate/verify-install.png)

---

## Step 2: Set Up PostgreSQL

If you already have PostgreSQL running locally, you can skip this step.

We'll use the following Docker Compose file to start a PostgreSQL container.

![docker-compose.yaml](https://ik.imagekit.io/n8rtlkdw8/blogs/golang-migrate/postgres-docker.png)

Start the database:

![Start PostgreSQL](https://ik.imagekit.io/n8rtlkdw8/blogs/golang-migrate/up-postgres-docker-compose.png)

We'll also need the PostgreSQL client (`psql`) to interact with the database.

Install it using:

```sh
sudo apt update
sudo apt install postgresql-client
```

![Install psql](https://ik.imagekit.io/n8rtlkdw8/blogs/golang-migrate/install-psql.png)

Once PostgreSQL is running, create a database that we'll use for this tutorial.

![Create database](https://ik.imagekit.io/n8rtlkdw8/blogs/golang-migrate/create-database.png)

---

## Step 3: Create Your First Migration

Create a migration by running:

```sh
migrate create -ext sql -dir . -seq init_schema
```

![Create migration](https://ik.imagekit.io/n8rtlkdw8/blogs/golang-migrate/create-migration-scripts.png)

Let's understand what each flag does:

* `-ext sql` creates SQL migration files.
* `-dir .` creates the files in the current directory.
* `-seq` uses sequential numbering (`000001`, `000002`, ...).
* `init_schema` is the migration name.

This command creates two files:

```
000001_init_schema.up.sql
000001_init_schema.down.sql
```

The **up** migration applies your changes, while the **down** migration reverses them.

---

## Step 4: Apply the Migration

Open `000001_init_schema.up.sql`.

First, create a table.

![Create table](https://ik.imagekit.io/n8rtlkdw8/blogs/golang-migrate/create-table.png)

Then insert a few rows.

![Insert data](https://ik.imagekit.io/n8rtlkdw8/blogs/golang-migrate/insert-data.png)

Now run the migration:

```sh
migrate \
  -path <path-to-migrations> \
  -database "postgres://root:postgres@localhost:5432/demo_db?sslmode=disable" \
  -verbose up
```

Here's what each option means:

* `-path` points to the directory containing your migration files.
* `-database` specifies the database connection string.
* `up` applies all pending migrations.
* `-verbose` prints detailed logs while the migration runs.

![Run migration](https://ik.imagekit.io/n8rtlkdw8/blogs/golang-migrate/migrate-up.png)

If everything succeeds, you'll see the new table along with the inserted data.

![Database after migration](https://ik.imagekit.io/n8rtlkdw8/blogs/golang-migrate/up-migration-db.png)

---

## Step 5: Roll Back the Migration

Now let's undo the changes.

Open `000001_init_schema.down.sql` and drop the table that was created in the **up** migration.

Run:

```sh
migrate \
  -path <path-to-migrations> \
  -database "postgres://root:postgres@localhost:5432/demo_db?sslmode=disable" \
  -verbose down
```

![Rollback migration](https://ik.imagekit.io/n8rtlkdw8/blogs/golang-migrate/migrate-down.png)

Apply the rollback:

![Run migrate down](https://ik.imagekit.io/n8rtlkdw8/blogs/golang-migrate/apply-migrate-down.png)

After the rollback, the table no longer exists.

![Database after rollback](https://ik.imagekit.io/n8rtlkdw8/blogs/golang-migrate/down-migration-db.png)

---

## Conclusion

You've now learned the basics of database migrations with **go-migrate**.

In this tutorial, we:

* Installed the go-migrate CLI.
* Started a PostgreSQL database.
* Created migration files.
* Applied a migration.
* Rolled it back.

Using migrations keeps your database schema version-controlled, makes deployments safer, and ensures every developer works with the same database structure.

Happy migrating!
