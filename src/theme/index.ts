import { alpha, createTheme } from '@mui/material/styles';
import type { ThemeOptions } from '@mui/material';

// Create base theme colors
const PRIMARY = {
  lighter: '#D0E9FF',
  light: '#73BAFB',
  main: '#1976D2',
  dark: '#0E4690',
  darker: '#072A57',
};

const SECONDARY = {
  lighter: '#E6F5FD',
  light: '#88CCF6',
  main: '#0288D1',
  dark: '#01579B',
  darker: '#003058',
};

const SUCCESS = {
  lighter: '#E4F8EC',
  light: '#6CD9A5',
  main: '#2E7D32',
  dark: '#1B5E20',
  darker: '#0A3315',
};

const WARNING = {
  lighter: '#FFF8E1',
  light: '#FFD54F',
  main: '#FF9800',
  dark: '#E65100',
  darker: '#7A2C00',
};

const ERROR = {
  lighter: '#FFE9EA',
  light: '#FF8A91',
  main: '#D32F2F',
  dark: '#B71C1C',
  darker: '#7A0C0C',
};

const INFO = {
  lighter: '#E3F2FD',
  light: '#64B5F6',
  main: '#2196F3',
  dark: '#0D47A1',
  darker: '#042472',
};

const GREY = {
  0: '#FFFFFF',
  100: '#F9FAFB',
  200: '#F4F6F8',
  300: '#DFE3E8',
  400: '#C4CDD5',
  500: '#919EAB',
  600: '#637381',
  700: '#454F5B',
  800: '#212B36',
  900: '#161C24',
};

// Common shadow values for elevation
const COMMON_SHADOWS = {
  card: '0px 2px 20px rgba(0, 0, 0, 0.08)',
  dialog: '0px 8px 32px rgba(0, 0, 0, 0.12)',
  dropdown: '0px 4px 16px rgba(0, 0, 0, 0.1)',
  button: '0px 2px 4px rgba(0, 0, 0, 0.08)',
  input: '0px 2px 8px rgba(0, 0, 0, 0.06)',
};

// Border radius values
const shape = {
  borderRadius: 8,
  borderRadiusLg: 12,
  borderRadiusSm: 4,
};

// Typography configuration
const typography = {
  fontFamily: 'system-ui, Avenir, Helvetica, Arial, sans-serif',
  h1: { fontSize: '2.5rem', fontWeight: 700, lineHeight: 1.2 },
  h2: { fontSize: '2rem', fontWeight: 700, lineHeight: 1.3 },
  h3: { fontSize: '1.75rem', fontWeight: 600, lineHeight: 1.4 },
  h4: { fontSize: '1.5rem', fontWeight: 600, lineHeight: 1.4 },
  h5: { fontSize: '1.25rem', fontWeight: 600, lineHeight: 1.5 },
  h6: { fontSize: '1.125rem', fontWeight: 600, lineHeight: 1.5 },
  subtitle1: { fontSize: '1rem', fontWeight: 500, lineHeight: 1.5 },
  subtitle2: { fontSize: '0.875rem', fontWeight: 500, lineHeight: 1.57 },
  body1: { fontSize: '1rem', lineHeight: 1.5 },
  body2: { fontSize: '0.875rem', lineHeight: 1.57 },
  caption: { fontSize: '0.75rem', lineHeight: 1.66 },
  overline: { fontSize: '0.75rem', lineHeight: 1.66, textTransform: 'uppercase' as const },
  button: { fontSize: '0.875rem', fontWeight: 500, lineHeight: 1.5, textTransform: 'none' as const },
};

// Generate themed shadows based on the theme's mode
const createShadows = (mode: 'light' | 'dark') => {
  const baseShadows = Array(25).fill('none') as string[];
  
  if (mode === 'light') {
    baseShadows[1] = '0px 1px 2px rgba(0, 0, 0, 0.08)';
    baseShadows[2] = '0px 1px 5px rgba(0, 0, 0, 0.08)';
    baseShadows[3] = '0px 2px 8px rgba(0, 0, 0, 0.1)';
    baseShadows[4] = '0px 4px 12px rgba(0, 0, 0, 0.1)';
    baseShadows[6] = '0px 6px 18px rgba(0, 0, 0, 0.12)';
    baseShadows[8] = '0px 8px 24px rgba(0, 0, 0, 0.14)';
    baseShadows[10] = '0px 10px 32px rgba(0, 0, 0, 0.16)';
    baseShadows[12] = '0px 12px 48px rgba(0, 0, 0, 0.18)';
    baseShadows[16] = '0px 16px 72px rgba(0, 0, 0, 0.2)';
    baseShadows[24] = '0px 24px 96px rgba(0, 0, 0, 0.2)';
  } else {
    // Darker shadows for dark mode
    baseShadows[1] = '0px 1px 2px rgba(0, 0, 0, 0.24)';
    baseShadows[2] = '0px 1px 5px rgba(0, 0, 0, 0.24)';
    baseShadows[3] = '0px 2px 8px rgba(0, 0, 0, 0.24)';
    baseShadows[4] = '0px 4px 12px rgba(0, 0, 0, 0.24)';
    baseShadows[6] = '0px 6px 18px rgba(0, 0, 0, 0.24)';
    baseShadows[8] = '0px 8px 24px rgba(0, 0, 0, 0.24)';
    baseShadows[10] = '0px 10px 32px rgba(0, 0, 0, 0.24)';
    baseShadows[12] = '0px 12px 48px rgba(0, 0, 0, 0.24)';
    baseShadows[16] = '0px 16px 72px rgba(0, 0, 0, 0.24)';
    baseShadows[24] = '0px 24px 96px rgba(0, 0, 0, 0.24)';
  }
  
  return [
    ...baseShadows,
    COMMON_SHADOWS.card,
    COMMON_SHADOWS.dialog,
    COMMON_SHADOWS.dropdown,
  ] as unknown as ThemeOptions['shadows'];
};

