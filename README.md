## Shadesmar

Due to the rise in temperature from climate change, we are creating an app that guides users to having a fun and enjoyable outdoor experience through a shade map and a leveling/achievement system for user guidance.

[Shadesmar](https://two800-202610-dtc03.onrender.com/) is a web-app built to guiide outdoors fun.

## Table of Contents

- [About](#-about)
- [Technologies used](#-technologies-used)
- [File Contents](#-file-contents)
- [How to Run](#-how-to-run)
- [Features](#-features)
- [Credits and References](#-credits-and-references)
- [License](#-license)
- [Contacts](#%EF%B8%8F-contacts)

## 🚀 About

Team: DTC-03

Team Members:

- Alex Lu (2E)
- Andy Guo (1E)
- Harlan Bullock (2E)
- Gurkaren Boyal (2E)
- Gustavo Rodriguez (2E)

## ✨ Technologies used

We learned that using APIs and external libraries can speed up development significantly, but integration and compatibility issues can create unexpected challenges. Learning new tools while we built the project was difficult, but we learned to utilize the documentation and AI resources to assist with creation and bug-fixes.

### Frontend

- React
- Vite
- Typescript

### Backend/Database

- Express
- Mongodb

### API

- Google Maps API was used t build a functional dynamic 2d map with seeded activities
- OpenWeather API was used to track weather andtemperature of activity locations
- Gemini was used to provide activities based on user given prompts

## ✨ File Contents

```
root/
├── backend/
│   ├── node_modules/
│   ├── src/
│   │   ├── config/
│   │   │   └── ... (helmet, session config)
│   │   ├── controllers/
│   │   │   └── ... (activity, auth, user journey controllers)
│   │   ├── middleware/
│   │   │   └── ... (admin and auth middleware)
│   │   ├── models/
│   │   │   └── ... (activity, user, user journey, preferences models)
│   │   ├── routes/
│   │   │   └── ... (activity, ai, auth, user journey routes)
│   │   ├── services/
│   │   │   └── ... (gemini service)
│   │   └── utils/
│   │       └── ... (auth, conversions, database, debug utilities)
│   ├── constants.js
│   ├── server.js
│   ├── .env
│   └── package.json
├── shadesmar/ # frontend
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   └── ... (Custom React components)
│   │   ├── contexts/
│   │   │   └── ... (Components/functions for global states)
│   │   ├── Pages/
│   │   │   └── ...
│   │   ├── utils/
│   │   │   └── ... (gemini, shadesmar_api, weather utilities)
│   │   ├── App.css
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   ├── README.md
│   └── ... (config files)
├── .env
├── .gitignore
└── README.md
```

## 📝 How to Run

To run the app, follow these steps:

```shell
# Open a terminal (Command Prompt or PowerShell for Windows, Terminal for macOS or Linux)

# Ensure Git is installed
# Visit https://git-scm.com to download and install console Git if not already installed

# Clone the repository
git clone https://github.com/gboyal-bm/2800-202610-DTC03.git

# Navigate to the project directory
cd 2800-202610-DTC03

# install the requred packages
cd shadesmar && npm install
cd ../backend && npm install

# create and fill a .env file in the root of backend wiith the following
NODE_ENV=development
PORT=3000

# Generate a random token
SESSION_SECRET=

# Full uri of a mongodb cluster
MONGO_URI=


# Run server using
# From root
cd backend && npm run test
# OR
cd backend && node src/server.js

# run frontend using
cd shadesmar && npm run dev

```

## 📚 Features

**Moderation tools**

- Admin Dashboard: The command center where organizers track activtity requests, monitor users, and update seasonal challenges.

- Activities Request: A portal where users submit new trails or hidden gems. Once approved via the dashboard, these locations become live for the community.

**Exploration tools**

- Activities Map: An interactive GPS map used to discover nearby trails, filter by difficulty, and find hidden checkpoints.

- AI Chatbot: A pocket guide that answers instant questions, like recommending a dog-friendly hike or identifying local wildlife.

- Level Progression: A system where users earn XP for miles hiked or peaks climbed, leveling up their profile from "Wanderer" to "Expert."

- Achievement Badge: Digital medals awarded for specific milestones (e.g., Early Bird for sunrise hikes) to keep motivation high.

## 🤝 Credits and References

It was a great oppurtunity to have

A huge thank you to our instructors [Tag Instructor 1] and [Tag Instructor 2] for their incredible insights on [mention 1-2 specific topics you learned].

## 🗨️ Contacts

For more details about our products, services, or any general information regarding Shadesmar, feel free to reach out to us. We are here to provide support and answer any questions you may have. Below are the best ways to contact our teams:

**Email**: Send us your inquiries or support requests at [example@email.com](mailto:example@email.com).[Back to top](#top)
