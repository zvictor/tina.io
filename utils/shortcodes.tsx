import styled from 'styled-components'
import ReactMarkdown from 'react-markdown'
import { IoMdWarning } from 'react-icons/io'

export const WarningCallout = styled(({ text, ...styleProps }) => {
  return (
    <div {...styleProps}>
      <div>
        <ReactMarkdown>{text}</ReactMarkdown>
      </div>
      <IoMdWarning />
    </div>
  )
})`
  position: relative;
  display: block;
  font-size: 1.125rem;
  background-color: var(--color-warning);
  background: linear-gradient(
    140deg,
    white,
    var(--color-warning-light),
    var(--color-warning)
  );
  border: 1.5px solid var(--color-warning-dark);
  border-left-width: 6px;
  border-radius: 6px;
  padding: 1rem 1rem 1rem 3.5rem;

  *:first-child {
    margin-top: 0;
  }

  *:last-child {
    margin-bottom: 0;
  }

  a,
  a:visited {
    color: var(--color-tina-blue-dark) !important;
    font-weight: bold;
  }

  svg {
    position: absolute;
    top: 1.25rem;
    left: 1rem;
    width: 1.625rem;
    height: auto;
    fill: var(--color-tina-blue);
  }
`
