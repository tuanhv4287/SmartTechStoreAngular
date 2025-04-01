declare global {
  interface Window {
    fbAsyncInit: () => void;
    FB: any; // Hoặc bạn có thể thay kiểu any bằng kiểu chính xác hơn nếu cần
  }
}
export {};
