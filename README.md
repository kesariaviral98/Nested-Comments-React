# Nested Comments

A small React + Vite project that renders a nested comment thread and lets users add replies at any level of the tree.

## Features

- Recursive comment rendering
- Reply support for any comment
- In-memory state updates for nested replies
- Simple starter structure for practicing tree-based UI patterns in React

## Tech Stack

- React 19
- Vite
- ESLint

## Getting Started

### Prerequisites

- Node.js 18+ recommended
- npm

### Install

```bash
npm install
```

### Run locally

```bash
npm run dev
```

Then open the local Vite URL shown in the terminal.

## Available Scripts

```bash
npm run dev
npm run build
npm run preview
npm run lint
```

## Project Structure

```text
src/
  App.jsx        # Holds comment state and reply insertion logic
  Comment.jsx    # Recursive comment component
  data.js        # Seed data for the initial comment tree
  main.jsx       # App entry point
```

## How It Works

The app stores comments as a tree where each comment has:

```js
{
  id: number,
  text: string,
  children: []
}
```

When a reply is added, the app walks the tree, finds the matching parent comment, and appends the new reply to that comment's `children` array.

## Notes

- Replies are stored only in component state, so they reset on refresh.
- IDs are currently generated with `Date.now()`, which is fine for a simple demo project.

## Push To GitHub

If you have not initialized Git yet:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo-name>.git
git push -u origin main
```

If `node_modules/` already exists locally, that is fine. The `.gitignore` prevents it from being committed.
