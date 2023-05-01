import express from 'express';
import 'express-async-errors';
import * as noticeController from '../controller/notice.js';
const router = express.Router();

// GET /notices
router.get('/', noticeController.getNotices);

export default router;