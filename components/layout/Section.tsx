import styled, { css } from 'styled-components'

interface SectionProps {
  color?: 'seafoam' | 'white'
}

export const Section = styled.section<SectionProps>`
  padding: 3rem 0;

  @media (min-width: 800px) {
    padding: 5rem 0;
  }

  ${props =>
    props.color === 'seafoam' &&
    css`
      background-color: var(--blue-50);
      background: linear-gradient(
        140deg,
        white,
        var(--blue-50),
        var(--blue-100),
        var(--blue-150)
      );
    `};
`
