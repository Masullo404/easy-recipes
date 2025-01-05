import GetUser from "./db-user";
import { AuthOptions, Session, User } from "next-auth"
import { JWT } from "next-auth/jwt";
import  CredentialsProvider  from "next-auth/providers/credentials";

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
      async session({ session, token }: { session: any; token: any }) {
        if (token) {
          session.user.id = token.id;
          session.user.email = token.email;
        }
        return session;
      },
    }
}

