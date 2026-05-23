import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI, Type } from "@google/genai";
import { createServer as createViteServer } from "vite";
import * as XLSX from "xlsx";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '25mb' }));

// In-memory database of files pre-loaded with rich, high-fidelity vietnamese business and multimedia data.
interface FileStoreEntry {
  id: string;
  name: string;
  type: 'word' | 'excel' | 'pdf' | 'multimedia';
  subType: 'docx' | 'xlsx' | 'pdf' | 'audio' | 'video' | 'image';
  size: number;
  uploadedAt: string;
  content: string;
  parsedData?: any;
  mimeType: string;
  duration?: string;
  thumbnailUrl?: string;
}

let filesDb: FileStoreEntry[] = [
  {
    id: "preloaded-docx-1",
    name: "Ke_Hoach_Kinh_Doanh_Cua_Hang_Convenience_2026.docx",
    type: "word",
    subType: "docx",
    size: 45280,
    uploadedAt: "2026-05-23T10:30:00Z",
    mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    content: `KẾ HOẠCH CHIẾN LƯỢC KINH DOANH: PHÁT TRIỂN CHUỖI SIÊU THỊ TIỆN LỢI ECO-MART 2026
Người thực hiện: Ban Kế Hoạch & Phát Triển Doanh Nghiệp
Ngày tạo: 15/05/2026
Phiên bản: 1.4 CHÍNH THỨC

I. GIỚI THIỆU CHUNG
Dự án siêu thị tiện lợi sinh thái Eco-Mart hướng tới phục vụ cư dân đô thị hiện đại tại khu vực Trung tâm Hà Nội và TP. Hồ Chí Minh với triết lý "Tiện ích Xanh - Tiêu dùng Lành". Cửa hàng tập trung cung cấp thực phẩm rau quả hữu cơ sạch, đồ uống healthy uống liền, văn phòng phẩm tái chế và hàng hóa thiết yếu phục vụ 24/7.

II. SWOT ANALYSIS TRỰC QUAN
1. Điểm mạnh (Strengths):
- Triết lý kinh doanh Xanh độc lập duy nhất hiện nay.
- Chuỗi cung ứng ký kết trực tiếp với các trang trại nuôi trồng Organic thuộc Đà Lạt và Đồng Nai, giảm 15% trung gian phí.
- Ứng dụng tích điểm thông minh Loyalty App thu hút 15.000 user thử nghiệm.

2. Điểm yếu (Weaknesses):
- Chi phí bảo quản lạnh hoa quả tươi cao hơn 22% so với hàng hóa thông thường.
- Sức ép tuyển dụng nhân sự ca đêm 24/7 có tỉ lệ nghỉ việc cao.
- Độ phủ thương hiệu ban đầu còn mỏng ở khu dân cư truyền thống.

3. Cơ hội (Opportunities):
- Trào lưu sống khỏe, eat clean tăng vọt 45% hằng năm của cư dân Gen Z và Gen Y.
- Cột mốc số hóa thúc đẩy giao hàng nhanh chặng cuối trong 15 phút.

4. Thách thức (Threats):
- Cạnh tranh trực tiếp từ các chuỗi lớn dồi dào tài chính như WinMart, Circle K, 7-Eleven.
- Biến động giá xăng dầu tác động trực tiếp lên logistics chuỗi cung ứng.

III. KẾ HOẠCH TÀI CHÍNH & MỤC TIÊU SỐ LIỆU
- Mục tiêu tổng doanh thu cả chuỗi năm đầu tiên: 12 tỷ VNĐ với tỷ suất lợi nhuận gộp mục tiêu đạt 28-31%.
- Điểm hòa vốn dự kiến đạt được tại mỗi điểm bán sau 8 tháng vận hành.
- Chi phí marketing khai trương chiếm 12% ngân sách giai đoạn đầu, tập trung 80% vào chạy quảng cáo địa quán bán kính 2km xung quanh cửa hàng.`
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
        totalRevenue: 600, // Triệu VNĐ
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
    content: `[NỘI DUNG GHI ÂM TRANSSCRIPT - Đã được đồng bộ]
00:10 - Trưởng Ban: Chào mọi người, hôm nay chúng ta tập trung rà soát vận hành ca tối 24/7 của các điểm bán khu vực Hoàn Kiếm và Hai Bà Trưng. Hiện có phản ánh là hàng tươi sống hết sớm từ 20:00 tối rước khi ca đêm bắt đầu.
00:45 - Trưởng kho Cầu Giấy: Dạ báo cáo, hiện tại lượng xe cấp hàng tươi sống chỉ chạy khung giờ 15:00 chiều là chuyến cuối. Do kẹt xe đường phố HN tầm chiều tối nên tài xế hay giao trễ gây hao hụt sản phẩm tươi. Đề xuất dịch lịch cấp hàng tươi xuống 13:00 chiều để kíp cửa hàng kịp sơ chế đóng khay trưng bày.
01:30 - Trưởng Ban: Đồng ý đề xuất đổi giờ xe chạy. Từ thứ Hai tuần sau kho tổng chuyển giờ xuất bến sang 12:30. Trách nhiệm các cửa hàng trưởng phải phân công nhân viên nhận bàn giao khay kiểm đếm chuẩn.
02:10 - Trọng tâm nhân sự: Tuần này tỉ lệ nghỉ ca tối quận Hoàn Kiếm tăng do mùa nóng. Yêu cầu bộ phận nhân sự rà soát tăng hỗ trợ phụ cấp trực ca đêm 25% trực lễ và bổ sung thêm 2 cộng tác viên thời vụ dự phòng gấp.`
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
    content: `[PHÂN TÍCH THÔNG TIN SƠ ĐỒ MẶT BẰNG GIAN HÀNG]
- Không gian diện tích sử dụng: 85m2 hình chữ nhật đứng.
- Khu vực Đón Khách (Khu A): Trưng bày các kệ hàng sinh thái xanh, rau củ quả, hoa quả cắt sẵn nhập khẩu được tưới ẩm định kỳ.
- Khu vực Trung Tâm (Khu B): Đồ khô đóng hộp hữu cơ và sữa hạt xếp so le dọc 3 luồng lối đi chính, khoảng cách lối đi rộng 1.2M tối ưu xe đẩy mini.
- Khu vực Quầy Thu Ngân (Khu C): Lắp đặt hệ thống máy POS tự động và quầy bánh ngọt ăn liền để gia tăng quyết định mua hàng phút chót (impulse buys). Hệ thống có đèn LED ấm 3000K tạo nét thân mật, organic.`
  }
];

