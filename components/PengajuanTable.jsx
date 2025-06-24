"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { Edit, Save, Search, Trash2 } from "lucide-react";
import Image from "next/image";

const PengajuanTable = () => {
  const [pengajuan, setPengajuan] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingRow, setEditingRow] = useState(null);

  const filteredPengajuan = useMemo(() => {
    return pengajuan.filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.jenisCuti.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, pengajuan]);

  const handleEditClick = (id) => {
    setEditingRow(id);
  };

  const handleSaveClick = () => {
    setEditingRow(null);
  };

  const handleChange = (id, value) => {
    if (!/^\d*\.?\d*$/.test(value)) return;
    setPengajuan((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, kuota: Number(value) } : item
      )
    );
  };

  useEffect(() => {
    fetch("/data/data.json")
      .then((res) => res.json())
      .then((data) => {
        setPengajuan(data.pengajuan);
      })
      .catch((err) => {
        console.error("Failed to load data:", err);
      });
  }, []);

  return (
    <motion.div
      className="bg-[#1e1e1e] backdrop-blur-md shadow-lg rounded-xl p-4 md:p-6 border border-[#1f1f1f] mx-2 md:mx-0 mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.5 }}
    >
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4 md:gap-0">
        <h2 className="text-lg md:text-xl font-semibold text-gray-100 text-center md:text-left mb-4">
          Daftar Pengajuan Cuti
        </h2>

        <div className="relative w-full md:w-auto">
          <input
            type="text"
            placeholder="cari pengajuan.."
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm}
            className="bg-[#2f2f2f] text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-200 text-sm"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead>
            <tr>
              {["Name", "ID Pengajuan", "Jenis Cuti", "Kuota", "Actions"].map(
                (header) => (
                  <th
                    key={header}
                    className="px-3 md:px-6 py-2 md:py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider hidden md:table-cell"
                  >
                    {header}
                  </th>
                )
              )}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-700">
            {filteredPengajuan.map((item) => (
              <motion.tr
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.3 }}
                className={`flex flex-col md:table-row mb-4 md:mb-0 border-b md:border-b-0 border-gray-700 md:border-none p-2 md:p-0 ${
                  editingRow === item.id ? "bg-[#2f2f2f] ring-gray-500" : ""
                }`}
              >
                {/* Mobile view */}
                <td className="md:hidden px-3 py-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={36}
                        height={36}
                        className="w-9 h-9 rounded-full"
                      />
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-100">
                          {item.name}
                        </div>
                        <div className="text-xs text-gray-400">
                          ID: {item.id}
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-1 -mt-1 -mr-1">
                      <button
                        className="text-indigo-500 hover:text-indigo-300 cursor-pointer"
                        onClick={() =>
                          editingRow === item.id
                            ? handleSaveClick()
                            : handleEditClick(item.id)
                        }
                      >
                        {editingRow === item.id ? (
                          <Save size={16} />
                        ) : (
                          <Edit size={16} />
                        )}
                      </button>
                      <button className="text-red-500 hover:text-red-300 cursor-pointer">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>

                  <div className="mt-2 text-xs text-gray-300">
                    <div>Jenis Cuti: {item.jenisCuti}</div>
                    <div>
                      Kuota:{" "}
                      {editingRow === item.id ? (
                        <input
                          type="text"
                          className="bg-transparent text-white border border-gray-400 w-16 text-center text-xs ml-1"
                          value={item.kuota}
                          onChange={(e) =>
                            handleChange(item.id, e.target.value)
                          }
                        />
                      ) : (
                        `${item.kuota} hari`
                      )}
                    </div>
                  </div>
                </td>

                {/* Desktop view */}
                <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100">
                  <div className="flex items-center">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={40}
                      height={40}
                      className="w-10 h-10 rounded-full"
                    />
                    <div className="ml-4">{item.name}</div>
                  </div>
                </td>

                <td className="hidden md:table-cell px-6 py-4 text-sm text-gray-300">
                  {item.id}
                </td>
                <td className="hidden md:table-cell px-6 py-4 text-sm text-gray-300">
                  {item.jenisCuti}
                </td>

                <td className="hidden md:table-cell px-6 py-4 text-sm text-gray-300">
                  {editingRow === item.id ? (
                    <input
                      type="text"
                      className="bg-transparent text-white border border-gray-400 w-16 text-center"
                      value={item.kuota}
                      onChange={(e) => handleChange(item.id, e.target.value)}
                    />
                  ) : (
                    `${item.kuota} hari`
                  )}
                </td>

                <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  <div className="flex space-x-1 -ml-2">
                    <button
                      className="text-indigo-500 hover:text-indigo-300 mr-1 cursor-pointer"
                      onClick={() =>
                        editingRow === item.id
                          ? handleSaveClick()
                          : handleEditClick(item.id)
                      }
                    >
                      {editingRow === item.id ? (
                        <Save size={18} />
                      ) : (
                        <Edit size={18} />
                      )}
                    </button>
                    <button className="text-red-500 hover:text-red-300 cursor-pointer">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default PengajuanTable;
