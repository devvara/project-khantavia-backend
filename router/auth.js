import express from 'express';
import {} from 'express-async-errors';
import { body } from 'express-validator';
import { validate } from '../middleware/validator.js';
import * as authController from '../controller/auth.js';
import { isAuth } from '../middleware/auth.js';

const router = express.Router();

const validateCredential = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('유효하지 않은 이메일 형식입니다.'),
  body('password')
    .trim()
    .notEmpty()
    .isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
    .withMessage('비밀번호가 일치하지 않습니다. 영어 대/소문자, 숫자, 특수문자를 혼합하여 8자리 이상으로 작성 해야 합니다.'),
    validate,
];

const validateSignup = [
  ...validateCredential,
  body('name')
    .notEmpty()
    .withMessage('닉네임을 작성해주세요.'),
  body('url')
    .isURL()
    .withMessage('유효하지 않은 URL 주소입니다.')
    .optional({ nullable: true, checkFalsy: true }),
  validate,
]

router.post('/signup', validateSignup, authController.signup);
router.post('/login', validateCredential, authController.login)
router.get('/me', isAuth, authController.me);

export default router;