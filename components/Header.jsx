import React from "react";
import Image from "next/image";
import user from "../public/images/user.png";
import { Bell } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-[#ffffff] shadow-sm mx-4 sm:mx-6 lg:mx-8 mt-4 mb-2 rounded-lg ">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 flex items-center justify-between">
        <h1 className="text-lg sm:text-xl lg:text-2xl font-semibold text-slate-500">
          Admin
        </h1>

        <div className="flex items-center space-x-3 sm:space-x-6">
          <div className="relative">
            <Bell className="w-5 sm:w-6 h-5 sm:h-6 text-slate-500 cursor-pointer hover:text-white" />
          </div>

          <div className="flex items-center space-x-2 sm:space-x-3">
            <Image
              src={user}
              alt="user-image"
              width={25}
              height={18}
              className="rounded-full shadow-md cursor-pointer"
            />

            <span className="hidden sm:block text-slate-500 font-medium">
              Yuda
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
