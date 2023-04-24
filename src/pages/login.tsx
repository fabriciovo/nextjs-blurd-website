import { useRouter } from 'next/router';
import { FormEventHandler, useContext, useEffect, useState } from 'react'
import { auth, authEmailProvider, db } from '../lib/firebase';
import Layout from '@/layout/Layout';
import { UserContext } from '@/contexts/userContext';
import { IGMUsers, IUser } from '@/interface';


export default function Home() {
  const router = useRouter();
  const [newAccount, setNewAccount] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      router.push(`/profile/${user?.uid}`);
    }
  }, [user]);



  const singUp = async () => {
    if (
      email === "" ||
      password === "" ||
      confirmPassword === "" ||
      username === ""
    ) {
      setErrorMessage("All fields must be filled");
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage("password not matched");
      return;
    }
    try {
      const data = await auth.createUserWithEmailAndPassword(email, password);
      const GMdata: IGMUsers = {
        beta_tester: false,
        first_login: false,
        coins: 0,
        total_coins: 0,
        coins_per_second: 0,
        collectables: "{}",
        craft_items: "{}",
        quests: "{}",
        secret_items: "{}",
        shop_items: "{}",
        upgrades: "{}",
      };
      await db.collection('Users').doc(`user: ${data?.user?.uid}`).set(GMdata);
      console.log('User data saved successfully!');
    } catch (error) {
      console.error('Error saving user data: ', error);
    }
  }

  const singIn = async () => {
    auth
      .signInWithEmailAndPassword(email,password)
      .catch((error) => {
        alert(error)
      //  showErrorMessage = true;
      //  errorMessage = error.message;
      })
      .finally(() => {
        //finaly
      });
  }

  const signInSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    singIn();
  }
  const signUpSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    singUp();
  }

  return (
    <Layout>
      <main>
        <div className='md:p-40 p-6'>
          {!newAccount ?
            <>
              <div className="absolute inset-0 bg-[url(/img/grid.svg)] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
              <div className="relative mx-auto w-full max-w-md bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:rounded-xl sm:px-10">
                <div className="text-center">
                  <h1 className="text-3xl font-semibold text-gray-900">Sign in</h1>
                  <p className="mt-2 text-gray-500">Sign in below to access your account</p>
                </div>
                <div className="mt-5">
                <form onSubmit={(e) => signInSubmit(e)}>
                    <div className="relative mt-6">
                      <input type="text" name="email" id="email" placeholder="email" className="peer mt-1 w-full border-b-2 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none" onChange={(e)=> setEmail(e.target.value)}/>
                      <label className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800">Email</label>
                    </div>
                    <div className="relative mt-6">
                      <input type="password" name="password" id="password" placeholder="Password" className="peer peer mt-1 w-full border-b-2 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none" onChange={(e)=> setPassword(e.target.value)} />
                      <label className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800">Password</label>
                    </div>
                    <div className="my-6">
                      <button type="submit" className="w-full rounded-md bg-black px-3 py-4 text-white focus:bg-gray-600 focus:outline-none" value="login">Sign in</button>
                    </div>
                    <p className="text-center text-sm text-gray-500">Don&#x27;t have an account yet? <button onClick={() => { setNewAccount(true) }} className="font-semibold text-gray-600 hover:underline focus:text-gray-800 focus:outline-none">Sign up</button>.</p>
                  </form>
                </div>
              </div>
            </> :
            <>
              <div className="absolute inset-0 bg-[url(/img/grid.svg)] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
              <div className="relative mx-auto w-full max-w-md bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:rounded-xl sm:px-10">
                <div className="text-center">
                  <h1 className="text-3xl font-semibold text-gray-900">Sign Up</h1>
                </div>
                <div className="mt-5">
                  <form onSubmit={(e) => signUpSubmit(e)}>
                    <div className="relative mt-6">
                      <input type="text" name="username" id="username" placeholder="Username" className="peer mt-1 w-full border-b-2 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none" onChange={(e)=> setUsername(e.target.value)} />
                      <label className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800">Username</label>
                    </div>
                    <div className="relative mt-6">
                      <input type="email" name="email" id="email" placeholder="Email Address" className="peer mt-1 w-full border-b-2 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none"  onChange={(e)=> setEmail(e.target.value)}/>
                      <label className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800">Email Address</label>
                    </div>
                    <div className="relative mt-6">
                      <input type="password" name="password" id="password" placeholder="Password" className="peer peer mt-1 w-full border-b-2 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none" onChange={(e)=> setPassword(e.target.value)}/>
                      <label className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800">Password</label>
                    </div>
                    <div className="relative mt-6">
                      <input type="password" name="confirmPassword" id="confirmPassword" placeholder="Confirm Password" className="peer peer mt-1 w-full border-b-2 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none" onChange={(e)=> setConfirmPassword(e.target.value)}/>
                      <label className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800">Confirm Password</label>
                    </div>
                    <div className="my-6">
                      <button type="submit" className="w-full rounded-md bg-black px-3 py-4 text-white focus:bg-gray-600 focus:outline-none">Sign up</button>
                    </div>
                    <p className="text-center text-sm text-gray-500">Already have an account? <button onClick={() => { setNewAccount(false) }} className="font-semibold text-gray-600 hover:underline focus:text-gray-800 focus:outline-none">Sign in</button>.</p>
                  </form>
                </div>
              </div>
            </>
          }
        </div>
      </main>
    </Layout>
  )
}
