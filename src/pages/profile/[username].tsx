import { UserContext } from "@/contexts/userContext";
import Layout from "@/layout/Layout";
import { auth } from "@/lib/firebase";
import { NextPage } from "next";
import Head from 'next/head'
import { useRouter } from "next/router";
import { NextResponse } from "next/server";
import { useContext, useEffect } from "react";


const User: NextPage = ()=> {
  const router = useRouter();
  const { user, username } = useContext(UserContext);

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user]);


  function SignOutButton() {
      auth.signOut()
  }


  return (
    <Layout>
      <main className='h-screen w-screen'>
        Profile {user?.uid}
        <button onClick={()=> SignOutButton()}> Sign out</button>
      </main>
    </Layout>
  )
}

export default User;