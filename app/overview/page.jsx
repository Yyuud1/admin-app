"use client";

import StatCard from "../../components/StatCard";
import { Calendar, Hospital, SquareActivity, Users } from "lucide-react";
import React from "react";
import { motion } from "framer-motion";
import OverviewChart from "../../components/OverviewChart";
import CategoryDistributionChart from "../../components/CategoryDistributionChart";

const OverviewPage = () => {
  return (
    <div className="flex-1 overflow-auto relative z-10">
      <main className="max-w-7xl mx-auto py-4 px-4 lg:px-8">
        <motion.div
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <StatCard
            name="Cuti Tahunan"
            bgColor="bg-red-400"
            icon={Calendar}
            value="100"
          />
          <StatCard
            name="Cuti Sakit"
            bgColor="bg-blue-400"
            icon={Hospital}
            value="50"
          />
          <StatCard
            name="Cuti Melahirkan"
            bgColor="bg-yellow-400"
            icon={Users}
            value="25"
          />
          <StatCard
            name="Cuti Penting"
            bgColor="bg-green-400"
            icon={SquareActivity}
            value="10"
          />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <OverviewChart />
          <CategoryDistributionChart />
        </div>
      </main>
    </div>
  );
};

export default OverviewPage;
