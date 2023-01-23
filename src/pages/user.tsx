import { NextPage } from "next";
import { useSession } from "next-auth/react";
import Head from 'next/head'
import { NextResponse } from "next/server";


const User: NextPage = (): JSX.Element => {
  const { status, data } = useSession();
  return (
    <>
      <Head>
        <title>Blurd Website | Profile</title>
        <meta name="description" content="description" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className='h-screen w-screen'>
        Profile
        {JSON.stringify(data?.user, null, 2)}
      </main>
    </>
  )
}

export default User;