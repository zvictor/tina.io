const Divider = () => {
  return (
    <>
      <svg
        width="588"
        height="26"
        viewBox="0 0 588 26"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="divider"
        preserveAspectRatio="none"
        vectorEffect="non-scaling-stroke"
      >
        <mask
          id="mask0_75_1112"
          style={{ maskType: 'alpha' }}
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="588"
          height="26"
        >
          <rect width="588" height="26" fill="url(#paint0_linear_75_1112)" />
        </mask>
        <g mask="url(#mask0_75_1112)">
          <path
            d="M14.5 13L576.5 13"
            stroke="#1F97CB"
            stroke-width="8"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-dasharray="12 22"
          />
        </g>
        <defs>
          <linearGradient
            id="paint0_linear_75_1112"
            x1="588"
            y1="26.0002"
            x2="0"
            y2="26.0002"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#D9D9D9" />
            <stop offset="1" stop-color="#D9D9D9" stop-opacity="0" />
          </linearGradient>
        </defs>
      </svg>
      <style jsx>{`
        .divider {
          margin: 32px 0;
          width: 126%;
          left: 0;
          position: relative;
          display: block;
        }
      `}</style>
    </>
  )
}

const Page = props => {
  return (
    <>
      <div className="wrapper bg-mid">
        <div className="container">
          <div className="left">
            <h2>Really Important Super Awesome Headline Text</h2>
            <Divider />
            <p>
              Phasellus quis nibh scelerisque, cursus magna a, semper mauris.
              Pellentesque dui eros, lobortis quis dui eu, finibus pellentesque
              dui. In sapien erat, porttitor vitae fringilla tempus, pulvinar in
              lectus.
            </p>
          </div>
          <div className="right">
            <div className="preview bg-light"></div>
            <div className="preview back bg-dark"></div>
          </div>
        </div>
      </div>
      <style jsx>{`
        h2 {
          font-size: 54px;
          line-height: 1.25;
          font-weight: 600;
          color: white;
        }

        p {
          font-size: 22px;
          line-height: 1.8;
          font-weight: 400;
          color: #163f92;
        }

        .preview {
          transform-style: preserve-3d;
          position: absolute;
          top: 0;
          left: 0;
          width: 95%;
          height: 95%;
          border-radius: 10px;
          transform: rotateY(-10deg) translate3d(0, 0, 0);
        }

        .bg-light {
          background: linear-gradient(
            to bottom right,
            #e6faf8,
            #c2f7eb,
            #a5eddc
          );
        }

        .bg-mid {
          background: linear-gradient(
            to bottom right,
            #b4f4e0,
            #2ab7cf,
            #1b61b1
          );
        }

        .bg-dark {
          background: linear-gradient(
            to bottom right,
            #1b61b1,
            #0f0f67,
            #0e032a
          );
        }

        .back {
          z-index: -1;
          transform: rotateY(-10deg) translate3d(10%, 15%, -75px);
        }

        .left {
          position: relative;
          z-index: 10;
          width: 40%;
          padding-right: 24px;
        }

        .right {
          transform-style: preserve-3d;
          perspective: 1000px;
          position: relative;
          padding-left: 24px;
          width: 60%;
          height: 0;
          padding-bottom: 45%;
        }

        .wrapper {
          width: 100vw;
          height: 100vh;
        }

        .container {
          position: relative;
          transform-style: preserve-3d;
          width: 100%;
          max-width: 1400px;
          margin: 0 auto;
          min-height: 100vh;
          display: flex;
          flex-direction: row;
          justify-content: stretch;
          align-items: center;
          padding: 32px;
        }
      `}</style>
    </>
  )
}

export default Page
