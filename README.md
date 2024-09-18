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


