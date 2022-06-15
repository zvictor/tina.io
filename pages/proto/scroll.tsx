import * as React from 'react'
import { useInView } from 'react-intersection-observer'

const data = [
  {
    id: '1',
    title: 'Really Important Super Awesome Headline Text',
    description:
      'Phasellus quis nibh scelerisque, cursus magna a, semper mauris. Pellentesque dui eros, lobortis quis dui eu, finibus pellentesque dui.',
  },
  {
    id: '2',
    title: 'Really Important Super Awesome Headline Text',
    description:
      'Phasellus quis nibh scelerisque, cursus magna a, semper mauris. Pellentesque dui eros, lobortis quis dui eu, finibus pellentesque dui.',
  },
  {
    id: '3',
    title: 'Really Important Super Awesome Headline Text',
    description:
      'Phasellus quis nibh scelerisque, cursus magna a, semper mauris. Pellentesque dui eros, lobortis quis dui eu, finibus pellentesque dui.',
  },
  {
    id: '4',
    title: 'Really Important Super Awesome Headline Text',
    description:
      'Phasellus quis nibh scelerisque, cursus magna a, semper mauris. Pellentesque dui eros, lobortis quis dui eu, finibus pellentesque dui.',
  },
]

const Feature = ({ setActiveId, item }) => {
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
      <div ref={ref} className={`feature ${inView ? 'visible' : ''}`}>
        <h2>{item.title}</h2>
        <p>{item.description}</p>
      </div>
      <style jsx>{`
        .feature {
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: stretch;
          min-height: 100vh;
          padding: 32px 0;
          opacity: 0.3;
          transition: opacity 0.5s ease-in-out;
        }

        .visible {
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
          margin-bottom: 32px;
        }

        p {
          font-size: 22px;
          line-height: 1.8;
          font-weight: 400;
        }
      `}</style>
    </>
  )
}

const Story = () => {
  const [activeId, setActiveId] = React.useState(null)

  return (
    <>
      <div className="container">
        <div className="left">
          {data.map(item => (
            <Feature setActiveId={setActiveId} item={item} />
          ))}
        </div>
        <div className="right">
          <div className="preview-wrapper">
            <div className="preview">
              {data.map(item => (
                <div
                  className={`pane ${
                    activeId === item.id
                      ? ''
                      : activeId > item.id
                      ? 'pane-after'
                      : 'pane-before'
                  }`}
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
          padding: 0 32px;
        }

        @media (min-width: 1200px) {
          .container {
            flex-direction: row;
          }
        }

        .left {
          width: 100%;
        }

        @media (min-width: 1200px) {
          .left {
            width: 40%;
          }
        }

        .right {
          width: 80%;
          position: sticky;
          top: 32px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        @media (min-width: 1200px) {
          .right {
            width: 60%;
            height: 100vh;
            top: 0;
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
        }

        .pane {
          position: absolute;
          display: block;
          width: 100%;
          height: 100%;
          border-radius: 10px;
          background: #fff;
          border: 1px solid #d1faf6;
          box-shadow: 16px 16px 32px rgba(155, 155, 155, 0.1);
          transition: all 0.5s ease-out;
          opacity: 1;
        }

        .pane-after {
          transform: translate3d(0, -100vh, 0);
          transition: all 0.5s ease-in;
          opacity: 0;
        }

        .pane-before {
          transform: translate3d(0, 100vh, 0);
          opacity: 0;
        }
      `}</style>
    </>
  )
}

const Page = props => {
  return (
    <>
      <div className="wrapper">
        <Story />
        <div className="other-section"></div>
        <Story />
      </div>
      <style jsx>{`
        .wrapper {
          width: 100vw;
          height: 100vh;
          background: #f2fdfc;
          overflow-y: auto;
        }

        .other-section {
          display: block;
          width: 100%;
          height: 50vh;
          background: black;
        }
      `}</style>
    </>
  )
}

export default Page
