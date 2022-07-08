import styled, { css } from 'styled-components'

export const Button = ({
  children,
  size = 'medium',
  variant = 'primary',
  ...props
}) => {
  return (
    <>
      <a {...props} className={`button ${size} ${variant}`}>
        {children}
        <span className="glow-text">{children}</span>
      </a>
      <style jsx>{`
        .button {
          cursor: pointer;
          position: relative;
          z-index: 1;
          opacity: 0.85;
          text-decoration: none;
          letter-spacing: 0.0125em;
          font-weight: bold;
          border-radius: 100px;
          transition: all 0.2s cubic-bezier(0.215, 0.61, 0.355, 1);

          &:after {
            content: '';
            display: block;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border-radius: 100px;
            z-index: -1;
          }

          &:hover {
            opacity: 1;
          }
        }

        .primary {
          color: var(--blue-100);

          &:after {
            background: linear-gradient(
              110deg,
              var(--tina-blue-dark),
              var(--tina-blue) 15%,
              var(--blue-450) 35%,
              var(--blue-350) 55%,
              var(--blue-450) 70%,
              var(--tina-blue-light) 80%
            );
            opacity: 0.9;
          }

          .glow-text {
            background: linear-gradient(
              110deg,
              var(--tina-blue) 0%,
              var(--tina-blue-light) 20%,
              var(--blue-450) 80%,
              var(--blue-500) 120%
            );
            box-shadow: 1px 1px 12px rgba(var(--blue-500-rgb), 0.2) inset,
              0 0 3px 1px rgba(var(--blue-500-rgb), 0.2) inset,
              1px 1px 12px rgba(var(--blue-500-rgb), 0.2),
              2px 2px 32px rgba(var(--blue-600-rgb), 0.2);
            text-shadow: 0 0 3px rgba(var(--blue-600-rgb), 0.2),
              0 0 10px rgba(var(--blue-600-rgb), 0.3),
              0 0 20px rgba(var(--blue-600-rgb), 0.4);

            &:after {
              background: linear-gradient(
                110deg,
                transparent 10%,
                var(--blue-400) 50%,
                transparent 70%
              );
              opacity: 0.3;
            }
          }
        }

        .dark {
          color: var(--blue-100);

          &:after {
            background: linear-gradient(
              110deg,
              var(--blue-700),
              var(--blue-650) 15%,
              var(--blue-550) 25%,
              var(--blue-500) 40%,
              var(--blue-450) 55%,
              var(--blue-550) 70%,
              var(--blue-600) 80%
            );
            opacity: 0.8;
          }

          .glow-text {
            background: linear-gradient(
              110deg,
              var(--blue-750) 0%,
              var(--blue-700) 20%,
              var(--blue-650) 80%,
              var(--blue-600) 120%
            );
            box-shadow: 1px 1px 12px rgba(var(--blue-500-rgb), 0.2) inset,
              0 0 3px 1px rgba(var(--blue-500-rgb), 0.2) inset,
              1px 1px 12px rgba(var(--blue-500-rgb), 0.2),
              2px 2px 32px rgba(var(--blue-600-rgb), 0.2);
            text-shadow: 0 0 3px rgba(var(--blue-600-rgb), 0.2),
              0 0 10px rgba(var(--blue-600-rgb), 0.3),
              0 0 20px rgba(var(--blue-600-rgb), 0.4);

            &:after {
              background: linear-gradient(
                110deg,
                transparent 10%,
                var(--blue-400) 50%,
                transparent 70%
              );
              opacity: 0.3;
            }
          }
        }

        .white {
          color: var(--blue-550);

          &:after {
            background: linear-gradient(
              110deg,
              var(--blue-150),
              var(--blue-100) 40%,
              var(--blue-100) 70%,
              var(--blue-150) 100%
            );
            opacity: 1;
          }

          .glow-text {
            background: linear-gradient(
              110deg,
              var(--blue-50) 20%,
              var(--blue-100) 66%,
              var(--blue-50) 120%
            );
            box-shadow: 1px 1px 12px rgba(var(--blue-200-rgb), 0.2) inset,
              0 0 3px 1px rgba(var(--blue-200-rgb), 0.2) inset,
              1px 1px 12px rgba(var(--blue-400-rgb), 0.1),
              2px 2px 32px rgba(var(--blue-400-rgb), 0.1);
            text-shadow: 0 0 3px rgba(255, 255, 255, 0.5),
              0 0 10px rgba(255, 255, 255, 0.5),
              0 0 20px rgba(255, 255, 255, 0.5);

            &:after {
              background: linear-gradient(
                110deg,
                transparent 10%,
                var(--blue-400) 50%,
                transparent 70%
              );
              opacity: 0.3;
            }
          }
        }

        .small {
          padding: 8px 20px;
          font-size: 1rem;
        }

        .medium {
          padding: 11px 28px;
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
          border-radius: 100px;
          background: black;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .glow-text:after {
          content: '';
          display: block;
          position: absolute;
          top: -8px;
          left: -8px;
          width: calc(100% + 16px);
          height: calc(100% + 16px);
          border-radius: 100px;
          z-index: -1;
          filter: blur(16px);
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

export const ButtonGroup = ({ children }) => {
  return (
    <>
      <div className="group">{children}</div>
      <style>{`
    .group {
      width: 100%;
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      align-items: center;
      gap: 1rem;
    }
  `}</style>
    </>
  )
}
