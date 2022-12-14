import Head from "next/head";
import Message from "../components/Message";
import { useEffect, useState } from "react";
import { db, auth } from "../utils/firebase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import Link from "next/link";
import { useAuthState } from "react-firebase-hooks/auth";
import { FullScreenNavbar } from "../components/FullScreenNavbar";


const Home = () => {
  // Create a state with all the posts
  const [allPosts, setAllPosts] = useState([]);
  const [isPending, setIsPending] = useState(true);
  const [user, loading] = useAuthState(auth);

  const getPosts = async () => {
    const collectionRef = collection(db, "posts");
    const q = query(collectionRef, orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setAllPosts(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
    return unsubscribe;
  };

  useEffect(() => {
    getPosts()
      .then(() => {
        setIsPending(false);
      })
  }, []);

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
      
      <div className="my-10 md:p-5">
        <h2 className="md:text-4xl text-3xl text-center font-medium font-semibold text-cyan-700">All Confessions</h2>
        { isPending && <h3 className="text-xl text-center pt-3 text-gray-800 font-medium">Loading.....</h3> }
        { allPosts.map((post) => (
          <Link href={{ pathname: `/${post.id}`, query: { ...post } }} >
            <div className="font-medium">
            <Message key={post.id} {...post}>
                <button className="font-medium font-sm text-teal-600">
                  {post.comments?.length > 0 ? post.comments?.length : 0} comments
                </button>
            </Message>
            </div>
          </Link>
        )) }
      </div>

    </div>
  );
}

export default Home;
