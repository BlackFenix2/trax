import {
  Box,
  Flex,
  Input,
  Button,
  Text,
  Alert,
  AlertIcon,
  Stack,
  Heading,
  Center,
  Icon,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import NextImage from "next/image";
import { MdAccountCircle } from "react-icons/md";
import { auth } from "../lib/mutations";
import TraxLink from "./TraxLink";

type Props = {
  mode: "signin" | "signup";
};
const AuthForm: React.FunctionComponent<Props> = ({ mode }) => {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirm, setConfirm] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<boolean>(false);
  const [errorMessage, setErrorMessage] = React.useState<string>("");

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // user is signing up
    if (mode === "signup") {
      setIsLoading(true);
      if (password !== confirm) {
        setError(true);
        setErrorMessage("Passwords do not match");
        setIsLoading(false);
        return;
      }
      try {
        const test = await auth(mode, {
          firstName,
          lastName,
          email,
          password,
        });
        if (test.error) {
          throw new Error(test.error);
        }
        setIsLoading(false);
        router.push("/");
      } catch (err) {
        setIsLoading(false);
        setError(true);
        setErrorMessage((err as Error).message);
      }
    }
    // user is signing in
    else {
      setIsLoading(true);
      try {
        const test = await auth(mode, {
          email,
          password,
        });
        if (test.error) {
          throw new Error(test.error);
        }

        setIsLoading(false);
        router.push("/");
      } catch (err) {
        setIsLoading(false);
        setError(true);
        setErrorMessage((err as Error).message);
      }
    }
  };

  const resetAlert = () => {
    setError(false);
    setErrorMessage("");
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
        {/* fixed width to prevent alert component from re-sizing container */}
        <Box padding="50px" bg="gray.900" borderRadius="6px" minWidth="405px">
          <form onSubmit={handleSubmit}>
            <Stack>
              <Center>
                <Icon boxSize="12" as={MdAccountCircle} />
              </Center>

              {mode === "signin" ? (
                <>
                  <Center>
                    <Heading>Log in</Heading>
                  </Center>
                  <Text>
                    Don&apos;t have an account?{" "}
                    <TraxLink href="/Signup" color="teal.500">
                      Sign Up
                    </TraxLink>
                  </Text>
                </>
              ) : (
                <>
                  <Center>
                    <Heading>Create an account</Heading>
                  </Center>
                  <Text>
                    Already have an account?{" "}
                    <TraxLink href="/Signin" color="teal.500">
                      Sign In
                    </TraxLink>
                  </Text>
                </>
              )}
              <Alert
                status="error"
                color="black"
                borderRadius="6px"
                visibility={error ? "visible" : "hidden"}
              >
                <AlertIcon />
                {errorMessage}
              </Alert>
              {mode === "signup" && (
                <>
                  <Input
                    placeholder="First Name"
                    type="text"
                    onChange={(event) => {
                      setFirstName(event.target.value);
                    }}
                  />
                  <Input
                    placeholder="Last Name"
                    type="text"
                    onChange={(event) => {
                      setLastName(event.target.value);
                    }}
                  />
                </>
              )}
              <Input
                isRequired
                placeholder="Email"
                type="email"
                onChange={(event) => {
                  setEmail(event.target.value);
                  resetAlert();
                }}
              />
              <Input
                isRequired
                placeholder="Password"
                type="password"
                onChange={(event) => {
                  setPassword(event.target.value);
                  resetAlert();
                }}
              />

              {mode === "signup" && (
                <Input
                  placeholder="Confirm password"
                  type="password"
                  onChange={(event) => {
                    setConfirm(event.target.value);
                    resetAlert();
                  }}
                />
              )}

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
                {mode === "signin" ? "Log in" : "Create account"}
              </Button>
            </Stack>
          </form>
        </Box>
      </Flex>
    </Box>
  );
};

export default AuthForm;
