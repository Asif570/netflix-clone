import React from "react";

const NavbarItem = ({ label }) => {
  return (
    <div className=" text-white cursor-pointer hover:text-gray-500 transition">
      {label}
    </div>
  );
};

export default NavbarItem;
