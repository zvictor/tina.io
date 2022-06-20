import * as React from 'react'
import { Panel } from 'react-instantsearch-dom'
import { useInView } from 'react-intersection-observer'
import SyntaxHighlighter from 'react-syntax-highlighter'

const ContextualPreview = () => {
  const [formData, setFormData] = React.useState({
    title: {
      label: 'Title',
      value: 'Super Awesome Headline',
      type: 'text',
    },
    description: {
      label: 'Description',
      value: 'This is a description',
      type: 'text',
    },
  })

  return (
    <>
      <div className="preview">
        <div className="sidebar">
          <div className="form">
            {Object.values(formData).map(item => {
              return (
                <>
                  <span className="label">{item.label}</span>
                  <span className="input">{item.value}</span>
                </>
              )
            })}
          </div>
          <div className="actions">
            <span className="button">Save</span>
          </div>
        </div>
        <div className="website">
          <span className="title">{formData.title.value}</span>
          <span className="text">{formData.description.value}</span>
          <Blob />
          <BlobTwo />
        </div>
      </div>
      <style jsx>{`
        .preview {
          position: absolute;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: stretch;
          box-shadow: 4px 4px 16px rgba(104, 217, 212, 0.2),
            16px 16px 64px rgba(34, 128, 195, 0.5);
          border-radius: 10px;
          overflow: hidden;
        }

        .sidebar {
          display: flex;
          flex-direction: column;
          justify-content: justify-between;
          align-items: stretch;
          flex: 0 0 40%;
          border: 1px solid var(--blue-200);
          background: linear-gradient(
            to bottom,
            var(--blue-100),
            var(--blue-150),
            var(--blue-250)
          );
          border-right-color: var(--blue-150);
          margin-right: -4px;
          border-radius: 0 4px 4px 0;
        }

        .actions {
          border-top: 1px solid var(--blue-300);
          background: white;
          padding: 16px 24px;
        }

        .button {
          background: rgb(5, 116, 228);
          color: white;
          padding: 0.3em 0.75em;
          border-radius: 5em;
          display: block;
          text-align: center;
          font-weight: bold;
          font-size: 1.1875em;
          box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
        }

        .form {
          flex: 1 0 auto;
          padding: 24px;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: stretch;
        }

        .label {
          font-weight: bold;
          letter-spacing: 0.02em;
          color: var(--blue-700);
          font-size: 1.125em;
          margin-bottom: 0.25em;
        }

        .input {
          font-size: 1em;
          padding: 0.5em 0.75em;
          border-radius: 0.375em;
          border: 1px solid var(--blue-250);
          box-shadow: rgba(27, 97, 177, 0.1) 0px 0.25em 0.25em 0px inset;
          background: white;
          margin-bottom: 1em;
        }

        .website {
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 32px;
          gap: 32px;
          background: linear-gradient(
            to bottom right,
            var(--blue-300),
            var(--blue-200),
            var(--blue-250),
            var(--blue-300),
            var(--blue-350),
            var(--blue-400),
            var(--blue-500)
          );
          border: 1px solid var(--blue-400);
          border-left-color: var(--blue-300);
          border-radius: 0 10px 10px 0;
          flex: 1 1 auto;
          text-align: center;
          overflow: hidden;
        }

        .title {
          position: relative;
          z-index: 10;
          line-height: 1.1;
          font-weight: semi-bold;
          color: var(--blue-650);
          text-shadow: 0 0 10px var(--blue-250);
          font-size: unquote('clamp(2.25rem, 2rem + 2vw, 3.375rem)');
        }

        .text {
          position: relative;
          z-index: 10;
          line-height: 1.1;
          background: linear-gradient(
            to top left,
            var(--blue-550),
            var(--blue-500),
            var(--blue-400)
          );
          border-radius: 5px;
          color: var(--blue-250);
          font-weight: medium;
          padding: 0.625em 0.875em;
          border: 1px solid var(--blue-450);
          box-shadow: 8px 16px 32px -8px var(--blue-500);
          font-size: unquote('clamp(1rem, 0.75rem + 1vw, 1.5rem)');
        }

        :global(svg) {
          opacity: 0.2;
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: auto;
        }
      `}</style>
    </>
  )
}

