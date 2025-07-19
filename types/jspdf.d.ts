declare module 'jspdf' {
  export class jsPDF {
    constructor(orientation?: string, unit?: string, format?: string);
    
    setFont(fontName: string, style?: string): jsPDF;
    setFontSize(size: number): jsPDF;
    setTextColor(r: number, g: number, b: number): jsPDF;
    text(text: string | string[], x: number, y: number): jsPDF;
    splitTextToSize(text: string, maxWidth: number): string[];
    addPage(): jsPDF;
    setPage(pageNumber: number): jsPDF;
    save(filename: string): void;
    
    internal: {
      getNumberOfPages(): number;
      pages: any[];
      events: any;
      scaleFactor: number;
      pageSize: any;
      getEncryptor(objectId: number): (data: string) => string;
    };
  }
} 