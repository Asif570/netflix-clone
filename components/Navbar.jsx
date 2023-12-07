import React, { useEffect, useState } from "react";
import NavbarItem from "./NavbarItem";
import { BsChevronDown, BsBell, BsSearch } from "react-icons/bs";
import MobileMenu from "./MobileMenu";
import AccountMenu from "./AccountMenu";
import useCurrentUser from "@/hooks/useCurrentUser";

const TOP_OFFSET = 66;
const Navbar = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const [showAccountMenu, setshowAccountMenu] = useState(false);

  const [showBackground, setshowBackground] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= TOP_OFFSET) {
        c;
        setshowBackground(true);
      } else {
        setshowBackground(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const toggleMenuHundler = () => {
    setShowMobileMenu((cur) => !cur);
  };

  const toggleAccountMenuHundler = () => {
    setshowAccountMenu((cur) => !cur);
  };
  const { currentUser } = useCurrentUser();
  return (
    <div className=" w-full  fixed z-40">
      <div
        className={`duration-500 py-6 h-full   flex px-4 md:px-16 flex-row items-center transition ${
          showBackground ? "bg-zinc-900 bg-opacity-90" : ""
        }`}
      >
        <img className="h-4 lg:h-7" src="/images/logo.png" alt="logo" />
        <div className="flex-row ml-8 gap-7 hidden lg:flex">
          <NavbarItem label={"Home"} />
          <NavbarItem label={"Series"} /> <NavbarItem label={"Films"} />{" "}
          <NavbarItem label={"New & Populer"} />
          <NavbarItem label={"My List"} />
          <NavbarItem label={"Browse by Langauses"} />
        </div>
        <div
          onClick={toggleMenuHundler}
          className="flex-row lg:hidden relative flex items-center gap-2 ml-8 cursor-pointer"
        >
          <p className="text-white text-sm">Brows</p>
          <BsChevronDown
            size={18}
            className={` text-white transition ${
              showMobileMenu ? "rotate-180" : "rotate-0"
            }`}
          />
          <MobileMenu visible={showMobileMenu} />
        </div>
        <div className="flex flex-row ml-auto gap-7 items-center">
          <div className="text-gray-200 cursor-pointer hover:text-gray-300">
            <BsSearch />
          </div>
          <div className="text-gray-200 cursor-pointer hover:text-gray-300">
            <BsBell />
          </div>
          <div
            onClick={toggleAccountMenuHundler}
            className="flex flex-row gap-3 items-center cursor-pointer relative"
          >
            <div className="w-6 h-6 lg:w-10 lg:h-10 rounded-md overflow-hidden">
              <img
                src={currentUser?.image || "/images/Netflix-avatar.png"}
                alt="avarta"
              />
            </div>

            <BsChevronDown
              size={18}
              className={` text-white transition ${
                showAccountMenu ? "rotate-180" : "rotate-0"
              }`}
            />
            <AccountMenu visible={showAccountMenu} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
