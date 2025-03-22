🫂 WE Barbearia

Welcome to the WE Barbearia repository! 🏨✨

A web application designed to facilitate appointment management and client authentication in a modern barbershop. This project focuses on usability, security, and scalability, utilizing technologies such as Next.js, Prisma, and Tailwind CSS.

🚀 Deployment

The project is ready for deployment on Vercel or other platforms.

🔗 Deployment Link: [https://system-barber-queue.vercel.app]

🚀 Overview

The WE Barbearia allows clients to register, log in, and access an authenticated area. The system uses authentication based on JWT stored in secure cookies, ensuring a smooth and protected experience.

📌 Future features include:

Service booking 🗓️

Profile management 👤

Admin panel for barbers ✂️

🔥 Current Features

✅ User Registration: Sign-up with name, phone, email (optional), and password.✅ Flexible Login: Log in with email or phone, automatically identified by the system.✅ Secure Authentication: JWT stored in HttpOnly cookies.✅ Smart Redirection: Authenticated users are redirected to the main area automatically.✅ Visual Feedback: Informative toasts and loading animations.

🛠️ Technologies Used

🔹 Next.js 14 – SSR, SSG, and API routes.🔹 TypeScript – Static typing for more robust code.🔹 Prisma – ORM for database management.🔹 bcryptjs – Password encryption.🔹 jsonwebtoken – JWT generation and validation.🔹 Tailwind CSS – Fast and responsive styling.🔹 shadcn/ui – Modern UI components.🔹 Sonner – Elegant and interactive toasts.🔹 React Hook Form + Zod – Form validation.

💁️ Project Structure

we-barbearia/
├── app/
│   ├── (pages)/
│   │   ├── auth/
│   │   │   ├── login/
│   │   │   │   └── page.tsx         # Login page
│   │   │   └── register/
│   │   │       └── page.tsx         # Registration page
│   │   └── main/
│   │       └── page.tsx             # Main authenticated page
│   ├── api/
│   │   ├── auth/
│   │   │   ├── login/
│   │   │   │   └── route.ts         # Login API
│   │   │   ├── logout/
│   │   │   │   └── route.ts         # Logout API
│   │   │   ├── me/
│   │   │   │   └── route.ts         # API to check current user
│   │   │   └── register/
│   │   │       └── route.ts         # Registration API
│   ├── _components/
│   │   └── inputAuth.tsx            # Reusable input component
│   ├── layout.tsx                   # Global layout with AuthProvider and Toaster
│   └── page.tsx                     # Welcome page (/)
├── lib/
│   ├── AuthContext.tsx              # Authentication context
│   ├── prisma.ts                    # Prisma configuration
│   └── utils.ts                      # Utility functions
├── prisma/
│   └── schema.prisma                # Database schema
├── public/                          # Static files
├── .env                             # Environment variables
├── package.json                     # Dependencies and scripts
└── README.md                        # This file

🔒 Detailed Functionality

🔑 Authentication

1️⃣ Registration: Sign-up with validation via Zod.2️⃣ Login: Automatic identification via email or phone.3️⃣ Persistent Session: HttpOnly cookies protect JWT.4️⃣ Logout: Removes JWT and clears the user's session.

📝 Pages

📌 Welcome Page (/): Initial message and redirection.📌 Main Page (/main): Displays authenticated user information.📌 Register/Login (/auth/register and /auth/login): Dynamic and secure forms.

⚡ Installation and Setup

🎯 Prerequisites

Node.js (v18+)

PostgreSQL database

Git

🛠️ Steps to Run Locally

1️⃣ Clone the repository:

git clone https://github.com/your-username/we-barbearia.git
cd we-barbearia

2️⃣ Install dependencies:

npm install

3️⃣ Configure the environment (.env):

DATABASE_URL="your-database-url"
JWT_SECRET="your-secret-key"

4️⃣ Sync the database:

npx prisma db push

5️⃣ Start the server:

npm run dev

🔗 Open http://localhost:3000 in your browser.

📌 Next Steps

🗓️ Service booking📊 Admin panel for barbers🎨 UI/UX improvements🔄 Refresh Tokens for more secure sessions

🤝 Contribution

💡 Suggestions and improvements are welcome!📩 To contribute, open an issue or pull request.👥 Let's build something amazing together! 🏨✨

📜 License

🔒 This project is open-source! Feel free to explore and contribute! 🚀

© Ruan Carlos