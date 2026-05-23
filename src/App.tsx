/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { FolderHeart, BrainCircuit, Sparkles, User, Cloud, Clock, RefreshCw } from "lucide-react";
import { FileEntry } from "./types";
import DashboardStats from "./components/DashboardStats";
import UploadZone from "./components/UploadZone";
import FileLibrary from "./components/FileLibrary";
import FileDetails from "./components/FileDetails";
import { motion } from "motion/react";

export default function App() {
  const [files, setFiles] = useState<FileEntry[]>([]);
  const [selectedFile, setSelectedFile] = useState<FileEntry | null>(null);
  const [aiCount, setAiCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Load files list on mount
  const fetchFiles = async (selectFirst = true) => {
    setIsLoading(true);
    setErrorMsg(null);
    try {
      const res = await fetch("/api/files");
      if (!res.ok) {
        throw new Error("Không thể kết nối danh sách tệp từ máy chủ.");
      }
      const data: FileEntry[] = await res.json();
      setFiles(data);
      if (selectFirst && data.length > 0) {
        setSelectedFile(data[0]);
      }
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || "Gặp sự cố tải kết nối cơ sở dữ liệu.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFiles(true);
  }, []);

  const handleUploadSuccess = (newFile: FileEntry) => {
    setFiles(prev => [newFile, ...prev]);
    setSelectedFile(newFile);
  };

  const handleDeleteFile = async (id: string) => {
    try {
      const res = await fetch(`/api/files/${id}`, { method: "DELETE" });
      if (!res.ok) {
        throw new Error("Gặp lỗi khi xóa tệp tài liệu.");
      }
      
      setFiles(prev => prev.filter(f => f.id !== id));
      if (selectedFile?.id === id) {
        setSelectedFile(null);
      }
    } catch (err: any) {
      console.error(err);
      alert(err.message || "Không thể thực thi lệnh xóa.");
    }
  };

  const handleAIExecuted = () => {
    setAiCount(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#eaeae8] flex flex-col font-sans selection:bg-neutral-100 selection:text-black">
      {/* BRAND HEADER BAR */}
      <header className="bg-[#121212] border-b border-neutral-800 py-4 px-6 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Brand Logo & Tagline */}
          <div className="flex items-center gap-3">
            <div className="p-2 border border-neutral-800 bg-neutral-900">
              <BrainCircuit className="w-5 h-5 text-neutral-200" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-serif font-bold italic text-neutral-100 tracking-tight leading-none">Lưu Trữ.</h1>
                <span className="text-[9px] font-mono tracking-wider bg-neutral-900 border border-neutral-800 text-neutral-300 px-1.5 py-0.5 uppercase">Bản Chính</span>
              </div>
              <p className="text-[10px] uppercase tracking-widest text-[#a3a3a3] mt-1 font-semibold font-sans">MinDoc AI Vault • Lưu trữ đa định dạng & Phân tích Gemini 3.5</p>
            </div>
          </div>

          {/* Quick Stats Grid or details info */}
          <div className="flex items-center gap-4 text-[10px] uppercase tracking-wider flex-wrap justify-center font-semibold text-neutral-450 text-neutral-400">
            <div className="flex items-center gap-1.5 border-b border-neutral-850 border-neutral-800 pb-0.5">
              <Clock className="w-3.5 h-3.5" />
              <span>Hệ thống: 2026-05-23 UTC</span>
            </div>

            <div className="flex items-center gap-1.5 border-b border-neutral-850 border-neutral-800 pb-0.5">
              <User className="w-3.5 h-3.5" />
              <span>nthieu194@gmail.com</span>
            </div>

            <button
              id="refresh-database-btn"
              onClick={() => fetchFiles(false)}
              className="px-2 py-0.5 hover:bg-neutral-200 hover:text-black border border-neutral-705 border-neutral-700 transition-all flex items-center gap-1.5 duration-200 font-bold text-neutral-300 cursor-pointer"
              title="Khôi phục trạng thái tệp"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Khảo sát</span>
            </button>
          </div>
        </div>
      </header>

      {/* WORKSPACE ENVIRONMENT */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-6 md:px-6">
        
        {/* Dynamic Cloud Drive Stats row */}
        <DashboardStats files={files} aiCount={aiCount} />

        {/* Core Layout Split Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left panel (File upload & Database listing library) - occupies 5/12 cols */}
          <div className="lg:col-span-5 space-y-6">
            <UploadZone onUploadSuccess={handleUploadSuccess} />
            
            <FileLibrary 
              files={files} 
              selectedFileId={selectedFile?.id || null} 
              onSelectFile={(f) => setSelectedFile(f)} 
              onDeleteFile={handleDeleteFile} 
            />
          </div>

          {/* Right panel (Visual file details, previews & Gemini conversational analysis) - occupies 7/12 cols */}
          <div className="lg:col-span-7">
            <FileDetails 
              file={selectedFile} 
              onAIExecuted={handleAIExecuted} 
              
            />
          </div>

        </div>

      </main>

      {/* Minimal clean footer */}
      <footer className="bg-[#121212] border-t border-neutral-800 mt-20 py-6 text-center text-[9px] text-neutral-450 text-neutral-450 tracking-widest uppercase font-mono">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="flex items-center gap-1.5 font-sans font-bold text-neutral-200">
            ● SECURING DATA WITH SECURE SERVER-SIDE AI SOLUTIONS
          </p>
          <p className="normal-case tracking-normal font-sans text-right select-none text-neutral-450 text-neutral-400">© 2026 AI File Hub & Insights Dashboard • All files stored in secure sandbox environment.</p>
        </div>
      </footer>
    </div>
  );
}
