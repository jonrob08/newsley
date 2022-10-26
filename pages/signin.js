import { Router } from "express";
import { getCsrfToken, getProviders, signIn, getSession } from "next-auth/react"
import { useState } from "react";

export default function SignIn({ csrfToken }) {
    const [email, setEmail]=useState('')
    const [password, setPassword]=useState('')
    const [message, setMessage]=useState(null)

    const signinUser = async (e) => {
        e.preventDefault();
        let options = { redirect:false,email,password }
        const res = await signIn("credentials",options)
        setMessage(null)
        if (res?.error){
            setMessage(res.error)
        }
        return Router.push("/")
        // console.log(email,password)
    }
  return (
    <>
        <form method="post" action="/api/auth/callback/credentials">
        <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
        <label>
            Email
            <input name="email" type="email" id="email" />
        </label>
        <label>
            Password
            <input name="password" type="password" id="password" />
        </label>
        <button type="submit">Sign in</button>
        </form>
        <form action="">
        <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
        <label>
            Email
            <input name="email" type="email" id="email" value={email} onChange={e=>setEmail(e.target.value)}/>
        </label>
        <label>
            Password
            <input name="password" type="password" id="password" value={password} onChange={e=>setPassword(e.target.value)}/>
        </label>
        <p style={{color:'red'}}>{message}</p>
        <button type="submit" onClick={(e)=> signinUser(e)}>Sign in with credentials</button>
        </form>
    </>

  )
}

export async function getServerSideProps(context) {
    const { req } = context;
    const session = await getSession({ req })
    if(session) {
        // Signed in
        return {
            redirect: { destination: "/" }
        }
    }
  return {
    props: {
        lkejhf: true
        new feature
      csrfToken: await getCsrfToken(context),
      providers: await getProviders()
    },
  }
}