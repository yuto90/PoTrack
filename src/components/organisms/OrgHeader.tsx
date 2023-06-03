import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";

// @todo anyをなんとかする
//export const OrgHeader: React.FC<any> = ({ sessionData, status }) => {
export const OrgHeader: React.FC = () => {
    const { data: sessionData, status } = useSession();
    return (
        <>
            <div className="flex items-center justify-between text-center mx-auto max-w-none rounded-none bg-gray-four px-5 outline-none md:max-w-full md:rounded-2xl md:px-8 md:outline md:outline-4 md:outline-offset-8 md:outline-high-green">
                {/* </main><div className="flex items-center justify-between"> */}
                <h1 className="m-4 text-4xl font-bold text-high-green">
                    PoTrack
                </h1>
                <div className="flex gap-5">
                    <p
                        className="py-2 px-4 text-high-green font-semibold  ">
                        {sessionData?.user?.name}
                    </p>
                    {/* ログイン中 */}
                    {status !== "loading" && sessionData && (
                        <button
                            className="inline-flex cursor-pointer items-center justify-center rounded-md py-2 px-4 text-high-green hover:text-gray-four font-semibold bg-gray-four hover:bg-high-green outline outline-2 outline-offset-2 outline-high-green"
                            onClick={() => void signOut()}
                        >
                            Sign out
                        </button>
                    )}
                    {/* 未ログイン */}
                    {status !== "loading" && !sessionData && (
                        <button
                            className="inline-flex cursor-pointer items-center justify-center rounded-md py-2 px-4 text-high-green hover:text-gray-four font-semibold bg-gray-four hover:bg-high-green outline outline-2 outline-offset-2 outline-high-green"
                            onClick={() => void signIn()}
                        >
                            Sign In
                        </button>
                    )}
                </div>
            </div >
        </>
    );
}