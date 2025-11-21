require("@testing-library/jest-dom");

// jsdom 환경에서 Mantine 등의 컴포넌트가 사용하는 ResizeObserver 폴리필
if (typeof window !== "undefined" && typeof window.ResizeObserver === "undefined") {
  class ResizeObserver {
    callback;
    constructor(callback) {
      this.callback = callback;
    }
    observe() {}
    unobserve() {}
    disconnect() {}
  }

  window.ResizeObserver = ResizeObserver;
}

