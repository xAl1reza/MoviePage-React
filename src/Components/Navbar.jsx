import { NavLink } from "react-router-dom";
import SwitchTheme from "./SwitchThemeBtn";
import SwitchThemeMobile from "./SwitchThemeBtnMobile.jsx";
import { useState } from "react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);
  const closeNav = () => {
    setIsOpen(false);
  };

  return (
    <>
      <nav className="bg-white border-gray-200 dark:bg-purple-950 border-b">
        <div className="max-w-(--breakpoint-xl) flex flex-wrap items-center justify-between mx-auto p-4">
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Alireza
            </span>
          <button
            onClick={toggleMenu}
            className="text-black dark:text-white inline-block md:hidden"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
          <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-transparent dark:border-transparent">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive ? "nav-link--active" : "nav-link"
                  }
                  aria-current="page"
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/movies"
                  className={({ isActive }) =>
                    isActive ? "nav-link--active" : "nav-link"
                  }
                >
                  Movies
                </NavLink>
              </li>
            </ul>
          </div>
          <SwitchTheme />
        </div>
      </nav>
      {/* Nav Mobile */}
      <nav
        className={`${
          isOpen ? "left-0" : "-left-[274px]"
        } z-30 md:hidden transition-all fixed top-0 h-screen w-[180px] bg-slate-950`}
      >
        <div
          onClick={closeNav}
          className="flex items-center justify-end mt-6 mr-3 cursor-pointer"
        >
          <svg
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6 text-red-600"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </div>
        <div className="flex justify-center mt-8">
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
              Alireza
            </span>
        </div>
        <div className="mt-6">
          <SwitchThemeMobile />
        </div>
        <ul className="flex flex-col items-center mt-36 h-full text-xl">
          <li>
            <NavLink
              onClick={closeNav}
              to="/"
              className={({ isActive }) =>
                isActive ? "nav-link--active" : "nav-link--mobile"
              }
              aria-current="page"
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              onClick={closeNav}
              to="/movies"
              className={({ isActive }) =>
                isActive ? "nav-link--active" : "nav-link--mobile"
              }
            >
              Movies
            </NavLink>
          </li>
        </ul>
      </nav>
      <div
        onClick={closeNav}
        className={`${
          isOpen ? "block" : "hidden"
        } fixed top-0 left-0 bottom-0 right-0 bg-black/40 z-20`}
      ></div>
    </>
  );
}

export default Navbar;
