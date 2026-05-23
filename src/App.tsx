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

const PRELOADED_FILES: FileEntry[] = [
  {
    id: "preloaded-docx-1",
    name: "Ke_Hoach_Kinh_Doanh_Cua_Hang_Convenience_2026.docx",
    type: "word",
    subType: "docx",
    size: 45280,
    uploadedAt: "2026-05-23T10:30:00Z",
    mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    content: `KẾ HOẠCH CHIẾN LƯỢC KINH DOANH: PHÁT TRIỂN CHUỖI SIÊU THỊ TIỆN LỢI ECO-MART 2026\nNgười thực hiện: Ban Kế Hoạch & Phát Triển Doanh Nghiệp\nNgày tạo: 15/05/2026\nPhiên bản: 1.4 CHÍNH THỨC\n\nI. GIỚI THIỆU CHUNG\nDự án siêu thị tiện lợi sinh thái Eco-Mart hướng tới phục vụ cư dân đô thị hiện đại tại khu vực Trung tâm Hà Nội và TP. Hồ Chí Minh với triết lý "Tiện ích Xanh - Tiêu dùng Lành". Cửa hàng tập cung cấp thực phẩm rau quả hữu cơ sạch, đồ uống healthy uống liền, văn phòng phẩm tái chế và hàng hóa thiết yếu phục vụ 24/7.\n\nII. SWOT ANALYSIS TRỰC QUAN\n1. Điểm mạnh (Strengths):\n- Triết lý kinh doanh Xanh độc lập duy nhất hiện nay.\n- Chuỗi cung ứng ký kết trực tiếp với các trang trại nuôi trồng Organic thuộc Đà Lạt và Đồng Nai, giảm 15% trung gian phí.\n- Ứng dụng tích điểm thông minh Loyalty App thu hút 15.000 user thử nghiệm.\n\n2. Điểm yếu (Weaknesses):\n- Chi phí bảo quản lạnh hoa quả tươi cao hơn 22% so với hàng hóa thông thường.\n- Sức ép tuyển dụng nhân sự ca đêm 24/7 có tỉ lệ nghỉ việc cao.\n- Độ phủ thương hiệu ban đầu còn mỏng ở khu dân cư truyền thống.\n\n3. Cơ hội (Opportunities):\n- Trào lưu sống khỏe, eat clean tăng vọt 45% hằng năm của cư dân Gen Z và Gen Y.\n- Cột mốc số hóa thúc đẩy giao hàng nhanh chặng cuối trong 15 phút.\n\n4. Thách thức (Threats):\n- Cạnh tranh trực tiếp từ các chuỗi lớn dồi dào tài chính như WinMart, Circle K, 7-Eleven.\n- Biến động giá xăng dầu tác động trực tiếp lên logistics chuỗi cung ứng.\n\nIII. KẾ HOẠCH TÀI CHÍNH & MỤC TIÊU SỐ LIỆU\n- Mục tiêu tổng doanh thu cả chuỗi năm đầu tiên: 12 tỷ VNĐ với tỷ suất lợi nhuận gộp mục tiêu đạt 28-31%.\n- Điểm hòa vốn dự kiến đạt được tại mỗi điểm bán sau 8 tháng vận hành.\n- Chi phí marketing khai trương chiếm 12% ngân sách giai đoạn đầu, tập trung 80% vào chạy quảng cáo địa quán bán kính 2km xung quanh cửa hàng.`
  },
  {
    id: "preloaded-xlsx-1",
    name: "Bao_Cao_Doanh_So_Hieu_Suat_San_Pham_Q1_2026.xlsx",
    type: "excel",
    subType: "xlsx",
    size: 15640,
    uploadedAt: "2026-05-23T11:45:00Z",
    mimeType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    content: "Bảng dữ liệu kết quả kinh doanh phân phối sản phẩm nông sản hữu cơ Eco-Mart Q1/2026.",
    parsedData: {
      columns: ["Sản phẩm", "Doanh thu (M VNĐ)", "Chi phí (M VNĐ)", "Lợi nhuận (M VNĐ)", "Tăng trưởng %", "KPI Đạt"],
      rows: [
        { "Sản phẩm": "Rau Hữu Cơ Đà Lạt", "Doanh thu (M VNĐ)": 150, "Chi phí (M VNĐ)": 95, "Lợi nhuận (M VNĐ)": 55, "Tăng trưởng %": 24, "KPI Đạt": "Xuất Sắc" },
        { "Sản phẩm": "Trái Cây Nhập Khẩu", "Doanh thu (M VNĐ)": 95, "Chi phí (M VNĐ)": 75, "Lợi nhuận (M VNĐ)": 20, "Tăng trưởng %": -4, "KPI Đạt": "Chưa Đạt" },
        { "Sản phẩm": "Gạo Sạch ST25 Thượng Hạng", "Doanh thu (M VNĐ)": 180, "Chi phí (M VNĐ)": 120, "Lợi nhuận (M VNĐ)": 60, "Tăng trưởng %": 35, "KPI Đạt": "Xuất Sắc" },
        { "Sản phẩm": "Sữa & Sữa Hạt Nguyên Chất", "Doanh thu (M VNĐ)": 110, "Chi phí (M VNĐ)": 80, "Lợi nhuận (M VNĐ)": 30, "Tăng trưởng %": 12, "KPI Đạt": "Tốt" },
        { "Sản phẩm": "Thực Phẩm Chay Đóng Gói", "Doanh thu (M VNĐ)": 65, "Chi phí (M VNĐ)": 50, "Lợi nhuận (M VNĐ)": 15, "Tăng trưởng %": 8, "KPI Đạt": "Trung Bình" }
      ],
      summaryStats: {
        totalRevenue: 600,
        totalProfit: 180,
        averageGrowth: 15.0
      }
    }
  },
  {
    id: "preloaded-audio-1",
    name: "Ghi_Am_Hop_Giao_Ban_Nhan_Su_Mien_Bac.mp3",
    type: "multimedia",
    subType: "audio",
    size: 1254000,
    uploadedAt: "2026-05-23T14:10:00Z",
    mimeType: "audio/mpeg",
    duration: "03:15",
    content: `[NỘI DUNG GHI ÂM TRANSSCRIPT - Đã được đồng bộ]\n00:10 - Trưởng Ban: Chào mọi người, hôm nay chúng ta tập trung rà soát vận hành ca tối 24/7 của các điểm bán khu vực Hoàn Kiếm và Hai Bà Trưng. Hiện có phản ánh là hàng tươi sống hết sớm từ 20:00 tối rước khi ca đêm bắt đầu.\n00:45 - Trưởng kho Cầu Giấy: Dạ báo cáo, hiện tại lượng xe cấp hàng tươi sống chỉ chạy khung giờ 15:00 chiều là chuyến cuối. Do kẹt xe đường phố HN tầm chiều tối nên tài xế hay giao trễ gây hao hụt sản phẩm tươi. Đề xuất dịch lịch cấp hàng tươi xuống 13:00 chiều để kíp cửa hàng kịp sơ chế đóng khay trưng bày.\n01:30 - Trưởng Ban: Đồng ý đề xuất đổi giờ xe chạy. Từ thứ Hai tuần sau kho tổng chuyển giờ xuất bến sang 12:30. Trách nhiệm các cửa hàng trưởng phải phân công nhân viên nhận bàn giao khay kiểm đếm chuẩn.\n02:10 - Trọng tâm nhân sự: Tuần này tỉ lệ nghỉ ca tối quận Hoàn Kiếm tăng do mùa nóng. Yêu cầu bộ phận nhân sự rà soát tăng hỗ trợ phụ cấp trực ca đêm 25% trực lễ và bổ sung thêm 2 cộng tác viên thời vụ dự phòng gấp.`
  },
  {
    id: "preloaded-image-1",
    name: "Layout_Thiet_Ke_Gian_Hang_EcoMart_Cầu_Giấy.png",
    type: "multimedia",
    subType: "image",
    size: 248900,
    uploadedAt: "2026-05-23T12:00:00Z",
    mimeType: "image/png",
    thumbnailUrl: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80",
    content: `[PHÂN TÍCH THÔNG TIN SƠ ĐỒ MẶT BẰNG GIAN HÀNG]\n- Không gian diện tích sử dụng: 85m2 hình chữ nhật đứng.\n- Khu vực Đón Khách (Khu A): Trưng bày các kệ hàng sinh thái xanh, rau củ quả, hoa quả cắt sẵn nhập khẩu được tưới ẩm định kỳ.\n- Khu vực Trung Tâm (Khu B): Đồ khô đóng hộp hữu cơ và sữa hạt xếp so le dọc 3 luồng lối đi chính, khoảng cách lối đi rộng 1.2M tối ưu xe đẩy mini.\n- Khu vực Quầy Thu Ngân (Khu C): Lắp đặt hệ thống máy POS tự động và quầy bánh ngọt ăn liền để gia tăng quyết định mua hàng phút chót (impulse buys). Hệ thống có đèn LED ấm 3000K tạo nét thân mật, organic.`
  }
];

