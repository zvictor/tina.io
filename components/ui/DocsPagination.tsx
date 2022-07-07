import React from 'react'
import styled, { css } from 'styled-components'
import RightArrowSvg from '../../public/svg/right-arrow.svg'
import { DynamicLink } from '../ui/DynamicLink'
interface NextPrevPageProps {
  title: string
  slug: string
}

interface PaginationProps {
  prevPage?: NextPrevPageProps
  nextPage?: NextPrevPageProps
}

export function DocsPagination({ prevPage, nextPage }: PaginationProps) {
  if (!prevPage && !nextPage) return null

  return (
    <Wrapper>
      {prevPage && prevPage.slug && (
        <DynamicLink href={`${prevPage.slug}`} passHref>
          <PaginationLink previous>
            <span>Previous</span>
            <h5>{prevPage.title}</h5>
            <RightArrowSvg />
          </PaginationLink>
        </DynamicLink>
      )}
      {nextPage && nextPage.slug && (
        <DynamicLink href={`${nextPage.slug}`} passHref>
          <PaginationLink>
            <span>Next</span>
            <h5>{nextPage.title}</h5>
            <RightArrowSvg />
          </PaginationLink>
        </DynamicLink>
      )}
    </Wrapper>
  )
}

export default DocsPagination

/*
 ** Styles ------------------------------------------
 */

interface PaginationLinkProps {
  previous?: boolean
}

const PaginationLink = styled.a<PaginationLinkProps>`
  padding: 1rem;
  display: block;
  flex: 1 1 auto;
  font-family: var(--font-sans);
  font-weight: regular;
  font-style: normal;
  text-decoration: none;
  color: var(--blue-600);
  position: relative;
  text-align: right;
  padding-right: 3.5rem;

  span {
    display: block;
    font-size: 1rem;
    font-weight: 600;
    color: var(--blue-450);
    margin-bottom: 0.25rem;
  }

  h5 {
    font-size: 1.25rem;
    line-height: 1.3;
    margin: 0 !important;
    padding: 0 !important;
    transition: all 180ms ease-out;
  }

  svg {
    position: absolute;
    right: 0.75rem;
    top: 50%;
    transform: translate3d(0, -50%, 0);
    width: 2rem;
    height: auto;
    fill: var(--blue-400);
    transition: all 180ms ease-out;
  }

  &:hover {
    h5 {
      color: var(--color-tina-blue);
    }
    svg {
      fill: var(--color-tina-blue);
    }
  }

  ${props =>
    props.previous &&
    css`
      padding-right: 1rem;
      padding-left: 3.5rem;
      text-align: left;

      svg {
        right: auto;
        left: 0.75rem;
        transform: translate3d(0, -50%, 0) rotate(180deg);
      }
    `};
`

const Wrapper = styled.div`
  margin-top: 2rem;
  border: 1px solid var(--blue-100);
  background: linear-gradient(140deg, white, var(--blue-50));
  display: flex;
  border-radius: 5px;
  overflow: hidden;
  justify-content: space-between;
  flex-wrap: wrap;
`
