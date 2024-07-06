import React from "react";
import { Avatar } from "@chakra-ui/react";

const OurAvatar = ({ userName, size = "2xl" }) => {
  return (
    <div>
      <Avatar size={size} name={userName} src="https://bit.ly/broken-link" />
    </div>
  );
};

export default OurAvatar;
