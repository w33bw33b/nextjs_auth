import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { signIn,signOut,useSession } from "next-auth/client"

export default function Home() {
  const [session] = useSession();
  console.log("session",session)
  return (
    <>
    <head>
      <title>Auth demo</title>
    </head>
    <nav>
      { !session ? (
          <button onClick={()=>signIn("credential")}>Login Connect</button>
        ) : (
          <>
          <span>{session.user.name}</span>
          <button onClick={signOut}>Sign Out</button> 
          </>
        )
      }
    </nav>
    </>
  )
}
