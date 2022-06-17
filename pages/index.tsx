import * as React from 'react'
import { Panel } from 'react-instantsearch-dom'
import { useInView } from 'react-intersection-observer'
import SyntaxHighlighter from 'react-syntax-highlighter'

const Div = () => {
  return (
    <>
      <svg
        width="100"
        height="1"
        viewBox="0 0 100 1"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line
          x1="6"
          y1="0.5"
          x2="97"
          y2="0.5"
          stroke="#2AB7CF"
          stroke-width="8"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-dasharray="10 21"
        />
      </svg>
      <style jsx>{`
        svg {
          position: relative;
          width: 7em;
          margin: 28px 0;
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
          <stop stop-color="#1B61B1" />
          <stop offset="0.505208" stop-color="#2AB7CF" />
          <stop offset="1" stop-color="#B4F4E0" />
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
          <stop stop-color="#1B61B1" />
          <stop offset="0.505208" stop-color="#2AB7CF" />
          <stop offset="1" stop-color="#B4F4E0" />
        </linearGradient>
      </defs>
    </svg>
  )
}

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
        }

        .sidebar {
          display: flex;
          flex-direction: column;
          justify-content: justify-between;
          align-items: stretch;
          flex: 0 0 40%;
          border: 1px solid #c2f7eb;
          background: linear-gradient(to bottom, #e6faf8, #d1faf6, #b4f4e0);
          border-right-color: #d1faf6;
          margin-right: -4px;
          border-radius: 0 4px 4px 0;
        }

        .actions {
          border-top: 1px solid #a5eddc;
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
          color: #163f92;
          font-size: 1.125em;
          margin-bottom: 0.25em;
        }

        .input {
          font-size: 1em;
          padding: 0.5em 0.75em;
          border-radius: 0.375em;
          border: 1px solid #b4f4e0;
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
            #d1faf6,
            #c2f7eb,
            #b4f4e0,
            #a5eddc,
            #96e7d8,
            #68d9d4,
            #2ab7cf
          );
          border: 1px solid #96e7d8;
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
          color: #1b61b1;
          text-shadow: 0 0 10px #b4f4e0;
          font-size: unquote('clamp(2.25rem, 2rem + 2vw, 3.375rem)');
        }

        .text {
          position: relative;
          z-index: 10;
          line-height: 1.1;
          background: linear-gradient(to top left, #1f97cb, #2ab7cf, #68d9d4);
          border-radius: 5px;
          color: #b4f4e0;
          font-weight: medium;
          padding: 0.625em 0.875em;
          border: 1px solid #2ab7cf;
          box-shadow: 8px 16px 32px -8px #2ab7cf;
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

const data = {
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
      language: 'md',
      textScale: 1.375,
      code: `---
title: Super Awesome Headline
---

This is a description`,
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
      language: 'shell',
      textScale: 0.9,
      code: `commit 4ca9edc2ee64c1ab5127a1fd4519a83426731cd7
Author:  Scott Gallant <scottgallant@gmail.com>
Date:    Thu May 26 13:31:02 2022 -0300
Message: Update From Tina`,
      positions: {
        schema: 'out-bottom',
        git: 'front',
        default: 'out-top',
      },
    },
  ],
}

const Feature = ({ activeId, setActiveId, item }) => {
  const { ref, inView, entry } = useInView({
    threshold: 0.33,
  })

  React.useEffect(() => {
    if (inView) {
      setActiveId(item.id)
    }
  }, [inView])

  React.useEffect(() => {
    if (activeId === item.id && !inView) {
      setActiveId(null)
    }
  }, [activeId, inView])

  React.useEffect(() => {
    if (activeId === null && inView) {
      setActiveId(item.id)
    }
  }, [activeId])

  return (
    <>
      <div
        className={`feature ${inView && activeId === item.id ? 'visible' : ''}`}
      >
        <div className="content" ref={ref}>
          <div className="title-wrapper">
            <h2>{item.title}</h2>
            <span aria-hidden="true" className="title-glow">
              {item.title}
            </span>
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
          transition: opacity 0.6s 0.2s cubic-bezier(0.215, 0.61, 0.355, 1);
          filter: blur(2px);
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

        h2,
        .title-glow {
          font-size: unquote('clamp(2rem, 1.75rem + 2vw, 3.375em)');
          line-height: 1.25;
          font-weight: 600;
        }

        h2 {
          display: block;
          color: transparent;
          background: linear-gradient(
            to bottom right,
            #fff,
            #e6faf8 10%,
            #c2f7eb 25%,
            #a5eddc 50%,
            #96e7d8 60%,
            #68d9d4 70%
          );
          -webkit-background-clip: text;
          background-clip: text;
        }

        .title-wrapper {
          position: relative;
        }

        .title-glow {
          z-index: -1;
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0;
          text-shadow: 0 0 7px rgba(165, 237, 220, 0.66),
            0 0 10px rgba(165, 237, 220, 0.33),
            0 0 18px rgba(165, 237, 220, 0.33),
            0 0 42px rgba(104, 217, 212, 0.33),
            0 0 82px rgba(104, 217, 212, 0.33),
            0 0 102px rgba(42, 183, 207, 0.55),
            0 0 156px rgba(42, 183, 207, 0.66);
          transition: all 1.2s cubic-bezier(0.215, 0.61, 0.355, 1);
        }

        .visible .title-glow {
          opacity: 0.5;
        }

        p {
          font-size: 22px;
          line-height: 1.8;
          font-weight: 400;
          color: #68d9d4;
          text-shadow: 0 0 2px rgba(104, 217, 212, 0.3),
            0 0 4px rgba(104, 217, 212, 0.3);
        }
      `}</style>
    </>
  )
}

