import * as noticeRepository from "../data/notice.js";

export async function getNotices(req, res) {
  try {
    const data = await noticeRepository.getNotices();

    res.status(200).json(data);
  } catch (error) {
    throw error;
  }
}