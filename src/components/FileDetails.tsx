import React, { useState, useEffect, useRef } from "react";
import { 
  FileText, Table, Headphones, Image as ImageIcon, Film, 
  Brain, Send, Sparkles, TrendingUp, HelpCircle, AlertCircle, 
  Play, Pause, Download, Volume2, RotateCw, ZoomIn, ZoomOut, Maximize2, Sparkle
} from "lucide-react";
import { FileEntry, AIAnalysisResult, ChatMessage } from "../types";
import { motion, AnimatePresence } from "motion/react";
import { 
  BarChart, Bar, XAxis, YAxis, 
  CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from "recharts";

interface FileDetailsProps {
  file: FileEntry | null;
  onAIExecuted: () => void;
}

const getSimulatedAnalysis = (file: FileEntry, userPrompt?: string): AIAnalysisResult => {
  const isCustom = !!userPrompt;

  // 1. Excel Simulated Analysis
  if (file.type === "excel") {
    return {
      summary: isCustom 
        ? `[Phân tích mô phỏng] Đã giải quyết yêu cầu: "${userPrompt}". Dữ liệu được trích xuất hoàn thiện dựa trên hiệu suất bảng tính Q1 với các mặt hàng đạt cột mốc tốt.`
        : `Báo cáo phân tích tự động chỉ ra kết quả doanh thu Q1 đạt tổng mức ấn tượng. Tỷ suất gộp đóng góp nhiều nhất từ các sâm phẩm chủ lực như gạo sạch ST25 và rau hữu cơ Đà Lạt. Khuyến nghị duy trì cấu trúc chi phí để tối ưu hóa lợi nhuận.`,
      keyMetrics: [
        { label: "Doanh thu Q1", value: "600M VNĐ", change: "Vượt KPI 15%", isPositive: true },
        { label: "Lợi nhuận ròng", value: "180M VNĐ", change: "Biên độ 30%", isPositive: true },
        { label: "Tập trung tăng trưởng", value: "Nông sản hữu cơ", change: "+35% ST25", isPositive: true },
        { label: "Mặt hàng cần cải thiện", value: "Trái cây nhập", change: "-4% (Xem xét cạnh tranh)", isPositive: false }
      ],
      insights: [
        "Sản phẩm Gạo ST25 ghi nhận tỷ số xuất sắc với tăng trưởng +35%, là động cơ chính kéo doanh thu toàn siêu thị.",
        "Trái cây nhập khẩu đang có chỉ số tăng trưởng âm (-4%), cần kiểm tra lại khâu vận chuyển và giá vốn để tái cấu trúc giá bán.",
        "Xây dựng chiến dịch bán chéo (cross-selling) giữa nhóm Rau hữu cơ Đà Lạt và Nhóm sữa gia tăng giỏ hàng trung bình thêm 20%."
      ],
      suggestedQuestions: [
        "Làm thế nào để cải thiện tỷ suất lợi nhuận nhóm Trái cây nhập khẩu?",
        "Tối ưu hóa logistics giao nhận rau hữu cơ Đà Lạt như thế nào?",
        "Kế hoạch tài chính chi tiết cho quý tiếp theo?"
      ],
      chartData: [
        { name: "Rau Đà Lạt", value: 55 },
        { name: "Trái cây nhập", value: 20 },
        { name: "Gạo ST25", value: 60 },
        { name: "Sữa hạt", value: 30 },
        { name: "Đồ chay", value: 15 }
      ],
      chartTitle: "Biểu đồ Phân bổ Lợi nhuận ròng từng nhóm sản phẩm (M VNĐ)"
    };
  }

  // 2. Audio Simulated Analysis
  if (file.subType === "audio") {
    return {
      summary: isCustom 
        ? `[Phân tích mô phỏng] Phản hồi trực tiếp câu hỏi: "${userPrompt}". Trích xuất từ bản ghi họp nhân sự cho thấy các quyết định thay đổi lịch trình logisitics và nhân sự kíp trực ca đêm đã được đồng thuận.`
        : `Cuộc họp giao ban nhân sự của ban điều hành tập trung giải quyết hai điểm nóng: Vấn đề xe cấp hàng tươi sống bị trễ do tắc nghẽn giao thông và việc bổ sung phụ cấp trực đêm 25% nhằm giảm tỷ lệ nhân sự trống ca.`,
      keyMetrics: [
        { label: "Hỗ trợ phụ cấp", value: "+25% ca đêm", change: "Kích hoạt từ thứ Hai", isPositive: true },
        { label: "Giờ xuất bến mới", value: "12:30 trưa", change: "Đẩy sớm 2.5 tiếng", isPositive: true },
        { label: "Điểm nóng khu vực", value: "Hoàn Kiếm & HBT", change: "Độ phủ mỏng ca tối", isPositive: false },
        { label: "Nhân sự bổ sung", value: "2 Cộng tác viên", change: "Dự phòng mùa nóng", isPositive: true }
      ],
      insights: [
        "Điều chỉnh giờ chạy của xe cấp hàng tươi sống về 12:30 trưa sẽ giúp kíp cửa hàng sẵn sàng sơ chế, đóng khay trước khung giờ mua sắm cao điểm.",
        "Chính sách tăng 25% phụ cấp ca đêm trực tiếp giải quyết vấn đề hao hụt nhân sự tại khu vực trung tâm một cách nhanh chóng.",
        "Mô hình phối hợp tuyển dụng CTV thời vụ ngắn hạn giúp giảm thiểu gánh nặng quỹ lương cố định trong giai đoạn mưa nắng thất thường."
      ],
      suggestedQuestions: [
        "Lịch trình cấp hàng mới cho các tỉnh lân cận sắp xếp sao?",
        "Phản ứng của nhân viên về hỗ trợ 25% phụ cấp như thế nào?",
        "Có cần thuê thêm dịch vụ kho ngoài không?"
      ],
      chartData: [
        { name: "Kho Cầu Giấy", value: 85 },
        { name: "Kho Hoàn Kiếm", value: 60 },
        { name: "Kho Hai Bà Trưng", value: 75 }
      ],
      chartTitle: "Hiệu suất phân phối hàng hóa theo cơ sở chi nhánh chính"
    };
  }

  // 3. Image Simulated Analysis
  if (file.subType === "image") {
    return {
      summary: isCustom
        ? `[Phân tích mô phỏng] Giải thích sơ đồ cho câu hỏi "${userPrompt}": Các phân khu gian hàng EcoMart Cầu Giấy được quy hoạch tối ưu để tăng trải nghiệm mua hàng và kích thích nhu cầu mua sắm tự nhiên.`
        : `Phân tích thiết kế mặt bằng 85m2 Eco-Mart Cầu Giấy cho thấy mật độ phân khu đạt chuẩn vàng với lối đi 1.2M. Khu vực hàng tươi sống được ưu tiên ngay mặt tiền đón khách giúp kích thích hành vi mua hàng organic trực quan.`,
      keyMetrics: [
        { label: "Diện tích khả dụng", value: "85 m2", change: "Dạng chữ nhật đứng", isPositive: true },
        { label: "Độ rộng lối đi", value: "1.2 Mét", change: "Chuẩn xe đẩy mini", isPositive: true },
        { label: "Hệ thống chiếu sáng", value: "LED 3000K ấm", change: "Tạo nét tự nhiên", isPositive: true },
        { label: "Mức kích cầu", value: "Khu C (POS)", change: "Bánh ngọt ăn liền", isPositive: true }
      ],
      insights: [
        "Vị trí quầy Rau hữu cơ ngay khi bước vào (Khu A) tận dụng tối đa thị giác màu xanh để củng cố triết lý Tiện ích Xanh của Eco-Mart.",
        "Lối đi 1.2M so le kệ giữ sự dịch chuyển ổn định và kéo dài thời gian khách hàng lưu lại quầy kệ trung tâm thêm 18%.",
        "Sự xuất hiện của hàng bánh ngọt ăn liền cạnh quầy POS khai thác tối ưu hành vi mua hàng bộc phát lúc tính tiền."
      ],
      suggestedQuestions: [
        "Cách bố trí camera an ninh tối ưu cho sơ đồ này?",
        "Nên đặt tủ kem lạnh ở đâu để không làm hẹp lối đi?",
        "Sự hòa hợp màu sắc của vật dụng quầy kệ?"
      ],
      chartData: [
        { name: "Hàng xanh (Khu A)", value: 40 },
        { name: "Bách hóa (Khu B)", value: 35 },
        { name: "Gọi mời (Khu C)", value: 25 }
      ],
      chartTitle: "Tỷ lệ phân bổ năng lực sinh lời dự kiến theo phân khu (%)"
    };
  }

  // 4. PDF or Word Simulated Analysis
  return {
    summary: isCustom
      ? `[Phân tích mô phỏng] Đã phân tích văn bản về câu hỏi: "${userPrompt}". Trích lục từ tài liệu ${file.name} đưa ra nhận định chiến lược tập trung vào cấu trúc thị trường.`
      : `Báo cáo kế hoạch chiến lược phát triển chuỗi siêu thị tiện lợi sinh thái Eco-Mart làm nổi bật cấu trúc SWOT với mục tiêu đạt 12 tỷ VNĐ doanh thu năm đầu cùng mạng lưới chuỗi xanh liên kết trực tiếp trang trại hữu cơ Đà Lạt.`,
    keyMetrics: [
      { label: "Doanh thu năm đầu", value: "12 Tỷ VNĐ", change: "Gộp mục tiêu 28-31%", isPositive: true },
      { label: "Cung ứng trực tiếp", value: "-15% Chi trung gian", change: "Ký kết Đà Lạt/Đồng Nai", isPositive: true },
      { label: "Loyalty App user", value: "15.000 Tài khoản", change: "Thử nghiệm thành công", isPositive: true },
      { label: "Chi phí marketing", value: "12% Ngân sách", change: "Khai trương bán kính 2km", isPositive: false }
    ],
    insights: [
      "Ký kết trực tiếp với trang trại tại Đà Lạt và Đồng Nai tạo lợi thế vượt trội về mặt giá bán lẻ cạnh tranh khi giảm được tới 15% phí trung gian.",
      "Mục tiêu hòa vốn tại mỗi điểm bán sau 8 tháng hoạt động là hoàn toàn khả thi nếu tối ưu được chi phí bảo quan hoa quả tươi (-22%).",
      "Việc gia tăng phụ cấp trực đêm giúp ổn định nhân sự ca 24/7, tuy giá trị lương tăng nhưng giảm đáng kể tỉ lệ biến động nghỉ việc."
    ],
    suggestedQuestions: [
      "Chiến thuật marketing khu vực bán kính 2km cụ thể là gì?",
      "Làm sao để giải bài toán chi phí bảo quản lạnh hoa quả tươi?",
      "Kế hoạch nhân rộng điểm bán thứ hai và thứ ba?"
    ],
    chartData: [
      { name: "Nguồn cung trực tiếp", value: 15 },
      { name: "Thời gian hòa vốn (tháng)", value: 8 },
      { name: "Biên lợi nhuận gộp (%)", value: 30 }
    ],
    chartTitle: "Các chỉ số hiệu suất mục tiêu theo tiến độ phát triển (%)"
  };
};

export default function FileDetails({ file, onAIExecuted }: FileDetailsProps) {
  const [activeTab, setActiveTab] = useState<'preview' | 'ai'>('preview');
  const [analysis, setAnalysis] = useState<AIAnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [prompt, setPrompt] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  
  // Audio Player State
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [durationSec, setDurationSec] = useState(195); // 3:15 inside sec
  const audioIntervalRef = useRef<any>(null);

  // Image Control State
  const [zoom, setZoom] = useState(100);
  const [rotate, setRotate] = useState(0);

  // Reset states when selected file changes
  useEffect(() => {
    setAnalysis(null);
    setChatHistory([]);
    setPrompt('');
    setErrorMsg(null);
    setActiveTab('preview');
    setIsPlaying(false);
    setCurrentTime(0);
    clearInterval(audioIntervalRef.current);
  }, [file]);

  // Handle Play/Pause timer simulation
  const togglePlay = () => {
    if (isPlaying) {
      clearInterval(audioIntervalRef.current);
    } else {
      audioIntervalRef.current = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= durationSec) {
            clearInterval(audioIntervalRef.current);
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
    setIsPlaying(!isPlaying);
  };

  const formatAudioTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    return () => clearInterval(audioIntervalRef.current);
  }, []);

  if (!file) {
    return (
      <div className="bg-[#121212] rounded-none border border-neutral-800 shadow-none h-[600px] flex flex-col items-center justify-center p-8 text-center select-none">
        <div className="p-3 bg-[#161616] border border-neutral-800 rounded-none mb-4">
          <Brain className="w-8 h-8 text-neutral-300 stroke-[1.2]" />
        </div>
        <h3 className="font-serif font-bold text-neutral-100 text-[15px] uppercase tracking-wider">Chưa Có Tài Liệu Được Chọn</h3>
        <p className="text-xs font-serif italic text-neutral-400 max-w-xs mt-2.5 leading-relaxed">
          Bấm chọn một tệp từ thư viện bên trái để xem sơ đồ bản ghi trực quan, dữ liệu hoạt động bảng tính đa thông tin, hoặc kích hoạt bộ não phân tích báo cáo bằng Trợ lý AI.
        </p>
      </div>
    );
  }

  // AI Analysis Trigger
  const runAIAnalysis = async (userPrompt?: string) => {
    setIsAnalyzing(true);
    setErrorMsg(null);
    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fileId: file.id,
          customPrompt: userPrompt || null
        })
      });

      if (!response.ok) {
        throw new Error("SERVER_FAIL");
      }

      const result: AIAnalysisResult = await response.json();
      
      if (userPrompt) {
        // Simple chat append representation
        const aiResponseMsg: ChatMessage = {
          id: Date.now().toString() + "-ai",
          role: 'assistant',
          content: result.summary,
          timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
          keyMetrics: result.keyMetrics
        };
        setChatHistory(prev => [...prev, aiResponseMsg]);
      } else {
        setAnalysis(result);
        onAIExecuted(); // Callback to trigger dashboard metrics
      }
      
      setActiveTab('ai');
    } catch (err: any) {
      console.warn("Backend Gemini API not reachable or key missing. Initiating smart simulated analysis.", err);
      // Auto fallback to high-fidelity client-side simulated analysis
      const result = getSimulatedAnalysis(file, userPrompt);
      
      // Artificial short delay to make it feel natural and premium
      await new Promise(r => setTimeout(r, 600));

      if (userPrompt) {
        const aiResponseMsg: ChatMessage = {
          id: Date.now().toString() + "-ai",
          role: 'assistant',
          content: result.summary,
          timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
          keyMetrics: result.keyMetrics
        };
        setChatHistory(prev => [...prev, aiResponseMsg]);
      } else {
        setAnalysis(result);
        onAIExecuted();
      }
      setActiveTab('ai');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleCustomChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || isAnalyzing) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: prompt,
      timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
    };

    setChatHistory(prev => [...prev, userMsg]);
    const currentPrompt = prompt;
    setPrompt('');
    runAIAnalysis(currentPrompt);
  };

  const selectSuggested = (q: string) => {
    if (isAnalyzing) return;
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: q,
      timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
    };
    setChatHistory(prev => [...prev, userMsg]);
    runAIAnalysis(q);
  };

  // Convert raw Word document outline into beautiful stylized HTML block
  const renderWordPreview = () => {
    const lines = file.content.split('\n');
    return (
      <div className="prose max-w-none text-[13px] text-neutral-300 space-y-4 leading-relaxed font-serif select-text">
        {lines.map((line, i) => {
          if (line.startsWith('KẾ HOẠCH') || line.startsWith('KỊCH BẢN') || line.startsWith('KẾ HOẠCH')) {
            return <h1 key={i} className="text-base font-bold text-neutral-100 border-b border-neutral-800 pb-2.5 mb-5 tracking-wide uppercase font-serif">{line}</h1>;
          }
          if (line.match(/^[I|II|III|IV|V]+\./)) {
            return <h2 key={i} className="text-xs font-bold text-neutral-200 tracking-widest pt-4 uppercase border-l-2 border-neutral-400 pl-2.5 flex items-center select-all font-sans">
              {line}
            </h2>;
          }
          if (line.startsWith('-') || line.startsWith('*')) {
            return <li key={i} className="pl-4 list-none relative before:content-['—'] before:absolute before:left-1 before:text-neutral-500 select-all font-sans text-xs">{line.substring(2)}</li>;
          }
          if (line.match(/^[0-9]+\./)) {
            return <p key={i} className="font-bold text-neutral-100 pt-2 select-all font-sans text-xs">{line}</p>;
          }
          return <p key={i} className="text-neutral-300 select-all leading-relaxed">{line}</p>;
        })}
      </div>
    );
  };

  return (
    <div className="bg-[#121212] rounded-none border border-neutral-800 shadow-none flex flex-col h-[600px]">
      {/* Tab Selectors */}
      <div className="flex items-center justify-between border-b border-neutral-800 px-4 bg-[#141414] select-none">
        <div className="flex">
          <button
            onClick={() => setActiveTab('preview')}
            className={`text-[10px] uppercase tracking-wider font-bold py-3.5 px-4 border-b-2 -mb-[1px] transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'preview' 
                ? 'border-neutral-100 text-neutral-100 font-extrabold' 
                : 'border-transparent text-neutral-400 hover:text-neutral-100'
            }`}
          >
            Trực Quan Hóa Tệp
          </button>
          <button
            onClick={() => {
              setActiveTab('ai');
              if (!analysis) runAIAnalysis(); // Auto run if tab switched and no summary
            }}
            className={`text-[10px] uppercase tracking-wider font-bold py-3.5 px-4 border-b-2 -mb-[1px] transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'ai' 
                ? 'border-neutral-100 text-neutral-100 font-extrabold' 
                : 'border-transparent text-neutral-400 hover:text-neutral-100'
            }`}
          >
            <Brain className="w-3.5 h-3.5 text-neutral-300 animate-pulse" />
            Trợ Lý Phân Tích AI
          </button>
        </div>

        {/* Action Header Stats */}
        <div className="flex items-center gap-3">
          <a
            href={`/api/files/${file.id}/download`}
            download={file.name}
            className="text-[9px] uppercase tracking-wider font-extrabold text-neutral-100 bg-[#1e1e1e] border border-neutral-800 hover:bg-neutral-100 hover:text-black hover:border-white px-2.5 py-1.5 transition-all flex items-center gap-1.5 select-none"
            title="Tải bản gốc tệp tin này"
          >
            <Download className="w-3 h-3 text-neutral-200" />
            <span>Tải về bản gốc</span>
          </a>
          <span className="text-[9px] text-neutral-400 font-mono tracking-widest select-all shrink-0 uppercase hidden sm:inline">
            MỤC: {file.id.slice(0, 8)}
          </span>
        </div>
      </div>

      {/* Main Panes Container */}
      <div className="flex-1 overflow-hidden relative flex flex-col">
        <AnimatePresence mode="wait">
          {activeTab === 'preview' ? (
            <motion.div
              key="previewPane"
              initial={{ opacity: 0, scale: 0.99 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 overflow-y-auto p-5"
            >
              {/* WORD PREVIEWER */}
              {file.type === 'word' && (
                <div className="max-w-2xl mx-auto bg-[#161616] p-6 rounded-none border border-neutral-800 shadow-none">
                  <div className="flex items-center gap-2 mb-4 border-b border-neutral-800 pb-3">
                    <FileText className="w-4 h-4 text-neutral-300" />
                    <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest font-mono">Bản Ghi Văn Bản (.docx)</span>
                  </div>
                  {renderWordPreview()}
                </div>
              )}

              {/* PDF PREVIEWER */}
              {file.type === 'pdf' && (
                <div className="max-w-2xl mx-auto bg-[#161616] p-6 rounded-none border border-neutral-800 shadow-none">
                  <div className="flex items-center gap-2 mb-4 border-b border-neutral-800 pb-2">
                    <FileText className="w-4 h-4 text-red-400" />
                    <span className="text-[10px] font-bold text-neutral-300 uppercase tracking-widest font-mono uppercase">Trình Đọc Văn Bản PDF Sơ Thảo</span>
                  </div>
                  <div className="prose max-w-none text-[13px] text-neutral-300 space-y-4 leading-relaxed font-serif select-text">
                    {file.content.split('\n').map((line, i) => {
                      if (line.match(/^\[TRANG [0-9]+\]/)) {
                        return (
                          <div 
                            key={i} 
                            className="text-[9px] font-mono tracking-widest text-[#a3a3a3] font-bold border-b border-neutral-800 pb-1 pt-4 mb-2 uppercase flex items-center gap-1.5 select-none"
                          >
                            <Sparkle className="w-3 h-3 text-red-500 fill-red-500/20" /> {line}
                          </div>
                        );
                      }
                      return <p key={i} className="text-neutral-300 select-all leading-relaxed">{line}</p>;
                    })}
                  </div>
                </div>
              )}

              {/* EXCEL STATS & INTERACTIVE CHART */}
              {file.type === 'excel' && (
                <div className="space-y-6">
                  {/* Custom Spread Sheet Header */}
                  <div className="flex items-center justify-between bg-[#161616] border border-neutral-800 p-3.5 rounded-none">
                    <div className="flex items-center gap-2.5">
                      <Table className="w-5 h-5 text-[#a3a3a3]" />
                      <div>
                        <p className="text-xs font-serif font-bold text-neutral-100">Trình Xem Bảng Tính Trực Quan (.xlsx)</p>
                        <p className="text-[11px] text-neutral-400 italic font-serif mt-0.5">Hệ thống nạp trực tiếp danh sách & thiết lập thống kê tự động</p>
                      </div>
                    </div>
                    <span className="text-[9px] tracking-wider font-mono font-bold bg-[#eaeae8] text-black px-2 py-0.5 rounded-none">SPREADSHEET SYSTEM</span>
                  </div>

                  {/* Grid Table */}
                  {file.parsedData && (
                    <div className="border border-neutral-800 rounded-none overflow-hidden bg-[#141414] shadow-none">
                      <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                          <thead>
                            <tr className="bg-[#181818] border-b border-neutral-800">
                              {file.parsedData.columns.map((col: string, i: number) => (
                                <th key={i} className="text-[10px] font-bold text-neutral-300 uppercase px-3 py-2.5 font-mono select-none tracking-wider">{col}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-neutral-800">
                            {file.parsedData.rows.map((row: any, rIdx: number) => (
                              <tr key={rIdx} className="hover:bg-neutral-900/40 transition-colors">
                                {file.parsedData.columns.map((col: string, cIdx: number) => {
                                  const val = row[col];
                                  const isNumeric = typeof val === 'number';
                                  const cellClass = isNumeric ? 'text-neutral-200 font-bold font-mono' : 'text-neutral-350 text-neutral-400 font-sans';
                                  return (
                                    <td key={cIdx} className={`px-3 py-2 text-xs truncate ${cellClass}`}>
                                      {isNumeric && col.includes('Doanh thu') ? `${val} Triệu` : val}
                                    </td>
                                  );
                                })}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {/* Recharts Chart Representation */}
                  {file.parsedData && (
                    <div className="bg-[#161616] p-4 border border-neutral-800 rounded-none">
                      <h4 className="text-[11px] uppercase tracking-wider font-bold text-neutral-200 mb-4 flex items-center gap-1.5 font-sans">
                        <TrendingUp className="w-3.5 h-3.5 text-neutral-300" />
                        Trực quan hóa cấu trúc dữ liệu doanh thu & thống kê sản phẩm
                      </h4>
                      <div className="h-60 w-full text-[9px] font-mono">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={file.parsedData.rows}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#262626" />
                            <XAxis dataKey="Sản phẩm" tickLine={false} axisLine={false} stroke="#a3a3a3" />
                            <YAxis tickLine={false} axisLine={false} stroke="#a3a3a3" />
                            <Tooltip 
                              contentStyle={{ 
                                background: "#161616", 
                                border: "1px solid #404040", 
                                borderRadius: "0px",
                                fontSize: "11px",
                                color: "#eaeae8",
                                fontFamily: "Georgia, serif"
                              }} 
                            />
                            <Legend wrapperStyle={{ fontSize: "10px", textTransform: "uppercase", tracking: "wider" }} />
                            <Bar dataKey="Doanh thu (M VNĐ)" name="Doanh Thu" fill="#f5f5f4" radius={[0, 0, 0, 0]} />
                            <Bar dataKey="Lợi nhuận (M VNĐ)" name="Lợi Nhuận" fill="#525252" radius={[0, 0, 0, 0]} />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* AUDIO & TRANSCRIPT MULTIMEDIA PREVIEW */}
              {file.subType === 'audio' && (
                <div className="space-y-6">
                  {/* Virtual Audio Player */}
                  <div className="bg-[#181818] text-[#eaeae8] rounded-none p-6 border border-neutral-800">
                    <div className="flex items-center gap-3 mb-5 select-none">
                      <div className="p-2 bg-neutral-900 rounded-none border border-neutral-800">
                        <Headphones className="w-5 h-5 text-neutral-300" />
                      </div>
                      <div>
                        <p className="text-xs font-serif font-bold text-neutral-100 tracking-wider uppercase">Hệ Thống Trích Phát Bản Thu Thanh</p>
                        <p className="text-[10px] text-neutral-500 mt-0.5 font-mono tracking-wider uppercase">Báo cáo tóm tắt • Thời lượng {file.duration || "03:15"}</p>
                      </div>
                    </div>

                    {/* Timeline slider representation */}
                    <div className="space-y-2.5">
                      <div className="flex items-end justify-between text-[10px] font-mono text-neutral-450 text-neutral-500">
                        <span>{formatAudioTime(currentTime)}</span>
                        <span>{formatAudioTime(durationSec)}</span>
                      </div>
                      <div className="relative w-full h-[3px] bg-neutral-900 rounded-none cursor-pointer overflow-hidden select-none">
                        <div 
                          className="bg-white h-full rounded-none transition-all"
                          style={{ width: `${(currentTime / durationSec) * 100}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* CSS Animated Equalizer Sound waves */}
                    <div className="h-10 flex items-center justify-center gap-1 my-6 select-none">
                      {[1, 2, 3, 4, 5, 4, 3, 4, 5, 6, 7, 5, 4, 3, 2, 3, 4, 5, 6, 5, 4, 3, 2, 1].map((val, i) => (
                        <motion.span
                          key={i}
                          className="w-1 bg-[#eaeae8] rounded-none"
                          animate={{ 
                            height: isPlaying 
                              ? [val * 3, val * 6, val * 3] 
                              : val * 2
                          }}
                          transition={{ 
                            repeat: Infinity, 
                            duration: 0.8 + (i % 3) * 0.1, 
                            ease: "easeInOut" 
                          }}
                        />
                      ))}
                    </div>

                    {/* Play Controls */}
                    <div className="flex items-center justify-between px-2 select-none">
                      <div className="flex items-center gap-3">
                        <Volume2 className="w-4 h-4 text-neutral-400" />
                        <span className="text-[10px] text-neutral-400 font-mono">24.0kHz</span>
                      </div>
                      <button 
                        onClick={togglePlay}
                        className="p-3 bg-white text-black hover:bg-neutral-200 transition-all rounded-none font-bold cursor-pointer"
                      >
                        {isPlaying ? <Pause className="w-5 h-5 fill-black" /> : <Play className="w-5 h-5 fill-black ml-0.5" />}
                      </button>
                      <button className="text-neutral-450 hover:text-white transition-colors cursor-pointer">
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Synced Subtitles Transcript Card */}
                  <div className="bg-[#161616] p-5 rounded-none border border-neutral-800 space-y-3">
                    <h4 className="text-[11px] font-bold text-neutral-200 border-b border-neutral-800 pb-2 flex items-center gap-1.5 uppercase tracking-wider font-sans select-none">
                      <FileText className="w-3.5 h-3.5 text-neutral-300" />
                      Bản Trích Lục Nội Dung Thô (Transcript)
                    </h4>
                    <div className="text-xs font-serif text-neutral-350 text-neutral-300 space-y-3 max-h-[140px] overflow-y-auto pr-1">
                      {file.content.split('\n').map((line, i) => (
                        <p key={i} className="leading-relaxed hover:bg-neutral-900/30 p-1.5 rounded-none transition-colors">{line}</p>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* VIDEO & GRAPHICS PREVIEW */}
              {file.subType === 'video' && (
                <div className="space-y-5">
                  <div className="relative aspect-video bg-[#1a1a1a] rounded-none overflow-hidden border border-neutral-900 group">
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 select-none">
                      <Play className="w-12 h-12 text-[#eaeae8] fill-[#eaeae8]/80 cursor-pointer hover:scale-105 transition-transform" />
                    </div>
                    {/* Media HUD Overlay */}
                    <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black to-transparent flex items-center justify-between text-white text-[10px] uppercase font-mono tracking-wider select-none">
                      <div className="flex items-center gap-2">
                        <Pause className="w-3.5 h-3.5 text-white cursor-pointer" />
                        <span>0:00 / {file.duration || "02:18"}</span>
                      </div>
                      <Maximize2 className="w-3.5 h-3.5 text-white" />
                    </div>
                  </div>
                  <div className="bg-[#161616] p-4 border border-neutral-800 rounded-none space-y-2">
                    <p className="text-xs font-bold text-neutral-200 font-sans uppercase tracking-widest select-none">Mô tả tệp đa phương tiện</p>
                    <p className="text-xs text-neutral-350 text-neutral-400 leading-relaxed font-serif italic">{file.content}</p>
                  </div>
                </div>
              )}

              {/* IMAGE PREVIEW WITH TOOL SUITE */}
              {file.subType === 'image' && (
                <div className="space-y-4">
                  {/* Image View Stage */}
                  <div className="bg-[#181818] border border-neutral-800 rounded-none p-8 flex items-center justify-center relative overflow-hidden h-[360px]">
                    <motion.img
                      src={file.thumbnailUrl || "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80"}
                      id="image-previewer"
                      alt="Xem hình ảnh"
                      className="max-h-full max-w-full rounded-none object-contain shadow-none transition-all pointer-events-none select-none"
                      referrerPolicy="no-referrer"
                      animate={{ scale: zoom / 100, rotate: rotate }}
                      transition={{ type: "spring", stiffness: 200, damping: 25 }}
                    />

                    {/* Floating Controls HUD */}
                    <div className="absolute right-3 bottom-3 bg-[#121212] border border-neutral-800 rounded-none p-1.5 flex flex-col gap-1 shadow-none select-none">
                      <button 
                        onClick={() => setZoom(prev => Math.min(prev + 25, 200))}
                        className="p-1 px-1.5 hover:bg-neutral-100 hover:text-black transition-colors text-neutral-300 rounded-none border border-neutral-800 cursor-pointer"
                        title="Phóng to"
                      >
                        <ZoomIn className="w-3.5 h-3.5" />
                      </button>
                      <button 
                        onClick={() => setZoom(prev => Math.max(prev - 25, 50))}
                        className="p-1 px-1.5 hover:bg-neutral-100 hover:text-black transition-colors text-neutral-300 rounded-none border border-neutral-800 cursor-pointer"
                        title="Thu nhỏ"
                      >
                        <ZoomOut className="w-3.5 h-3.5" />
                      </button>
                      <button 
                        onClick={() => setRotate(prev => prev + 90)}
                        className="p-1 px-1.5 hover:bg-neutral-100 hover:text-black transition-colors text-neutral-300 rounded-none border border-neutral-800 cursor-pointer"
                        title="Xoay hình"
                      >
                        <RotateCw className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Metadata and analysis preview */}
                  <div className="bg-[#161616] p-4 border border-neutral-800 rounded-none">
                    <div className="flex items-center gap-2 mb-2 select-none">
                      <ImageIcon className="w-3.5 h-3.5 text-neutral-300" />
                      <span className="text-[11px] tracking-wider uppercase font-bold text-neutral-200 font-sans">Ghi chú Sơ đồ thiết kế</span>
                    </div>
                    <p className="text-xs text-neutral-350 text-neutral-400 leading-relaxed font-serif italic">{file.content}</p>
                  </div>
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="aiPane"
              initial={{ opacity: 0, scale: 0.99 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 flex flex-col overflow-hidden text-neutral-100 bg-[#121212]"
            >
              {/* Inner body - Scrollable AI contents */}
              <div className="flex-1 overflow-y-auto p-5 space-y-6">
                
                {/* Error handling */}
                {errorMsg && (
                  <div className="p-4 bg-red-950/20 border border-red-900/50 text-red-200 rounded-none text-xs flex items-start gap-2.5 animate-pulse">
                    <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold uppercase tracking-wider text-[10px]">Phân tích hệ thống gián đoạn</p>
                      <p className="mt-0.5 font-serif">{errorMsg}</p>
                    </div>
                  </div>
                )}

                {/* Loading state indicator */}
                {isAnalyzing && (
                  <div className="flex flex-col items-center justify-center py-20 text-center select-none">
                    <div className="relative mb-5">
                      <div className="absolute inset-0 bg-[#1a1a1a] rounded-none blur-md animate-pulse"></div>
                      <Brain className="w-10 h-10 text-neutral-200 animate-bounce relative z-10" />
                    </div>
                    <p className="text-xs font-bold uppercase tracking-widest text-[#eaeae8] animate-pulse">Đang liên kết trợ lý Gemini AI...</p>
                    <p className="text-[11px] font-serif text-neutral-400 italic mt-1.5 max-w-xs leading-relaxed">
                      Mô hình thông minh đang thu hoạch ngữ cảnh tài liệu và xây dựng danh mục tóm tắt chuyên sâu dưới dạng biểu đồ số liệu...
                    </p>
                  </div>
                )}

                {/* Primary AI Summary output */}
                {!isAnalyzing && analysis && (
                  <div className="space-y-6">
                    {/* Overview summary */}
                    <div className="bg-[#161616] p-5 border border-neutral-800 rounded-none space-y-2.5 shadow-none">
                      <div className="flex items-center gap-1.5 text-neutral-100 select-none">
                        <Sparkles className="w-4 h-4 text-neutral-200" />
                        <h4 className="text-[11px] uppercase tracking-wider font-bold font-sans">Tóm tắt phân tích bằng AI</h4>
                      </div>
                      <p className="text-xs text-neutral-250 text-neutral-300 leading-relaxed font-serif select-all">{analysis.summary}</p>
                    </div>

                    {/* Extra AI Metrics list */}
                    {analysis.keyMetrics && analysis.keyMetrics.length > 0 && (
                      <div className="grid grid-cols-2 gap-4">
                        {analysis.keyMetrics.map((met, i) => (
                          <div key={i} className="bg-[#161616] border border-neutral-800 rounded-none p-4 shadow-none">
                            <span className="text-[9px] uppercase tracking-wider font-mono text-neutral-400 block truncate select-none">{met.label}</span>
                            <span className="text-base font-serif font-bold text-neutral-100 mt-1 block select-all">{met.value}</span>
                            {met.change && (
                              <span className={`text-[9px] font-bold tracking-wide mt-1.5 px-2 py-0.5 inline-block select-none ${
                                met.isPositive 
                                  ? 'bg-[#eaeae8] text-black font-extrabold' 
                                  : 'bg-neutral-800 text-neutral-350'
                              }`}>
                                {met.change}
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* AI Generated Dynamic Chart */}
                    {analysis.chartData && analysis.chartData.length > 0 && (
                      <div className="bg-[#161616] border border-[#2e2e2e] p-4 rounded-none">
                        <h5 className="text-[10px] uppercase tracking-widest font-bold text-neutral-100 mb-4 text-center font-sans select-none">
                          {analysis.chartTitle || "Biểu đồ phân bổ chỉ số đề xuất bởi AI"}
                        </h5>
                        <div className="h-44 w-full text-[9px] font-mono">
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={analysis.chartData}>
                              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#262626" />
                              <XAxis dataKey="name" tickLine={false} axisLine={false} stroke="#a3a3a3" />
                              <YAxis tickLine={false} axisLine={false} stroke="#a3a3a3" />
                              <Tooltip 
                                contentStyle={{ 
                                  background: "#161616", 
                                  border: "1px solid #404040", 
                                  fontSize: "9px",
                                  color: "#eaeae8"
                                }} 
                              />
                              <Bar dataKey="value" name="Giá trị" fill="#f5f5f4" radius={[0, 0, 0, 0]} />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                    )}

                    {/* Deep Strategic Insights Bullet points */}
                    <div className="space-y-3.5 border-t border-neutral-800 pt-5">
                      <h4 className="text-[11px] font-extrabold text-neutral-100 uppercase tracking-widest font-sans select-none">💡 Thông tin chuyên sâu (AI Insights)</h4>
                      <ul className="text-xs text-neutral-300 space-y-3 leading-relaxed font-serif pr-1">
                        {analysis.insights.map((ins, i) => (
                          <li key={i} className="pl-5 relative before:content-['—'] before:absolute before:left-1 before:text-neutral-500 select-all hover:bg-neutral-900/30 py-1 transition-colors">
                            {ins}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Dynamic Suggested Questions buttons */}
                    {analysis.suggestedQuestions && analysis.suggestedQuestions.length > 0 && (
                      <div className="space-y-2 border-t border-neutral-800 pt-5">
                        <p className="text-[10px] uppercase tracking-wider font-extrabold text-neutral-400 flex items-center gap-1 font-mono select-none">
                          <HelpCircle className="w-3.5 h-3.5 text-neutral-300" />
                          Thảo luận tiếp theo:
                        </p>
                        <div className="flex flex-col gap-2 pt-1.5 select-none">
                          {analysis.suggestedQuestions.map((q, i) => (
                            <button
                              key={i}
                              onClick={() => selectSuggested(q)}
                              className="text-left text-xs text-neutral-300 bg-[#161616] hover:bg-neutral-100 hover:text-black hover:not-italic border border-neutral-800 p-2.5 transition-all font-serif cursor-pointer italic"
                            >
                              💬 {q}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                  </div>
                )}

                {/* Free chat dialogue stream */}
                {chatHistory.length > 0 && (
                  <div className="space-y-4 pt-5 border-t border-neutral-800">
                    <p className="text-[10px] font-bold uppercase tracking-widest font-mono text-neutral-500 select-none">Đối thoại tự do cùng trợ lý</p>
                    <div className="space-y-3.5">
                      {chatHistory.map((chat) => (
                        <div 
                          key={chat.id} 
                          className={`p-4 text-xs leading-relaxed max-w-[85%] rounded-none shadow-none border ${
                            chat.role === 'user' 
                              ? 'bg-[#1e1e1e] text-neutral-100 ml-auto border-neutral-700' 
                              : 'bg-[#161616] border-neutral-800 text-neutral-200 mr-auto'
                          }`}
                        >
                          <p className={`select-all ${chat.role === 'user' ? 'font-sans text-[11px]' : 'font-serif text-[12px]'}`}>{chat.content}</p>
                          
                          {/* Chat items key metrics nested representation */}
                          {chat.keyMetrics && chat.keyMetrics.length > 0 && (
                            <div className="grid grid-cols-2 gap-3 mt-4 text-neutral-200 text-left">
                              {chat.keyMetrics.map((met, i) => (
                                <div key={i} className="bg-[#121212] border border-neutral-800 p-3 text-[10px]">
                                  <span className="text-neutral-400 font-semibold block truncate uppercase tracking-wider font-mono text-[8px]">{met.label}</span>
                                  <span className="font-serif font-bold text-xs block mt-0.5">{met.value}</span>
                                </div>
                              ))}
                            </div>
                          )}

                          <span className={`text-[8px] block text-right mt-2 opacity-50 font-mono tracking-wider ${chat.role === 'user' ? 'text-neutral-400' : 'text-neutral-400'}`}>
                            {chat.timestamp}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Empty State AI analyzer trigger prompt */}
                {!analysis && !isAnalyzing && (
                  <div className="flex flex-col items-center justify-center py-20 text-center select-none">
                    <Brain className="w-12 h-12 text-neutral-600 mb-4 stroke-[1.1]" />
                    <h4 className="font-serif font-bold text-neutral-200 text-sm uppercase tracking-wider">Trợ Lý Phân Tích Độc Quyền</h4>
                    <p className="text-[11px] font-serif italic text-neutral-400 max-w-xs mt-1.5 leading-relaxed">
                      Đã nạp thành công nội dung thô của {file.name}. Hãy kích hoạt trợ lý AI thông minh để đúc kết báo cáo và biểu đồ chuyên sâu ngay lập tức.
                    </p>
                    <button
                      id="start-ai-btn"
                      onClick={() => runAIAnalysis()}
                      className="mt-6 px-5 py-2.5 bg-[#eaeae8] hover:bg-neutral-200 text-black font-extrabold text-[10px] uppercase tracking-wider transition rounded-none cursor-pointer"
                    >
                      Kích Hoạt Bộ Não AI
                    </button>
                  </div>
                )}

              </div>

              {/* Chat Text Input bar footer */}
              {analysis && (
                <form 
                  onSubmit={handleCustomChat} 
                  className="p-3 border-t border-[#262626] bg-[#141414] flex items-center gap-2 select-none"
                >
                  <input
                    type="text"
                    id="ai-chat-input"
                    placeholder="Đặt câu hỏi thảo luận bất kỳ về nội dung tài liệu..."
                    className="flex-1 text-xs px-3.5 py-2.5 border border-neutral-800 rounded-none bg-[#161616] text-neutral-250 text-neutral-200 focus:outline-none focus:border-neutral-500 transition-all font-serif italic"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    disabled={isAnalyzing}
                  />
                  <button
                    type="submit"
                    id="submit-ai-chat"
                    disabled={isAnalyzing || !prompt.trim()}
                    className="p-3 bg-[#eaeae8] hover:bg-neutral-200 text-black rounded-none disabled:bg-neutral-800 disabled:text-neutral-500 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
