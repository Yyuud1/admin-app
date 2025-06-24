"use client";

import React from "react";
import { motion } from "framer-motion";
import StatCard from "@/components/StatCard";
import { Calendar, Hospital, SquareActivity, Users } from "lucide-react";
import PengajuanTable from "@/components/PengajuanTable";

const PengajuanPage = () => {
  return (
    <div className="flex-1 overflow-auto relative z-10">
      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
        <motion.div
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <StatCard name="Cuti Tahunan" icon={Calendar} value="1500" />
          <StatCard name="Cuti Sakit" icon={Hospital} value="150" />
          <StatCard name="Cuti Melahirkan" icon={Users} value="250" />
          <StatCard name="Cuti Penting" icon={SquareActivity} value="95" />
        </motion.div>

        <PengajuanTable />
      </main>
    </div>
  );
};

export default PengajuanPage;
