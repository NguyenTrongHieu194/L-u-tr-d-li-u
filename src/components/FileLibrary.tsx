import React, { useState } from "react";
import { Search, Trash2, FileText, Table, Headphones, Image as ImageIcon, Film, Eye, FolderOpen, FileDown } from "lucide-react";
import { FileEntry } from "../types";
import { motion, AnimatePresence } from "motion/react";

interface FileLibraryProps {
  files: FileEntry[];
  selectedFileId: string | null;
  onSelectFile: (file: FileEntry) => void;
  onDeleteFile: (id: string) => void;
}

export default function FileLibrary({ files, selectedFileId, onSelectFile, onDeleteFile }: FileLibraryProps) {
  const [filter, setFilter] = useState<'all' | 'word' | 'excel' | 'pdf' | 'multimedia'>('all');
  const [search, setSearch] = useState('');

  // Filtering
  const filteredFiles = files.filter(f => {
    const matchesFilter = filter === 'all' || f.type === filter;
    const matchesSearch = f.name.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getFileIcon = (subType: string) => {
    switch (subType) {
      case 'docx': return { icon: FileText, color: 'text-neutral-300 bg-[#161616] border-neutral-800', name: 'DOCX' };
      case 'pdf': return { icon: FileText, color: 'text-red-400 bg-[#1a0f0f] border-red-900/30', name: 'PDF' };
      case 'xlsx': return { icon: Table, color: 'text-emerald-400 bg-[#0f1a14] border-emerald-900/30', name: 'XLSX' };
      case 'audio': return { icon: Headphones, color: 'text-orange-400 bg-[#1a140f] border-orange-900/30', name: 'AUDIO' };
      case 'image': return { icon: ImageIcon, color: 'text-pink-400 bg-[#1a0f18] border-pink-900/30', name: 'IMAGE' };
      case 'video': return { icon: Film, color: 'text-cyan-400 bg-[#0f171a] border-cyan-900/30', name: 'VIDEO' };
      default: return { icon: FileText, color: 'text-neutral-300 bg-[#161616] border-neutral-800', name: 'FILE' };
    }
  };

  const formatSize = (bytes: number) => {
    if (bytes >= 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
    return `${(bytes / 1024).toFixed(1)} KB`;
  };

  const formatDate = (isoStr: string) => {
    const d = new Date(isoStr);
    return `${d.toLocaleDateString('vi-VN')} lúc ${d.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}`;
  };

  return (
    <div className="bg-[#121212] rounded-none border border-neutral-800 shadow-none flex flex-col h-[600px]">
      {/* Header Search & Title */}
      <div className="p-4 border-b border-neutral-800 select-none">
        <div className="flex items-center justify-between mb-3.5">
          <h3 className="font-serif font-bold text-neutral-100 text-[14px] flex items-center gap-2">
            <FolderOpen className="w-4 h-4 text-neutral-300" />
            TẤT CẢ TỆP TIN ({filteredFiles.length})
          </h3>
        </div>

        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-neutral-400" />
          <input
            type="text"
            id="file-search-input"
            placeholder="Tìm kiếm tài liệu hoặc phân tích..."
            className="w-full text-xs pl-9 pr-4 py-2 bg-[#161616] border border-neutral-800 text-neutral-200 rounded-none focus:outline-none focus:border-neutral-500 transition-all font-serif italic"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Tabs Filter */}
      <div className="flex border-b border-neutral-800 px-3 bg-[#141414] overflow-x-auto select-none">
        {[
          { key: 'all', label: 'Tất cả' },
          { key: 'word', label: 'Word' },
          { key: 'excel', label: 'Excel' },
          { key: 'pdf', label: 'PDF' },
          { key: 'multimedia', label: 'Media' }
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key as any)}
            className={`text-[10px] uppercase tracking-wider font-bold py-3 px-3 transition-all cursor-pointer shrink-0 ${
              filter === tab.key 
                ? 'border-b-2 border-neutral-100 text-neutral-100 font-extrabold' 
                : 'border-b-2 border-transparent text-neutral-400 hover:text-neutral-100'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* List Files */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        <AnimatePresence>
          {filteredFiles.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-24 text-center select-none"
            >
              <FileDown className="w-10 h-10 text-neutral-700 stroke-[1]" />
              <p className="text-xs font-serif italic text-neutral-450 text-neutral-400 mt-3">Không tìm thấy tài liệu phù hợp</p>
              <p className="text-[10px] text-neutral-500 mt-1 uppercase tracking-widest font-mono">Hộp cát dữ liệu trống</p>
            </motion.div>
          ) : (
            filteredFiles.map((file, idx) => {
              const info = getFileIcon(file.subType);
              const FileIcon = info.icon;
              const isSelected = selectedFileId === file.id;

              return (
                <motion.div
                  id={`file-item-${file.id}`}
                  key={file.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2, delay: idx * 0.03 }}
                  className={`group relative p-3 rounded-none border transition-all cursor-pointer flex items-center justify-between ${
                    isSelected 
                      ? 'border-neutral-100 bg-[#1c1c1c] shadow-none' 
                      : 'border-neutral-800 hover:border-neutral-600 hover:bg-[#161616]'
                  }`}
                  onClick={() => onSelectFile(file)}
                >
                  <div className="flex items-center gap-3 min-w-0 pr-8">
                    {/* Icon container */}
                    <div className={`p-2 rounded-none border shrink-0 ${info.color}`}>
                      <FileIcon className="w-3.5 h-3.5" />
                    </div>

                    <div className="min-w-0">
                      <p className="text-sm font-serif font-bold text-neutral-200 truncate leading-tight group-hover:text-neutral-100">
                        {file.name}
                      </p>
                      <div className="flex items-center gap-2 mt-1 flex-wrap font-sans text-[10px] text-neutral-450 text-neutral-400 uppercase tracking-wider font-semibold">
                        <span className="bg-neutral-900/80 border border-neutral-800 px-1 py-0.5 rounded-none font-sans font-bold text-[8px] tracking-wide">
                          {info.name}
                        </span>
                        <span>
                          {formatSize(file.size)}
                        </span>
                        <span>
                          •
                        </span>
                        <span>
                          {formatDate(file.uploadedAt)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions on Hover or Select */}
                  <div className="flex items-center gap-1 select-none">
                    <button
                      id={`preview-btn-${file.id}`}
                      className={`p-1 border rounded-none transition-all hover:bg-neutral-100 hover:text-black ${
                        isSelected ? 'border-neutral-600 text-neutral-200 bg-neutral-900' : 'border-transparent text-neutral-400'
                      }`}
                      title="Xem nội dung chi tiết"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                    <a
                      href={`/api/files/${file.id}/download`}
                      download={file.name}
                      onClick={(e) => e.stopPropagation()}
                      className="p-1 text-neutral-400 hover:text-white hover:bg-[#181818] border border-transparent hover:border-neutral-800 rounded-none transition-all flex items-center justify-center"
                      title="Tải tệp tin về máy"
                    >
                      <FileDown className="w-3.5 h-3.5" />
                    </a>
                    <button
                      id={`delete-btn-${file.id}`}
                      className="p-1 text-neutral-500 hover:text-red-400 hover:bg-neutral-900 border border-transparent hover:border-red-950 rounded-none transition-all"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (confirm(`Bạn thật sự muốn xóa tệp "${file.name}" khỏi hệ thống?`)) {
                          onDeleteFile(file.id);
                        }
                      }}
                      title="Xóa tệp"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              );
            })
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
