import * as React from 'react'
import { useInView } from 'react-intersection-observer'

const data = {
  features: [
    {
      id: 'editing',
      title: 'Really Important Super Awesome Headline Text',
      description:
        'Phasellus quis nibh scelerisque, cursus magna a, semper mauris. Pellentesque dui eros, lobortis quis dui eu, finibus pellentesque dui.',
    },
    {
      id: 'file',
      title: 'Really Important Super Awesome Headline Text',
      description:
        'Phasellus quis nibh scelerisque, cursus magna a, semper mauris. Pellentesque dui eros, lobortis quis dui eu, finibus pellentesque dui.',
    },
    {
      id: 'schema',
      title: 'Really Important Super Awesome Headline Text',
      description:
        'Phasellus quis nibh scelerisque, cursus magna a, semper mauris. Pellentesque dui eros, lobortis quis dui eu, finibus pellentesque dui.',
    },
    {
      id: 'git',
      title: 'Really Important Super Awesome Headline Text',
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
      positions: {
        editing: 'front',
        file: 'back',
        schema: 'front',
        git: 'back',
        default: 'out-bottom',
      },
    },
    {
      name: 'File System',
      background: 'dark',
      width: '100',
      height: '100',
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
      positions: {
        schema: 'foreground',
        git: 'out-top',
        default: 'out-bottom',
      },
    },
    {
      name: 'Git Commit',
      background: 'dark',
      width: '95',
      height: '50',
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

  return (
    <>
      <div
        className={`feature ${inView && activeId === item.id ? 'visible' : ''}`}
      >
        <div className="content" ref={ref}>
          <h2>{item.title}</h2>
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
          transition: opacity 0.5s ease-in-out;
          margin-bottom: 64px;
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

        h2 {
          font-size: unquote('clamp(2rem, 1.75rem + 2vw, 3.375em)');
          line-height: 1.25;
          font-weight: 600;
          color: white;
          margin-bottom: 32px;
          text-shadow: 0 0 3px rgba(104, 217, 212, 0.3),
            0 0 16px rgba(104, 217, 212, 0.2);
        }

        p {
          font-size: 22px;
          line-height: 1.8;
          font-weight: 400;
          color: #68d9d4;
          text-shadow: 0 0 3px rgba(104, 217, 212, 0.3),
            0 0 6px rgba(104, 217, 212, 0.2);
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
                ></div>
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
          top: 72px;
          display: flex;
          margin: 0 auto;
          max-width: 650px;
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
          border: 1px solid #163f92;
          background: linear-gradient(
            to bottom right,
            #140845,
            #10267f 60%,
            #163f92 90%,
            #1b61b1
          );
          box-shadow: inset 0 0 128px rgba(27, 97, 177, 0.2),
            4px 4px 16px rgba(27, 97, 177, 0.2),
            16px 16px 64px rgba(14, 3, 42, 0.5);
        }

        .light {
          border: 1px solid #c2f7eb;
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

        .foreground {
          transform: rotateY(var(--right-rotation)) translate3d(4%, -14%, 100px);
        }

        .out-top {
          transform: rotateY(var(--right-rotation)) translate3d(0, -100%, 0);
          transition: all 0.5s ease-in;
          opacity: 0;
        }

        .out-bottom {
          transform: rotateY(var(--right-rotation)) translate3d(0, 100%, 0);
          opacity: 0;
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
          background: linear-gradient(
            to bottom right,
            #2ab7cf,
            #2280c3 12%,
            #163f92 30%,
            #0f0f67 50%,
            #140845 70%,
            #0f0f67 100%
          );
        }

        .other-section {
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
