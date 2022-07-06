import * as React from 'react'
import Link from 'next/link'
import { useInView } from 'react-intersection-observer'
import SyntaxHighlighter from 'react-syntax-highlighter'
import TinaIcon from '../public/svg/tina-icon.svg'
import navData from '../content/navigation.json'
import GitHubButton from 'react-github-btn'
import { BsPlay } from 'react-icons/bs'
import { ImSpinner6 } from 'react-icons/im'
import { Footer } from 'components/layout'

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
      title: 'Own Your Content',
      description:
        'Store content in your repo. Tina saves to MDX, Markdown, and JSON and provides a powerful data layer on top of your static files.',
    },
    {
      id: 'schema',
      title: 'Simple CMS Configuration',
      description:
        "Define your content's schema and Tina will provide you with a user friendly editing experience.",
    },
    {
      id: 'git',
      title: 'Powered by Git',
      description:
        'Let your editoral team focus on writing content, while Tina commits to your repository.',
    },
  ],
  panes: [
    {
      name: 'Contextual Editing',
      background: 'light',
      width: '100',
      height: 'auto',
      video: 'v1656009626/tina-io/new-homepage/editing-demo',
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
        name: 'about.mdx',
        language: 'mdx',
        textScale: 1.375,
        code: `---
title: Awesome Developer Experience
---

Tina empowers your team by giving you
more control over your components.

<CoolComponent
  text="MDX Rocks"
/>`,
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
  type: 'string',
  label: 'Description',
  name: 'body',
  isBody: true,
},`,
        newCode: `{
  type: "string",
  label: "Title",
  name: "title"
},
{
  type: "string",
  label: "Description",
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
      height: '40',
      file: {
        language: 'shell',
        textScale: 1.1,
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

const Video = ({ src }) => {
  return (
    <>
      <video
        className="video"
        autoPlay={true}
        loop
        muted
        playsInline
        poster={`https://res.cloudinary.com/forestry-demo/video/upload/so_0/${src}.jpg`}
      >
        <source
          src={`https://res.cloudinary.com/forestry-demo/video/upload/q_100,h_584/${src}.webm`}
          type="video/webm"
        />
        <source
          src={`https://res.cloudinary.com/forestry-demo/video/upload/q_80,h_584/${src}.mp4`}
          type="video/mp4"
        />
      </video>
      <style jsx>{`
        .video {
          width: 100%;
          height: auto;
          border-radius: 10px;
          overflow: hidden;
        }
      `}</style>
    </>
  )
}

const Button = ({
  children,
  size = 'medium',
  variant = 'primary',
  ...props
}) => {
  return (
    <>
      <a {...props} className={`button ${size}`}>
        {children}
        <span className="glow-text">{children}</span>
      </a>
      <style jsx>{`
        .button {
          cursor: pointer;
          position: relative;
          z-index: 1;
          opacity: 0.8;
          text-decoration: none;
          letter-spacing: 0.0125em;
          font-weight: bold;
          border-radius: 24px;
          transition: all 0.2s cubic-bezier(0.215, 0.61, 0.355, 1);
          color: var(--blue-100);

          &:after {
            content: '';
            display: block;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(
              110deg,
              var(--tina-blue-dark),
              var(--tina-blue) 15%,
              var(--blue-450) 35%,
              var(--blue-350) 55%,
              var(--blue-500) 70%,
              var(--tina-blue) 80%
            );
            opacity: 0.9;
            border-radius: 24px;
            z-index: -1;
          }

          &:hover {
            opacity: 1;
          }
        }

        .medium {
          padding: 12px 28px;
          font-size: 1.125rem;
        }

        .large {
          padding: 14px 32px;
          font-size: 1.25rem;
        }

        .glow-text {
          display: block;
          position: absolute;
          top: 1.5px;
          left: 1.5px;
          width: calc(100% - 3px);
          height: calc(100% - 3px);
          border-radius: 24px;
          background: black;
          display: flex;
          justify-content: center;
          align-items: center;
          background: linear-gradient(
            110deg,
            var(--tina-blue) 10%,
            var(--tina-blue-light) 50%,
            var(--blue-500) 70%,
            var(--blue-550) 100%
          );
          box-shadow: 1px 1px 12px rgba(var(--blue-500-rgb), 0.2) inset,
            0 0 3px 1px rgba(var(--blue-500-rgb), 0.2) inset,
            1px 1px 12px rgba(var(--blue-500-rgb), 0.2),
            2px 2px 32px rgba(var(--blue-600-rgb), 0.2);
          text-shadow: 0 0 3px rgba(var(--blue-600-rgb), 0.2),
            0 0 10px rgba(var(--blue-600-rgb), 0.3),
            0 0 20px rgba(var(--blue-600-rgb), 0.4);
        }

        .glow-text:after {
          content: '';
          display: block;
          position: absolute;
          top: -8px;
          left: -8px;
          width: calc(100% + 16px);
          height: calc(100% + 16px);
          background: linear-gradient(
            110deg,
            transparent 10%,
            var(--blue-400) 50%,
            transparent 70%
          );
          border-radius: 64px;
          z-index: -1;
          filter: blur(16px);
          opacity: 0.3;
        }

        .button:hover .glow-text:after,
        .button:focus .glow-text:after {
          transition: all 0.2s cubic-bezier(0.215, 0.61, 0.355, 1);
          opacity: 0.5;
        }
      `}</style>
    </>
  )
}

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="background"></div>
      <div className="glowbar"></div>
      <Link href="/">
        <a className="tina-icon">
          <TinaIcon />
        </a>
      </Link>
      <nav className="nav">
        <ul className="nav-ul">
          {navData.map(item => {
            const { id, href, label } = item

            return (
              <li key={id} className="nav-li">
                <Link href={href}>{label}</Link>
              </li>
            )
          })}
        </ul>
      </nav>
      <div className="navGithub">
        <GitHubButton
          href="https://github.com/tinacms/tinacms"
          data-color-scheme="no-preference: dark; light: light; dark: dark;"
          data-size="large"
          data-show-count="true"
          aria-label="Star TinaCMS on GitHub"
        >
          Star
        </GitHubButton>
      </div>
      <div className="nav-actions">
        <Button href="/">Sign In</Button>
      </div>
      <style jsx>{`
        .navbar {
          position: relative;
          top: 0;
          width: 100%;
          z-index: 100000;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 48px;
          padding: 16px 48px;
          box-shadow: 4px 4px 16px rgba(var(--blue-700-rgb), 0.1),
            16px 16px 64px rgba(var(--blue-700-rgb), 0.1);
          backdrop-filter: blur(8px);
        }

        @media (min-width: 1200px) {
          .navbar {
            position: fixed;
          }
        }

        .glowbar {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 1.5px;
          background: linear-gradient(
            to right,
            var(--blue-500),
            var(--blue-450) 25%,
            var(--blue-500) 33%,
            var(--tina-blue) 45%,
            var(--blue-600) 58%,
            var(--blue-700) 75%,
            var(--blue-750) 100%
          );
          opacity: 0.2;
        }

        .background {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: -1;
          opacity: 0.7;
          background: linear-gradient(
            to right,
            rgba(var(--blue-450-rgb), 0.7),
            rgba(var(--blue-500-rgb), 0.8) 5%,
            var(--tina-blue) 13%,
            var(--blue-700) 27%,
            var(--blue-800) 66%,
            var(--blue-850)
          );
        }

        @-moz-document url-prefix() {
          .background {
            opacity: 0.9;
          }
        }

        @media (min-width: 1200px) {
        }

        .tina-icon {
          :global(svg) {
            display: block;
            width: 2.5em;
            height: auto;
            fill: white;
            filter: drop-shadow(0 0 6px rgba(var(--blue-300-rgb), 0.3));
          }
        }

        .nav {
          flex: 1 0 auto;
          display: flex;
          justify-content: flex-end;
        }

        .nav-ul {
          display: flex;
        }

        .nav-li {
          margin: 0 1.75rem;

          :global(a) {
            font-weight: 500;
            color: var(--blue-400);
            opacity: 0.7;
            transition: opacity 150ms ease-out;
            text-decoration: none;
            font-size: 1.125rem;
            letter-spacing: 0.0125em;
            text-shadow: 0 0 7px rgba(var(--blue-250-rgb), 0.2),
              0 0 10px rgba(var(--blue-250-rgb), 0.2),
              0 0 18px rgba(var(--blue-250-rgb), 0.15),
              0 0 42px rgba(var(--blue-300-rgb), 0.15);
            &:hover {
              opacity: 1;
              text-shadow: 0 0 7px rgba(var(--blue-250-rgb), 0.2),
                0 0 10px rgba(var(--blue-250-rgb), 0.2),
                0 0 18px rgba(var(--blue-250-rgb), 0.3),
                0 0 42px rgba(var(--blue-300-rgb), 0.3);
            }
          }
        }

        .navGithub {
          flex: 0 0 auto;
          height: 28px;
          filter: drop-shadow(0 4px 24px rgba(var(--blue-600-rgb), 0.3));
        }

        .nav-actions {
        }
      `}</style>
    </div>
  )
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
          stroke="var(--tina-blue)"
          stroke-width="7"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-dasharray="21 18"
        />
      </svg>
      <style jsx>{`
        svg {
          position: relative;
          width: 7em;
          margin: 0 4px;
          opacity: 0.5;
          overflow: visible;
          filter: drop-shadow(0 0 4px rgba(var(--blue-400-rgb), 0.4));
        }
      `}</style>
    </>
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
          <Button variant="ghost" href="/">
            Check It Out
          </Button>
        </div>
      </div>
      <style jsx>{`
        .feature {
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: stretch;
          padding: 32px 0;
          transition: opacity 0.6s cubic-bezier(0.215, 0.61, 0.355, 1);
          min-height: 75vh;
        }

        @media (min-width: 1200px) {
          .feature {
            min-height: 100vh;
            opacity: 0.3;
          }

          .feature.visible {
            opacity: 1;
          }
        }

        .content {
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: flex-start;
          gap: 36px;
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
            var(--blue-450) 60%,
            var(--blue-500) 70%
          );
          -webkit-background-clip: text;
          background-clip: text;
          text-shadow: 0 0 7px rgba(var(--blue-350-rgb), 0.2),
            0 0 18px rgba(var(--blue-350-rgb), 0.2),
            0 0 48px rgba(var(--blue-400-rgb), 0.3);
          margin: 0;
        }

        .title-wrapper {
          position: relative;
        }

        p {
          font-size: 22px;
          line-height: 1.8;
          font-weight: 400;
          color: var(--blue-450);
          text-shadow: 0 0 2px rgba(var(--blue-300-rgb), 0.3),
            0 0 4px rgba(var(--blue-300-rgb), 0.3);
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
                  style={{
                    width: pane.width + '%',
                    height: pane.height === 'auto' ? 'auto' : pane.height + '%',
                  }}
                >
                  {pane.video && (
                    <div className="video-wrapper">
                      <Video src={pane.video} />
                    </div>
                  )}
                  {pane.file && (
                    <div className="file-wrapper">
                      {pane.file.name && (
                        <div className="filename">{pane.file.name}</div>
                      )}
                      <div
                        className={`file ${pane.file.name ? 'with-name' : ''}`}
                        style={{
                          fontSize:
                            1.25 *
                              (pane.file.textScale ? pane.file.textScale : 1) +
                            'em',
                        }}
                      >
                        <div className="glow-border"></div>
                        <div className="code-wrapper">
                          <SyntaxHighlighter
                            languag={
                              pane.file.language
                                ? pane.file.language
                                : 'javascript'
                            }
                            useInlineStyles={false}
                            // wrapLines={true}
                            // wrapLongLines={true}
                          >
                            {pane.file.code}
                          </SyntaxHighlighter>
                        </div>
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
          max-width: 1500px;
          margin: 0 auto;
          display: flex;
          flex-direction: column-reverse;
          gap: 48px;
          padding: 72px 32px;
        }

        @media (min-width: 1200px) {
          .container {
            gap: 48px;
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
            padding-top: 32px;
          }
        }

        .right {
          width: 100%;
          position: sticky;
          -moz-position: sticky;

          top: 24px;
          display: flex;
          margin: 0 auto;
          flex-direction: column;
          justify-content: center;
          margin-bottom: 24px;
          transform: scale(0.85);

          --right-rotation: -5deg;

          // display: none;
        }

        @media (min-width: 650px) {
          .right {
            width: 85%;
            max-width: 600px;
          }
        }

        @media (min-width: 950px) {
          .right {
            width: 75%;
          }
        }

        @media (min-width: 1200px) {
          .right {
            width: 60%;
            max-width: none;
            height: 100vh;
            top: 32px;
            margin-bottom: 0;

            --right-rotation: -8deg;
          }
        }

        .video-wrapper {
          width: 100%;
          height: relative;
          background: linear-gradient(
            to bottom right,
            var(--blue-100) 10%,
            var(--blue-200) 20%,
            var(--blue-300) 40%,
            var(--blue-450) 70%,
            var(--blue-500) 85%
          );
          box-shadow: 4px 4px 16px rgba(var(--blue-300-rgb), 0.15),
            8px 8px 32px rgba(var(--blue-600-rgb), 0.15),
            16px 16px 64px rgba(var(--blue-600-rgb), 0.3);
          border-radius: 10px;
          overflow: hidden;

          :global(video) {
            display: block;
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
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: stretch;
          justify-content: stretch;
          width: 100%;
          flex: 1;
        }

        .code-wrapper {
          display: block;
          width: calc(100% - 3px);
          flex: 1;
          position: relative;
          margin: 1.5px;
          box-shadow: inset 0 0 256px rgba(var(--blue-850-rgb), 0.5),
            4px 4px 16px rgba(var(--blue-800-rgb), 0.2),
            16px 16px 64px rgba(var(--blue-850-rgb), 0.5);
          background: linear-gradient(
            to bottom right,
            var(--blue-850),
            var(--blue-900) 40%,
            var(--blue-850) 70%,
            var(--blue-800) 85%,
            var(--blue-750) 100%
          );
          border-radius: 10px;
          overflow: hidden;
        }

        .code-wrapper:after {
          content: '';
          display: block;
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0.15;
          background: repeating-linear-gradient(
            var(--blue-400),
            var(--blue-200) 40%,
            var(--blue-550) 50%,
            var(--blue-800) 90%
          );
          background-repeat: repeat-both;
          background-size: auto 6px;
          mix-blend-mode: overlay;
          border-radius: 10px;
        }

        .glow-border {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            to bottom right,
            var(--blue-750),
            var(--blue-600) 30%,
            var(--blue-450) 40%,
            var(--blue-650) 60%,
            var(--blue-700) 100%
          );
          border-radius: 11px;
          opacity: 0.7;
        }

        .glow-border:after {
          content: '';
          display: block;
          position: absolute;
          top: -16px;
          left: -16px;
          width: calc(100% + 32px);
          height: calc(100% + 32px);
          background: linear-gradient(
            to bottom right,
            transparent 10%,
            var(--blue-600) 40%,
            transparent 60%
          );
          border-radius: 11px;
          filter: blur(32px);
          opacity: 0.3;
        }

        .file.with-name .code-wrapper {
          border-radius: 0 10px 10px 10px;
        }

        .file.with-name .code-wrapper:after {
          border-radius: 0 10px 10px 10px;
        }

        .file.with-name .glow-border {
          border-radius: 0 11px 11px 11px;
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
          border: 1.5px solid var(--blue-750);
          border-bottom: none;
          box-shadow: inset 0 0 256px rgba(var(--blue-850-rgb), 0.5),
            4px 4px 16px rgba(var(--blue-800-rgb), 0.2),
            16px 16px 64px rgba(var(--blue-850-rgb), 0.5);
          background: linear-gradient(
            to bottom right,
            var(--blue-800),
            var(--blue-900)
          );
          font-weight: medium;
          font-family: SFMono-Regular, Menlo, Monaco, Consolas,
            'Liberation Mono', 'Courier New', monospace;
          text-shadow: 0 0 7px rgba(var(--blue-250-rgb), 0.2),
            0 0 10px rgba(var(--blue-250-rgb), 0.2),
            0 0 18px rgba(var(--blue-250-rgb), 0.15),
            0 0 42px rgba(var(--blue-300-rgb), 0.15);
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
            translate3d(-4%, -50%, 75px);
          transition-duration: 400ms;
          transition-timing-function: cubic-bezier(0.225, 0.125, 0.44, 0.295);
          opacity: 0;
        }

        .out-right {
          transform: rotate3d(0, 1, 0, var(--right-rotation))
            translate3d(100%, -7%, 100px);
          transition-duration: 400ms;
          transition-timing-function: cubic-bezier(0.225, 0.125, 0.44, 0.295);
          opacity: 0;
        }

        .out-bottom {
          transform: rotate3d(0, 1, 0, var(--right-rotation))
            translate3d(-4%, 50%, -25px);
          transition-duration: 400ms;
          transition-timing-function: cubic-bezier(0.225, 0.125, 0.44, 0.295);
          opacity: 0;
        }

        /* Code Styles */

        :global(.hljs) {
          font-size: unquote('clamp(0.75em,0.676em + 0.37vw, 1em)			');
          padding: 32px;
          color: var(--blue-250);
          font-weight: medium;
          font-family: SFMono-Regular, Menlo, Monaco, Consolas,
            'Liberation Mono', 'Courier New', monospace;
          text-shadow: 0 0 7px rgba(var(--blue-250-rgb), 0.15),
            0 0 12px rgba(var(--blue-250-rgb), 0.2),
            0 0 32px rgba(var(--blue-250-rgb), 0.3);
        }

        :global(.hljs-number) {
          color: var(--blue-400);
          text-shadow: 0 0 7px rgba(var(--blue-400-rgb), 0.15),
            0 0 12px rgba(var(--blue-400-rgb), 0.2),
            0 0 32px rgba(var(--blue-400-rgb), 0.3);
        }

        :global(.hljs-meta) {
          color: var(--blue-650);
          text-shadow: 0 0 7px rgba(var(--blue-650-rgb), 0.15),
            0 0 12px rgba(var(--blue-650-rgb), 0.2),
            0 0 32px rgba(var(--blue-650-rgb), 0.3);
        }

        :global(.hljs-attr),
        :global(.hljs-attribute) {
          color: #d07ea5;
          text-shadow: 0 0 7px rgba(208, 126, 165, 0.15),
            0 0 12px rgba(208, 126, 165, 0.2), 0 0 32px rgba(208, 126, 165, 0.5);
        }

        :global(.hljs-string) {
          color: var(--blue-400);
        }
      `}</style>
    </>
  )
}

