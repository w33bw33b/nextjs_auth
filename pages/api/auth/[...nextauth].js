import NextAuth from "next-auth"
import CredentialProvider from "next-auth/providers/credentials"

export default NextAuth({
  // Configure one or more authentication providers
//   providers: [
//     GithubProvider({
//       clientId: process.env.GITHUB_ID,
//       clientSecret: process.env.GITHUB_SECRET,
//     }),
//     // ...add more providers here
//   ],
    providers: [
        CredentialProvider({
            name:"credentials",
            credentials:{
                username: {label:"Phone",type:"number",placeholder:"0800000000"},
                password: {label:"Password",type:"password"},

            },
            authorize: (credentials) => {
                if(credentials.username === "0885632172" && 
                credentials.password === "123")
                {
                    return {
                        id:2,
                        name:"test",
                        credit:9999.99,
                    }
                }
                console.log("login failed");
                return null
                
            }
        })
      ],
      callbacks:{
          jwt: async( token,user)=>{
              if(user){
                  token.name = user.name
                  token.user = user
              }
              console.log(token)
              return token;
          },
          session:(session,token)=>{
              if(token){
                  session.name = token.name
                  session.data = token.user
              }
              console.log(session)
              return session;
          }
      },
      
      debug: true,
      secret: process.env.AUTH_SECRET,
      jwt : {
          secret: process.env.JWT_SECRET,
      }
   
//   secret: process.env.AUTH_SECRET,
//   jwt : {
//       secret: process.env.JWT_SECRET,
//   }
})