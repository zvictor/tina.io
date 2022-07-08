import { css } from 'styled-components'

/* Styles rich text (markdown output).
   Use the RichTextWrapper component to easily apply these styles,
   or add the css via ${RichText} to a component
*/

const DocsRichText = css`
  /* Linewrap Fix */

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  li,
  a {
    overflow-wrap: break-word;
    word-wrap: break-word;
    word-break: break-all;
    word-break: break-word;
    hyphens: auto;
  }

  /* Spacing */

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    padding-top: 1rem;
    margin: 1rem 0 1.5rem 0;
    &:first-child {
      margin-top: 0;
      padding-top: 0;
    }
    &:last-child {
      margin-bottom: 0;
    }
  }

  p,
  iframe,
  blockquote,
  image {
    margin: 1.5rem 0;
    &:first-child {
      margin-top: 0;
    }
    &:last-child {
      margin-bottom: 0;
    }
  }

  ul,
  ol {
    padding-left: 2rem;
    margin-bottom: 1.5rem;
  }

  li {
    margin-bottom: 0.5rem;
  }

  /* Styling */

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    position: relative;
    font-family: var(--font-sans);
    font-weight: regular;
    font-style: normal;
    em {
      font-style: normal;
    }
  }

  h1,
  .h1,
  h2,
  .h2,
  h3,
  .h3,
  h4,
  .h4 {
    line-height: 1.3;
    font-weight: 700;
    letter-spacing: 0.1px;
    text-shadow: 0 0 6px rgba(var(--blue-300-rgb), 0.2),
      0 0 12px rgba(var(--blue-300-rgb), 0.2),
      0 0 32px rgba(var(--blue-300-rgb), 0.2);
  }

  h1,
  .h1,
  h2,
  .h2 {
    color: transparent;
    background: linear-gradient(
      110deg,
      var(--tina-blue) -2em,
      var(--tina-blue-dark) 2em,
      var(--blue-550) 4em,
      var(--blue-600) 6em
    );
    -webkit-background-clip: text;
    background-clip: text;

    em {
      color: var(--blue-500);
      font-style: italic;
    }
  }

  h3,
  .h3,
  h4,
  .h4 {
    color: var(--blue-550);
    font-weight: 600;
    em {
      color: var(--blue-550);
      font-style: italic;
    }
  }

  h1,
  .h1 {
    font-size: 2rem;
    @media (min-width: 1200px) {
      font-size: 2.5rem;
    }
  }

  h2,
  .h2 {
    font-size: 1.5rem;
    @media (min-width: 1200px) {
      font-size: 1.625rem;
    }
  }

  h3,
  .h3 {
    font-size: 1.3125rem;
  }

  h4,
  .h4 {
    font-size: 1.125rem;
  }

  h6,
  .h6,
  h5,
  .h5 {
    color: var(--blue-600);
  }

  p {
    font-size: 16px;
    color: var(--blue-750);

    @media (min-width: 685px) {
      font-size: 18px;
    }

    img {
      display: block;
      margin: 1.5rem auto;
      border-radius: 5px;
      border-width: 1px;
      border-style: solid;
      border-color: rgb(237, 238, 238);
      border-image: initial;
      overflow: hidden;
    }
  }

  iframe {
    max-width: 100%;
    display: block;
    margin: 1.5rem auto;
    border-radius: 5px;
    border-width: 1px;
    border-style: solid;
    border-color: rgb(237, 238, 238);
    border-image: initial;
    overflow: hidden;
  }

  iframe.wide {
    position: relative;
    min-width: 66vw;
    max-width: 1400px;
    left: 50%;
    transform: translate3d(-50%, 0, 0);
  }

  a:not([class]) {
    color: inherit;
    opacity: 0.8;
    text-decoration: underline rgba(0, 0, 0, 0.3);
    transition: all 185ms ease-out;

    &:hover,
    &:focus {
      opacity: 1;
      color: var(--color-tina-blue);
      text-decoration-color: var(--color-tina-blue);
    }
  }

  blockquote {
    display: block;
    font-size: 1.125rem;
    background: linear-gradient(140deg, white, var(--blue-50));
    border: 1.5px solid var(--blue-150);
    border-left-width: 6px;
    border-radius: 6px;
    padding: 1em;
  }

  li blockquote {
    display: block;
    border: none;
    border-radius: 0;
    background: none;
    padding: 0 0 0 1rem;
    border-left: 1px solid var(--blue-150);
    margin: -1rem 0 1.5rem 0 !important;

    a {
      font-size: 1rem;
    }
  }

  hr {
    border: none;
    width: 100%;
    display: block;
    background: url('/svg/divider.svg') no-repeat;
    background-size: auto 100%;
    height: 6px;
    margin: 2rem 0px;
  }

  strong {
    font-weight: bold;
  }

  ul {
    list-style-type: disc;
  }

  li {
    font-size: 1.125rem;
    color: var(--blue-750);
  }

  *:not(pre) > code {
    padding: 0.1em 0.2em;
    border-radius: 0.3em;
    background-color: var(--blue-50);
    border: 1px solid var(--blue-100);
    border-radius: 0.3rem;
    color: var(--blue-600);
    font-size: 1em;
    line-height: inherit;
  }

  pre {
    background-color: var(--blue-50);
    border: 1px solid var(--blue-100);
    text-shadow: white 0px 1px;
    font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
    text-align: left;
    word-spacing: normal;
    word-break: normal;
    overflow-wrap: normal;
    line-height: 1.5;
    tab-size: 4;
    hyphens: none;
    padding: 1em;
    margin: 0.5em 0px;
    overflow: auto;
    border-radius: 0.3rem;
    /* fix wrapping issues breaking layout */
    white-space: pre-wrap !important;
    white-space: -moz-pre-wrap !important;
    white-space: -pre-wrap !important;
    white-space: -o-pre-wrap !important;
    word-wrap: break-word !important;
    code {
      white-space: pre-wrap !important;
      white-space: -moz-pre-wrap !important;
      white-space: -pre-wrap !important;
      white-space: -o-pre-wrap !important;
      word-wrap: break-word !important;
    }
  }

  table {
    width: 100%;
    line-height: 1.375;
  }

  tr {
    &:nth-child(even) {
      background-color: var(--blue-50);
    }
  }

  th,
  td {
    padding: 0.4rem 0.5rem;
  }

  th {
    border-bottom: 3px solid var(--blue-100);
    font-family: var(--font-sans);
    font-weight: regular;
    font-style: normal;
    color: var(--color-tina-blue);
    letter-spacing: 0.5px;
    font-size: 1.125rem;
    line-height: 1.3;
    letter-spacing: 0.1px;
  }

  td {
    border-bottom: 1px solid var(--blue-100);
  }

  .callout {
    margin: 2rem 0;
    padding: 1.5rem 2rem;
    background-image: url(/img/clouds.jpg);
    background-position: center top;
    background-repeat: no-repeat;
    background-size: cover;
    display: grid;
    grid-gap: 2rem;
    align-content: center;
    align-items: center;
    border-radius: 0.3rem;
    border: 1px solid var(--blue-50);
    overflow: hidden;

    @media (min-width: 1000px) {
      grid-gap: 2.5rem;
      grid-template-columns: 1fr 2fr;
    }

    div {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
    }

    h3 {
      color: var(--color-tina-blue);
      font-size: 1.5rem;
      margin-bottom: 1.25rem;
    }

    p {
      font-size: 1rem;
      margin: 0 0 1.375rem 0;
    }

    img {
      position: relative;
      max-width: 14rem;
      margin: -1rem 0;

      @media (min-width: 1000px) {
        margin: -1rem 0 -3rem 0;
      }
    }
  }

  .calloutButton {
    flex: 0 0 auto;
    position: relative;
    text-decoration: none;
    color: inherit;
    font-size: 1.125rem;
    line-height: 1;
    font-weight: bold;
    padding: 0.75rem 1.625rem;
    border-radius: 0.25rem;
    display: flex;
    align-items: center;
    white-space: nowrap;
    outline: none;
    background: var(--color-tina-blue);
    transition: background 150ms ease-out;
    color: white;

    :hover,
    ::focus,
    :active {
      background: var(--color-tina-blue-light);
    }

    svg {
      display: inline-block;
      width: auto;
      height: 1.125em;
      margin-left: 0.75rem;
    }
  }
`

export default DocsRichText
