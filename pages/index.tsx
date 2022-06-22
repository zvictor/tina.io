import * as React from 'react'
import Link from 'next/link'
import { useInView } from 'react-intersection-observer'
import SyntaxHighlighter from 'react-syntax-highlighter'
import TinaIcon from '../public/svg/tina-icon.svg'
import navData from '../content/navigation.json'

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
        <iframe
          className="starButton"
          src="https://ghbtns.com/github-btn.html?user=tinacms&repo=tinacms&type=star&count=true&size=large"
          frameBorder="0"
          scrolling="0"
          width="150px"
          height="30px"
        ></iframe>
      </div>
      <style jsx>{`
        .navbar {
          position: fixed;
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
        }
      `}</style>
    </div>
  )
}

const ContextualPreview = ({ state = 'default' }) => {
  const [activeField, setActiveField] = React.useState(null)
  const defaultValues = {
    title: ['Awesome Editing Experience', 'Awesome Developer Experience'],
    description: ['This is a small subheading', 'This is another subheading'],
  }
  const [value, setValue] = React.useState({
    title: defaultValues.title[0],
    description: defaultValues.description[0],
  })
  const [formData, setFormData] = React.useState({
    title: {
      label: 'Title',
      value: value.title,
      type: 'text',
    },
    description: {
      label: 'Description',
      value: value.description,
      type: 'text',
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
          if (activeField === 'title') {
            setActiveField('description')
          } else {
            setActiveField('title')
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
  }, [activeField])

  return (
    <>
      <div className="preview">
        <div className="sidebar">
          <div className="form">
            {Object.keys(formData).map(name => {
              const { label } = formData[name]
              return (
                <div
                  className={`field ${name === activeField ? 'active' : ''}`}
                >
                  <span className="label">{label}</span>
                  <span className="input">
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
          <span className="text">
            {value.description !== '' ? value.description : ' '}
          </span>
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
          padding: 16px 20px;
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
          padding: 24px;
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

        .input {
          font-size: 1em;
          padding: 0.5em 0.75em;
          border-radius: 0.375em;
          border: 1px solid var(--blue-250);
          box-shadow: rgba(27, 97, 177, 0.1) 0px 0.25em 0.25em 0px inset;
          background: white;
          transition: all 0.2s ease-out;
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
          font-size: unquote('clamp(2.25rem, 2rem + 2vw, 3.375rem)');
          margin-bottom: 0.75em;
        }

        .text {
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
          font-size: unquote('clamp(1rem, 0.75rem + 1vw, 1.5rem)');
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
      <g clip-path="url(#clip0_197_367)">
        <rect width="770" height="770" fill="url(#paint0_linear_197_367)" />
        <g filter="url(#filter0_f_197_367)">
          <path
            d="M550.5 491C622.5 515.5 696.089 502.664 771 448.112V787H0V311C145.5 404.5 277 395 319.5 331C362 267 396 243.506 452 252C508 260.494 519.517 315.368 477.5 356.5C442.5 390.763 468.5 463.097 550.5 491Z"
            fill="url(#paint1_linear_197_367)"
          />
          <path
            d="M0 770V538.965C119 441.5 191.779 422.156 273 458C379.5 505 286.5 588.5 302.3 665.114C315.418 728.722 489.369 744.409 560 685C613.5 640 520.112 580.369 595 557C665.5 535 723.932 582.032 771 604.802V770H0Z"
            fill="url(#paint2_linear_197_367)"
          />
          <path
            d="M562.294 355.416C551.239 296.653 579.564 206.388 659.696 231.226C739.828 256.064 763.316 359.051 707.362 396.005C651.407 432.959 573.35 414.179 562.294 355.416Z"
            fill="url(#paint3_linear_197_367)"
          />
          <path
            d="M38.243 646.537C36.0063 573.665 118.928 502.083 198.454 541.019C277.979 579.955 254.173 672.358 177.007 699.439C99.8415 726.521 40.4796 719.409 38.243 646.537Z"
            fill="url(#paint4_linear_197_367)"
          />
          <path
            d="M575.257 108.092C609.674 79.7166 662.716 45.7536 771 80.9188V-1H0V96.1037C62.9919 120.48 117.134 165.635 117.134 234.766C117.134 310.377 182.729 345.057 254.57 302.699C327.836 259.501 299.862 205.595 254.57 165.635C220.31 135.407 248.831 54.3379 335.783 40.1592C410.676 27.9469 455.52 52.9465 458.643 75.3243C461.767 97.7021 421.681 109.69 421.681 131.668C421.681 153.647 435.217 178.422 493.523 178.422C551.83 178.422 547.144 131.269 575.257 108.092Z"
            fill="url(#paint5_linear_197_367)"
          />
        </g>
      </g>
      <defs>
        <filter
          id="filter0_f_197_367"
          x="-34"
          y="-35"
          width="839"
          height="856"
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
            stdDeviation="18"
            result="effect1_foregroundBlur_197_367"
          />
        </filter>
        <linearGradient
          id="paint0_linear_197_367"
          x1="1016.5"
          y1="371.5"
          x2="86.1982"
          y2="744.682"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="var(--blue-450)" />
          <stop offset="0.302083" stop-color="var(--blue-400)" />
          <stop offset="0.640625" stop-color="var(--blue-350)" />
          <stop offset="1" stop-color="var(--blue-300)" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_197_367"
          x1="-400"
          y1="1032"
          x2="1501.3"
          y2="152.768"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="var(--blue-450)" />
          <stop offset="0.302083" stop-color="var(--blue-400)" />
          <stop offset="0.640625" stop-color="var(--blue-350)" />
          <stop offset="1" stop-color="var(--blue-300)" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_197_367"
          x1="700.179"
          y1="766.997"
          x2="215.47"
          y2="217.477"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="var(--blue-450)" />
          <stop offset="0.302083" stop-color="var(--blue-400)" />
          <stop offset="0.640625" stop-color="var(--blue-350)" />
          <stop offset="1" stop-color="var(--blue-300)" />
        </linearGradient>
        <linearGradient
          id="paint3_linear_197_367"
          x1="197"
          y1="-41.5"
          x2="1065.7"
          y2="236.857"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="var(--blue-450)" />
          <stop offset="0.302083" stop-color="var(--blue-400)" />
          <stop offset="0.640625" stop-color="var(--blue-350)" />
          <stop offset="1" stop-color="var(--blue-300)" />
        </linearGradient>
        <linearGradient
          id="paint4_linear_197_367"
          x1="200"
          y1="767"
          x2="-62.4261"
          y2="559.572"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="var(--blue-450)" />
          <stop offset="0.302083" stop-color="var(--blue-400)" />
          <stop offset="0.640625" stop-color="var(--blue-350)" />
          <stop offset="1" stop-color="var(--blue-300)" />
        </linearGradient>
        <linearGradient
          id="paint5_linear_197_367"
          x1="-100"
          y1="-75.5"
          x2="492.102"
          y2="647.712"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="var(--blue-450)" />
          <stop offset="0.302083" stop-color="var(--blue-400)" />
          <stop offset="0.640625" stop-color="var(--blue-350)" />
          <stop offset="1" stop-color="var(--blue-300)" />
        </linearGradient>
        <clipPath id="clip0_197_367">
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
