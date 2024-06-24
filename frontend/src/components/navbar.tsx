import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import { useNavigate, useLocation } from "react-router-dom";

import { useGlobalState } from "../context/globalContext";
import SwitchTheme from "./switchTheme";
import { useTheme } from "../context/themeState";

interface NavbarMenuProps {
  title: string;
}

export default function NavbarMenu({ title }: Readonly<NavbarMenuProps>) {
  const { selectedMode } = useGlobalState();
  const navigate = useNavigate();
  const location = useLocation();
  const { isDarkMode } = useTheme();

  const [mode, setMode] = React.useState<string>("");

  React.useEffect(() => {
    if (selectedMode === "ctt") {
      document.title = "CSS to Tailwind";
      setMode("CSS to Tailwind");
    } else {
      document.title = "Tailwind to CSS";
      setMode("Tailwind to CSS");
    }
  }, [selectedMode]);

  function handleShowReturnButton() {
    if (location.pathname === "/result") return true;

    return false;
  }

  function handleNavigate() {
    navigate("/");
  }

  return (
    <Navbar
      className={`text-black ${isDarkMode ? " bg-slate-400 " : " bg-blue-200"}`}>
      <NavbarBrand>
        <p className='font-bold text-inherit'>{mode}</p>
      </NavbarBrand>
      <NavbarContent className='hidden sm:flex gap-4' justify='center'>
        <NavbarItem>
          <h1 className=' text-center text-3xl'>{title}</h1>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify='end'>
        {handleShowReturnButton() && (
          <NavbarItem>
            <button
              className=' bg-transparent text-blue-800'
              onClick={handleNavigate}>
              Return
            </button>
          </NavbarItem>
        )}
        <div className='-mr-6 py-6'>
          <NavbarItem>
            <SwitchTheme />
          </NavbarItem>
        </div>
      </NavbarContent>
    </Navbar>
  );
}
