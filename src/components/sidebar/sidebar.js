/*eslint-disable*/
import React from "react";
import Link from "next/link";
import { FaBars, FaProductHunt, FaTimes } from "react-icons/fa";
//import NotificationDropdown from "components/Dropdowns/NotificationDropdown.js";
// import UserDropdown from "components/Dropdowns/UserDropdown.js";
import { Menu } from "@headlessui/react";
import { useUser,useLogout } from "utils/auth-provider";

function SidebarInner({ role, isAuthenticated, ...props }) {
  const { mutateAsync: logout, isLoading: isLoadingLogout } = useLogout();

  return (
    <div {...props}>
      <Link
        className={`text-gray-900 text-sm font-semibold leading-relaxed inline-block mr-2 px-2  py-2 whitespace-nowrap`}
        href="/"
      >
        <a>
          <FaProductHunt size={25} />
        </a>
      </Link>

      <form className="mt-6 mb-4 md:hidden">
        <div className="mb-3 pt-0">
          <input
            type="text"
            placeholder="Search"
            className=" px-3 py-2 h-12 border border-solid  border-blueGray-500 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-base leading-snug shadow-none outline-none focus:outline-none w-full font-normal"
          />
        </div>
      </form>
      <hr className="my-4 md:min-w-full" />
      {/* Heading */}
      <h6 className="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
        Pages
      </h6>

      <Link
        className={` text-gray-900 text-sm font-semibold leading-relaxed inline-block mr-2 px-2  py-2 whitespace-nowrap`}
        href="/blogs"
      >
        <a>Blogs</a>
      </Link>
      {!isAuthenticated && (
        <>
          <Link
            className={`text-gray-900 text-sm font-semibold leading-relaxed inline-block mr-2 px-2  py-2 whitespace-nowrap`}
            href="/auth/login"
          >
            <a>Login</a>
          </Link>
          <Link
            className={`text-gray-900 text-sm font-semibold leading-relaxed inline-block mr-2 px-2  py-2 whitespace-nowrap`}
            href="/auth/register"
          >
            <a>Register</a>
          </Link>
        </>
      )}
      {isAuthenticated && (
        <button
          className={`text-gray-900 text-left py-2 text-sm font-semibold leading-relaxed inline-block whitespace-nowrap`}
          onClick={() => logout()}
        >
          Logout
        </button>
      )}
      {role === "admin" && (
        <>
          <hr className="my-4 md:min-w-full" />
          {/* Heading */}
          <h6 className="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
            Admin Pages
          </h6>

          <Link
            className={"text-xs uppercase py-3 font-bold block  "}
            href="/app/admin/dashboard"
          >
            <a>Dashboard</a>
          </Link>

          <Link
            className={"text-xs uppercase py-3 font-bold block "}
            href="/app/admin/settings"
          >
            <a>Settings</a>
          </Link>

          <Link
            className={"text-xs uppercase py-3 font-bold block "}
            href="/app/admin/tables"
          >
            <a>Tables</a>
          </Link>

          <Link
            className={"text-xs uppercase py-3 font-bold block "}
            href="/app/admin/maps"
          >
            <a>Maps</a>
          </Link>
        </>
      )}
    </div>
  );
}

export default function Sidebar() {
  const { data, isSuccess } = useUser();

  return (
    <>
      <nav className="md:left-0  w-full  md:block md:fixed md:hrefp-0 md:bothrefm-0 md:overflow-y-auhref md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl  bg-white flex flex-wrap items-center justify-between relative md:w-44 lg:w-64 lg:min-h-screen  z-10 py-6 ">
        {isSuccess && (
          <div className="lg:flex-col lg:items-stretch md:min-h-full md:flex-nowrap px-3 flex flex-wrap items-center justify-between w-full mx-auhref">
            <SidebarInner
              className="flex-wrap flex-col  hidden md:flex"
              role={data?.role}
              isAuthenticated={!!data}
            />

            <Menu>
              <Menu.Button className="cursor-pointer z-50 absolute right-4 top-2 text-xl bg-gray-700 leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block md:hidden outline-none focus:outline-none">
                <FaBars color="white" />
              </Menu.Button>
              <Menu.Items className="min-h-screen lg:flex lg:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute hrefp-0 md:left-0 left-16 top-4 right-0 z-40 overflow-y-auhref overflow-x-hidden h-auhref items-center flex-1 rounded  bg-white m-2 py-3 px-4">
                <SidebarInner
                  className="flex-wrap flex-col flex"
                  role={data?.role}
                  isAuthenticated={!!data}
                />
              </Menu.Items>
            </Menu>
          </div>
        )}
      </nav>
    </>
  );
}