const storyData = {
  features: [
    {
      id: 'editing',
      title: 'Tina is a dev-first CMS that your editors will love',
      description:
        'Phasellus quis nibh scelerisque, cursus magna a, semper mauris. Pellentesque dui eros, lobortis quis dui eu, finibus pellentesque dui.',
    },
    {
      id: 'file',
      title: 'Own your content',
      description:
        'Phasellus quis nibh scelerisque, cursus magna a, semper mauris. Pellentesque dui eros, lobortis quis dui eu, finibus pellentesque dui.',
    },
    {
      id: 'schema',
      title: 'Simple CMS Configuration',
      description:
        'Phasellus quis nibh scelerisque, cursus magna a, semper mauris. Pellentesque dui eros, lobortis quis dui eu, finibus pellentesque dui.',
    },
    {
      id: 'git',
      title: 'Editors Can Use Git With No Problem',
      description:
        'Phasellus quis nibh scelerisque, cursus magna a, semper mauris. Pellentesque dui eros, lobortis quis dui eu, finibus pellentesque dui.',
    },
  ],
  panes: [
    {
      name: 'Contextual Editing',
      background: 'light',
      width: '100',
      height: '100',
      component: ContextualPreview,
      positions: {
        editing: 'front',
        file: 'back',
        schema: 'front-bottom',
        git: 'back',
        default: 'out-bottom',
      },
    },
    {
      name: 'File System',
      background: 'dark',
      width: '100',
      height: '100',
      file: {
        name: 'about.md',
        language: 'md',
        textScale: 1.375,
        code: `---
title: Super Awesome Headline
---

This is a description`,
      },
      positions: {
        editing: 'back',
        file: 'front',
        schema: 'out-top',
        default: 'out-bottom',
      },
    },
    {
      name: 'Schema',
      background: 'dark',
      width: '60',
      height: '90',
      basePosition: 'absolute-right',
      file: {
        name: 'schema.tsx',
        language: 'json',
        textScale: 1,
        code: `{
  type: "string",
  label: "Title",
  name: "title"
},
{
  type: "string",
  label: " Description",
  name: "description",
},`,
      },
      positions: {
        schema: 'foreground',
        git: 'out-right',
        default: 'out-bottom',
      },
    },
    {
      name: 'Git Commit',
      background: 'dark',
      width: '95',
      height: '50',
      file: {
        language: 'shell',
        textScale: 0.9,
        code: `commit 4ca9edc2ee64c1ab5127a1fd4519a83426731cd7
Author:  Scott Gallant <scottgallant@gmail.com>
Date:    Thu May 26 13:31:02 2022 -0300
Message: Update From Tina`,
      },
      positions: {
        schema: 'out-bottom',
        git: 'front',
        default: 'out-top',
      },
    },
  ],
}

const Div = () => {
  return (
    <>
      <svg
        width="120"
        height="1"
        viewBox="0 0 112 1"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line
          x1="0"
          y1="0.5"
          x2="112"
          y2="0.5"
          stroke="var(--blue-500)"
          stroke-width="8"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-dasharray="21 18"
        />
      </svg>
      <style jsx>{`
        svg {
          position: relative;
          width: 7em;
          margin: 32px 0;
          opacity: 0.2;
          overflow: visible;
        }
      `}</style>
    </>
  )
}

const Blob = () => {
  return (
    <svg
      width="608"
      height="525"
      viewBox="0 0 608 525"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
    >
      <path
        d="M0 525V130.063C105.413 43.294 205.133 172.06 321.236 73.9557C414.659 -4.98417 504.085 -21.9449 608 28.9413V525H0Z"
        fill="url(#paint0_linear_173_315)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_173_315"
          x1="619.97"
          y1="520.204"
          x2="-87.4212"
          y2="183.865"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="var(--blue-650)" />
          <stop offset="0.505208" stopColor="var(--blue-500)" />
          <stop offset="1" stopColor="var(--blue-250)" />
        </linearGradient>
      </defs>
    </svg>
  )
}

