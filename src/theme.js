const THEME_PRESETS = {
  default: {
    '--color-accent-primary': '#f2055c',
    '--color-accent-primary-rgb': '242, 5, 92',
    '--color-accent-primary-dark': '#600433',
    '--color-accent-secondary': '#00d4ff',
    '--color-accent-secondary-rgb': '0, 212, 255',
    '--color-highlight': '#ffe179',
    '--color-highlight-rgb': '255, 225, 121',
    '--color-text-primary': '#f4f4f4',
    '--color-text-on-accent': '#150f1d',
    '--color-background-base': '#08060c',
    '--body-background':
      'radial-gradient(circle at top, #1f0f2d, #05030c 55%), url("data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"%3E%3Cg fill="%2300d4ff" fill-opacity="0.05"%3E%3Ccircle cx="20" cy="20" r="4"/%3E%3Ccircle cx="120" cy="60" r="6"/%3E%3Ccircle cx="60" cy="140" r="5"/%3E%3Ccircle cx="180" cy="110" r="3"/%3E%3C/g%3E%3C/svg%3E")',
    '--page-overlay-image':
      'url("data:image/svg+xml,%3Csvg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="%2300d4ff" fill-opacity="0.1" fill-rule="evenodd"%3E%3Cpath d="M0 20h40v2H0z"/%3E%3Cpath d="M20 0h2v40h-2z"/%3E%3C/g%3E%3C/svg%3E")',
  },
  matrix: {
    '--color-accent-primary': '#39ff14',
    '--color-accent-primary-rgb': '57, 255, 20',
    '--color-accent-primary-dark': '#0b3d10',
    '--color-accent-secondary': '#00ff9d',
    '--color-accent-secondary-rgb': '0, 255, 157',
    '--color-highlight': '#b6ff5c',
    '--color-highlight-rgb': '182, 255, 92',
    '--color-text-primary': '#e6ffe9',
    '--color-text-on-accent': '#021f05',
    '--color-background-base': '#020805',
    '--body-background':
      'radial-gradient(circle at top, #022b0a, #010403 55%), url("data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"%3E%3Cg fill="%2300ff9d" fill-opacity="0.06"%3E%3Ccircle cx="20" cy="20" r="4"/%3E%3Ccircle cx="120" cy="60" r="6"/%3E%3Ccircle cx="60" cy="140" r="5"/%3E%3Ccircle cx="180" cy="110" r="3"/%3E%3C/g%3E%3C/svg%3E")',
    '--page-overlay-image':
      'url("data:image/svg+xml,%3Csvg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="%2300ff9d" fill-opacity="0.12" fill-rule="evenodd"%3E%3Cpath d="M0 20h40v2H0z"/%3E%3Cpath d="M20 0h2v40h-2z"/%3E%3C/g%3E%3C/svg%3E")',
  },
  neonoir: {
    '--color-accent-primary': '#ff1b3d',
    '--color-accent-primary-rgb': '255, 27, 61',
    '--color-accent-primary-dark': '#3a0010',
    '--color-accent-secondary': '#8c92a3',
    '--color-accent-secondary-rgb': '140, 146, 163',
    '--color-highlight': '#ff4f5e',
    '--color-highlight-rgb': '255, 79, 94',
    '--color-text-primary': '#f2f2f2',
    '--color-text-on-accent': '#0c0c0c',
    '--color-background-base': '#080808',
    '--body-background':
      'radial-gradient(circle at top, #1a1a1a, #050505 55%), url("data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"%3E%3Cg fill="%23ff1b3d" fill-opacity="0.04"%3E%3Ccircle cx="20" cy="20" r="4"/%3E%3Ccircle cx="120" cy="60" r="6"/%3E%3Ccircle cx="60" cy="140" r="5"/%3E%3Ccircle cx="180" cy="110" r="3"/%3E%3C/g%3E%3C/svg%3E")',
    '--page-overlay-image':
      'url("data:image/svg+xml,%3Csvg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="%23ff1b3d" fill-opacity="0.08" fill-rule="evenodd"%3E%3Cpath d="M0 20h40v2H0z"/%3E%3Cpath d="M20 0h2v40h-2z"/%3E%3C/g%3E%3C/svg%3E")',
  },
};

const DEFAULT_THEME = 'default';
const THEME_STORAGE_KEY = 'kpNK.theme';

const isThemeSupported = (themeName) => Object.prototype.hasOwnProperty.call(THEME_PRESETS, themeName);

const getStoredTheme = () => {
  if (typeof window === 'undefined' || typeof window.sessionStorage === 'undefined') {
    return null;
  }

  try {
    const storedTheme = window.sessionStorage.getItem(THEME_STORAGE_KEY);
    return storedTheme && isThemeSupported(storedTheme) ? storedTheme : null;
  } catch (error) {
    console.warn('Unable to read stored theme preference from sessionStorage.', error);
    return null;
  }
};

let currentTheme = getStoredTheme() || DEFAULT_THEME;

const applyThemeVariables = (themeName) => {
  if (typeof document === 'undefined') return;
  const theme = THEME_PRESETS[themeName];
  if (!theme) {
    return;
  }

  const root = document.documentElement;
  Object.entries(theme).forEach(([variable, value]) => {
    root.style.setProperty(variable, value);
  });
  root.dataset.theme = themeName;
  currentTheme = themeName;
};

const persistTheme = (themeName) => {
  if (typeof window === 'undefined' || typeof window.sessionStorage === 'undefined') {
    return;
  }

  try {
    window.sessionStorage.setItem(THEME_STORAGE_KEY, themeName);
  } catch (error) {
    console.warn('Unable to persist theme preference to sessionStorage.', error);
  }
};

export const setTheme = (option = DEFAULT_THEME) => {
  const normalized = typeof option === 'string' ? option.trim().toLowerCase() : DEFAULT_THEME;
  const themeName = isThemeSupported(normalized) ? normalized : DEFAULT_THEME;

  if (!isThemeSupported(normalized)) {
    console.warn(
      `Unknown theme "${option}". Falling back to "${DEFAULT_THEME}". Available themes: ${getAvailableThemes().join(', ')}`,
    );
  }

  applyThemeVariables(themeName);
  persistTheme(themeName);
  return currentTheme;
};

export const getCurrentTheme = () => currentTheme;

export const getAvailableThemes = () => Object.keys(THEME_PRESETS);

export const initializeTheme = () => {
  applyThemeVariables(currentTheme);
};

export default THEME_PRESETS;
