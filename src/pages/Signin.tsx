import Head from "next/head";
import AuthForm from "src/components/Authform";

const Signin = () => {
  return (
    <>
      <Head>
        <title>Sign in</title>
      </Head>
      <AuthForm mode="signin" />
    </>
  );
};

export default Signin;
