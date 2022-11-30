import Head from "next/head";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../utils/firebase";
import { FullScreenNavbar } from "../components/FullScreenNavbar";
import Link from "next/link";

const Error = () => {
    const [user, loading] = useAuthState(auth);
    const route = useRouter();
    useEffect(() => {
        setTimeout(() => {
            return route.push("/");
        }, 3000)
    })
    return (
        <div>
        <Head>
          <title>Confessay</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="apple-touch-icon" sizes="144x144" href="/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          <link rel="manifest" href="/site.webmanifest" />
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
          <meta name="msapplication-TileColor" content="#da532c" />
          <meta name="theme-color" content="#ffffff" />
        </Head>      
        <nav className="py-10 mb-12 flex justify-between items-center px-5">
            <ul className="flex">
            <li>
            <Link href="/" legacyBehavior>
                <button>
                <h1 className="text-2xl md:text-7xl text-cyan-700 font-cormorant font-bold italic tracking-wider">Confessay</h1>
                </button>
            </Link>
            </li>
            </ul>
            <FullScreenNavbar />
        </nav>
            <div className="text-center p-10 mt-10">  
                <h2 className="text-6xl text-center">404</h2>
                <p className="my-1">There is nothing here</p>
                <h3>Bringing you back to the homepage.....</h3>
            </div>
        </div>
    );
}
 
export default Error;
