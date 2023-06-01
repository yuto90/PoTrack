import Head from "next/head";
import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";
import { CreateTodo } from "~/components/CreateTodo";
import { Todos } from "~/components/Todos";
import { isDevelopment } from "~/env.mjs";

function Home() {
  // 認証情報を取得
  // sessionDataには認証済であれば認証情報が、認証されていなければｎullが格納される
  // status という変数には、認証情報の取得状況・認証済みか否かという情報が格納される
  // loading（認証情報の取得中）, unauthenticated（非認証）, authenticated（認証済み） のいずれかが格納される
  const { data: sessionData, status } = useSession();

  const mountPicture = () => {
    const devPicture = "/images/main-dev.png";
    const prodPicture = "/images/main.png";
    return isDevelopment() ? devPicture : prodPicture;
  }

  return (
    <>
      <Head>
        <title>Todo App</title>
        <meta name="description" content="Full stack todo app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="min-h-screen bg-gray-four p-0 selection:bg-green-two md:py-24 md:px-8">
        <main className="mx-auto min-h-screen max-w-none rounded-none bg-gray-four px-5 pt-24 pb-10 outline-none md:max-w-[60rem] md:rounded-2xl md:px-8 md:outline md:outline-4 md:outline-offset-8 md:outline-high-green">
          <h1 className="mb-6 text-center text-4xl font-bold text-high-green">
            ToDo App
          </h1>
          {status !== "loading" && sessionData && (
            // status が "loading" でない、つまり認証情報の取得が完了している、
            // かつ、認証されている場合に、下記が表示されます
            <>
              <div className="flex flex-col items-center">
                <p className="text-l text-white mb-4 text-center text-high-green">
                  <span>Logged in as {sessionData.user?.name}</span>
                </p>
                <button
                  className="mb-8 inline-flex cursor-pointer items-center justify-center rounded-md py-2 px-4 text-high-green hover:text-gray-four font-semibold bg-gray-four hover:bg-high-green outline outline-2 outline-offset-2 outline-high-green"
                  onClick={() => void signOut()}
                >
                  Sign out
                </button>
              </div>
              <div>
                <CreateTodo />
                <Todos />
              </div>
            </>
          )}
          {status !== "loading" && !sessionData && (
            // status が "loading" でない、つまり認証情報の取得が完了している、
            // かつ、認証されていない場合に、下記が表示されます
            <div className="flex flex-col items-center">
              <button
                className="mb-5 inline-flex cursor-pointer items-center justify-center rounded-md py-2 px-4 text-high-green hover:text-gray-four font-semibold bg-gray-four hover:bg-high-green outline outline-2 outline-offset-2 outline-high-green"
                onClick={() => void signIn()}
              >
                Sign In
              </button>
              <div className="mb-5 text-xl">
                <p className="text-center text-gray-four">
                  Todo App made in T3 Stack
                </p>
              </div>
              <div className="">
                <Image
                  //src="/images/main-img.png"
                  src={mountPicture()}
                  width={400}
                  height={400}
                  alt="main-img"
                />
              </div>
            </div>
          )}
        </main>
      </div>
    </>
  );
}

export default Home;