"use client";
import { Bell, House, Info, Mail, Settings, Users } from "lucide-react";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { color } from "framer-motion";

const ICONS = {
  House,
  Settings,
  Mail,
  Users,
  Bell,
  Info,
};

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [sidebarItems, setSidebarItems] = useState([]);
  const pathname = usePathname();

  useEffect(() => {
    fetch("data/data.json")
      .then((res) => res.json())
      .then((data) => setSidebarItems(data.sidebarItems));
  }, []);

  return (
    <div
      className={`relative z-10 transition-all duration-300 ease-in-out flex-shrink-0 ${
        isSidebarOpen ? "w-64" : "w-20"
      }`}
    >
      <div className="h-full bg-[#fff] backdrop-blur-md p-4 flex flex-col">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 rounded-full text-slate-500 transition-colors max-w-fit cursor-pointer"
        >
          <Menu size={24} />
        </button>

        <nav className="mt-8 flex-grow">
          {sidebarItems.map((item) => {
            const IconComponent = ICONS[item.icon];
            return (
              <Link key={item.name} href={item.href}>
                <div
                  className={`flex items-center p-4 text-sm text-slate-500 font-medium rounded-lg hover:bg-blue-400 hover:text-white transition-colors mb-2 ${
                    pathname === item.href ? "bg-blue-400 text-white" : ""
                  }`}
                >
                  <IconComponent size={20} style={{ minWidth: "20px" }} />
                  {isSidebarOpen && (
                    <span className="ml-4 whitespace-nowrap">{item.name}</span>
                  )}
                </div>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
