# 🛍️ Product Management App

A modern **Product Management Dashboard** built with **Next.js 15**, **React 19**, **Tailwind CSS v4**, **Redux Toolkit**, and **Zod** for schema validation.
It allows users to **create**, **edit**, **view**, and **delete** products with a clean and responsive UI.

---

## 🔗 Live Demo

[View Live App](https://product-management-app-nextjs.vercel.app/)

## 📂 GitHub Repository

[GitHub Repo](https://github.com/abdullaalfahad/product-management-app)

---

## 🚀 Features

* ✨ Next.js 15 (App Router + Turbopack)
* ⚛️ React 19 with modern hooks
* 🎨 Tailwind CSS v4 styling
* 🧠 Global state management via Redux Toolkit
* ✅ Zod-based validation with React Hook Form
* 🪣 Image upload via **ImageKit**
* 🍪 Secure token handling using **js-cookie**
* 🔔 Beautiful toasts via **react-hot-toast**
* 🧹 Biome JS for linting and formatting

---

## 📦 Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/abdullaalfahad/product-management-app.git
cd product-management-app
npm install
```

---

## ⚙️ Environment Variables

Create a `.env.local` file in the root of your project and add the following:

```bash
NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY=public_Rcrq0mEF8hCpP8ST/KroqB413uM=
IMAGEKIT_PRIVATE_KEY=private_2mNNNQIw28dBFo6V3zmvSPU7Yxw=
```

> ⚠️ **Note:** Replace these example values with your actual **ImageKit credentials** from your ImageKit dashboard. Never commit real keys to public repositories.

---

## 🧩 Scripts

| Command          | Description                           |
| ---------------- | ------------------------------------- |
| `pnpm run dev`    | Run development server with Turbopack |
| `pnpm run build`  | Build the production app              |
| `pnpm start`      | Start the production server           |
| `pnpm run lint`   | Run Biome JS for linting              |
| `pnpm run format` | Format code using Biome JS            |

---

## 📋 Usage

1. Run the development server:

```bash
npm run dev
```

2. Open [http://localhost:3000](http://localhost:3000) in your browser.
3. Log in and manage products: create, edit, delete, and filter by category.
4. Upload product images using ImageKit drag-and-drop uploader.

---

## 📝 License

This project is **private** and intended for personal use.

---

## Author

**Abdulla Al Fahad**
[GitHub](https://github.com/abdullaalfahad)
[Live Demo](https://product-management-app-nextjs.vercel.app/)
