---
slug: basic-ai-agent
title: "Build a Simple AI Agent with Python and CrewAI"
description: "Learn to build a simple AI agent using Python and CrewAI that searches the internet and generates blog summaries."
date: 04/06/2025
authors: rohan
tags: ["python", "ai"]
image: /img/ai-agent/gerard-siderius-YeoSV_3Up-k-unsplash.jpg
---

> **TL;DR**: Build a Python AI agent using CrewAI, Serper, and Google 2.0 Flash APIs. The agent researches a topic and writes a blog post.  
> 📦 [GitHub Repo](https://github.com/Xebec19/congenial-garbanzo)

### Introduction

In this guide, you'll learn how to build a basic AI agent using Python and CrewAI. The agent will search the internet and generate a blog summary using the free Google 2.0 Flash and Serper APIs. This beginner-friendly tutorial walks you through each step.

![Photo by <a href="https://unsplash.com/@siderius_creativ?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Gerard Siderius</a> on <a href="https://unsplash.com/photos/a-robot-holding-a-gun-next-to-a-pile-of-rolls-of-toilet-paper-YeoSV_3Up-k?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>](/img/ai-agent/gerard-siderius-YeoSV_3Up-k-unsplash.webp)

<!-- truncate -->

### Getting Started

Ensure Python is installed on your system. You can download it from the [official website](https://www.python.org/downloads/).

Create a new project directory:

```bash
mkdir simple-ai-agent

cd simple-ai-agent
```

Create a requirements.txt file and add the necessary packages:

![requirements.txt](/img/ai-agent/requirements.webp)

Install the dependencies:

```bash
pip install -r requirements.txt
```

Create the main Python file:

```bash
touch agent.py
```

## Set Up

Open **_agent.py_** and add the initial setup code:

![agent.py](/img/ai-agent/install-dependencies.webp)

This code uses:

- [**_CrewAI_**](https://docs.crewai.com/introduction) : A library for creating AI agents.
- [**_Serper_**](https://serper.dev/) : An API for searching the internet.
- [**_Google 2.0 Flash_**](https://aistudio.google.com/) : A free LLM API for generating text.

Create a **_.env_** file and add your API keys:

![.env](/img/ai-agent/env-vars.webp)

Load the environment variables in **_main.py_**:

![load-env](/img/ai-agent/load-env.webp)

## Define Tools and LLM

Define the tools and LLM for the agent:

```python
from crewai_tools import SerperDevTool
from langchain_google_genai import GoogleGenerativeAI

search_tool = SerperDevTool()

llm = GoogleGenerativeAI(model="gemini-2.0-flash",google_api_key=GOOGLE_AI_API_KEY)
```

![tools](/img/ai-agent/tools-and-llm.webp)

## User Input

Prompt the user to enter a topic:

```python
print("Welcome to AI Researcher and Writer!")

topic = input("Enter the topic: ") # Prompt user to enter a topic
```

## Creating the Agents

Create two agents: a researcher and a writer.

```python
researcher = Agent(
    role="Researcher",
    goal=f"Uncover interesting findings about {topic}",
    verbose=True,
    memory=True,
    backstory=(
    """
    As a researcher, you are committed to uncovering the
    latest and most interesting findings in your field. You
    have a knack for finding hidden gems of information and
    presenting them in an engaging way. Your goal is to
    illuminate the topic at hand, providing insights that are
    both informative and thought-provoking.
    """
    ),
    tools=[search_tool],
    llm=llm,
    allow_delegation=True
)

writer = Agent(
    role="Writer",
    goal=f"Write intuitive article about {topic}",
    verbose=True,
    memory=True,
    backstory=(
    """
    As a writer, you are dedicated to crafting engaging
    and informative articles. You have a talent for
    transforming complex ideas into accessible language,
    making them relatable to a wide audience.
    """
    ),
    tools=[search_tool],
    llm=llm,
    allow_delegation=False
)


```

## Creating the Tasks

Define tasks for each agent:

```python

research_task = Task(
    description=(
        f"Drive key insights about {topic}."
        "What are the latest trends, technologies, and innovations?"
        "Have a balanced view, considering both the positive and negative aspects."
        "Your report should be well-structured and easy to follow."
    ),
    expected_output="A comprehensive 3 paragraphs long report on the topic",
    tools=[search_tool],
    agent=researcher
)

write_task = Task(
    description=(
        f"Compose an detailed and easy to understand article on {topic}"
        "The article should be engaging and informative, suitable for a general audience."
        "It should be well-structured, with a clear introduction, body, and conclusion."
        "Use markdown formatting for headings, lists, and code snippets where appropriate."
        "The article should be at least 4 paragraphs long and cover the key points from the research report."
    ),
    expected_output=f"A 4 paragraph article on {topic} fomatted as markdown",
    tools=[search_tool],
    agent=writer,
    async_execution=False,
    output_file="blog-post.md"
)

```

## Running the Tasks

Run the agent crew sequentially:

```python
crew = Crew(
    agents=[researcher, writer],
    tasks=[research_task, write_task],
    process=Process.sequential
)

result = crew.kickoff()
print(result)

```

Your **_agent.py_** should now resemble:

![agent.py](/img/ai-agent/final-code.webp)

Execute the code:

```bash
python agent.py
```

![run](/img/ai-agent/run.webp)

The generated blog post will be saved as **_agent.py_** in the project directory. Open it in any text editor.

![blog-post](/img/ai-agent/blog-post.webp)

You can find the demo code on [Github Repo](https://github.com/Xebec19/congenial-garbanzo)
