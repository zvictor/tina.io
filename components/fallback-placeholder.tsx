import styled from 'styled-components'

export const FallbackPlaceholder = ({
  wrapperStyles,
  placeholderStyles,
}: any) => (
  <FallbackWrapper style={wrapperStyles}>
    <FallbackItem style={placeholderStyles} />
  </FallbackWrapper>
)

const FallbackWrapper = styled.div`
  width: 100%;
  padding: 1rem;
`

const FallbackItem = styled.div`
  width: 100%;
  height: 50vh;
  background-color: var(--blue-50);
  border-radius: 5px;
  animation: bgfade 1.5s ease infinite;
  @keyframes bgfade {
    0% {
      background-color: var(--blue-50);
    }
    50% {
      background-color: var(--blue-100);
    }
  }
`
