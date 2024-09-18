import { Router } from 'express';
import { uploadVideo, getVideoDetails, listVideos, deleteVideo, groupVideosByHour } from '../controllers/videoController';
import multer from 'multer';
import { body } from 'express-validator';

const router = Router();
const upload = multer({ dest: 'uploads/' });

// Video Upload Route
router.post(
    '/upload',
    upload.single('video'),
    body('title').notEmpty().withMessage('Title is required'),
    body('description').optional().isString(),
    uploadVideo
);

// Get Video Details by ID
router.get('/:id', getVideoDetails);

// List Videos
router.get('/', listVideos);

// Delete Video by ID
router.delete('/:id', deleteVideo);

// Group Videos by Upload Hour
router.get('/grouped', groupVideosByHour);

export default router;