const Glass = ({ children }) => {
  return (
    <>
      <div className="container">
        <div className="box">
          <div className="glow"></div>
          <div className="content">{children}</div>
        </div>
      </div>
      <style jsx>{`
        .box {
          position: relative;
          padding: 1.5px;
        }

        .content {
          position: relative;
          z-index: 1000;
          display: block;
          min-height: 50vh;
          background: linear-gradient(
            to top left,
            var(--blue-800) 0%,
            var(--blue-850) 30%,
            var(--blue-850) 55%,
            var(--blue-800) 74%,
            var(--blue-700) 100%
          );
          box-shadow: inset 8px 8px 16px -8px rgba(var(--blue-550-rgb), 0.2),
            inset 8px 8px 64px -8px rgba(var(--blue-550-rgb), 0.2),
            inset -8px -8px 16px -8px rgba(var(--blue-700-rgb), 0.2),
            inset -8px -8px 64px -8px rgba(var(--blue-700-rgb), 0.2),
            0 0 24px rgba(var(--blue-600-rgb), 0.2),
            0 0 48px rgba(var(--blue-850-rgb), 0.3);
          overflow: hidden;
          border-radius: 10px;
        }

        .glow {
          content: '';
          display: block;
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            to bottom right,
            var(--blue-600),
            var(--blue-450) 40%,
            var(--blue-650) 65%,
            var(--blue-700) 100%
          );
          border-radius: 11px;
          opacity: 0.7;
          transition: opacity 0.5s ease-out;
        }

        .glow:after {
          content: '';
          display: block;
          position: absolute;
          top: -16px;
          left: -16px;
          width: calc(100% + 32px);
          height: calc(100% + 32px);
          background: linear-gradient(
            to bottom right,
            transparent 10%,
            var(--blue-500) 40%,
            transparent 60%
          );
          background-blend-mode: overlay;
          border-radius: 11px;
          filter: blur(32px);
          opacity: 0.3;
        }

        .container {
          position: relative;
          width: 100%;
          max-width: 1500px;
          margin: 0 auto;
          padding: 72px 32px;
        }

        @media (min-width: 1200px) {
          .container {
            padding: 48px;
          }
        }
      `}</style>
    </>
  )
}

