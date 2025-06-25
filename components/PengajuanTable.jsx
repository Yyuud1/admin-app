"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { Edit, Save, Search, Trash2 } from "lucide-react";
import Image from "next/image";
import toast from "react-hot-toast";

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
    toast.success("kuota berhasil diedit");
  };

  const handleChange = (id, value) => {
    if (!/^\d*\.?\d*$/.test(value)) return;
    setPengajuan((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, kuota: Number(value) } : item
      )
    );
  };

  const handleDelete = (id) => {
    toast.custom((t) => (
      <div
        className={`bg-white border border-gray-300 shadow-lg rounded-lg p-4 flex items-center space-x-4 transition-all duration-300 ${
          t.visible ? "opacity-100" : "opacity-0"
        }`}
      >
        <span className="text-gray-700">Yakin ingin hapus data ini?</span>
        <div className="ml-auto flex space-x-2">
          <button
            onClick={() => {
              setPengajuan((prev) => prev.filter((item) => item.id !== id));
              toast.dismiss(t.id);
              toast.success("Data berhasil dihapus 🗑️");
            }}
            className="bg-red-400 cursor-pointer hover:bg-red-300 text-white px-3 py-1 rounded text-sm"
          >
            Hapus
          </button>
          <button
            onClick={() => toast.dismiss(t.id)}
            className="bg-gray-400 cursor-pointer hover:bg-gray-300 text-gray-800 px-3 py-1 rounded text-sm"
          >
            Batal
          </button>
        </div>
      </div>
    ));
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
      className="bg-[#fff] backdrop-blur-md shadow-lg rounded-xl p-4 md:p-6 mx-2 md:mx-0 mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.5 }}
    >
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4 md:gap-0">
        <h2 className="text-lg md:text-xl font-semibold text-slate-500 text-center md:text-left mb-4">
          Daftar Pengajuan Cuti
        </h2>

        <div className="relative w-full md:w-auto">
          <input
            type="text"
            placeholder="cari pengajuan.."
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm}
            className="bg-gray-200 text-slate-500 placeholder-gray-500 rounded-lg pl-10 pr-4 py-2 w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-200 text-sm"
          />
          <Search className="absolute left-3 top-2.5 text-gray-500" size={18} />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-400">
          <thead>
            <tr>
              {["Name", "ID Pengajuan", "Jenis Cuti", "Kuota", "Actions"].map(
                (header) => (
                  <th
                    key={header}
                    className="px-3 md:px-6 py-2 md:py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider hidden md:table-cell"
                  >
                    {header}
                  </th>
                )
              )}
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-500">
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
                        <div className="text-sm font-medium text-slate-500">
                          {item.name}
                        </div>
                        <div className="text-xs text-gray-400">
                          ID: {item.id}
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-1 -mt-1 -mr-1">
                      <button
                        className="text-blue-500 hover:text-blue-400 cursor-pointer"
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
                      <button
                        className="text-red-300 hover:text-red-200 cursor-pointer"
                        onClick={() => handleDelete(item.id)}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>

                  <div className="mt-2 text-xs text-gray-500">
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
                <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-500">
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

                <td className="hidden md:table-cell px-6 py-4 text-sm text-slate-500">
                  {item.id}
                </td>
                <td className="hidden md:table-cell px-6 py-4 text-sm text-slate-500">
                  {item.jenisCuti}
                </td>

                <td className="hidden md:table-cell px-6 py-4 text-sm text-slate-500">
                  {editingRow === item.id ? (
                    <input
                      type="text"
                      className="bg-transparent text-white w-16 text-center"
                      value={item.kuota}
                      onChange={(e) => handleChange(item.id, e.target.value)}
                    />
                  ) : (
                    `${item.kuota} hari`
                  )}
                </td>

                <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                  <div className="flex space-x-1 -ml-2">
                    <button
                      className="text-blue-500 hover:text-blue-400 mr-1 cursor-pointer"
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
                    <button
                      className="text-red-400 hover:text-red-300 cursor-pointer"
                      onClick={() => handleDelete(item.id)}
                    >
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
