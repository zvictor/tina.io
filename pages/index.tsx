import * as React from 'react'
import Link from 'next/link'
import { useInView } from 'react-intersection-observer'
import SyntaxHighlighter from 'react-syntax-highlighter'
import TinaIcon from '../public/svg/tina-icon.svg'
import navData from '../content/navigation.json'
import GitHubButton from 'react-github-btn'

const Header = () => {
  return (
    <div className="navbar">
      <div className="background"></div>
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
        <a href="/" className="button">
          Sign In
        </a>
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
          padding: 18px 48px;
          border-bottom: 1px solid rgba(31, 151, 203, 0.15);
          box-shadow: 4px 4px 16px rgba(27, 97, 177, 0.1),
            16px 16px 64px rgba(22, 63, 146, 0.1);
          backdrop-filter: blur(8px);
        }

        @media (min-width: 1200px) {
          .navbar {
            position: fixed;
          }
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
            rgba(42, 183, 207, 0.8) -4%,
            rgba(34, 128, 195, 0.9) 6%,
            var(--blue-700) 25%,
            var(--blue-800) 66%,
            var(--blue-850)
          );
        }

        @media (min-width: 1200px) {
        }

        .tina-icon {
          :global(svg) {
            display: block;
            width: 2.5em;
            height: auto;
            fill: white;
            filter: drop-shadow(0 4px 4px rgba(22, 63, 146, 0.07));
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
            text-shadow: 0 0 7px rgba(165, 237, 220, 0.2),
              0 0 10px rgba(165, 237, 220, 0.2),
              0 0 18px rgba(165, 237, 220, 0.15),
              0 0 42px rgba(104, 217, 212, 0.15);
            &:hover {
              opacity: 1;
            }
          }
        }

        .navGithub {
          flex: 0 0 auto;
          height: 28px;
          filter: drop-shadow(0 4px 24px rgba(34, 128, 195, 0.5));
        }

        .nav-actions {
        }

        .button {
          text-decoration: none;
          font-size: 1.125rem;
          font-weight: bold;
          color: var(--blue-300);
          padding: 8px 24px;
          border-radius: 24px;
          border: 1.5px solid var(--blue-500);
          background: transparent;
          box-shadow: 4px 4px 12px rgba(104, 217, 212, 0.2) inset,
            0 0 3px 1px rgba(165, 237, 220, 0.2) inset,
            1px 2px 12px rgba(165, 237, 220, 0.2),
            8px 8px 32px rgba(34, 128, 195, 0.2);
          text-shadow: 0 0 7px rgba(165, 237, 220, 0.3),
            0 0 10px rgba(165, 237, 220, 0.1), 0 0 18px rgba(165, 237, 220, 0.1);
          transition: all 0.2s cubic-bezier(0.215, 0.61, 0.355, 1);

          :hover {
            color: white;
            background: rgba(34, 128, 195, 0.2);
            box-shadow: 4px 4px 12px rgba(104, 217, 212, 0.3) inset,
              0 0 3px 1px rgba(165, 237, 220, 0.3) inset,
              1px 2px 12px rgba(165, 237, 220, 0.4),
              8px 8px 32px rgba(34, 128, 195, 0.4);
          }

          :active {
            color: var(--blue-400);
            background: rgba(34, 128, 195, 0.3);
          }
        }
      `}</style>
    </div>
  )
}

const ContextualPreview = ({ state = 'default' }) => {
  const [activeField, setActiveField] = React.useState(null)
  const defaultValues = {
    title: ['Awesome Developer Experience', 'Awesome Editing Experience'],
    body: [
      'Tina empowers your team by giving you more control over your components.',
      'Tina empowers your team by providing a powerful editing experience.',
    ],
  }
  const [value, setValue] = React.useState({
    title: defaultValues.title[0],
    body: defaultValues.body[0],
  })
  const [formData, setFormData] = React.useState({
    title: {
      label: 'Title',
      value: value.title,
      type: 'text',
    },
    body: {
      label: 'Body',
      value: value.body,
      type: 'mdx',
    },
  })

  React.useEffect(() => {
    let editingTimeout
    if (state === 'editing') {
      editingTimeout = setTimeout(() => {
        setActiveField('title')
      }, 200)
    }

    return () => {
      clearTimeout(editingTimeout)
    }
  }, [state])

  React.useEffect(() => {
    if (!activeField) return

    // setValue({ ...value, [activeField]: '' })
    let newValue = defaultValues[activeField].filter(
      thisValue => thisValue !== value[activeField]
    )[0]
    let i = 0
    let typeTimeout
    let typeIndexTimeout
    let writingTimeout
    let switchTimeout

    const writeText = () => {
      if (i < newValue.length) {
        setValue(value => {
          return {
            ...value,
            [activeField]: value[activeField] + newValue.charAt(i),
          }
        })
        typeTimeout = setTimeout(writeText, 65)
        typeIndexTimeout = setTimeout(() => {
          i++
        }, 60)
      } else {
        switchTimeout = setTimeout(() => {
          if (state === 'editing') {
            if (activeField === 'title') {
              setActiveField('body')
            } else {
              setActiveField('title')
            }
          } else {
            setActiveField(null)
          }
        }, 1000)
      }
    }

    const deleteText = () => {
      setValue(value => {
        const nextValue = value[activeField].slice(0, -1)
        if (nextValue === '') {
          typeTimeout = setTimeout(writeText, 165)
        } else if (newValue.startsWith(nextValue)) {
          i = nextValue.length
          typeTimeout = setTimeout(writeText, 165)
        } else {
          typeTimeout = setTimeout(deleteText, 35)
        }
        return {
          ...value,
          [activeField]: nextValue,
        }
      })
    }

    typeTimeout = setTimeout(deleteText, 750)

    return () => {
      clearTimeout(typeTimeout)
      clearTimeout(typeIndexTimeout)
      clearTimeout(writingTimeout)
      clearTimeout(switchTimeout)
    }
  }, [activeField, state])

  return (
    <>
      <div className="preview">
        <div className="sidebar">
          <div className="form">
            {Object.keys(formData).map(name => {
              const { label, type } = formData[name]
              return (
                <div
                  className={`field ${type} ${
                    name === activeField ? 'active' : ''
                  }`}
                >
                  <span className="label">
                    {label}
                    {/* {type === 'mdx' && <span className="add-button"></span>} */}
                  </span>
                  <span className="input">
                    {type === 'mdx' && (
                      <span className="mdx-component">Cool Component</span>
                    )}
                    {value[name]}
                    <span className="cursor"></span>
                  </span>
                </div>
              )
            })}
          </div>
          <div className="actions">
            <span className="button">Save</span>
          </div>
        </div>
        <div className="website">
          <span className="title">
            {value.title !== '' ? value.title : ' '}
          </span>
          <span className="component">MDX Rocks</span>
          <span className="body">{value.body !== '' ? value.body : ' '}</span>
          <Blobs />
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
          font-size: unquote('clamp(0.625rem,0.477rem + 0.741vw, 1.125rem)');
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
          padding: 1em 1.25em;
        }

        .button {
          background: var(--tina-blue);
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
          padding: 1.5em;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: stretch;
        }

        .field {
          margin-bottom: 1em;
          display: block;
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: stretch;
        }

        @keyframes blink {
          0% {
            opacity: 0;
          }
          40% {
            opacity: 0;
          }
          60% {
            opacity: 1;
          }
          100% {
            opacity: 1;
          }
        }

        .cursor {
          display: none;
          position: relative;
          height: 1em;
          width: 2px;
          margin-right: -3px;
          border-radius: 2px;
          transform: translate3d(1.5px, 1.5px, 0);
          background: var(--blue-500);
          animation: blink 500ms alternate infinite;
        }

        .active .cursor {
          display: inline-block;
        }

        .label {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          font-weight: bold;
          letter-spacing: 0.02em;
          color: var(--blue-700);
          font-size: 1.125em;
          margin-bottom: 0.25em;
          transition: all 0.2s ease-out;
        }

        .active .label {
          color: var(--tina-blue);
        }

        .add-button {
          display: block;
          width: 1.25em;
          height: 1.25em;
          background: var(--tina-blue);
          border-radius: 5em;
          box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
          opacity: 0.7;
        }

        .input {
          font-size: unquote('clamp(0.625rem,0.514rem + 0.556vw, 1rem)');
          line-height: 1.2;
          padding: 0.625em 0.75em;
          border-radius: 0.375em;
          border: 1px solid var(--blue-250);
          box-shadow: rgba(27, 97, 177, 0.1) 0px 0.25em 0.25em 0px inset;
          background: white;
          transition: all 0.2s ease-out;
        }

        .mdx-component {
          display: block;
          margin-top: 0.125em;
          margin-bottom: 0.75em;
          font-size: unquote('clamp(0.625rem,0.514rem + 0.556vw, 1rem)');
          line-height: 1.2;
          padding: 0.625em 0.75em;
          border-radius: 0.375em;
          border: 1px solid var(--blue-250);
          box-shadow: rgba(27, 97, 177, 0.1) 0px 0.25em 0.25em 0px;
          background: white;
        }

        .mdx .input {
          min-height: 6em;
        }

        .active .input {
          box-shadow: 0 0 0 2px var(--tina-blue),
            rgba(27, 97, 177, 0.1) 0px 0.25em 0.25em 0px inset;
        }

        .website {
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 32px;
          background: linear-gradient(
            to bottom right,
            var(--blue-300),
            var(--blue-350),
            var(--blue-400),
            var(--blue-450),
            var(--blue-500)
          );
          border: 1px solid var(--blue-400);
          border-radius: 0 10px 10px 0;
          flex: 1 1 auto;
          text-align: center;
          overflow: hidden;
        }

        .website:after {
          content: '';
          display: block;
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border-radius: 0 10px 10px 0;
          filter: url(#noiseFilter) brightness(0.7) contrast(150%);
          background: black;
          z-index: 100;
          mix-blend-mode: hard-light;
          pointer-events: none;
          opacity: 0.3;
        }

        .title {
          position: relative;
          z-index: 10;
          line-height: 1.1;
          font-weight: bold;
          color: var(--blue-700);
          font-weight: 600;
          display: block;
          color: transparent;
          background: linear-gradient(
            to bottom right,
            var(--blue-500),
            var(--blue-550) 15%,
            var(--blue-650) 40%,
            var(--blue-700) 60%,
            var(--blue-750) 70%
          );
          -webkit-background-clip: text;
          background-clip: text;
          font-size: 3em;
        }

        .body {
          position: relative;
          z-index: 10;
          line-height: 1.4;
          color: var(--blue-700);
          font-weight: 500;
          display: block;
          color: transparent;
          background: linear-gradient(
            to bottom right,
            var(--blue-450),
            var(--blue-500) 15%,
            var(--blue-600) 50%,
            var(--blue-650) 70%
          );
          -webkit-background-clip: text;
          background-clip: text;
          font-size: 1.375em;
        }

        .component {
          position: relative;
          z-index: 10;
          line-height: 1.1;
          background: linear-gradient(
            to top left,
            var(--blue-750),
            var(--blue-650),
            var(--blue-550)
          );
          border-radius: 10px;
          color: var(--blue-350);
          font-weight: medium;
          padding: 0.625em 0.875em;
          border: 1px solid var(--blue-500);
          box-shadow: inset 0 0 28px -8px var(--blue-350),
            inset -2px -2px 12px -4px var(--blue-450),
            8px 16px 32px -8px var(--blue-550);
          font-size: 1.25em;
          margin: 1.5em 0;
        }

        .website :global(svg) {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 100%;
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
      height: '100',
      component: ContextualPreview,
      positions: {
        editing: 'front',
        file: 'back',
        schema: 'front-bottom',
        git: 'back',
        default: 'out-bottom',
      },
      states: {
        editing: 'editing',
        file: 'default',
        schema: 'default',
        git: 'default',
        default: 'default',
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
          margin: 32px 4px;
          opacity: 0.25;
          overflow: visible;
        }
      `}</style>
    </>
  )
}

