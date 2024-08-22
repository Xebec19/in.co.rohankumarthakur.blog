#!/bin/bash

# Check if a commit message was provided as an argument
if [ -z "$1" ]; then
  echo "Error: No commit message provided."
  echo "Usage: ./git_push.sh 'Your commit message'"
  exit 1
fi

# Add all changes to the staging area
git add .

# Commit changes with the provided message
git commit -m "$1"

# Push changes to the current branch
git push

# Optional: print success message
echo "Changes pushed successfully!"
