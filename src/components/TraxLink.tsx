import { Link } from "@chakra-ui/layout";
import NextLink from "next/link";
import React from "react";

import type { ColorProps } from "@chakra-ui/styled-system";

type Props = {
  href: string;
  color: ColorProps["color"];
};

const TraxLink: React.FunctionComponent<Props> = (props) => {
  const { href, color, children } = props;
  return (
    <NextLink href={href} passHref>
      <Link color={color} href={href}>
        {children}
      </Link>
    </NextLink>
  );
};

export default TraxLink;
