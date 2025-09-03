// Simple logo converter - uses PNG file directly
export interface LogoData {
  dataUrl: string;
  width: number;
  height: number;
}

// Logo file path and dimensions
const LOGO_PATH = "/images/logo.png";
const LOGO_WIDTH = 338;
const LOGO_HEIGHT = 36;

export function getLogoForPDF(): LogoData {
  return {
    dataUrl: LOGO_PATH,
    width: LOGO_WIDTH,
    height: LOGO_HEIGHT,
  };
}

// No more file reading or conversion - logo is ready to use
export function getTextLogo(): string {
  return "Drive FITT";
}
