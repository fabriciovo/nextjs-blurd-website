import StyledVideo from '@/components/StyledVideo'
import Head from 'next/head'
import Image from 'next/image'

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
        <div className='w-full h-full'>
          <div className='grid xs:grid-cols-1 md:grid-cols-2 gap-4 place-items-center p-20
          '>
            <div className='md:col-span-2'>
              <Image src={'/images/blurd.png'} alt='blurd' width={256} height={256} />
            </div>
            <StyledVideo url='NpEaa2P7qZI' />
            <button>Login</button>
          </div>
        </div>
      </main>
    </>
  )
}
