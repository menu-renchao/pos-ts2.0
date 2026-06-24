export const languageOptions = {
  chinese: 'Chinese',
  default: 'Default',
} as const;

export type LanguageOption = (typeof languageOptions)[keyof typeof languageOptions];
