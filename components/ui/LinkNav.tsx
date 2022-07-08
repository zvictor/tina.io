import React from 'react'
import styled from 'styled-components'
import { DynamicLink } from './DynamicLink'
import data from '../../content/navigation.json'

export const LinkNav = styled(({ ...styleProps }) => {
  return (
    <ul {...styleProps}>
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
  )
})`
  padding: 0;
  margin: 0;
  list-style-type: none;
  display: flex;
  flex-direction: column;
  justify-content: center;

  li {
    margin: 0;
    display: block;

    &:not(:last-child) {
      margin-bottom: 0.75rem;
    }
  }

  a {
    font-size: 1.375rem;
    color: var(--blue-200);
    text-decoration: none;
    cursor: pointer;
    font-family: var(--font-sans);
    font-weight: regular;
    font-style: normal;
    opacity: 1;
    transition: transform 180ms ease-out;
    display: block;
    line-height: 1;

    &:hover,
    &:focus {
      text-decoration: none;
      transform: translate3d(-1px, -2px, 0);
    }
  }
`
