## About Easy Recipes
<p>Easy Recipes is a personal project designed to simplify the process of finding and creating recipes. <br>
It allows users to explore, organize, and share culinary ideas through an intuitive and tag-based interface.</p>

## Used Tools
<p>For the development of Easy Recipes many technologies were used, however the main ones are:</p>

1. **NextJs, Version: 14.2.20**
2. **Typescript, Version: 5+**
3. **Prisma (ORM), Version: 6.0.1**
4. **Postgres (DATABASE)**
5. **Next-auth for authentication, Version: 4.24.11**
6. **Bootstrap, Version:5.3.3**
7. **React-Bootstrap, Version:2.10.6**



## Installing the project locally
First of all, in order to install all the dependencies you must clone the repository by typing the command:

> git clone https://github.com/Masullo404/easy-recipes

After it access the project folder with the command:

> cd ./easy-recipes

Finally, in the project folder, use the command:

>npm install
<hr>
However, that's not all, to have the project running perfectly in your machine you must declare 
some local variables in the .env and .env.local.

### Environment Variables

To ensure the project works correctly, you need to create the following files in the root folder (`easy-recipes`):

#### **`.env`**
In the `.env` file declare the variable `DATABASE_URL` which represents your database URL.

#### **`.env.local`**
In the `.env.local` file declare the variables:
1. NEXTAUTH_URL="your_local_host" Replace with your localhost or production URL e.g http://localhost:3000
2. JWT_SECRET="your_secret_jwt_key" Replace it with your customized JWT secret key.
3. NEXTAUTH_SECRET="your_secret_authentication_key" Replace it with your secret authentication key. You can create it by typing `openssl rand -base64 32` in your terminal.

For the last, if you want to run the application, run the command
> npm run build (for production)
>
> npm run dev (for development)