const BlobTwo = () => {
  return (
    <svg
      width="608"
      height="221"
      viewBox="0 0 608 221"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
    >
      <path
        d="M0 220.71V5.26465C164.864 -29.8316 95.9211 123.444 248.296 85.7615C400.671 48.0792 425.65 161.126 608 74.7173V220.71H0Z"
        fill="url(#paint0_linear_173_316)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_173_316"
          x1="619.97"
          y1="218.694"
          x2="239.424"
          y2="-211.696"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="var(--blue-650)" />
          <stop offset="0.505208" stopColor="var(--blue-500)" />
          <stop offset="1" stopColor="var(--blue-250)" />
        </linearGradient>
      </defs>
    </svg>
  )
}

const Feature = ({ activeId, setActiveId, item }) => {
  const { ref, inView, entry } = useInView({
    rootMargin: '-100px 0px',
  })

  React.useEffect(() => {
    if (inView) {
      setActiveId(item.id)
    } else if (activeId === item.id) {
      setActiveId(null)
    }
  }, [inView])

  React.useEffect(() => {
    if (!activeId && inView) {
      setActiveId(item.id)
    }
  }, [activeId])

  return (
    <>
      <div
        key={item.id}
        className={`feature ${inView && activeId === item.id ? 'visible' : ''}`}
      >
        <div className="content" ref={ref}>
          <div className="title-wrapper">
            <h2>{item.title}</h2>
          </div>
          <Div />
          <p>{item.description}</p>
        </div>
      </div>
      <style jsx>{`
        .feature {
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: stretch;
          padding: 32px 0;
          opacity: 0.1;
          transition: opacity 0.6s cubic-bezier(0.215, 0.61, 0.355, 1);
          filter: blur(1px);
          min-height: 75vh;
        }

        @media (min-width: 1200px) {
          .feature {
            min-height: 100vh;
            opacity: 0.3;
          }
        }

        .visible {
          filter: none;
          opacity: 1;
        }

        @media (min-width: 1200px) {
          .feature {
            justify-content: center;
          }
        }

        h2 {
          font-size: unquote('clamp(2rem, 1.75rem + 2vw, 3.375em)');
          line-height: 1.25;
          font-weight: 600;
          display: block;
          color: transparent;
          background: linear-gradient(
            to bottom right,
            #fff,
            var(--blue-100) 10%,
            var(--blue-200) 25%,
            var(--blue-300) 50%,
            var(--blue-350) 60%,
            var(--blue-400) 70%
          );
          text-shadow: 0 0 7px rgba(165, 237, 220, 0.3),
            0 0 10px rgba(165, 237, 220, 0.15),
            0 0 18px rgba(165, 237, 220, 0.15),
            0 0 42px rgba(104, 217, 212, 0.15);
          -webkit-background-clip: text;
          background-clip: text;
        }

        .title-wrapper {
          position: relative;
        }

        p {
          font-size: 22px;
          line-height: 1.8;
          font-weight: 400;
          color: var(--blue-400);
          text-shadow: 0 0 2px rgba(104, 217, 212, 0.3),
            0 0 4px rgba(104, 217, 212, 0.3);
        }
      `}</style>
    </>
  )
}

