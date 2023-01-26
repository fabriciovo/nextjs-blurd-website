import Layout from "@/layout/Layout";
import { NextPage } from "next";
import Head from 'next/head'
import { NextResponse } from "next/server";


const User: NextPage = (): JSX.Element => {
  return (
    <Layout>
      <main className='h-screen w-screen'>
        Profile
      </main>
    </Layout>
  )
}

export default User;