const Blobs = () => {
  return (
    <svg
      width="770"
      height="770"
      viewBox="0 0 770 770"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
    >
      <g clip-path="url(#clip0_211_417)">
        <rect width="770" height="770" fill="url(#paint0_linear_211_417)" />
        <g filter="url(#filter0_f_211_417)">
          <path
            d="M652.877 -86.4226C617.378 240.577 477.378 287.077 233.628 467.958C-10.1228 648.839 -104.326 333.133 86.0298 144.636C276.386 -43.8599 671.204 -255.239 652.877 -86.4226Z"
            fill="url(#paint1_linear_211_417)"
          />
        </g>
        <g filter="url(#filter1_f_211_417)">
          <path
            d="M840.159 342.807C991.352 597.408 932.87 980.524 661.597 966.909C390.324 953.293 263.4 588.819 396.891 372.306C530.382 155.794 688.966 88.2067 840.159 342.807Z"
            fill="url(#paint2_linear_211_417)"
          />
        </g>
      </g>
      <defs>
        <filter
          id="filter0_f_211_417"
          x="-175.245"
          y="-308.088"
          width="988.739"
          height="990.08"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="80"
            result="effect1_foregroundBlur_211_417"
          />
        </filter>
        <filter
          id="filter1_f_211_417"
          x="183.426"
          y="19.0366"
          width="898.354"
          height="1108.23"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="80"
            result="effect1_foregroundBlur_211_417"
          />
        </filter>
        <linearGradient
          id="paint0_linear_211_417"
          x1="770"
          y1="770"
          x2="-159.335"
          y2="372.794"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#1F97CB" />
          <stop offset="0.302083" stop-color="#46C6D1" />
          <stop offset="0.640625" stop-color="#96E6D8" />
          <stop offset="1" stop-color="#A5EDDC" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_211_417"
          x1="217.878"
          y1="347.077"
          x2="433.107"
          y2="-77.4733"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#A5EDDC" />
          <stop offset="1" stop-color="#46C6D1" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_211_417"
          x1="556.832"
          y1="839.302"
          x2="865.998"
          y2="468.606"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#68D9D4" stop-opacity="0.6" />
          <stop offset="1" stop-color="#B4F4E0" />
        </linearGradient>
        <clipPath id="clip0_211_417">
          <rect width="770" height="770" fill="white" />
        </clipPath>
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
            var(--blue-450) 60%,
            var(--blue-500) 70%
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
                  {pane.component && (
                    <pane.component
                      state={
                        pane.states[activeId]
                          ? pane.states[activeId]
                          : pane.states.default
                      }
                    />
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
          overflow: hidden;
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
      <div className={`wrapper`}>
        <Header />
        <Story data={storyData} />
        <div className="other-section"></div>
        <Story data={storyData} />
        <svg className="noise-filter">
          <filter id="noiseFilter">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="7"
              numOctaves="5"
              stitchTiles="stitch"
            />
          </filter>
        </svg>
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
          background-attachment: fixed;
        }

        .noise-filter {
          position: absolute;
          visibility: hidden;
        }
      `}</style>
    </>
  )
}

export default Page
