/*eslint-disable*/
import React from "react";
import Link from "next/link";

// components
import { Menu } from "@headlessui/react";
import { FaBars, FaProductHunt } from "react-icons/fa";
import { useLogout } from "utils/auth-provider";
import CircleLoader from "components/circle-loader";
import { useSession } from "next-auth/react";

function NavbarInner({ user, isAuthenticated, ...props }) {
  const { mutateAsync: logout, isLoading: isLoadingLogout } = useLogout();
  
  return (
    <div {...props}>
   
        <Link
          className={`text-gray-900 text-sm font-semibold leading-relaxed inline-block mr-2 px-2  py-2 whitespace-nowrap`}
          href="/app/admin/dashboard"
        >
          <a>Dashboard</a>
        </Link>
   

      <Link
        className={`text-gray-900 text-sm font-semibold leading-relaxed inline-block mr-2 px-2  py-2 whitespace-nowrap`}
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
        <>
          <Link
            className={`text-gray-900 text-sm font-semibold leading-relaxed inline-block mr-2 px-2  py-2 whitespace-nowrap`}
            href="/app/user/chat"
          >
            <a>Chat</a>
          </Link>
          <button
            className={`text-gray-900 text-sm font-semibold leading-relaxed inline-block whitespace-nowrap`}
            onClick={() => logout()}
          >
            Logout
          </button>
        </>
      )}
    </div>
  );
}

export default function Navbar() {

  const { data, status } = useSession();

  return (
    <>
      <nav className="top-0 bg-white  z-50 shadow-md w-full flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg">
        {status==='authenticated' | status=='unauthenticated' ? (
          <div className="container px-4 mx-auto flex flex-wrap  justify-between">
            <Link
              className="text-gray-900 text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase"
              href="/"
            >
              <a>
                <FaProductHunt size={25} />
              </a>
            </Link>
            <div className="w-full relative hidden lg:flex justify-between lg:w-auto lg:static  lg:justify-start">
              <NavbarInner
                className="flex gap-5"
                user={data}
                isAuthenticated={!!data}
              />
            </div>
            <Menu>
              <Menu.Button className="cursor-pointer absolute right-4 top-2 text-xl bg-gray-700 leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none">
                <FaBars color="white" />
              </Menu.Button>
              <Menu.Items className="lg:hidden flex-col flex mt-12 lg:mt-3  lg:flex-row list-none ml-auto">
                <NavbarInner
                  className="flex flex-col"
                  user={data}
                  isAuthenticated={!!data}
                />
              </Menu.Items>
            </Menu>
          </div>
        ) : (
          <CircleLoader className="ml-auto"/>
        )}
      </nav>
    </>
  );
}
