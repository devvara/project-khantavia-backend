import { db } from "../db/database.js";

const SELECT_NOTICE = "SELECT * FROM notice";

export async function getNotices() {
  return db
    .execute(SELECT_NOTICE)
    .then((result) => result[0]);
}