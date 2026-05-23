export interface FileEntry {
  id: string;
  name: string;
  type: 'word' | 'excel' | 'pdf' | 'multimedia';
  subType: 'docx' | 'xlsx' | 'pdf' | 'audio' | 'video' | 'image';
  size: number;
  uploadedAt: string;
  content: string; // Plain text or markdown representation 
  parsedData?: any; // Structured fields (e.g., sheet tables, subtitles)
  mimeType: string;
  duration?: string; // e.g. "05:24" for audio
  thumbnailUrl?: string; // For images
}

export interface MetricItem {
  label: string;
  value: string | number;
  change?: string;
  isPositive?: boolean;
}

export interface AIAnalysisResult {
  summary: string;
  keyMetrics?: MetricItem[];
  insights: string[];
  suggestedQuestions: string[];
  chartData?: { name: string; value: number; [key: string]: any }[];
  chartTitle?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  keyMetrics?: MetricItem[];
}

export interface DashboardStats {
  totalStorage: string; // e.g., "14.2 GB"
  usedStorage: string; // e.g., "4.8 GB"
  percentage: number; // e.g., 34
  documentCount: number;
  spreadsheetCount: number;
  mediaCount: number;
  aiAnalysesExecuted: number;
}
