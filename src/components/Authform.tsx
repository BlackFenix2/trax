import {
  Box,
  Flex,
  Input,
  Button,
  Text,
  LinkBox,
  LinkOverlay,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import NextImage from "next/image";
import NextLink from "next/link";
import { auth } from "../lib/mutations";

type Props = {
  mode: "signin" | "signup";
};
const AuthForm: React.FunctionComponent<Props> = ({ mode }) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    await auth(mode, {
      email,
      password,
    });
    setIsLoading(false);
    router.push("/");
  };

  return (
    <Box height="100vh" width="100vw" bg="black" color="white">
      <Flex
        justify="center"
        align="center"
        height="100px"
        borderBottom="1px white solid"
      >
        <NextImage src="/logo.svg" height={60} width={120} />
      </Flex>
      <Flex justify="center" align="center" height="calc(100vh - 100px)">
        <Box padding="50px" bg="gray.900" borderRadius="6px">
          <form onSubmit={handleSubmit}>
            <Input
              placeholder="email"
              type="email"
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
            <Input
              placeholder="password"
              type="password"
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
            <Button
              type="submit"
              bg="green.500"
              isLoading={isLoading}
              sx={{
                "&:hover": {
                  bg: "green.300",
                },
              }}
            >
              {mode}
            </Button>
            {mode === "signin" ? (
              <LinkBox>
                <NextLink href="/Signup" passHref>
                  <LinkOverlay>
                    <Text>Don&apos;t have an account? Sign Up</Text>
                  </LinkOverlay>
                </NextLink>
              </LinkBox>
            ) : (
              <LinkBox>
                <NextLink href="/Signin" passHref>
                  <LinkOverlay>
                    <Text>Already have an account? Sign In</Text>
                  </LinkOverlay>
                </NextLink>
              </LinkBox>
            )}
          </form>
        </Box>
      </Flex>
    </Box>
  );
};

export default AuthForm;