export default function App() {
  const [files, setFiles] = useState<FileEntry[]>([]);
  const [selectedFile, setSelectedFile] = useState<FileEntry | null>(null);
  const [aiCount, setAiCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isLocalFallback, setIsLocalFallback] = useState<boolean>(false);

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
      setIsLocalFallback(false);
    } catch (err: any) {
      console.warn("Express server unreachable, using offline client fallback configuration.", err);
      setIsLocalFallback(true);
      
      // Load from localStorage + predefined fallback files
      const localFilesStr = localStorage.getItem("min_doc_vault_files");
      const localFiles: FileEntry[] = localFilesStr ? JSON.parse(localFilesStr) : [];
      
      const allFiles = [...localFiles, ...PRELOADED_FILES];
      setFiles(allFiles);
      if (selectFirst && allFiles.length > 0) {
        setSelectedFile(allFiles[0]);
      }
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
      if (isLocalFallback || id.startsWith("local-file-") || id.startsWith("preloaded-")) {
        // Delete locally
        setFiles(prev => prev.filter(f => f.id !== id));
        const localFilesStr = localStorage.getItem("min_doc_vault_files");
        if (localFilesStr) {
          const localFiles: FileEntry[] = JSON.parse(localFilesStr);
          localStorage.setItem(
            "min_doc_vault_files", 
            JSON.stringify(localFiles.filter(f => f.id !== id))
          );
        }
        if (selectedFile?.id === id) {
          setSelectedFile(null);
        }
        return;
      }

      const res = await fetch(`/api/files/${id}`, { method: "DELETE" });
      if (!res.ok) {
        throw new Error("Gặp lỗi khi xóa tệp tài liệu.");
      }
      
      setFiles(prev => prev.filter(f => f.id !== id));
      if (selectedFile?.id === id) {
        setSelectedFile(null);
      }
    } catch (err: any) {
      console.warn("Server delete failed or unreachable. Performing local fallback delete.", err);
      setFiles(prev => prev.filter(f => f.id !== id));
      const localFilesStr = localStorage.getItem("min_doc_vault_files");
      if (localFilesStr) {
        const localFiles: FileEntry[] = JSON.parse(localFilesStr);
        localStorage.setItem(
          "min_doc_vault_files", 
          JSON.stringify(localFiles.filter(f => f.id !== id))
        );
      }
      if (selectedFile?.id === id) {
        setSelectedFile(null);
      }
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
                {isLocalFallback ? (
                  <span className="text-[9px] font-mono tracking-wider bg-amber-950/40 border border-amber-900/40 text-amber-300 px-1.5 py-0.5 uppercase">Chế độ máy khách</span>
                ) : (
                  <span className="text-[9px] font-mono tracking-wider bg-neutral-900 border border-neutral-800 text-neutral-300 px-1.5 py-0.5 uppercase">Bản Chính</span>
                )}
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
            <UploadZone onUploadSuccess={handleUploadSuccess} isLocalFallback={isLocalFallback} />
            
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
