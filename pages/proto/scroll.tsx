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
        default: 'out-top',
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
        default: 'out-top',
      },
    },
    {
      name: 'Schema',
      background: 'dark',
      width: '50',
      height: '100',
      basePosition: 'absolute-right',
      positions: {
        schema: 'foreground-right',
        git: 'out-top',
        default: 'out-bottom',
      },
    },
    {
      name: 'Git Commit',
      background: 'dark',
      width: '90',
      height: '50',
      positions: {
        schema: 'out-bottom',
        git: 'foreground-top',
        default: 'out-top',
      },
    },
  ],
}

const Feature = ({ activeId, setActiveId, item }) => {
  const { ref, inView, entry } = useInView({
    /* Optional options */
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
        ref={ref}
        className={`feature ${inView && activeId === item.id ? 'visible' : ''}`}
      >
        <h2>{item.title}</h2>
        <p>{item.description}</p>
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
          font-size: 54px;
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
          gap: 32px;
          padding: 48px 32px;
          transform-style: preserve-3d;
        }

        @media (min-width: 1200px) {
          .container {
            padding: 0 32px;
            flex-direction: row;
          }
        }

        .left {
          width: 100%;
          transform: rotateY(3deg) translate3d(0, 0, 0);
          transform-style: preserve-3d;
        }

        @media (min-width: 1200px) {
          .left {
            width: 40%;
          }
        }

        .right {
          width: 80%;
          position: sticky;
          top: 48px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          transform-style: preserve-3d;
          margin-bottom: 48px;
        }

        @media (min-width: 1200px) {
          .right {
            width: 60%;
            height: 100vh;
            top: 0;
            margin-bottom: 0;
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
          background: linear-gradient(
            to bottom right,
            #0e032a,
            #140845,
            #0f0f67
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
          transition: all 0.5s ease-out;
          transform: rotateY(-10deg) translate3d(0, 0, 0);
        }

        .absolute-right {
          right: 0;
        }

        .back {
          transform: rotateY(-10deg) translate3d(7%, 14%, -50px);
          z-index: -1;
        }

        .front {
          transform: rotateY(-10deg) translate3d(0, 0, 0);
        }

        .foreground-right {
          transform: rotateY(-10deg) translate3d(5%, 0, 100px);
          z-index: 10;
        }

        .foreground-top {
          transform: rotateY(-10deg) translate3d(5%, -5%, 100px);
        }

        .out-top {
          transform: rotateY(-10deg) translate3d(0, -100vh, 0);
          transition: all 0.5s ease-in;
          opacity: 0;
        }

        .out-bottom {
          transform: rotateY(-10deg) translate3d(0, 100vh, 0);
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
            to bottom,
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
