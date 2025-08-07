# API for ancdavao.com

This repository contains the serverless API for ancdavao.com, deployed on Netlify. It is built using Node.js, TypeScript, and Express.js, with Firebase Admin for backend interactions.

## Project Structure

- `src/`: Contains the main application source code.
- `netlify/functions/`: Contains the Netlify serverless function entry point.
- `lib/`: Compiled JavaScript output.

## Setup

To set up the project locally, ensure you have Node.js (v22) and Yarn installed.

1. Install dependencies:
   ```bash
   yarn install
   ```

2. Set up environment variables:
   Create a `.env` file in the root directory based on your project's requirements (e.g., Firebase credentials).

## Available Scripts

- `yarn lint`: Lints the TypeScript and JavaScript files.
- `yarn build`: Compiles the TypeScript code to JavaScript.
- `yarn build:watch`: Compiles TypeScript in watch mode.
- `yarn format`: Formats the code using Prettier.
- `yarn dev`: Starts the Netlify development server.
- `yarn test`: Runs tests using Vitest.
- `yarn test:watch`: Runs tests in watch mode.