// Create the theme for either light or dark mode
export function createAppTheme(mode: 'light' | 'dark' = 'light') {
  return createTheme({
    palette: {
      mode,
      primary: PRIMARY,
      secondary: SECONDARY,
      success: SUCCESS,
      warning: WARNING,
      error: ERROR,
      info: INFO,
      grey: GREY,
      ...(mode === 'light'
        ? {
            background: {
              default: '#F9FAFB',
              paper: '#FFFFFF',
            },
            text: {
              primary: GREY[800],
              secondary: GREY[600],
              disabled: GREY[500],
            },
            action: {
              active: GREY[600],
              hover: alpha(GREY[500], 0.08),
              selected: alpha(GREY[500], 0.16),
              disabled: GREY[300],
              disabledBackground: GREY[200],
              focus: alpha(GREY[500], 0.24),
            },
            divider: GREY[300],
          }
        : {
            background: {
              default: GREY[900],
              paper: GREY[800],
            },
            text: {
              primary: '#FFFFFF',
              secondary: GREY[400],
              disabled: GREY[600],
            },
            action: {
              active: GREY[400],
              hover: alpha(GREY[500], 0.08),
              selected: alpha(GREY[500], 0.16),
              disabled: GREY[600],
              disabledBackground: alpha(GREY[700], 0.24),
              focus: alpha(GREY[500], 0.24),
            },
            divider: GREY[700],
          }),
    },
    typography,
    shape,
    shadows: createShadows(mode),
    components: {
      MuiButton: {
        styleOverrides: {
          root: ({ ownerState, theme }) => ({
            borderRadius: shape.borderRadius,
            boxShadow: 'none',
            ...(ownerState.variant === 'contained' && {
              '&:hover': {
                boxShadow: theme.shadows[1],
              },
            }),
            ...(ownerState.variant === 'outlined' && {
              borderColor: theme.palette.divider,
              '&:hover': {
                borderColor: theme.palette.text.primary,
                backgroundColor: alpha(theme.palette.text.primary, 0.04),
              },
            }),
          }),
        },
      },
      MuiPaper: {
        defaultProps: {
          elevation: 0,
        },
        styleOverrides: {
          root: () => ({
            backgroundImage: 'none',
          }),
        },
      },
      MuiCard: {
        styleOverrides: {
          root: () => ({
            boxShadow: COMMON_SHADOWS.card,
            borderRadius: shape.borderRadius * 1.5,
            position: 'relative',
          }),
        },
      },
      MuiDialog: {
        styleOverrides: {
          paper: () => ({
            boxShadow: COMMON_SHADOWS.dialog,
            borderRadius: shape.borderRadiusLg,
          }),
        },
      },
      MuiTableCell: {
        styleOverrides: {
          root: ({ theme }) => ({
            borderBottom: `1px solid ${alpha(theme.palette.divider, 0.6)}`,
          }),
        },
      },
      MuiMenuItem: {
        styleOverrides: {
          root: ({ theme }) => ({
            '&.Mui-selected': {
              backgroundColor: alpha(theme.palette.primary.main, 0.08),
              '&:hover': {
                backgroundColor: alpha(theme.palette.primary.main, 0.12),
              },
            },
          }),
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: ({ theme }) => ({
            '& .MuiOutlinedInput-root': {
              borderRadius: shape.borderRadius,
              transition: theme.transitions.create(['border-color']),
              '&:hover:not(.Mui-error)': {
                borderColor: theme.palette.text.primary,
              },
              '&.Mui-focused': {
                borderColor: theme.palette.primary.main,
              },
            },
          }),
        },
      },
    },
  });
}

const theme = createAppTheme();
export default theme;