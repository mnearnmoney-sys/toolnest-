
export type ToolCategory = 'All' | 'PDF Tools' | 'Image Tools' | 'Text Tools' | 'Dev Tools' | 'Converters' | 'Security' | 'Student Kit';

export interface Tool {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: ToolCategory;
  isHot?: boolean;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
