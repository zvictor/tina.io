import React from 'react'
import styled, { css } from 'styled-components'
import { Button, ButtonGroup } from '../ui'
import { DynamicLink } from '../ui/DynamicLink'
import data from '../../content/docs-navigation.json'
import Link from 'next/link'

interface NavProps {
  color?: 'white' | 'secondary' | 'seafoam' | 'light'
  open: boolean
}

export const DocsHeaderNav = styled(
  React.memo(({ color, ...styleProps }: NavProps) => {
    return (
      <div {...styleProps}>
        <ul>
          {data &&
            data.map(({ id, href, label }) => {
              return (
                <li key={id}>
                  <DynamicLink href={href} passHref>
                    <a>{label}</a>
                  </DynamicLink>
                </li>
              )
            })}
        </ul>
        <div className="actions">
          <ButtonGroup>
            <Link href="https://app.tina.io/signin">
              <Button variant="white" size="small">
                Sign In
              </Button>
            </Link>
            <Link href="/docs/setup-overview/">
              <Button size="small">Get Started</Button>
            </Link>
          </ButtonGroup>
        </div>
      </div>
    )
  })
)`
  position: relative;
  grid-area: header;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 1rem 2rem;

  ul {
    list-style-type: none;
    display: flex;
    justify-content: flex-end;
    margin: 0 1.5rem 0 0;

    @media (max-width: 1200px) {
      display: none;
    }
  }

  li {
    margin: 0 1.5rem;

    a {
      color: var(--blue-550);
      font-weight: 500;
      opacity: 0.8;
      transition: opacity 150ms ease-out;
      text-decoration: none;
      font-size: 1rem;
      &:hover {
        opacity: 1;
      }
    }
  }

  .actions {
    flex: 0 0 auto;
    display: inline-flex;
    align-items: center;
    justify-content: flex-end;

    > * {
      width: auto;
    }
  }

  --color-background: white;
  --color-foreground: var(--color-tina-blue);

  ${props =>
    props.color &&
    props.color === 'secondary' &&
    css`
      --color-background: var(--blue-700);
      --color-foreground: var(--color-tina-blue);
    `};

  ${props =>
    props.color &&
    props.color === 'seafoam' &&
    css`
      --color-background: var(--blue-50);
      --color-foreground: var(--color-tina-blue);
    `};

  ${props =>
    props.color &&
    props.color === 'light' &&
    css`
      --color-background: var(--blue-100);
      --color-foreground: var(--color-tina-blue);

      ${Button} {
        border: 1px solid var(--blue-100);
      }
    `};
`
