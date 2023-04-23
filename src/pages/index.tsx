import StyledVideo from '@/components/StyledVideo'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <Head>
        <title>Blurd Website</title>
        <meta name="description" content="description" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className='h-screen w-screen'>
        <h1 className='text-9xl'>home page</h1>
        <Link href={"/login"}>Login </Link>
      </main>
    </>
  )
}