const Story = ({ id }) => {
  const [activeId, setActiveId] = React.useState(null)

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
                  className={`pane ${pane.background} ${
                    pane.basePosition ? pane.basePosition : ''
                  } ${
                    pane.positions[activeId]
                      ? pane.positions[activeId]
                      : pane.positions.default
                  }`}
                  style={{ width: pane.width + '%', height: pane.height + '%' }}
                >
                  {pane.component && <pane.component />}
                  {pane.code && (
                    <div
                      style={{
                        fontSize:
                          1.5 * (pane.textScale ? pane.textScale : 1) + 'em',
                      }}
                    >
                      <SyntaxHighlighter
                        languag={pane.language ? pane.language : 'javascript'}
                        useInlineStyles={false}
                      >
                        {pane.code}
                      </SyntaxHighlighter>
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
          transform-style: preserve-3d;
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
          transform: rotateY(3deg) translate3d(0, 0, -50px);
          transform-style: preserve-3d;
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
          transform-style: preserve-3d;
          margin-bottom: 48px;

          --right-rotation: -5deg;
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

            --right-rotation: -10deg;
          }
        }

        .preview-wrapper {
          position: relative;
          width: 100%;
          height: 0;
          padding-bottom: 70%;
          transform-style: preserve-3d;
        }

        .preview {
          position: absolute;
          display: block;
          width: 100%;
          height: 100%;
          transform-style: preserve-3d;
          perspective: 1000px;
        }

        .dark {
          border: 1px solid #10267f;
          box-shadow: inset 0 0 256px rgba(16, 38, 127, 0.5),
            4px 4px 16px rgba(27, 97, 177, 0.2),
            16px 16px 64px rgba(16, 38, 127, 0.5);
          background: linear-gradient(
            to bottom right,
            #0e032a,
            #140845 30%,
            #0f0f67 70%,
            #10267f
          );
        }

        .dark:after {
          content: '';
          display: block;
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0.1;
          background: repeating-linear-gradient(
            #a5eddc,
            #68d9d4 2px,
            #0f0f67 4px,
            #140845 5px,
            #0f0f67 6px
          );
          mix-blend-mode: overlay;
        }

        .light {
          background: linear-gradient(
            to bottom right,
            #e6faf8,
            #c2f7eb,
            #a5eddc
          );
          box-shadow: 4px 4px 16px rgba(104, 217, 212, 0.2),
            16px 16px 64px rgba(27, 97, 177, 0.5);
        }

        .pane {
          position: absolute;
          display: block;
          border-radius: 10px;
          transition-duration: 750ms;
          transition-property: all;
          transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
          transform: rotateY(-10deg) translate3d(0, 0, 0);
          overflow: hidden;
        }

        .absolute-right {
          right: 0;
        }

        .back {
          transform: rotateY(var(--right-rotation)) translate3d(4%, 7%, -25px);
          z-index: -1;
        }

        .front {
          transform: rotateY(var(--right-rotation)) translate3d(-4%, -7%, 25px);
        }

        .front-bottom {
          transform: rotateY(var(--right-rotation)) translate3d(-4%, 7%, 25px);
        }

        .foreground {
          transform: rotateY(var(--right-rotation)) translate3d(4%, -7%, 100px);
        }

        .out-top {
          transform: rotateY(var(--right-rotation))
            translate3d(-4%, -100%, 75px);
          transition: all 0.5s ease-in;
          opacity: 0;
        }

        .out-right {
          transform: rotateY(var(--right-rotation))
            translate3d(100%, -7%, 100px);
          opacity: 0;
        }

        .out-bottom {
          transform: rotateY(var(--right-rotation))
            translate3d(-4%, 100%, -25px);
          opacity: 0;
        }

        /* Code Styles */

        :global(.hljs) {
          padding: 32px;
          color: #b4f4e0;
          font-weight: medium;
          font-family: SFMono-Regular, Menlo, Monaco, Consolas,
            'Liberation Mono', 'Courier New', monospace;
          text-shadow: 0 0 7px rgba(165, 237, 220, 0.2),
            0 0 10px rgba(165, 237, 220, 0.2), 0 0 18px rgba(165, 237, 220, 0.2),
            0 0 42px rgba(104, 217, 212, 0.2), 0 0 82px rgba(104, 217, 212, 0.2);
        }

        :global(.hljs-number) {
          color: #68d9d4;
        }

        :global(.hljs-meta) {
          color: #1b61b1;
        }

        :global(.hljs-attr),
        :global(.hljs-attribute) {
          color: #d07ea5;
        }

        :global(.hljs-string) {
          color: #68d9d4;
        }
      `}</style>
    </>
  )
}

const Page = props => {
  return (
    <>
      <div className={`wrapper depth-3`}>
        <Story />
        <div className="other-section"></div>
        <Story id={2} />
      </div>
      <style jsx>{`
        .wrapper {
          width: 100vw;
          height: 100vh;
          perspective: 10000px;
          overflow-y: auto;
          overflow-x: hidden;
          background: linear-gradient(
            to bottom right,
            #2ab7cf 3%,
            #2280c3 10%,
            #163f92 25%,
            #0f0f67 40%,
            #0e032a 70%,
            #140845 100%
          );
        }

        .other-section {
          position: relative;
          z-index: 1000;
          display: block;
          width: 100%;
          height: 50vh;
          background: linear-gradient(
            to bottom right,
            #e6faf8,
            #c2f7eb,
            #a5eddc
          );
        }
      `}</style>
    </>
  )
}

export default Page
