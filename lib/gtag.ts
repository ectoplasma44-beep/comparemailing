export const GA_ID = "G-7B3FL5547F";

declare global {
  interface Window {
    gtag: (command: string, ...args: unknown[]) => void;
    dataLayer: unknown[];
  }
}

export const pageview = (url: string) => {
  window.gtag("config", GA_ID, { page_path: url });
};

export const event = (action: string, params: Record<string, unknown>) => {
  window.gtag("event", action, params);
};