const Story = ({ data }) => {
  const [activeId, setActiveId] = React.useState(data.features[0].id)

  return (
    <>
      <div className="container">
        <div className="left">
          {data.features.map(item => (
            <Feature
              activeId={activeId}
              setActiveId={setActiveId}
              item={item}
            />
          ))}
        </div>
        <div className="right">
          <div className="preview-wrapper">
            <div className="preview">
              {data.panes.map(pane => (
                <div
                  className={`pane ${
                    pane.basePosition ? pane.basePosition : ''
                  } ${
                    pane.positions[activeId]
                      ? pane.positions[activeId]
                      : pane.positions.default
                  }`}
                  style={{ width: pane.width + '%', height: pane.height + '%' }}
                >
                  {pane.component && <pane.component />}
                  {pane.file && (
                    <div className="file-wrapper">
                      {pane.file.name && (
                        <div className="filename">{pane.file.name}</div>
                      )}
                      <div
                        className={`file ${pane.file.name ? 'with-name' : ''}`}
                        style={{
                          fontSize:
                            1.5 *
                              (pane.file.textScale ? pane.file.textScale : 1) +
                            'em',
                        }}
                      >
                        <SyntaxHighlighter
                          languag={
                            pane.file.language
                              ? pane.file.language
                              : 'javascript'
                          }
                          useInlineStyles={false}
                        >
                          {pane.file.code}
                        </SyntaxHighlighter>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .container {
          position: relative;
          width: 100%;
          max-width: 1400px;
          margin: 0 auto;
          display: flex;
          flex-direction: column-reverse;
          gap: 48px;
          padding: 72px 32px;
        }

        @media (min-width: 1200px) {
          .container {
            gap: 72px;
            padding: 0 48px;
            flex-direction: row;
          }
        }

        .left {
          width: 100%;
          max-width: 650px;
          margin: 0 auto;
        }

        @media (min-width: 1200px) {
          .left {
            width: 40%;
          }
        }

        .right {
          width: 90%;
          position: sticky;
          -moz-position: sticky;

          top: 72px;
          display: flex;
          margin: 0 auto;
          max-width: 600px;
          flex-direction: column;
          justify-content: center;
          margin-bottom: 48px;

          --right-rotation: -5deg;

          // display: none;
        }

        @media (min-width: 650px) {
          .right {
            width: 75%;
          }
        }

        @media (min-width: 1200px) {
          .right {
            width: 60%;
            max-width: none;
            height: 100vh;
            top: 0;
            margin-bottom: 0;

            --right-rotation: -8deg;
          }
        }

        .preview-wrapper {
          position: relative;
          width: 100%;
          height: 0;
          padding-bottom: 70%;
        }

        .preview {
          position: absolute;
          display: block;
          width: 100%;
          height: 100%;
          perspective: 1000px;
        }

        .pane {
          position: absolute;
          display: block;
          transition: all 750ms cubic-bezier(0.215, 0.61, 0.355, 1);
        }

        .file-wrapper {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          width: 100%;
          height: 100%;
        }

        .file {
          display: block;
          width: 100%;
          flex: 1;
          position: relative;
          border: 1px solid var(--blue-750);
          box-shadow: inset 0 0 256px rgba(16, 38, 127, 0.5),
            4px 4px 16px rgba(22, 63, 146, 0.2),
            16px 16px 64px rgba(16, 38, 127, 0.5);
          background: linear-gradient(
            to bottom right,
            var(--blue-900),
            var(--blue-850) 30%,
            var(--blue-800) 70%,
            var(--blue-750)
          );
          border-radius: 10px;
        }

        .file.with-name {
          border-radius: 0 10px 10px 10px;
        }

        .file:after {
          content: '';
          display: block;
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0.1;
          background: repeating-linear-gradient(
            var(--blue-300),
            var(--blue-400) 2px,
            var(--blue-800) 4px,
            var(--blue-850) 5px,
            var(--blue-800) 6px
          );
          mix-blend-mode: overlay;
          border-radius: 10px;
        }

        .file.with-name:after {
          border-radius: 0 10px 10px 10px;
        }

        .filename {
          position: relative;
          display: inline-block;
          padding: 8px 32px;
          border-radius: 10px 10px 0 0;
          font-size: 1.125em;
          color: var(--blue-400);
          font-weight: bold;
          lettter-spacing: 0.1em;
          border: 1px solid var(--blue-750);
          border-bottom: none;
          box-shadow: inset 0 0 256px rgba(16, 38, 127, 0.5),
            4px 4px 16px rgba(27, 97, 177, 0.2),
            16px 16px 64px rgba(16, 38, 127, 0.5);
          background: linear-gradient(
            to bottom right,
            var(--blue-800),
            var(--blue-950)
          );
          font-weight: medium;
          font-family: SFMono-Regular, Menlo, Monaco, Consolas,
            'Liberation Mono', 'Courier New', monospace;
          text-shadow: 0 0 7px rgba(165, 237, 220, 0.2),
            0 0 10px rgba(165, 237, 220, 0.2),
            0 0 18px rgba(165, 237, 220, 0.15),
            0 0 42px rgba(104, 217, 212, 0.15);
        }

        .absolute-right {
          right: 0;
        }

        .back {
          transform: rotate3d(0, 1, 0, var(--right-rotation))
            translate3d(4%, 7%, -25px);
          z-index: -1;
        }

        .front {
          transform: rotate3d(0, 1, 0, var(--right-rotation))
            translate3d(-4%, -7%, 25px);
        }

        .front-bottom {
          transform: rotate3d(0, 1, 0, var(--right-rotation))
            translate3d(-4%, 7%, 25px);
        }

        .foreground {
          transform: rotate3d(0, 1, 0, var(--right-rotation))
            translate3d(4%, -7%, 100px);
        }

        .out-top {
          transform: rotate3d(0, 1, 0, var(--right-rotation))
            translate3d(-4%, -100%, 75px);
          transition: all 0.5s ease-in;
          opacity: 0;
        }

        .out-right {
          transform: rotate3d(0, 1, 0, var(--right-rotation))
            translate3d(100%, -7%, 100px);
          opacity: 0;
        }

        .out-bottom {
          transform: rotate3d(0, 1, 0, var(--right-rotation))
            translate3d(-4%, 100%, -25px);
          opacity: 0;
        }

        /* Code Styles */

        :global(.hljs) {
          padding: 32px;
          color: var(--blue-250);
          font-weight: medium;
          font-family: SFMono-Regular, Menlo, Monaco, Consolas,
            'Liberation Mono', 'Courier New', monospace;
          text-shadow: 0 0 7px rgba(165, 237, 220, 0.2),
            0 0 10px rgba(165, 237, 220, 0.15),
            0 0 18px rgba(165, 237, 220, 0.1), 0 0 42px rgba(104, 217, 212, 0.1);
        }

        :global(.hljs-number) {
          color: var(--blue-400);
        }

        :global(.hljs-meta) {
          color: var(--blue-650);
        }

        :global(.hljs-attr),
        :global(.hljs-attribute) {
          color: #d07ea5;
        }

        :global(.hljs-string) {
          color: var(--blue-400);
        }
      `}</style>
    </>
  )
}

const Page = props => {
  return (
    <>
      <div className={`wrapper depth-3`}>
        <Story data={storyData} />
        <div className="other-section"></div>
        <Story data={storyData} />
      </div>
      <style jsx>{`
        :global(:root) {
          --blue-0: #ffffff;
          --blue-50: #f2fdfc;
          --blue-100: #e6faf8;
          --blue-150: #d1faf6;
          --blue-200: #c2f7eb;
          --blue-250: #b4f4e0;
          --blue-300: #a5eddc;
          --blue-350: #96e7d8;
          --blue-400: #68d9d4;
          --blue-450: #46c6d1;
          --blue-500: #2ab7cf;
          --blue-550: #1f97cb;
          --blue-600: #2280c3;
          --blue-650: #1b61b1;
          --blue-700: #163f92;
          --blue-750: #10267f;
          --blue-800: #121264;
          --blue-850: #120849;
          --blue-900: #110431;
          --blue-950: #09011e;
          --blue-1000: #000000;
        }

        .wrapper {
          position: relative;
          width: 100vw;
          height: 100vh;
          perspective: 10000px;
          overflow-y: auto;
          overflow-x: hidden;
          background: linear-gradient(
            to bottom right,
            var(--blue-500) 1%,
            var(--blue-600) 6%,
            var(--blue-700) 17%,
            var(--blue-800) 33%,
            var(--blue-950) 70%,
            var(--blue-900) 100%
          );
          background-attachment: fixed;
        }

        .other-section {
          position: relative;
          z-index: 1000;
          display: block;
          width: 100%;
          height: 50vh;
          background: linear-gradient(
            to bottom right,
            var(--blue-50) 1%,
            var(--blue-100) 6%,
            var(--blue-150) 17%,
            var(--blue-200) 33%,
            var(--blue-350) 70%,
            var(--blue-400) 100%
          );
          // background-attachment: fixed;
        }
      `}</style>
    </>
  )
}

export default Page
