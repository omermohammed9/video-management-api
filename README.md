# Video Management API

## Overview

This project is a **Video Management API** developed using **Node.js** and **TypeScript**. The API allows users to:

- Upload videos and store metadata.
- Retrieve details of specific videos.
- List all uploaded videos with filtering and pagination options.
- Delete videos by their unique ID.
- Group videos by the hour they were uploaded.

This API is designed to serve as a foundational backend service for an OTT (Over-The-Top) platform.

---

## Table of Contents

- [Features](#features)
  - [Mandatory Features](#mandatory-features)
  - [Bonus Features](#bonus-features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Project](#running-the-project)
- [API Documentation](#api-documentation)
  - [1. Upload Video](#1-upload-video)
  - [2. Get Video Details](#2-get-video-details)
  - [3. List Videos](#3-list-videos)
  - [4. Delete Video](#4-delete-video)
  - [5. Group Videos by Hour](#5-group-videos-by-hour)
- [Assumptions](#assumptions)
- [Project Structure](#project-structure)
- [Reasoning Behind Approach](#reasoning-behind-approach)
- [Challenges and Solutions](#challenges-and-solutions)
- [Future Improvements](#future-improvements)
- [Dependencies](#dependencies)
- [Contact](#contact)

---

## Features

### Mandatory Features

1. **Video Upload Endpoint**
   - Upload video files.
   - Store video metadata (title, description, upload date, file size) in an in-memory data structure.
   - Assign a unique ID to each uploaded video.

2. **Get Video Details Endpoint**
   - Retrieve details of a specific video using its unique ID.
   - Return video metadata in the response.

3. **List Videos Endpoint**
   - List all uploaded videos.
   - Support filtering by title or upload date via query parameters.

4. **Delete Video Endpoint**
   - Delete a video by its unique ID.
   - Remove the video from the in-memory data structure.

### Bonus Features

1. **Pagination**
   - Implement pagination for the list videos endpoint.
   - Return a limited number of videos per page.

2. **Video Duration**
   - Extract and store the duration of the uploaded video using `ffmpeg`.

3. **Input Validation**
   - Implement input validation for all endpoints.
   - Ensure required fields are provided and valid.

4. **Custom Grouping Endpoint**
   - Group videos by the hour they were uploaded.
   - Return an object where each key is the hour and the value is an array of videos uploaded in that hour.

---

## Getting Started

### Prerequisites

- **Node.js** (version 14 or higher)
- **npm** (version 6 or higher)
- **ffmpeg** installed and accessible in your system's PATH.

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/video-management-api.git
   cd video-management-api

2. **Install dependencies**
   ```bash
   npm install
3. **Running the Project**
   ```bash
   npm run dev

# Video Management API

## Overview

This API provides endpoints to upload, manage, and retrieve metadata about videos. It is designed to serve as part of an OTT (Over-The-Top) platform backend.

---

## Table of Contents

- [Base URL](#base-url)
- [API Endpoints](#api-endpoints)
  1. [Upload Video](#1-upload-video)
  2. [Get Video Details](#2-get-video-details)
  3. [List Videos](#3-list-videos)
  4. [Delete Video](#4-delete-video)
  5. [Group Videos by Hour](#5-group-videos-by-hour)
- [Example Requests](#example-requests)

---

## Base URL

All endpoints are prefixed with `/api/videos`.

---

## API Endpoints

### 1. Upload Video

- **Endpoint**: `POST /api/videos/upload`
- **Description**: Uploads a video file and stores its metadata.
- **Headers**: 
  - `Content-Type: multipart/form-data`
- **Body Parameters**:
  - `video` (file, required): The video file to upload.
  - `title` (string, required): The title of the video.
  - `description` (string, optional): A description of the video.
- **Response**:
  - **Success (201 Created)**:
    ```json
    {
      "id": "unique-video-id"
    }
    ```
  - **Error (400 Bad Request)**:
    ```json
    {
      "errors": [
        {
          "msg": "Title is required",
          "param": "title",
          "location": "body"
        }
      ]
    }
    ```

### 2. Get Video Details

- **Endpoint**: `GET /api/videos/:id`
- **Description**: Retrieves metadata for a video by its unique ID.
- **Response**:
  - **Success (200 OK)**:
    ```json
    {
      "id": "unique-video-id",
      "title": "Sample Video",
      "description": "This is a sample video.",
      "uploadDate": "2024-09-18T12:34:56.789Z",
      "fileSize": 12345678,
      "duration": 120.5,
      "path": "uploads/unique-video-id.mp4"
    }
    ```
  - **Error (404 Not Found)**:
    ```json
    {
      "error": "Video not found."
    }
    ```

### 3. List Videos

- **Endpoint**: `GET /api/videos`
- **Description**: Lists uploaded videos with optional filtering and pagination.
- **Query Parameters**:
  - `title` (string, optional): Filter videos by title.
  - `uploadDate` (string, optional): Filter videos by upload date (ISO8601 format).
  - `page` (integer, optional): Page number (default: 1).
  - `limit` (integer, optional): Number of videos per page (default: 10).
- **Response**:
  - **Success (200 OK)**:
    ```json
    {
      "total": 50,
      "page": 1,
      "totalPages": 5,
      "videos": [
        {
          "id": "unique-video-id",
          "title": "Sample Video",
          "description": "This is a sample video.",
          "uploadDate": "2024-09-18T12:34:56.789Z",
          "fileSize": 12345678,
          "duration": 120.5,
          "path": "uploads/unique-video-id.mp4"
        }
      ]
    }
    ```
  - **Error (400 Bad Request)**:
    ```json
    {
      "errors": [
        {
          "msg": "Page must be a positive integer",
          "param": "page",
          "location": "query"
        }
      ]
    }
    ```

### 4. Delete Video

- **Endpoint**: `DELETE /api/videos/:id`
- **Description**: Deletes a video by its unique ID.
- **Response**:
  - **Success (204 No Content)**: No body content.
  - **Error (404 Not Found)**:
    ```json
    {
      "error": "Video not found."
    }
    ```

### 5. Group Videos by Hour

- **Endpoint**: `GET /api/videos/grouped`
- **Description**: Groups videos by the hour they were uploaded.
- **Response**:
  - **Success (200 OK)**:
    ```json
    {
      "08:00": [
        {
          "id": "video-id-1",
          "title": "Morning News",
          "description": "Latest updates.",
          "uploadDate": "2024-09-18T08:15:00.000Z",
          "fileSize": 12345678,
          "duration": 180,
          "path": "uploads/video-id-1.mp4"
        }
      ],
      "09:00": [
        {
          "id": "video-id-2",
          "title": "Daily Briefing",
          "description": "Market analysis.",
          "uploadDate": "2024-09-18T09:30:00.000Z",
          "fileSize": 23456789,
          "duration": 240,
          "path": "uploads/video-id-2.mp4"
        }
      ]
    }
    ```

---

## Project Structure

The following is the directory structure of the **Video Management API** project:


---

### Directory & File Overview

- **`node_modules/`**: Contains all npm dependencies and modules used in the project. This folder is automatically generated when running `npm install`.

- **`uploads/`**: This folder stores all uploaded video files. It is dynamically populated when video files are uploaded via the API.

- **`src/`**:
  - **`controllers/`**: Contains the logic for handling requests and responses. Specifically, `videoController.ts` manages all video-related endpoints, such as uploading, retrieving, listing, deleting, and grouping videos.
  - **`routes/`**: Defines the API routes for the video management functionality. The `videoRoutes.ts` file maps URL endpoints to the respective controller functions.
  - **`models/`**: Contains TypeScript interfaces and data models used throughout the application. The `video.ts` file defines the structure of the video data used in the project.
  - **`app.ts`**: The central application configuration file, setting up middlewares, routes, and other configurations.
  - **`server.ts`**: Responsible for starting the Express server and listening for incoming requests.

- **`types/`**: This folder holds custom type definitions for third-party libraries or modules. The `fluent-ffmpeg.d.ts` file provides TypeScript definitions for the `fluent-ffmpeg` package, which doesn't have built-in type definitions.

- **`.gitignore`**: Specifies files and directories (such as `node_modules/` and `uploads/`) that should not be included in the version control (Git).

- **`package.json`**: The project manifest that contains the metadata of the project, including dependencies, scripts, and version information.

- **`tsconfig.json`**: The TypeScript configuration file that sets up compiler options and project settings for TypeScript.

- **`README.md`**: This file, providing an overview and documentation for the project.

---

### Important Notes

- **`uploads/` Directory**: Make sure to create this directory if it doesn't exist, as it is required to store uploaded video files.
- **TypeScript Configuration**: The project uses TypeScript (`tsconfig.json`) to ensure type safety and efficient development. Make sure TypeScript is properly installed and configured in your environment.
- **Custom Types**: The `types/` folder is used to manage custom type definitions, particularly for packages that lack built-in types, like `fluent-ffmpeg`.

---

This structure ensures that the project is organized, modular, and easy to maintain. Each directory and file has a clear responsibility, which makes it easy to navigate and extend the project.


# Video Management API

## Reasoning Behind Approach

The design and implementation of the **Video Management API** follow several key principles to ensure functionality, maintainability, and simplicity. Below is a breakdown of the decisions made during development:

### 1. Video Upload Handling

To handle video uploads, the **Multer** middleware was used. Multer facilitates file uploads in Express by handling `multipart/form-data` forms, which are necessary when submitting files via HTTP requests. This middleware efficiently parses incoming form data, making it easy to manage file uploads.

- **Why Multer?**: Multer simplifies file handling by directly storing the uploaded files on the server and making them available in the request object. It ensures smooth integration with Express, minimizing the complexity of dealing with large files in Node.js applications.

### 2. Metadata Extraction

The **fluent-ffmpeg** library was integrated to extract video metadata, such as duration and format details. Extracting this data enriches the information stored about each uploaded video, enabling the API to provide detailed video metadata when requested.

- **Why fluent-ffmpeg?**: Fluent-ffmpeg is a Node.js wrapper around FFmpeg, a powerful media processing tool. It allows the extraction of video metadata and processing with ease, making it a perfect fit for handling video-related tasks in this project.

### 3. In-Memory Storage

For simplicity and demonstration purposes, an in-memory array was chosen to store video metadata. While this approach is not suitable for production environments, it serves the project’s educational purpose well by avoiding external databases and keeping the setup minimal.

- **Why In-Memory Storage?**: Using an in-memory array allows for rapid prototyping and testing without requiring additional infrastructure like databases. This approach keeps the project lightweight and easy to manage, especially in small-scale applications or learning environments.

### 4. TypeScript for Type Safety

The project was developed using **TypeScript** to ensure type safety and minimize runtime errors. By defining interfaces like `Video`, the codebase can maintain a consistent structure for data, providing better code validation during development.

- **Why TypeScript?**: TypeScript offers strong typing, making the code more predictable and easier to debug. It also helps in maintaining large-scale applications by providing better tooling, such as autocomplete and inline documentation. Defining interfaces enforces strict data contracts, improving the overall quality of the code.

### 5. Input Validation

To ensure data integrity and prevent invalid input, **express-validator** was implemented for input validation. This middleware ensures that required fields, such as video titles, are provided and correctly formatted before processing the request.

- **Why express-validator?**: Express-validator provides an easy way to define validation rules and automatically checks incoming requests for compliance. It helps prevent incorrect or malicious data from entering the system, reducing the chances of errors and improving security.

---

## Challenges and Solutions

During the development of the **Video Management API**, several challenges were encountered. Below is a summary of those challenges and the corresponding solutions implemented to resolve them.

### 1. Missing Type Definitions for fluent-ffmpeg

- **Challenge**: TypeScript could not find type definitions for the `fluent-ffmpeg` package, which resulted in errors when trying to use it within the project.
- **Solution**: To resolve this, a custom type declaration file was created under the `types/` directory. The file `types/fluent-ffmpeg.d.ts` contains the necessary type definitions to allow TypeScript to correctly understand and compile the code using `fluent-ffmpeg`.

### 2. UUID Deprecation

- **Challenge**: The `uuidv4` package, previously used for generating unique identifiers, became deprecated.
- **Solution**: The project was updated to use the new `uuid` package, which is actively maintained. The import syntax was also updated to reflect the latest API, using `import { v4 as uuidv4 } from 'uuid';`.

### 3. Type Errors in Grouping Function

- **Challenge**: A TypeScript error occurred when trying to index an object with a string key in the `reduce` function. This issue arose when attempting to group videos by the hour of upload.
- **Solution**: The solution was to explicitly define the type of the accumulator in the `reduce` function. By declaring that the accumulator was an object with string keys and array values, TypeScript could infer the correct types, resolving the error.

### 4. Input Validation

- **Challenge**: Input validation was necessary to ensure that all incoming data, such as query parameters and request bodies, adhered to the required formats. Without validation, the API could be vulnerable to incorrect or malicious inputs.
- **Solution**: The **express-validator** middleware was implemented to define and enforce input validation rules across the API. This ensured that required fields were provided and that all inputs met the necessary criteria before being processed by the application.

---

