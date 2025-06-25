"use client";

import React from "react";
import { motion } from "framer-motion";

const StatCard = ({ name, icon: Icon, value, bgColor }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className={`backdrop-blur-md overflow-hidden rounded-xl ${bgColor}`}
    >
      <div className="px-4 py-5 sm:p-6">
        <span className="flex items-center text-sm font-medium text-gray-50">
          <Icon size={20} className="mr-2" />
          {name}
        </span>
        <p className="mt-1 text-3xl font-semibold text-gray-50">{value}</p>
      </div>
    </motion.div>
  );
};

export default StatCard;
