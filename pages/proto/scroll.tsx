const Page = props => {
  return (
    <>
      <div className="wrapper">
        <div className="container">
          <div className="left">
            <div className="feature">
              <h2>Really Important Super Awesome Headline Text</h2>
              <p>
                Phasellus quis nibh scelerisque, cursus magna a, semper mauris.
                Pellentesque dui eros, lobortis quis dui eu, finibus
                pellentesque dui.
              </p>
            </div>
            <div className="feature">
              <h2>Really Important Super Awesome Headline Text</h2>
              <p>
                Phasellus quis nibh scelerisque, cursus magna a, semper mauris.
                Pellentesque dui eros, lobortis quis dui eu, finibus
                pellentesque dui.
              </p>
            </div>
            <div className="feature">
              <h2>Really Important Super Awesome Headline Text</h2>
              <p>
                Phasellus quis nibh scelerisque, cursus magna a, semper mauris.
                Pellentesque dui eros, lobortis quis dui eu, finibus
                pellentesque dui.
              </p>
            </div>
            <div className="feature">
              <h2>Really Important Super Awesome Headline Text</h2>
              <p>
                Phasellus quis nibh scelerisque, cursus magna a, semper mauris.
                Pellentesque dui eros, lobortis quis dui eu, finibus
                pellentesque dui.
              </p>
            </div>
          </div>
          <div className="right">
            <div className="preview-wrapper">
              <div className="preview"></div>
            </div>
          </div>
        </div>
        <div className="other-section"></div>
        <div className="container">
          <div className="left">
            <div className="feature">
              <h2>Really Important Super Awesome Headline Text</h2>
              <p>
                Phasellus quis nibh scelerisque, cursus magna a, semper mauris.
                Pellentesque dui eros, lobortis quis dui eu, finibus
                pellentesque dui.
              </p>
            </div>
            <div className="feature">
              <h2>Really Important Super Awesome Headline Text</h2>
              <p>
                Phasellus quis nibh scelerisque, cursus magna a, semper mauris.
                Pellentesque dui eros, lobortis quis dui eu, finibus
                pellentesque dui.
              </p>
            </div>
            <div className="feature">
              <h2>Really Important Super Awesome Headline Text</h2>
              <p>
                Phasellus quis nibh scelerisque, cursus magna a, semper mauris.
                Pellentesque dui eros, lobortis quis dui eu, finibus
                pellentesque dui.
              </p>
            </div>
            <div className="feature">
              <h2>Really Important Super Awesome Headline Text</h2>
              <p>
                Phasellus quis nibh scelerisque, cursus magna a, semper mauris.
                Pellentesque dui eros, lobortis quis dui eu, finibus
                pellentesque dui.
              </p>
            </div>
          </div>
          <div className="right">
            <div className="preview-wrapper">
              <div className="preview"></div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .wrapper {
          width: 100vw;
          height: 100vh;
        }

        .container {
          position: relative;
          width: 100%;
          max-width: 1400px;
          margin: 0 auto;
          display: flex;
          gap: 32px;
        }

        .left {
          width: 40%;
        }

        .feature {
          padding: 16px 0 32px 0;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: stretch;
        }

        .right {
          width: 60%;
          position: sticky;
          top: 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
          height: 100vh;
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
          background: black;
          // transform: translateY(-50%);
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
