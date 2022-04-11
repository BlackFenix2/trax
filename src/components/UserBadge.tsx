import { Menu, MenuButton, Button, MenuList, MenuItem } from "@chakra-ui/react";
import React from "react";
import { FaChevronDown } from "react-icons/fa";

type Props = {
  name: string;
};

const UserBadge = ({ name }: Props) => {
  const handleClick = () => {
    // use window vs client route to sign out user since cookie is http-only
    window.location.href = "/api/signout";
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
