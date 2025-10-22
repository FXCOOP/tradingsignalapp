// Global type declarations

// Google Analytics gtag
declare function gtag(
  command: 'event' | 'config' | 'set' | 'js',
  targetId: string,
  config?: Record<string, any>
): void;

// Make gtag available on window
interface Window {
  gtag?: typeof gtag;
  dataLayer?: any[];
}
