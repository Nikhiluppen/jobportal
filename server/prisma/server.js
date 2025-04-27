// server/server.js
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

// 1. CORS, JSON, Sessions
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(bodyParser.json());
app.use(session({
  secret: process.env.AUTH_SECRET,
  resave: false,
  saveUninitialized: false,
}));

// 2. CUSTOM SIGNUP (must come *before* expressAuth on /auth)
app.post('/auth/signup', async (req, res, next) => {
  console.log('🔥 Received signup:', req.body);
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name/email/password required' });
    }
    if (await prisma.user.findUnique({ where: { email } })) {
      return res.status(400).json({ message: 'Email already in use' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { name, email, hashedPassword },
    });
    console.log('✅ Created user:', user);
    return res
      .status(201)
      .json({ message: 'Account created', user: { id: user.id, name, email } });
  } catch (err) {
    console.error('❌ Signup error:', err);
    next(err);
  }
});

// 3. Auth.js middleware for signin/signout/session
app.use('/auth', expressAuth(
  Auth({
    adapter: PrismaAdapter(prisma),
    providers: [
      CredentialsProvider({
        name: 'Credentials',
        credentials: {
          email:    { label: 'Email',    type: 'email'    },
          password: { label: 'Password', type: 'password' },
        },
        async authorize({ email, password }) {
          const user = await prisma.user.findUnique({ where: { email } });
          if (user && await bcrypt.compare(password, user.hashedPassword)) {
            return { id: user.id, name: user.name, email: user.email };
          }
          return null;
        }
      })
    ],
    session: { strategy: 'jwt' },
    secret: process.env.AUTH_SECRET,
    callbacks: {
      async jwt({ token, user }) {
        if (user) token = { ...token, id: user.id, name: user.name, email: user.email };
        return token;
      },
      async session({ session, token }) {
        session.user = { id: token.id, name: token.name, email: token.email };
        return session;
      }
    }
  })
));

// 4. Global error handler (for safety)
app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message || 'Internal error' });
});

// 5. Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Auth server running on http://localhost:${PORT}`));
