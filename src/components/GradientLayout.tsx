import React from "react";
import { Flex, Box, Text } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/react";
import UserBadge from "./UserBadge";

type Props = {
  color: string;
  children: React.ReactNode;
  image: string;
  subtitle: string;
  title: string;
  description: string;
  roundImage: boolean;
};

const GradientLayout: React.FunctionComponent<Props> = ({
  color,
  children,
  image,
  subtitle,
  title,
  description,
  roundImage,
}) => {
  return (
    <Box
      height="100%"
      overflowY="auto"
      bgGradient={`linear(${color}.500 0%, ${color}.600 15%, ${color}.700 40%, rgba(0,0,0,0.95) 75%)`}
    >
      <Flex bgColor={`${color}.600`} padding="40px" align="end">
        <Box padding="20px">
          <Image
            boxSize="160px"
            boxShadow="2xl"
            src={image}
            borderRadius={roundImage ? "100%" : "3px"}
          />
        </Box>
        <Box padding="20px" lineHeight="40px" color="white">
          <Text fontSize="sm" fontWeight="bold" casing="uppercase">
            {subtitle}
          </Text>
          <Text fontSize="6xl">{title}</Text>
          <Text fontSize="x-small">{description}</Text>
        </Box>
        <Box marginLeft="auto" alignSelf="start">
          <UserBadge name={title} />
        </Box>
      </Flex>
      <Box paddingY={50}>{children}</Box>
    </Box>
  );
};

export default GradientLayout;
