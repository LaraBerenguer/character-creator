# React + Nodejs app to create your characters

## 📄 Description

CHECK IT LIVE HERE: [https://character-creator-rho.vercel.app/](https://character-creator-rho.vercel.app/)

Greetings, adventurer! This is a full-stack web application for creating a character personality. You can choose or randomize four aspects of your personality: trait, bond, flaw and ideal. Also, if you need more inspiration, you can generate a small background to give life to your character.

I built the app with React + Vite. Frontend includes .... Backend includes Nodejs, express and database management with Sequelize and Postgresql. Auth is done with bcrypt and JWT.

## 💻 Technologies Used

### Frontend
- React with TypeScript
- Vite
- TailwindCSS
- DaisyUI
- PostCSS

### Backend
- Node.js with Express
- Sequelize ORM
- PostgreSQL
- CORS
- Docker

## Deployment
- Vercel
- Render

## Testing
- Vitest
- Playwright

## 💡 Functionalities

- [x] Character creation: create and customize characters by selecting or randomizing traits, bonds, flaws, and ideals.
- [x] Background generation: generate a small background story to give life to your character.
- [x] Peronality creation: add your own traits to fully personalize your character.
- [x] User Authentication: Secure user authentication using bcrypt and JWT.
- [x] Database Management: Manage character data using Sequelize ORM with PostgreSQL.
- [ ] Accesibility
- [ ] Sign Up confirmation
- [ ] Informative loading states
- [ ] New database model
- [ ] End to end testing

## 🔑 Setting up .env configuration

To run this project locally, you need to configure environment variables. Follow these steps:

You'll need:
- A local database.
- A Deepseek key (optional!)

1. Create and .env in the Frontend directory with this content:

```bash
VITE_API_URL:your_preferred_localhost_example_http://localhost:3000
```

1. Create an .env in the Backend directory and add this:

```bash
PORT:your_local_port_example_3000
CORS_ORIGIN:your_localhost
DB_PASS:your_local_db_password
DATABASE_URL:your_backend_url
ENVIRONMENT:development
SECRET_KEY:
DEEPSEEK_API_KEY::your_deepseek_api_key
DB_NAME:your_db_name
DB_USER:your_db_user
DB_PASSWORD:your_db_password
DB_HOST:your_db_host
DB_PORT:your_db_port
...
```
3. After setting up the .env file with your own credentials, you’ll be ready to run the project.

## 📋 Requirements

- Node.js >= 18.0.0
- npm >= 9.0.0
- PostgreSQL >= 13
- Docker (optional, for containerization)

## 🚀 Installation

**✔️ Step 1:** Clone the repository to your local machine (replace `your-username` with your GitHub username):

```bash
git clone https://github.com/your-username/character-creator.git
cd character-creator
```

**✔️ Step 2:** Install dependencies for both frontend and backend:

```bash
cd frontend
npm install
cd ../backend
npm install
```

**✔️ Step 3:** Start the development servers:

Terminal 1 (Frontend):

```bash
cd frontend
npm run dev
```

Terminal 2 (Backend):

```bash
cd backend
npm run dev
```

Once the server is running, you'll see a URL similar to:

```bash
 > Local: http://localhost:5173/
```

### Production

**✔️ Step 1:** Build the frontend:

 ```bash
    cd frontend
    npm run build
```
**✔️ Step 2:** Start the backend server:
```bash
    cd backend
    npm start
 ```

## Testing

- Run component tests:
 ```bash
    cd frontend
    npm run test:unit
```

- Run end-to-end tests:
```bash
    cd frontend
    npm run test:e2e
 ```

## 🤝 Contributions
If you want to contribute or report issues, feel free to create an issue or submit a pull request.
