import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import { useNavigate, useLocation } from "react-router-dom";
import { useGlobalState } from "../context/globalContext";

interface NavbarMenuProps {
  title: string;
}

export default function NavbarMenu({ title }: Readonly<NavbarMenuProps>) {
  const { selectedMode } = useGlobalState();
  const navigate = useNavigate();
  const location = useLocation();

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
    <Navbar>
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
              className=' bg-transparent text-blue-500'
              onClick={handleNavigate}>
              Return
            </button>
          </NavbarItem>
        )}
      </NavbarContent>
    </Navbar>
  );
}
