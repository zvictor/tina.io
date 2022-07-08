import React from 'react'
import Link from 'next/link'
import TinaIconSvg from '../../public/svg/tina-icon.svg'
import TinaIconGradSvg from '../../public/svg/tina-icon-grad.svg'

interface TinaIconProps {
  docs?: boolean
  gradient?: boolean
}

export const TinaIcon = ({ gradient = false, docs }: TinaIconProps) => {
  const link = docs ? '/docs' : '/'

  return (
    <>
      <Link href={link}>
        <a className={`link ${gradient ? 'gradient' : 'fill'}`}>
          <h1>
            {gradient ? <TinaIconGradSvg /> : <TinaIconSvg />}
            {docs && <span>Docs</span>}
          </h1>
        </a>
      </Link>
      <style jsx>{`
        .link {
          text-decoration: none;
          color: inherit;

          :global(svg) {
            height: 40px;
            width: auto;
            filter: drop-shadow(0 0 6px rgba(var(--blue-300-rgb), 0.3));
          }

          &.gradient :global(svg) {
            fill: inherit;
          }

          &.fill :global(svg) {
            fill: currentColor;
          }
        }

        h1 {
          margin: 0;
          display: flex;
          align-items: center;
        }

        span {
          font-size: 1.5rem;
          margin-left: 0.675rem;
          font-family: var(--font-sans);
          font-weight: bold;
          color: transparent;
          background: linear-gradient(
            110deg,
            var(--tina-blue-light) 15%,
            var(--blue-450) 75%
          );
          -webkit-background-clip: text;
          background-clip: text;
          margin-top: 0.5rem;
        }
      `}</style>
    </>
  )
}
