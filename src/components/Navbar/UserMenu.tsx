import { auth } from "@/firebase/clientApp";
import { Menu } from "@headlessui/react";
import { signOut } from "firebase/auth";
import Link from "next/link";

const UserDropDown: React.FC = () => {
  return (
    <Menu as="div" className="relative">
      <Menu.Button className="flex items-center transition hover:scale-105 opacity-50 hover:opacity-100 active:scale-95 hover:cursor-pointer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-8 h-8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
          />
        </svg>
      </Menu.Button>
      <Menu.Items className="flex flex-col absolute w-36 right-0 mt-1 text-lg z-10 bg-white border-[1px] border-gray-200 rounded-lg">
        {/* <Menu.Item>
          {({ active }) => (
            <Link
              href="/user"
              className="flex items-start m-1 p-1 hover:text-white hover:bg-gray-900 rounded-md transition hover:cursor-pointer"
            >
              Order History
            </Link>
          )}
        </Menu.Item> */}
        <Menu.Item>
          {({ active }) => (
            <button
              className="flex items-start m-1 p-1 hover:text-white hover:bg-gray-900 rounded-md transition hover:cursor-pointer"
              onClick={() => signOut(auth)}
            >
              Log Out
            </button>
          )}
        </Menu.Item>
      </Menu.Items>
    </Menu>
  );
};

export default UserDropDown;
