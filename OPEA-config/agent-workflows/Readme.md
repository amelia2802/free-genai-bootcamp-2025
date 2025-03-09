# Agent Workflow Implementation

## Overview

This project implements an agent using the LangChain framework and OpenAI's GPT-3 model. The agent is designed to help translate questions into Bengali. The project includes Docker configuration to containerize the application for consistent deployment.

## Files and Structure

- `requirements.txt`: Lists the dependencies required for the project.
- `Dockerfile`: Contains the Docker configuration to build the image.
- `agent.py`: The main implementation of the agent.

## Steps to Build and Run

### Step 1: Build the Docker Image

Navigate to the directory containing your `Dockerfile` and run the following command to build the Docker image:

```sh
docker build -t my-agent /c/Users/ameli/projects/free-genai-bootcamp-2025/OPEA-config/agent-workflows
```

### Step 2: Run the Docker Container

Once the image is built, you can run the Docker container using the following command:

```sh
docker run --rm my-agent
```

## Fixing Errors

### Error: Unable to Prepare Context

**Error Message:**
```
ERROR: unable to prepare context: path "/agent-workflows/Dockerfile" not found
```

**Solution:**
Ensure that the path provided to the `docker build` command is the directory containing the `Dockerfile`, not the `Dockerfile` itself. Use the following command:

```sh
docker build -t my-agent /c/Users/ameli/projects/free-genai-bootcamp-2025/OPEA-config/agent-workflows
```

## What I Learned

- How to set up and use the LangChain framework with OpenAI's GPT-3 model.
- How to create a custom agent using LangChain.
- How to containerize a Python application using Docker.
- How to troubleshoot and fix common Docker errors related to context paths.

## Tools and Technologies Used

- **LangChain**: A framework for building applications with large language models.
- **OpenAI GPT-3**: A powerful language model used for generating text.
- **Docker**: A platform for developing, shipping, and running applications in containers.
- **Python**: The programming language used for the implementation.

## Resources

- [LangChain Documentation](https://langchain.readthedocs.io/)
- [OpenAI API Documentation](https://beta.openai.com/docs/)
- [Docker Documentation](https://docs.docker.com/)

## Encountered Errors and Fixes

### Error: Unable to Prepare Context

**Error Message:**
```
ERROR: unable to prepare context: path "/agent-workflows/Dockerfile" not found
```

**Fix:**
Ensure the correct path format is used for Docker on Windows. The path should point to the directory containing the `Dockerfile`.

### Error: Missing Dependencies

**Error Message:**
```
ModuleNotFoundError: No module named 'langchain'
```

**Fix:**
Ensure all dependencies are listed in the `requirements.txt` file and installed correctly using the Dockerfile.

## Conclusion

This project demonstrates how to implement an agent using the LangChain framework and OpenAI's GPT-3 model, containerized with Docker. The process involved setting up the environment, writing the agent code, containerizing the application, and troubleshooting common errors. The experience provided valuable insights into working with modern AI frameworks and containerization tools.