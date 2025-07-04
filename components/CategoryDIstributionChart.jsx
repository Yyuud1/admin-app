"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Cell, Pie, ResponsiveContainer, Tooltip } from "recharts";
import { PieChart } from "recharts";

const COLORS = ["#ff6b6b", "#4d96ff", "#ffd166", "#06d6a0", "#a29bfe"];

const CategoryDistributionChart = () => {
  const [categoryData, setCategoryData] = useState([]);
  const [isSmallOrMediumScreen, setIsSmallOrMediumScreen] = useState(false);

  useEffect(() => {
    fetch("/data/data.json")
      .then((res) => res.json())
      .then((data) => setCategoryData(data.categories));
  }, []);

  useEffect(() => {
    const updateScreenSize = () => {
      setIsSmallOrMediumScreen(window.innerWidth <= 768);
    };

    updateScreenSize();
    window.addEventListener("resize", updateScreenSize);
    return () => window.addEventListener("resize", updateScreenSize);
  }, []);

  const outerRadius = isSmallOrMediumScreen ? 60 : 80;

  return (
    <motion.div
      className="bg-[#fff] backdrop-blur-md shadow-lg rounded-xl p-4 md:p-6 mx-2 md:mx-0"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.5 }}
    >
      <h2 className="text-base md:text-lg font-medium mb-4 text-slate-600 text-center md:text-left">
        Category
      </h2>

      <div className="h-64 md:h-80">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={categoryData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={outerRadius}
              dataKey="value"
              label={({ name, percent }) =>
                `${name} ${(percent * 100).toFixed(0)}%`
              }
            >
              {categoryData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(31,41,55,0.8)",
                borderBlock: "#4b5563",
                borderRadius: "8px",
                padding: "8px",
                fontSize: "12px",
              }}
              itemStyle={{ color: "#e5e7eb" }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default CategoryDistributionChart;