// Lazy initialization of GoogleGenAI SDK
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      throw new Error("GEMINI_API_KEY is missing. Please add it to Settings > Secrets in AI Studio.");
    }
    aiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

// REST APIs
app.get("/api/files", (req, res) => {
  res.json(filesDb);
});

app.post("/api/files", (req, res) => {
  try {
    const { name, type, subType, content, size, parsedData, mimeType, duration, thumbnailUrl } = req.body;
    
    if (!name || !type || !subType) {
      return res.status(400).json({ error: "Thừa hoặc thiếu trường dữ liệu bắt buộc (name, type, subType)." });
    }

    const newFile: FileStoreEntry = {
      id: "file-" + Date.now().toString(),
      name,
      type,
      subType,
      size: size || content.length,
      uploadedAt: new Date().toISOString(),
      content: content || "",
      parsedData: parsedData || null,
      mimeType: mimeType || "application/octet-stream",
      duration: duration,
      thumbnailUrl: thumbnailUrl
    };

    filesDb.unshift(newFile);
    res.status(201).json(newFile);
  } catch (err: any) {
    res.status(500).json({ error: "Không thể thêm tệp mới: " + err.message });
  }
});

app.delete("/api/files/:id", (req, res) => {
  const { id } = req.params;
  const index = filesDb.findIndex(f => f.id === id);
  if (index === -1) {
    return res.status(104).json({ error: "Không tìm thấy tệp yêu cầu." });
  }
  filesDb.splice(index, 1);
  res.json({ success: true, message: "Xóa tệp thành công." });
});

// Endpoint to download files in high-fidelity
app.get("/api/files/:id/download", (req, res) => {
  try {
    const { id } = req.params;
    const file = filesDb.find(f => f.id === id);
    if (!file) {
      return res.status(404).send("Không tìm thấy tệp tin.");
    }

    // Set download header
    res.setHeader("Content-Disposition", `attachment; filename*=UTF-8''${encodeURIComponent(file.name)}`);

    // 1. Excel Generation from parsedData
    if (file.type === "excel" && file.parsedData && file.parsedData.rows) {
      const ws = XLSX.utils.json_to_sheet(file.parsedData.rows);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
      const buffer = XLSX.write(wb, { type: "buffer", bookType: "xlsx" });
      res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
      return res.send(buffer);
    }

    // 2. Base64 media data (images or recordings generated during runtime)
    if (file.thumbnailUrl && file.thumbnailUrl.startsWith("data:")) {
      const parts = file.thumbnailUrl.split(",");
      const mime = parts[0].match(/:(.*?);/)?.[1] || file.mimeType;
      const base64Data = parts[1];
      const buffer = Buffer.from(base64Data, "base64");
      res.setHeader("Content-Type", mime);
      return res.send(buffer);
    }

    // 3. Defaults to sending content as plain text / document representations
    res.setHeader("Content-Type", file.mimeType || "text/plain; charset=utf-8");
    return res.send(file.content);
  } catch (err: any) {
    console.error("Lỗi download file:", err);
    return res.status(500).send("Gặp lỗi khi tạo bản tải xuống: " + err.message);
  }
});

