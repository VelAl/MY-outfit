# 🛒 My Outfit – E-Commerce App (Next.js 15)

**My Outfit** is a training e-commerce app built with **Next.js 15** and deployed on **Vercel**. It includes authentication, payments, admin panel, product management, file uploads, and email integration.

## 🧱 Stack

Next.js 15 · React 19 · TypeScript · Tailwind CSS 4  
Prisma ORM · PostgreSQL (Neon)  
NextAuth.js 5 · React Hook Form · Zod  
Stripe · PayPal · Uploadthing · Resend · shadcn/ui

## 🧪 Features

- Auth (credentials & OAuth)  
- Admin dashboard with analytics  
- Product CRUD & categories  
- Image/file uploads  
- Stripe & PayPal checkout  
- Email notifications  
- Dark mode support  

## 🖼️ Screenshots:
![Screenshot 1](./public/screenshots/Screenshot1.png)
![Screenshot 2](./public/screenshots/Screenshot2.png)
![Screenshot 3](./public/screenshots/Screenshot3.png)
![Screenshot 4](./public/screenshots/Screenshot4.png)
![Screenshot 5](./public/screenshots/Screenshot5.png)

## ⚙️ Setup

```bash
git clone https://github.com/VelAl/MY-outfit.git
cd my-outfit
npm install
cp .env.example .env # set env variables
npx prisma generate
npm run dev
