// src/auth.js
import axios from 'axios';

export const client = axios.create({
  baseURL: 'http://localhost:5000',
  withCredentials: true,    // send cookies for session auth
});

export function signUp(data) {
  // { name, email, password }
  return client.post('/auth/signup', data).then(res => res.data);
}

export function signIn(data) {
  // { email, password }
  return client.post('/auth/signin', data).then(res => res.data);
}

export function signOut() {
  return client.post('/auth/signout').then(res => res.data);
}

export function getMe() {
  return client.get('/auth/me').then(res => res.data);
}
