
import { Tool } from './types';

export const TOOLS: Tool[] = [
  // Existing Core Tools
  { id: 'qr-generator', name: 'QR Code Pro', description: 'Generate custom QR codes with color control. Download as PNG instantly.', icon: 'qr_code_2', category: 'Converters', isHot: true },
  { id: 'image-compressor', name: 'Image Compressor', description: 'Reduce image file size by up to 90% without losing visible quality.', icon: 'compress', category: 'Image Tools', isHot: true },
  { id: 'password-checker', name: 'Password Suite', description: 'Check password strength and generate unhackable keys locally.', icon: 'enhanced_encryption', category: 'Security' },
  { id: 'word-counter', name: 'Word Analyst', description: 'Advanced word count, reading time, and readability scoring.', icon: 'reorder', category: 'Text Tools' },
  { id: 'invoice-generator', name: 'Invoice Maker', description: 'Create professional PDF-ready invoices for your clients in seconds.', icon: 'receipt_long', category: 'Dev Tools' },
  { id: 'color-palette', name: 'Palette Extractor', description: 'Upload an image to extract its dominant color palette instantly.', icon: 'palette', category: 'Image Tools' },

  // New Student Kit Tools
  { id: 'pdf-merger', name: 'Merge PDF', description: 'Combine multiple PDF documents into one single file instantly.', icon: 'merge_type', category: 'Student Kit', isHot: true },
  { id: 'images-to-pdf', name: 'Images to PDF', description: 'Convert your JPG/PNG photos into a professional PDF document.', icon: 'picture_as_pdf', category: 'Student Kit' },
  { id: 'zip-creator', name: 'ZIP Creator', description: 'Package multiple assignment files into a clean ZIP archive for submission.', icon: 'folder_zip', category: 'Student Kit' },
  { id: 'scientific-calc', name: 'Study Calc', description: 'A scientific calculator for complex math and engineering problems.', icon: 'calculate', category: 'Student Kit' },
  { id: 'exam-countdown', name: 'Exam Tracker', description: 'Count down to your upcoming exams and submission deadlines.', icon: 'alarm', category: 'Student Kit' },
  { id: 'timetable-gen', name: 'Timetable Maker', description: 'Create a visually pleasing class schedule and export as image.', icon: 'calendar_month', category: 'Student Kit' }
];

export const CATEGORIES: string[] = ['All', 'Student Kit', 'Image Tools', 'Text Tools', 'Dev Tools', 'Converters', 'Security'];
