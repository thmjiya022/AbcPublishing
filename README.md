# ABC Publishing - Online Publications Platform

This project is a full-stack web application for ABC Publishing that allows users to read serialized publications online from JSON files.

## Project Structure

- **Backend:** ASP.NET Core Web API (`dotnet`)
- **Frontend:** React with Vite
- **Testing:** Cypress for end-to-end tests

---

## Features

- Reads content from structured JSON documents.
- Renders one section (page) at a time.
- Supports interactive navigation per section.
- Gracefully handles errors and invalid section links.
- Defaults to the **Preface** section on load.

---

## Technologies Used

- ASP.NET Core (.NET 9)
- React + Vite
- Cypress
- Postman
- RESTful API
- JSON Content Parsing

---

## Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/thmjiya022/AbcPublishing.git
```

```bash
cd ABC.Publishing.API
dotnet restore
dotnet build
dotnet run
```

```bash
cd Abc-Publishing-Frontend
npm install
npm run dev

```

# E2E Tests (Cypress)
Make sure both frontend and backend are running.

```bash
npx cypress open
```

Or

```bash
npx cypress run
```

Tests are located in the cypress/e2e/ folder.

