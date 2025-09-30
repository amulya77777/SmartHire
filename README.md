# Job Portal

Job Portal is a **MERN Stack** based web application designed to streamline the employment process. It allows users to choose their role as either an **applicant** or **recruiter**, and create an account. The app provides persistent login sessions and secures REST APIs using **JWT token verification**.

Once logged in:
- A recruiter can post job openings, shortlist, or reject applications.
- An applicant can view available jobs with various filters, apply for jobs, and manage their applications.

Additionally, users can upload, view, and edit profiles and resumes, making this platform an **all-in-one solution** for job application management.

## Features
- User role selection: Applicant or Recruiter
- Secure user authentication and authorization using JWT
- Persistent login sessions
- Recruiters can post job requirements and manage applications
- Applicants can view, filter, and apply for jobs
- Profile and resume management for both applicants and recruiters

## Prerequisites

Make sure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (v14 or above)
- [MongoDB](https://www.mongodb.com/) (Running on your system or MongoDB Atlas)

## How to Use

### Backend Setup
1. **Install Node.js and MongoDB** on your PC if not already installed.
2. **Start the MongoDB server**:
    - If running locally, use the command:
      ```bash
      mongod
      ```
    - If using MongoDB Atlas, make sure to update the connection URI in your backend `.env` file.
3. Navigate into the backend directory:
    ```bash
    cd backend
    ```
4. Install backend dependencies:
    ```bash
    npm install
    ```
5. Start the backend server:
    ```bash
    npm start
    ```
    The backend server will start on [http://localhost:4444](http://localhost:3000).

### Frontend Setup
1. Navigate into the frontend directory:
    ```bash
    cd frontend
    ```
2. Install frontend dependencies:
    ```bash
    npm install
    ```
3. Start the frontend server:
    ```bash
    npm start
    ```
    The frontend server will run on [http://localhost:3000](http://localhost:5173).

## Usage

1. Open your browser and navigate to [http://localhost:3000](http://localhost:5173).
2. Sign up as either an applicant or recruiter based on your preference.
3. If you are a recruiter, you can create job postings and manage applications.
4. If you are an applicant, you can view jobs, apply for positions, and manage your applications.

## Project Structure

```bash
JOB_PORTAL
│
├── backend
│   ├── controllers
│   ├── middlewares
│   ├── models
│   ├── routes
│   ├── utils
│   └── .env 
│
├── frontend
│   ├── public
│   ├── src
│   │   ├── components
│   │   ├── hooks
│   │   ├── redux
│   │   ├── utils
│   └── .env 
│
├── README.md 
└── package.json
