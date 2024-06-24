import { Link } from "@nextui-org/react";

import { useTheme } from "../context/themeState";

export default function CustomFooter() {
  const { isDarkMode } = useTheme();
  return (
    <footer
      className={`md:grid md:grid-cols-3  flex flex-col items-center justify-center  p-4 text-black ${isDarkMode ? " bg-purple-900" : " bg-purple-300"}`}>
      <div className='flex justify-center'>
        <p className=' font-bold '>CSS Tailwind converter</p>
      </div>
      <div className='flex justify-center md:my-0 my-3'>
        <p className=''>
          <span>Developed by</span>
          <span className=' font-bold'> Jeffrey Rerín</span>
        </p>
      </div>
      <div className='flex justify-center'>
        <Link
          color='secondary'
          href='http://www.jeffrm.com.co'
          isExternal
          showAnchorIcon>
          My Portfolio
        </Link>
      </div>
    </footer>
  );
}
