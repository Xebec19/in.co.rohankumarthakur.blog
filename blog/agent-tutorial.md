---
slug: basic-ai-agent
title: "Building a Simple AI Agent in Python"
description: "Learn to build a simple AI agent using Python and CrewAI that searches the internet and generates blog summaries."
date: 04/06/2025
authors: rohan
tags: ["python", "ai", "agent"]
image: /img/gerard-siderius-YeoSV_3Up-k-unsplash.jpg
---

### What is this tutorial about?

In this tutorial, you&apos;ll learn to build a simple AI agent using Python and CrewAI. The agent will search the internet and generate a blog summary using the free Google 2.0 Flash and Serper APIs. This beginner-friendly guide walks you through each step clearly.

![Photo by <a href="https://unsplash.com/@siderius_creativ?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Gerard Siderius</a> on <a href="https://unsplash.com/photos/a-robot-holding-a-gun-next-to-a-pile-of-rolls-of-toilet-paper-YeoSV_3Up-k?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>](/img/gerard-siderius-YeoSV_3Up-k-unsplash.jpg)

### Getting Started

To get started, ensure you have Python installed on your system. You can download it from the official [Python website](https://www.python.org/downloads/). Once you have Python set up, create a new directory for your project and navigate to it in your terminal.

```bash
mkdir simple-ai-agent
cd simple-ai-agent
```

Inside this directory, create a **_requirements.txt_** file to manage your dependencies. Add the following lines to it:

![requirements.txt](/img/ai-agent/requirements.png)

Now, we need to install the required packages. You can do this by running the following command in your terminal:

```bash
pip install -r requirements.txt
```

Then we need to create a **_agent.py_** file. This file will contain the code for our AI agent. You can create it using the following command:

```bash
touch main.py
```

## Set Up

Open the **_main.py_** file in your favorite text editor and add the following code:

![main.py](/img/ai-agent/install-dependencies.png)

In above code, we would be using the [**_Serper_**](https://serper.dev/) to search the internet and [**_Google2.0Flash_** APIs](https://aistudio.google.com/) as the llm. We will also use the **_CrewAI_** library to create our agent.

Now we would save our API keys in **_.env_** file. Create a new file named **_.env_** in the same directory as your **_main.py_** file and add the following lines to it:

![.env](/img/ai-agent/env-vars.png)

After defining the API keys, we need to load them in our code. We can do this using the **_dotenv_** library. Add the following lines to your **_main.py_** file:

![load-env](/img/ai-agent/load-env.png)

## Define tools and llm

Now, we need to define the tools and llm that our agent will use. We can do this using the **_Serper_** and **_Google2.0Flash_** APIs. Add the following lines to your **_main.py_** file:

```python
from crewai_tools import SerperDevTool
from langchain_google_genai import GoogleGenerativeAI

search_tool = SerperDevTool()

llm = GoogleGenerativeAI(model="gemini-2.0-flash",google_api_key=GOOGLE_AI_API_KEY)
```

![tools](/img/ai-agent/tools-and-llm.png)

## User Input

Now, we would prompt the user to enter a topic for the blog summary. To do this, we would add below lines to our **_main.py_** file:

```python
print("Welcome to AI Researcher and Writer!")

topic = input("Enter the topic: ") # Prompt user to enter a topic
```

## Creating the agents

Now we would create two agents. One would do research about the topic and the other would generate the blog summary. To do this, we would add below lines to our **_main.py_** file:

```python
researcher = Agent(
    role="Senior Researcher",
    goal=f"Uncover ground breaking technologies in {topic}",
    verbose=True,
    memory=True,
    backstory=(
    """
        Driven by curiousity, you're at the forefront of
        innovation, eager to explore and share knowledge that could change
        the change
    """
    ),
    tools=[search_tool],
    llm=llm,
    allow_delegation=True
)

writer = Agent(
    role="Writer",
    goal=f"Narrate compelling tech stories about {topic}",
    verbose=True,
    memory=True,
    backstory=(
    """
        With a flair for simplifying complex topics, you craft
        engaging narratives that captivate and educate, bringing new
        discoveries to light in an accessible manner.
    """
    ),
    tools=[search_tool],
    llm=llm,
    allow_delegation=False
)

```

## Creating the tasks

Now we would create the tasks for the agents. The researcher agent will do the research and the writer agent will generate the blog summary. To do this, we would add below lines to our **_main.py_** file:

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

## Running the tasks

Now we would put everything together and kickoff the tasks. To do this, we would add below lines to our **_main.py_** file:

```python
crew = Crew(
    agents=[researcher, writer],
    tasks=[research_task, write_task],
    process=Process.sequential
)

result = crew.kickoff()
print(result)

```

Our final **_main.py_** file should look like this:

![main.py](/img/ai-agent/final-code.png)

Now its time to hit the terminal and run the code. You can do this by running the following command in your terminal:

```bash
python main.py
```

![run](/img/ai-agent/run.png)
