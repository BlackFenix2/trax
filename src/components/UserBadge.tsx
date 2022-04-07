import { Menu, MenuButton, Button, MenuList, MenuItem } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { FaChevronDown } from "react-icons/fa";

type Props = {
  name: string;
};

const UserBadge = ({ name }: Props) => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/Signin");
  };
  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<FaChevronDown />}>
        {name}
      </MenuButton>
      <MenuList>
        <MenuItem marginLeft="auto" alignSelf="flex-end" onClick={handleClick}>
          Sign out
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default UserBadge;
