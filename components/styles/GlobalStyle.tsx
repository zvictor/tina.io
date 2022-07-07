import { createGlobalStyle, css } from 'styled-components'
import React from 'react'

const CssReset = css`
  html,
  body,
  p,
  ol,
  ul,
  li,
  dl,
  dt,
  dd,
  blockquote,
  figure,
  fieldset,
  legend,
  textarea,
  pre,
  iframe,
  hr,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0;
    padding: 0;
  }

  ul {
    list-style: none;
  }

  button,
  input,
  select,
  textarea {
    margin: 0;
  }

  html {
    box-sizing: border-box;
  }

  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }

  img,
  video {
    height: auto;
    max-width: 100%;
  }

  iframe {
    border: 0;
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  td,
  th {
    padding: 0;
    text-align: left;
  }
`

// @ts-ignore
export const GlobalStyle = React.memo(createGlobalStyle`
  ${CssReset}

  html {
    font-size: 81.25%;
    font-weight: normal;
    font-family: var(--font-sans);
    line-height: 1.6;
    width: 100%;
    overflow-x: hidden;
    height: 100%;
    min-height: 100%;
    box-sizing: border-box;
    -webkit-font-smooth: 'antialiased';
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;

    @media (min-width: 450px) {
      font-size: 87.5%;
    }

    @media (min-width: 685px) {
      font-size: 100%;
    }

    /* Color */
    --blue-50-rgb: 238, 252, 247;
    --blue-100-rgb: 215, 249, 238;
    --blue-150-rgb: 199, 244, 230;
    --blue-200-rgb: 175, 238, 220;
    --blue-250-rgb: 150, 233, 216;
    --blue-300-rgb: 108, 224, 208;
    --blue-350-rgb: 77, 209, 200;
    --blue-400-rgb: 45, 200, 205;
    --blue-450-rgb: 42, 183, 207;
    --blue-500-rgb: 38, 157, 197;
    --blue-550-rgb: 37, 130, 187;
    --blue-600-rgb: 32, 102, 177;
    --blue-650-rgb: 30, 75, 159;
    --blue-700-rgb: 29, 56, 145;
    --blue-750-rgb: 24, 35, 119;
    --blue-800-rgb: 21, 17, 95;
    --blue-850-rgb: 16, 11, 70;
    --blue-900-rgb: 17, 6, 50;
    --blue-950-rgb: 12, 3, 33;

    --blue-0: white;
    --blue-50: rgba(var(--blue-50-rgb), 1);
    --blue-100: rgba(var(--blue-100-rgb), 1);
    --blue-150: rgba(var(--blue-150-rgb), 1);
    --blue-200: rgba(var(--blue-200-rgb), 1);
    --blue-250: rgba(var(--blue-250-rgb), 1);
    --blue-300: rgba(var(--blue-300-rgb), 1);
    --blue-350: rgba(var(--blue-350-rgb), 1);
    --blue-400: rgba(var(--blue-400-rgb), 1);
    --blue-450: rgba(var(--blue-450-rgb), 1);
    --blue-500: rgba(var(--blue-500-rgb), 1);
    --blue-550: rgba(var(--blue-550-rgb), 1);
    --blue-600: rgba(var(--blue-600-rgb), 1);
    --blue-650: rgba(var(--blue-650-rgb), 1);
    --blue-700: rgba(var(--blue-700-rgb), 1);
    --blue-750: rgba(var(--blue-750-rgb), 1);
    --blue-800: rgba(var(--blue-800-rgb), 1);
    --blue-850: rgba(var(--blue-850-rgb), 1);
    --blue-900: rgba(var(--blue-900-rgb), 1);
    --blue-950: rgba(var(--blue-950-rgb), 1);
    --blue-1000: black;

    --tina-blue: rgb(5, 116, 228);
    
    --color-orange-light: #EB8237;
    --color-orange: #F36D21;
    --color-orange-dark: #E75D1D;
    --color-white: #FFFFFF;
    --color-blue: var(--blue-550);
    --color-blue-light: var(--blue-500);
    --color-tina-blue: #2296FE;
    --color-tina-blue-light: #2796FF;
    --color-tina-blue-dark: #006CD0;
    --tina-blue: #2296FE;
    --tina-blue-light: #2796FF;
    --tina-blue-dark: #006CD0;
    --color-light: #FAFAFA;
    --color-light-dark: #E9E9EC;

    --color-warning-light: #FFFBEB;
    --color-warning: #FEF3C7;
    --color-warning-dark: #FDE68A;
    --color-error-light: var(--color-orange-light);
    --color-error: var(--color-orange);
    --color-error-dark: var(--color-orange-dark);
    --color-success-light: #57c355;
    --color-success: #3cad3a;
    --color-success-dark: #249a21;

    --color-grey: #595959;
    --color-grey-dark: #404040;
    --color-grey-0: #ffffff;
    --color-grey-1: #f6f6f9;
    --color-grey-2: #edecf3;
    --color-grey-3: #e1ddec;
    --color-grey-4: #b2adbe;
    --color-grey-5: #918c9e;
    --color-grey-6: #716c7f;
    --color-grey-7: #565165;
    --color-grey-8: #433e52;
    --color-grey-9: #363145;
    --color-grey-10: #252336;
    --color-indicator: var(--color-primary);

    --radius-small: 5px;
    --radius-big: 24px;

    --padding-small: 12px;
    --padding-big: 20px;

    --font-size-0: 12px;
    --font-size-1: 13px;
    --font-size-2: 15px;
    --font-size-3: 16px;
    --font-size-4: 18px;
    --font-size-5: 20px;
    --font-size-6: 22px;
    --font-size-7: 26px;
    --font-size-8: 32px;

    --font-family: 'Inter', sans-serif;

    --font-weight-regular: 400;
    --font-weight-bold: 600;

    --shadow-big: 0px 2px 3px rgba(0, 0, 0, 0.05),
      0 4px 12px rgba(0, 0, 0, 0.1);
    --shadow-small: 0px 2px 3px rgba(0, 0, 0, 0.12);

    --timing-short: 85ms;
    --timing-medium: 150ms;
    --timing-long: 250ms;

    --z-index-0: 0;
    --z-index-1: 10;
    --z-index-2: 20;
    --z-index-3: 30;
    --z-index-4: 40;
    --z-index-5: 50;

    /* Layout */
    --breakpoint-small: 400px;
    --breakpoint-medium: 800px;
    --breakpoint-large: 1200px;

    --spacer-size: 4.5rem;
    --section-padding: calc(var(--spacer-size) * 2);
    --container-padding: 2rem;

    /* Typography */
    --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
    "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
    "Helvetica Neue", sans-serif;

    * {
      box-sizing: inherit;
      font-variant-numeric: inherit;
      font-family: inherit;
      line-height: inherit;
      font-size: 100%;
      font-weight: inherit;
    }
  }

  ::-moz-selection {
    background: var(--blue-150);
    color: var(--color-blue-light);
  }
  ::selection {
    background: var(--blue-150);
    color: var(--color-blue-light);
  }

  .fitVids-wrapper {
    position: relative;
    padding-bottom: 56.25%;
    height: 0;
  }
  .fitVids-wrapper iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`)