// AI analysis route combining Gemini with context from the file
app.post("/api/analyze", async (req, res) => {
  try {
    const { fileId, customPrompt } = req.body;
    
    const file = filesDb.find(f => f.id === fileId);
    if (!file) {
      return res.status(404).json({ error: "Không tìm thấy file để phân tích." });
    }

    let fileContext = `Tên tài liệu: ${file.name}\nLoại tài liệu: ${file.type} (${file.subType})\nDung lượng: ${(file.size / 1024).toFixed(1)} KB\nNội dung chính:\n${file.content}`;
    if (file.parsedData) {
      fileContext += `\nDữ liệu cấu trúc bảng:\n${JSON.stringify(file.parsedData, null, 2)}`;
    }

    const ai = getGeminiClient();

    let userInstruction = `Hãy phân tích tài liệu này thật sâu sắc.`;
    if (customPrompt) {
      userInstruction = `Người dùng hỏi cụ thể về tài liệu này: "${customPrompt}"`;
    }

    const promptText = `Bạn là Trợ Lý Phân Tích Dữ Liệu AI cao cấp. Phân tích ngữ cảnh dữ liệu tài liệu sau đây để trả về câu trả lời có tính chuyên môn sâu, thiết kế trực quan và định dạng JSON nghiêm ngặt.

Bối cảnh tệp tài liệu:
${fileContext}

Yêu cầu người dùng hoặc truy vấn:
${userInstruction}

HÃY PHẢN HỒI HOÀN TOÀN BẰNG TIẾNG VIỆT.
Bạn bắt buộc phải trả về dữ liệu tuân thủ định dạng JSON khớp 100% với schema dưới đây. Định dạng phải chuẩn chỉnh, không bị vỡ ngoặc, không chứa chữ bọc ngoài JSON:

Định dạng JSON yêu cầu:
{
  "summary": "Tóm tắt ngắn gọn phân tích tệp hoặc trả lời trực diện câu hỏi của người dùng (tối đa 4 câu rõ ràng, chuyên sâu)",
  "keyMetrics": [
    {
      "label": "Nhãn chỉ số (ví dụ: Tăng trưởng, Số lượng, Vấn đề cốt lõi...)",
      "value": "Giá trị của chỉ số kèm đơn vị (ví dụ: '24%', '3 nhân sự', '+150M VNĐ')",
      "change": "Thay đổi so với kỳ trước hoặc trạng thái quan trọng (ví dụ: 'Đạt KPI', 'Tăng mạnh', 'Cần rà soát')",
      "isPositive": true
    }
  ],
  "insights": [
    "Viết câu nhận định hiểu biết sâu sắc thứ nhất rút ra từ số liệu/văn bản kèm lý giải chiến lược",
    "Viết câu nhận định sâu sắc thứ hai...",
    "Viết câu nhận định sâu sắc thứ ba..."
  ],
  "suggestedQuestions": [
    "Đề xuất câu hỏi chat tiếp theo thứ nhất liên quan đến tệp",
    "Đề xuất câu hỏi chat thứ hai...",
    "Đề xuất câu hỏi chat thứ ba..."
  ],
  "chartData": [
    { "name": "Nhãn trục X hoặc thành phần cơ cấu", "value": 150 }
  ],
  "chartTitle": "Tiêu đề biểu đồ tương ứng với dữ liệu phân tích (hoặc để trống nếu không có dữ liệu biểu đồ phù hợp)"
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: promptText,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: { type: Type.STRING },
            keyMetrics: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  label: { type: Type.STRING },
                  value: { type: Type.STRING },
                  change: { type: Type.STRING },
                  isPositive: { type: Type.BOOLEAN }
                },
                required: ["label", "value"]
              }
            },
            insights: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            suggestedQuestions: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            chartData: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  value: { type: Type.NUMBER }
                },
                required: ["name", "value"]
              }
            },
            chartTitle: { type: Type.STRING }
          },
          required: ["summary", "insights", "suggestedQuestions"]
        }
      }
    });

    const resultText = response.text || "{}";
    res.setHeader('Content-Type', 'application/json');
    res.send(resultText);

  } catch (err: any) {
    console.error("Gemini Error:", err);
    res.status(500).json({ 
      error: "Không thể xử lý phân tích bằng AI. Vui lòng kiểm tra lại thiết lập khóa API Gemini.", 
      details: err.message 
    });
  }
});

// Vite Server Configuration for Full-stack Integration
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Development server booted on port ${PORT}`);
  });
}

startServer();