const Spacer = () => {
  return (
    <>
      <div className="spacer"></div>
      <style jsx>{`
        .spacer {
          display: block;
          height: 72px;
        }
      `}</style>
    </>
  )
}

const LazyPlayground = () => {
  const [state, setState] = React.useState('default')

  React.useEffect(() => {
    let timeout

    if (state === 'loading') {
      timeout = setTimeout(() => {
        setState('loaded')
      }, 3000)
    }

    return () => {
      clearTimeout(timeout)
    }
  }, [state])

  return (
    <>
      {state !== 'default' && (
        <iframe
          width="100%"
          height="600px"
          src="https://tina-gql-playground.vercel.app/iframe/string-body"
        />
      )}{' '}
      {state !== 'loaded' && (
        <div className={`preview-wrapper preview-${state}`}>
          <button
            onClick={() => {
              setState('loading')
            }}
            className="playground-trigger"
          >
            <img
              className="playground-preview"
              src="https://res.cloudinary.com/forestry-demo/image/upload/v1657043847/tina-io/new-homepage/playground-preview.png"
              alt=""
            />
          </button>
          <div className="overlay-button">
            {state === 'loading' ? (
              <span className="loading">
                Loading Playground <ImSpinner6 />
              </span>
            ) : (
              <Button
                size="large"
                onClick={() => {
                  setState('loading')
                }}
              >
                Load Playground <BsPlay />
              </Button>
            )}
          </div>
        </div>
      )}
      <style jsx>{`
        .preview-wrapper {
          position: relative;
          background: var(--blue-900);
        }

        .preview-loading {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }

        .preview-loading .playground-trigger {
          pointer-events: none;
        }

        .overlay-button {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate3d(-50%, -50%, 0);
        }

        .overlay-button :global(svg) {
          margin-left: 0.25em;
          height: 1.375em;
          width: auto;
          display: inline-block;
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        .loading {
          display: flex;
          align-items: center;
          font-size: 1.5rem;
          line-height: 1;
          font-weight: 600;
          color: var(--blue-700);
          text-shadow: 0 0 7px rgba(var(--blue-350-rgb), 0.2),
            0 0 18px rgba(var(--blue-350-rgb), 0.2),
            0 0 48px rgba(var(--blue-400-rgb), 0.3);
          pointer-events: none;
          margin: 0;
        }

        .loading :global(svg) {
          margin-left: 0.5em;
          height: 1.375em;
          width: auto;
          display: inline-block;
          animation: spin 1s linear infinite;
        }

        .playground-trigger {
          display: block;
          width: 100%;
          padding: 0;
          margin: 0;
          border: none;
          background: none;
          overflow: hidden;
          border-radius: 10px;
          cursor: pointer;
        }

        .playground-trigger:after {
          content: '';
          display: block;
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            to bottom right,
            var(--blue-450),
            var(--blue-500) 40%,
            var(--blue-550) 70%,
            var(--blue-650) 100%
          );
          mix-blend-mode: hard-light;
          opacity: 0.7;
        }

        .playground-preview {
          display: block;
          margin: 0;
          width: 100%;
          height: auto;
          filter: blur(2px);
          opacity: 0.7;
        }

        iframe {
          display: block;
          margin: 0;
          background: white;
          overflow: hidden;
          border-radius: 10px;
        }
      `}</style>
    </>
  )
}

const Page = props => {
  return (
    <>
      <div className={`wrapper`}>
        <Navbar />
        <Story data={storyData} />
        <Glass></Glass>
        <Story data={storyData} />
        <Glass>
          <LazyPlayground />
        </Glass>
        <Spacer />
        <Footer />
      </div>
      <style jsx>{`
        :global(:root) {
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
        }

        .wrapper {
          position: relative;
          width: 100vw;
          height: 100vh;
          overflow-y: auto;
          overflow-x: hidden;
          background: linear-gradient(
            to bottom right,
            var(--blue-450) 1%,
            var(--blue-500) 4%,
            var(--blue-550) 7%,
            var(--blue-650) 13%,
            var(--blue-700) 17%,
            var(--blue-750) 23%,
            var(--blue-800) 34%,
            var(--blue-850) 45%,
            var(--blue-900) 60%,
            var(--blue-950) 75%,
            var(--blue-900) 90%,
            var(--blue-850) 100%
          );
          background-attachment: fixed;
        }
      `}</style>
    </>
  )
}

export default Page
