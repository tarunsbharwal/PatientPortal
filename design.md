# Design Document - Patient Portal Assignment

## 1. Tech Stack Choices

Q1. Frontend Framework: React (Vite)
 Answer: I chose React because it allows me to build a clean interface using reusable components (like the Upload Form and Document List). It updates the UI instantly when data changes (like adding a new file) without reloading the page. Vite was used for faster setup.

Q2. Backend Framework: Node.js with Express
 Answer: Express is lightweight and beginner-friendly. Since I am using JavaScript for the frontend, using Node.js for the backend allows me to use the same language (JavaScript) for the entire project. It handles file uploads easily with the `multer` library.

Q3. Database: MongoDB (Atlas)
 Answer: MongoDB is flexible and works well with JSON data. It allows me to store the file details (name, size, date) easily without needing complex table setups like SQL. I used it because I am more comfortable with the MERN stack (MongoDB, Express, React, Node), so I stuck to what I know best to ensure the code works reliably.

    Q4. Changes for 1,000 Users:
    If this app needed to handle 1,000 users, I would make these changes:
    1.  **Cloud Storage:** Instead of saving files in a local folder on my laptop, I would save them to cloud storage like AWS S3 to handle the space.
    2.  **Pagination:** Right now, the app lists *all* files at once. For 1,000 users, I would modify the API to send only 10 files at a time (pages) so the browser doesn't crash.
    3.  **Authentication:** I would add a login system so users can only see their own files, not everyone else's.

## 2. Architecture Overview

   Simple Data Flow:
   `[User's Browser]` <---> `[Express Server]` <---> `[MongoDB Database]`
                                  |
                                  +---> `[Local "uploads" Folder]`

    1.  Frontend: Collects the PDF file from the user.
    2.  Backend: Checks if it is a PDF, saves the file to the disk, and saves the file info to the database.
    3.  Database: Keeps a record of the file's ID and name.

## 3. API Specification

|     Endpoint          | Method  | Description           | Request           |    Response          |
|`/api/documents/upload`| `POST`  | Uploads a new PDF     | Form Data (`file`)| `200 OK` (File Saved)|
|`/api/documents`       | `GET`   | Gets list of all files| None              | JSON List of files   |
|`/api/documents/:id`   | `GET`   | Downloads a file      | URL ID parameter  | Binary File Download |
|`/api/documents/:id`   | `DELETE`| Deletes a file        | URL ID parameter  | `200 OK` (Deleted)   |

## 4. Data Flow Description

    Q5. Step-by-Step Process:

    When Uploading:
    1.  User selects a file and clicks "Upload".
    2.  React sends the file to the backend.
    3.  The Backend saves the actual PDF file into the `uploads/` folder on the computer.
    4.  Then, it saves the *details* (Name, Size, Date) into MongoDB.
    5.  Success message is sent back to the user.

    When Downloading:
    1.  User clicks the "Download" button.
    2.  React asks the backend for the file using its ID.
    3.  Backend finds the file path from the database.
    4.  Backend sends the file to the browser to be saved.

## 5. Assumptions

**Q6. Assumptions:
 1. Single User: I assumed there is only one user (admin) who can see and delete everything, as no login was required.
 2. Local Storage: As given the assignment asked for a local solution, so files are stored on the server's disk, not the cloud.