# Patient Portal Assignment

This is a simple full-stack application where users can upload, view, and manage their medical documents (PDFs).

## Project Overview
* **Frontend:** Built with React and Vite. It allows users to select a PDF and see the list of files.
* **Backend:** Built with Node.js and Express. It saves files to the local `uploads/` folder.
* **Database:** MongoDB is used to store the file names and details.

## How to Run Locally

### 1. Setup Backend
1. Open a terminal and go to the backend folder:
   `cd backend`
2. Install the necessary libraries:
   `npm install`
3. Create a `.env` file in the backend folder and add your database link:
   `PORT=5000`
   `MONGO_URI=your_mongodb_connection_string`
4. Start the server:
   `node server.js`

### 2. Setup Frontend
1. Open a new terminal and go to the frontend folder:
   `cd frontend/portal`
2. Install the libraries:
   `npm install`
3. Run the app:
   `npm run dev`
4. Open the link shown (usually http://localhost:5173).

## API Examples

**1. Upload a File (POST)**
* URL: `http://localhost:5000/api/documents/upload`
* Method: `POST`
* Body: Form Data with key `file`.

**2. List Files (GET)**
* URL: `http://localhost:5000/api/documents`
* Method: `GET`

**3. Download File (GET)**
* URL: `http://localhost:5000/api/documents/:id`
* Method: `GET`
