import Head from "next/head";
import AuthForm from "src/components/Authform";

const Signup = () => {
  return (
    <>
      <Head>
        <title>Sign up</title>
      </Head>
      <AuthForm mode="signup" />
    </>
  );
};

export default Signup;
