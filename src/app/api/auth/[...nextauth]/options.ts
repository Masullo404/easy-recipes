import GetUser from "./db-user";
import { AuthOptions, } from "next-auth"
import  CredentialsProvider  from "next-auth/providers/credentials";

declare module "next-auth"{
  interface Session{
    user: {
      id: number; 
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}

export const options:AuthOptions = {
    providers:[
        CredentialsProvider({
            name: "Credentials",
            credentials: {
              email: { label: "Email", type: "text", placeholder: "Seu email" },
              password: { label: "Senha", type: "password", placeholder: "Sua senha" }
            },
           async authorize(credentials){
              
              if (!credentials || credentials === undefined) return null;
      
              const { email, password } = credentials;
              const user = await GetUser(email,password)
              
              if (user) {
                return{
                  id:String(user.id),
                  email:user.email,
                  name:user.name
                }
              } else{
                return null
              }
            
            },
          }),
    ],
    session:{
      strategy: 'jwt',
      maxAge: 30 * 60
    },
    jwt:{
      secret:process.env.JWT_SECRET
    },
    pages:{
        signIn:"/forms/login"
    },
    callbacks:{
      async redirect({baseUrl}) {
          return baseUrl
      },
      async jwt({ token, user }) {
        if (user) {
          token.id = user.id;
          token.email = user.email;
          token.name = user.name;
        } 
        return token;
      },
      async session({ session, token }) {
        if (token && session.user){
          session.user.id = Number(token.id);
          session.user.email = token.email;
        }
        return session;
      },
    }
}

