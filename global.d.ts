// global.d.ts
export {};

declare global {
  interface Window {
    dataLayer: any[];
    REQUIRED_CODE_ERROR_MESSAGE: string;
    LOCALE: string;
    EMAIL_INVALID_MESSAGE: string;
    SMS_INVALID_MESSAGE: string;
    REQUIRED_ERROR_MESSAGE: string;
    GENERIC_INVALID_MESSAGE: string;
    translation: {
      common: {
        selectedList: string;
        selectedLists: string;
      };
    };
    AUTOHIDE: boolean;
  }
}
