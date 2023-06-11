import Image from "next/image";
import { useSession } from "next-auth/react";
import { OrgTodos } from "~/components/organisms/OrgTodos";
import { isDevelopment } from "~/env.mjs";
import { OrgCreateTodo } from "../organisms/OrgCreateTodo";
import { OrgHeader } from "../organisms/OrgHeader";
import { MolInputText } from "../molecules/MolInputText";
import { OrgStopWatch } from "../organisms/OrgStopWatch";


export function TplIndex() {
    // 認証情報を取得
    // sessionDataには認証済であれば認証情報が、認証されていなければｎullが格納される
    // status という変数には、認証情報の取得状況・済みか否かという情報が格納される
    // loading（認証情報の取得中）, unauthenticated（非認証）, authenticated（認証済み） のいずれかが格納される
    const { data: sessionData, status } = useSession();

    const mountPicture = () => {
        const devPicture = "/images/main-dev.png";
        const prodPicture = "/images/main.png";
        return isDevelopment() ? devPicture : prodPicture;
    }

    return (
        <>
            <div className="bg-gray-four">
                <OrgHeader />
                <div className="min-h-screen  p-0 selection:bg-green-two md:py-24 md:px-8">
                    <main className="mx-auto min-h-screen max-w-none rounded-none bg-gray-four px-5 pt-24 pb-10 outline-none md:max-w-[60rem] md:rounded-2xl md:px-8 md:outline md:outline-4 md:outline-offset-8 md:outline-high-green">

                        {/* status が "loading" でない、つまり認証情報の取得が完了している、
                     かつ、認証されている場合に、下記が表示される */}
                        {status !== "loading" && sessionData && (
                            <>
                                <div className="flex flex-col items-center md:flex-row justify-between md:justify-around">
                                    <OrgCreateTodo />
                                    <OrgStopWatch />
                                </div>
                                <OrgTodos />
                            </>
                        )}
                        {status !== "loading" && !sessionData && (
                            // status が "loading" でない、つまり認証情報の取得が完了している、
                            // かつ、認証されていない場合に、下記が表示されます
                            <>
                                <div className="flex flex-col items-center">
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
                            </>
                        )}
                    </main>
                </div>

            </div>
        </>
    );
}
