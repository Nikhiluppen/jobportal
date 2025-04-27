// server.js
import 'dotenv/config';
import express from 'express';
import session from 'express-session';
import cors from 'cors';
import bodyParser from 'body-parser';
import bcrypt from 'bcryptjs';

import { PrismaClient } from '@prisma/client';
import { Auth } from '@auth/core';
import CredentialsProvider from '@auth/core/providers/credentials';
import { expressAuth } from '@auth/express';
import { PrismaAdapter } from '@auth/prisma-adapter';

const prisma = new PrismaClient();
const app = express();

// 1️⃣ CORS & Body Parsing & Session
app.use(
  cors({ origin: 'http://localhost:3000', credentials: true })
);
app.use(bodyParser.json());
app.use(
  session({
    secret: process.env.AUTH_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

// 2️⃣ Mount Auth.js for signin/signout/session
app.use(
  '/auth',
  expressAuth(
    Auth({
      adapter: PrismaAdapter(prisma),
      providers: [
        CredentialsProvider({
          name: 'Credentials',
          credentials: {
            email: { label: 'Email', type: 'email' },
            password: { label: 'Password', type: 'password' },
          },
          async authorize({ email, password }) {
            const user = await prisma.user.findUnique({ where: { email } });
            if (user && (await bcrypt.compare(password, user.hashedPassword))) {
              return { id: user.id, name: user.name, email: user.email };
            }
            return null;
          },
        }),
      ],
      session: { strategy: 'jwt' },
      secret: process.env.AUTH_SECRET,
      callbacks: {
        async jwt({ token, user }) {
          if (user) {
            token.id = user.id;
            token.name = user.name;
            token.email = user.email;
          }
          return token;
        },
        async session({ session, token }) {
          session.user = {
            id: token.id,
            name: token.name,
            email: token.email,
          };
          return session;
        },
      },
    })
  )
);

// 3️⃣ Custom Sign-Up Endpoint (no req.login)
app.post('/auth/signup', async (req, res) => {
  const { name, email, password } = req.body;

  // Prevent duplicate emails
  if (await prisma.user.findUnique({ where: { email } })) {
    return res.status(400).json({ message: 'Email already in use' });
  }

  // Hash & create
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { name, email, hashedPassword },
  });

  return res
    .status(201)
    .json({ message: 'Account created', user: { id: user.id, name, email } });
});

// 4️⃣ Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Auth server listening on http://localhost:${PORT}`)
);
