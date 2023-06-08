import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import {} from 'express-async-errors';
import * as userRepository from '../data/auth.js';
import { config } from '../config.js';

export async function signup(req, res) {
  const { email, password, name, url } = req.body;
  const found = await userRepository.findOne(email);
  if (found) {
    return res.status(409).json({ message: `${email} 이미 가입된 이메일입니다.`});
  }
  const hashed = await bcrypt.hash(password, config.bcrypt.saltRounds);
  const userId = await userRepository.createUser({
    email,
    password: hashed,
    name,
    url,
  });
  const token = createJwtToken(userId);
  res.status(201).json({ token, email });
}

export async function login(req, res) {
  const { email, password } = req.body;
  const user = await userRepository.findOne(email);
  if (!user) {
    return res.status(401).json({ message: '이메일 또는 비밀번호가 일치하지 않습니다.'})
  }
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    return res.status(401).json({ message: '이메일 또는 비밀번호가 일치하지 않습니다.'});
  }
  const token = createJwtToken(user.id);
  res.status(200).json({ token, email });
}

function createJwtToken(id) { 
  return jwt.sign({ id }, config.jwt.secretKey, {
    expiresIn: config.jwt.expiresInSec,
  });
}

export async function me(req, res, next) {
  const user = await userRepository.findById(req.userId);
  if (!user) {
    return res.status(404).json({ message: '회원을 찾을 수 없습니다.'});
  }
  res.status(200).json({ token: req.token, email: user.email, name: user.name, url: user.url });
}