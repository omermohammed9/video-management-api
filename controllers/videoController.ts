import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { uuid } from 'uuidv4';
import ffmpeg from 'fluent-ffmpeg';
import {Video} from "../types/video";

let videos: Video[] = [];

// Upload Video
export const uploadVideo = (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    if (!req.file) {
        return res.status(400).send('No video uploaded.');
    }

    const { title, description } = req.body;
    const videoPath = req.file.path;

    ffmpeg.ffprobe(videoPath, (err, metadata) => {
        if (!req.file) {
            return res.status(400).send('No file uploaded.');
        }

        if (err) {
            return res.status(500).send('Error processing video.');
        }

        const video = {
            id: uuid(),
            title,
            description,
            uploadDate: new Date(),
            fileSize: req.file.size,
            duration: metadata.format.duration,  // Extract video duration
            path: videoPath,
        };

        videos.push(video);
        res.status(201).send({ id: video.id });
    });

};

// Get Video Details
export const getVideoDetails = (req: Request, res: Response) => {
    const video = videos.find(v => v.id === req.params.id);
    if (!video) {
        return res.status(404).send('Video not found.');
    }
    res.send(video);
};

// List Videos
export const listVideos = (req: Request, res: Response) => {
    let filteredVideos = videos;

    const { title, uploadDate, page = 1, limit = 10 } = req.query;
    const limitNumber = parseInt(limit as string);
    const pageNumber = parseInt(page as string);

    if (title) {
        filteredVideos = filteredVideos.filter(v => v.title.includes(title as string));
    }

    if (uploadDate) {
        filteredVideos = filteredVideos.filter(v => new Date(v.uploadDate).toDateString() === new Date(uploadDate as string).toDateString());
    }

    // Pagination logic
    const start = (pageNumber - 1) * limitNumber;
    const end = pageNumber * limitNumber;

    const paginatedVideos = filteredVideos.slice(start, end);
    res.send({
        total: filteredVideos.length,
        page: pageNumber,
        videos: paginatedVideos,
    });
};

// Delete Video
export const deleteVideo = (req: Request, res: Response) => {
    const index = videos.findIndex(v => v.id === req.params.id);
    if (index === -1) {
        return res.status(404).send('Video not found.');
    }
    videos.splice(index, 1);
    res.status(204).send();
};

// Group Videos by Hour
export const groupVideosByHour = (req: Request, res: Response) => {
    type VideoGroups = { [key: string]: Video[] };

    const groupedVideos = videos.reduce(
        (groups: VideoGroups, video: Video) => {
            const hour = new Date(video.uploadDate).getHours();
            const hourKey = `${hour.toString().padStart(2, '0')}:00`;

            if (!groups[hourKey]) {
                groups[hourKey] = [];
            }
            groups[hourKey].push(video);
            return groups;
        },
        {} as VideoGroups
    );

    res.send(groupedVideos);
};
