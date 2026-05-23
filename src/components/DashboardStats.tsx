import { FileText, Table, Video, HardDrive, File as FileIcon } from "lucide-react";
import { FileEntry } from "../types";
import { motion } from "motion/react";

interface DashboardStatsProps {
  files: FileEntry[];
  aiCount: number;
}

export default function DashboardStats({ files, aiCount }: DashboardStatsProps) {
  // Sum file sizes
  const totalBytes = files.reduce((acc, file) => acc + (file.size || 0), 0);
  const totalMB = totalBytes / (1024 * 1024);
  const maxStorageMB = 100; // 100 MB Limit for the workspace
  const percentage = Math.min((totalMB / maxStorageMB) * 100, 100);

  // Counts by category
  const wordCount = files.filter(f => f.type === 'word').length;
  const excelCount = files.filter(f => f.type === 'excel').length;
  const pdfCount = files.filter(f => f.type === 'pdf').length;
  const mediaCount = files.filter(f => f.type === 'multimedia').length;

  const statItems = [
    {
      id: "stat-storage",
      label: "DUNG LƯỢNG ĐÃ DÙNG",
      subLabel: "Hạn mức hộp cát lưu trữ",
      value: `${totalMB.toFixed(2)} MB`,
      limit: `/ ${maxStorageMB} MB`,
      icon: HardDrive,
      color: "text-neutral-200 bg-[#181818] border-neutral-800",
      progress: true
    },
    {
      id: "stat-pdf",
      label: "TÀI LIỆU PDF",
      subLabel: "Bản báo cáo, chỉ thị, công văn",
      value: `${pdfCount} tệp`,
      limit: `${(files.filter(f => f.type === 'pdf').reduce((a, b) => a + b.size, 0) / 1024).toFixed(1)} KB`,
      icon: FileIcon,
      color: "text-red-400 bg-red-950/20 border-red-900/30"
    },
    {
      id: "stat-excel",
      label: "BẢNG TÍNH EXCEL",
      subLabel: "Số liệu, lợi nhuận, biểu đồ",
      value: `${excelCount} tệp`,
      limit: `${(files.filter(f => f.type === 'excel').reduce((a, b) => a + b.size, 0) / 1024).toFixed(1)} KB`,
      icon: Table,
      color: "text-emerald-400 bg-emerald-950/20 border-emerald-900/30"
    },
    {
      id: "stat-media",
      label: "ĐA PHƯƠNG TIỆN & DOCX",
      subLabel: "Ghi âm, hình ảnh, văn bản Word",
      value: `${mediaCount + wordCount} tệp`,
      limit: `${(files.filter(f => ['multimedia', 'word'].includes(f.type)).reduce((a, b) => a + b.size, 0) / (1024 * 1024)).toFixed(2)} MB`,
      icon: Video,
      color: "text-neutral-200 bg-[#141414] border-neutral-800"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 select-none">
      {statItems.map((item, index) => {
        const Icon = item.icon;
        return (
          <motion.div
            id={item.id}
            key={item.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="bg-[#121212] rounded-none p-5 border border-neutral-800 hover:border-neutral-500 transition-all duration-350 flex flex-col justify-between h-[160px]"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[10px] font-bold text-neutral-400 tracking-widest uppercase font-sans">{item.label}</p>
                <p className="text-3xl font-serif font-normal text-neutral-100 mt-2">{item.value}</p>
                <p className="text-[11px] text-neutral-400 italic font-serif mt-1">{item.subLabel}</p>
              </div>
              <div className={`p-2 border ${item.color} rounded-none`}>
                <Icon className="w-4 h-4" />
              </div>
            </div>

            {item.progress ? (
              <div className="mt-3">
                <div className="flex items-center justify-between text-[10px] mb-1.5 font-sans font-semibold tracking-wider text-neutral-400 uppercase">
                  <span>Trạng thái ({percentage.toFixed(1)}%)</span>
                  <span>{item.limit}</span>
                </div>
                <div className="w-full bg-[#1c1c1c] h-[3px] rounded-none overflow-hidden">
                  <motion.div 
                    className="bg-neutral-100 h-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  />
                </div>
              </div>
            ) : (
              <div className="mt-3 flex items-center justify-between border-t border-neutral-800 pt-2 text-[10px] font-sans font-semibold tracking-wider uppercase text-neutral-400">
                <span>TỔNG NHÓM</span>
                <span className="font-mono bg-[#161616] py-0.5 px-1.5 border border-neutral-800 text-neutral-200 font-bold">{item.limit}</span>
              </div>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}
