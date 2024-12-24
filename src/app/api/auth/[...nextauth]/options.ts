import GetUser from "./db-user";
import { AuthOptions } from "next-auth"
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
                  password:user.password,
                  name:user.name
                }
              } else{
                return null
              }
            
            },
          }),
    ],
    pages:{
        signIn:"/forms/login"
    },
    callbacks:{
      async redirect({baseUrl}) {
          return baseUrl
      },
    }
}

