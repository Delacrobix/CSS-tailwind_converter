import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { useGlobalState } from "../context/globalContext";

//TODO: Add switcher to change the title page depending of path
//TODO: hide the button return when the user is in the principal page

export default function NavbarMenu() {
  const { selectedMode } = useGlobalState();
  const navigate = useNavigate();

  function handleMode() {
    if (selectedMode === "ctt") {
      return "CSS to Tailwind";
    } else {
      return "Tailwind to CSS";
    }
  }

  function handleNavigate() {
    navigate("/");
  }

  return (
    <Navbar>
      <NavbarBrand>
        <p className='font-bold text-inherit'>{handleMode()}</p>
      </NavbarBrand>
      <NavbarContent className='hidden sm:flex gap-4' justify='center'>
        <NavbarItem>
          <h2 className=' text-center text-4xl'>Result</h2>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify='end'>
        <NavbarItem>
          <Button
            onClick={handleNavigate}
            color='primary'
            href='#'
            variant='flat'>
            Return
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
