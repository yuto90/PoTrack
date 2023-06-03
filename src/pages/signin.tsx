import type { InferGetServerSidePropsType } from "next";
import { getProviders, signIn } from "next-auth/react";
import Image from "next/image";
import TplSignIn from "~/components/templates/TplSignin";

export default function SignIn({
    // ここで providers の 型を定義しています
    providers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return (
        <>
            <TplSignIn providers={providers} />
        </>
    );
}

export async function getServerSideProps() {
    // ここで、認証の方法（providers）を取得しています
    // 今回は、GitHub による認証だけですが、複数の認証方法（Google・Twitterなど）を取得することが出来ます
    // 一つも認証方法が取得できなかった場合は、providers に空の配列をセットしています
    const providers = await getProviders();

    return {
        props: { providers: providers ?? [] },
    };
}