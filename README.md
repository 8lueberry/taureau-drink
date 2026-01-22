# Taureau Drink Selection App

This project is an example of using the **ralph loop** to build an app from scratch.

## Project Overview

A web app that lists common cocktail alcohol and allows users to select ingredients to discover cocktails they can make. The app features:

- **Ingredients**: List of common cocktail alcohol
- **Selected**: List of user-selected alcohol
- **Cocktails**: Result of possible cocktails that can be made with the selected list

Users can drag alcohol from the "ingredients" list to the "selected" list, and the app will automatically update the list of available cocktails.

## Quick Run

The repo contains the result of the ralph loop project. If you want to run it locally you can run.

```bash
npm run dev
```

## Project Files

- **APP.md**: The description of the app. This is the PROMPT for building a PRD (Product Requirements Document)
- **ralph.sh**: The ralph loop script that automates the development process
- **skills/**: Skills that can be added to Claude Code or OpenCode
  - **prd/**: Skill for building a PRD from the app description
  - **ralph/**: Skill for converting the PRD to a format that `ralph.sh` understands
- **progress.txt**: Summary of all the jobs that were completed during development
- **prd.json**: The PRD file generated from APP.md (used by ralph.sh)

## Building the App

### Step 1: Create the PRD

Ask your agent:
```
"load the prd skill and use APP.md as the input to create a prd.json file"
```

This will create a `tasks/prd-*.md` file. **It's important to have a very detailed PRD file** for the ralph loop to work effectively.

### Step 2: Run the Ralph Loop

In your terminal, run:
```bash
./ralph.sh 10
```

This runs ralph with a maximum of 10 iterations to avoid infinite loops. You can run it again until everything is done.

### Step 3: Check Progress

Look at `progress.txt` to see a summary of all the jobs that were done.

## Development

This is a [Next.js](https://nextjs.org) project. To run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## How the Ralph Loop Works

The `ralph.sh` script:
1. Finds the highest-priority feature to work on
2. Checks that types check via `npm typecheck` and tests pass via `npm test`
3. Updates the PRD with the work that was done (progress field only)
4. Appends progress to `progress.txt`
5. Makes a git commit of that feature
6. Repeats until all tasks are complete or max iterations reached

The loop stops when it detects `<promise>COMPLETE</promise>` in the output, indicating all PRD tasks have been completed.
