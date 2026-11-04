# LunaScope — Lunar South Pole Explorer

LunaScope is an interactive web application designed to explore the Moon's south pole, focusing on lunar terrain, permanently shadowed regions, and potential water-ice deposits.

The platform brings together information about scientifically significant lunar locations and research findings, making lunar exploration more accessible and organized.

## Features

- **Lunar Location Explorer:** Explore important locations in the lunar south pole, including Shackleton Crater.
- **Water Ice Exploration:** Learn about Permanently Shadowed Regions (PSRs) and their potential water-ice deposits.
- **Search and Filtering:** Find relevant lunar locations and information.
- **Location Details:** Access dedicated pages containing information about lunar regions and references to NASA resources.
- **User Authentication:** Registration and login functionality.
- **My Library:** Save and access study resources and bookmarks.

## Tech Stack

| Layer | Technologies |
|---|---|
| Frontend | React.js, Vite |
| Backend | Node.js, Express.js |
| Database / ODM | MongoDB, Mongoose |
| Languages | JavaScript, HTML, CSS |
| Version Control | Git, GitHub |
| Deployment | Vercel (Frontend), Render (Backend) |

## Project Structure

```text
LunaScope/
│
├── public/
├── src/
│   ├── components/
│   │   └── MyLibrary.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Shackleton.jsx
│   │   └── WaterIce.jsx
│   └── ...
│
├── server/
│   ├── routes/
│   │   ├── auth.js
│   │   ├── bookmarks.js
│   │   ├── locations.js
│   │   └── StudyResource.js
│   ├── server.js
│   └── package.json
│
├── package.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js and npm
- MongoDB (local installation or a configured MongoDB connection)

### 1. Clone the Repository

```bash
git clone https://github.com/aditi-avni/LunaScope.git
cd LunaScope
```

### 2. Set Up the Frontend

Install the dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend will be available at the local URL displayed by Vite, usually:

```text
http://localhost:5173
```

### 3. Set Up the Backend

Open another terminal:

```bash
cd server
npm install
```

Create a `.env` file inside the `server` directory:

```env
MONGO_URI=mongodb://127.0.0.1:27017/lunascope
PORT=3000
```

Start the backend:

```bash
node server.js
```

The backend will run on port 3000 unless another port is configured.

## API Endpoints

| Endpoint | Description |
|---|---|
| `/api/locations` | Lunar location data |
| `/api/auth` | User authentication |
| `/api/bookmarks` | Bookmark management |
| `/api/study-resources` | Study resource management |

## Deployment

LunaScope uses separate deployment services:

- **Frontend:** Vercel
- **Backend:** Render

The frontend communicates with the Express backend through API requests.

**Database Configuration:** MongoDB must be configured for database-dependent functionality, including authentication and persistent storage. The backend can start without a database connection, but these features require a working MongoDB connection.

## Project Objective

LunaScope aims to make lunar south pole exploration more accessible by organizing information about scientifically significant regions, potential water-ice resources, and relevant research references into an interactive platform.

## Author

**Aditi Kumari**

B.Tech — Computer Science and Engineering

[GitHub](https://github.com/aditi-avni)

---

*Exploring the Moon, one region at a time.*
