import * as React from 'react'
import Link from 'next/link'
import { useInView } from 'react-intersection-observer'
import SyntaxHighlighter from 'react-syntax-highlighter'
import TinaIcon from '../public/svg/tina-icon.svg'
import navData from '../content/navigation.json'
import GitHubButton from 'react-github-btn'

const storyData = {
  features: [
    {
      id: 'editing',
      title: 'Tina is a dev-first CMS that your editors will love',
      description:
        'Phasellus quis nibh scelerisque, cursus magna a, semper mauris. Pellentesque dui eros, lobortis quis dui eu, finibus pellentesque dui.',
    },
    {
      id: 'file',
      title: 'Own Your Content',
      description:
        'Store content in your repo. Tina saves to MDX, Markdown, and JSON and provides a powerful data layer on top of your static files.',
    },
    {
      id: 'schema',
      title: 'Simple CMS Configuration',
      description:
        "Define your content's schema and Tina will provide you with a user friendly editing experience.",
    },
    {
      id: 'git',
      title: 'Powered by Git',
      description:
        'Let your editoral team focus on writing content, while Tina commits to your repository.',
    },
  ],
  panes: [
    {
      name: 'Contextual Editing',
      background: 'light',
      width: '100',
      height: 'auto',
      video: 'v1656009626/tina-io/new-homepage/editing-demo',
      positions: {
        editing: 'front',
        file: 'back',
        schema: 'front-bottom',
        git: 'back',
        default: 'out-bottom',
      },
    },
    {
      name: 'File System',
      background: 'dark',
      width: '100',
      height: '100',
      file: {
        name: 'about.mdx',
        language: 'mdx',
        textScale: 1.375,
        code: `---
title: Awesome Developer Experience
---

Tina empowers your team by giving you
more control over your components.

<CoolComponent
  text="MDX Rocks"
/>`,
      },
      positions: {
        editing: 'back',
        file: 'front',
        schema: 'out-top',
        default: 'out-bottom',
      },
    },
    {
      name: 'Schema',
      background: 'dark',
      width: '60',
      height: '90',
      basePosition: 'absolute-right',
      file: {
        name: 'schema.tsx',
        language: 'json',
        textScale: 1,
        code: `{
  type: "string",
  label: "Title",
  name: "title"
},
{
  type: 'string',
  label: 'Description',
  name: 'body',
  isBody: true,
},`,
        newCode: `{
  type: "string",
  label: "Title",
  name: "title"
},
{
  type: "string",
  label: "Description",
  name: "description",
},`,
      },
      positions: {
        schema: 'foreground',
        git: 'out-right',
        default: 'out-bottom',
      },
    },
    {
      name: 'Git Commit',
      background: 'dark',
      width: '95',
      height: '50',
      file: {
        language: 'shell',
        textScale: 0.9,
        code: `commit 4ca9edc2ee64c1ab5127a1fd4519a83426731cd7
Author:  Scott Gallant <scottgallant@gmail.com>
Date:    Thu May 26 13:31:02 2022 -0300
Message: Update From Tina`,
      },
      positions: {
        schema: 'out-bottom',
        git: 'front',
        default: 'out-top',
      },
    },
  ],
}

const Video = ({ src }) => {
  return (
    <>
      <video
        className="video"
        autoPlay={true}
        loop
        muted
        playsInline
        poster={`https://res.cloudinary.com/forestry-demo/video/upload/so_0/${src}.jpg`}
      >
        <source
          src={`https://res.cloudinary.com/forestry-demo/video/upload/q_100,h_584/${src}.webm`}
          type="video/webm"
        />
        <source
          src={`https://res.cloudinary.com/forestry-demo/video/upload/q_80,h_584/${src}.mp4`}
          type="video/mp4"
        />
      </video>
      <style jsx>{`
        .video {
          width: 100%;
          height: auto;
        }
      `}</style>
    </>
  )
}

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="background"></div>
      <div className="glowbar"></div>
      <Link href="/">
        <a className="tina-icon">
          <TinaIcon />
        </a>
      </Link>
      <nav className="nav">
        <ul className="nav-ul">
          {navData.map(item => {
            const { id, href, label } = item

            return (
              <li key={id} className="nav-li">
                <Link href={href}>{label}</Link>
              </li>
            )
          })}
        </ul>
      </nav>
      <div className="navGithub">
        <GitHubButton
          href="https://github.com/tinacms/tinacms"
          data-color-scheme="no-preference: dark; light: light; dark: dark;"
          data-size="large"
          data-show-count="true"
          aria-label="Star TinaCMS on GitHub"
        >
          Star
        </GitHubButton>
      </div>
      <div className="nav-actions">
        <a href="/" className="button">
          Sign In
        </a>
      </div>
      <style jsx>{`
        .navbar {
          position: relative;
          top: 0;
          width: 100%;
          z-index: 100000;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 48px;
          padding: 16px 48px;
          box-shadow: 4px 4px 16px rgba(27, 97, 177, 0.1),
            16px 16px 64px rgba(22, 63, 146, 0.1);
          backdrop-filter: blur(8px);
        }

        @media (min-width: 1200px) {
          .navbar {
            position: fixed;
          }
        }

        .glowbar {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 1.5px;
          background: linear-gradient(
            to right,
            var(--blue-550),
            var(--blue-400) 25%,
            var(--blue-650) 50%,
            var(--blue-700) 70%,
            var(--blue-750) 100%
          );
          opacity: 0.3;
        }

        .background {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: -1;
          opacity: 0.7;
          background: linear-gradient(
            to right,
            rgba(42, 183, 207, 0.8) -4%,
            rgba(34, 128, 195, 0.9) 6%,
            var(--blue-700) 25%,
            var(--blue-800) 66%,
            var(--blue-850)
          );
        }

        @media (min-width: 1200px) {
        }

        .tina-icon {
          :global(svg) {
            display: block;
            width: 2.5em;
            height: auto;
            fill: white;
            filter: drop-shadow(0 4px 4px rgba(22, 63, 146, 0.07));
          }
        }

        .nav {
          flex: 1 0 auto;
          display: flex;
          justify-content: flex-end;
        }

        .nav-ul {
          display: flex;
        }

        .nav-li {
          margin: 0 1.75rem;

          :global(a) {
            font-weight: 500;
            color: var(--blue-400);
            opacity: 0.7;
            transition: opacity 150ms ease-out;
            text-decoration: none;
            font-size: 1.125rem;
            text-shadow: 0 0 7px rgba(165, 237, 220, 0.2),
              0 0 10px rgba(165, 237, 220, 0.2),
              0 0 18px rgba(165, 237, 220, 0.15),
              0 0 42px rgba(104, 217, 212, 0.15);
            &:hover {
              opacity: 1;
              text-shadow: 0 0 7px rgba(165, 237, 220, 0.2),
                0 0 10px rgba(165, 237, 220, 0.2),
                0 0 18px rgba(165, 237, 220, 0.3),
                0 0 42px rgba(104, 217, 212, 0.3);
            }
          }
        }

        .navGithub {
          flex: 0 0 auto;
          height: 28px;
          filter: drop-shadow(0 4px 24px rgba(34, 128, 195, 0.5));
        }

        .nav-actions {
        }

        .button {
          text-decoration: none;
          font-size: 1.125rem;
          font-weight: bold;
          color: var(--blue-300);
          padding: 8px 24px;
          border-radius: 24px;
          border: 1.5px solid var(--blue-550);
          background: transparent;
          box-shadow: 4px 4px 12px rgba(104, 217, 212, 0.2) inset,
            0 0 3px 1px rgba(165, 237, 220, 0.2) inset,
            1px 2px 12px rgba(165, 237, 220, 0.2),
            8px 8px 32px rgba(34, 128, 195, 0.2);
          text-shadow: 0 0 7px rgba(165, 237, 220, 0.3),
            0 0 10px rgba(165, 237, 220, 0.1), 0 0 18px rgba(165, 237, 220, 0.1);
          transition: all 0.2s cubic-bezier(0.215, 0.61, 0.355, 1);

          :hover {
            color: white;
            background: rgba(34, 128, 195, 0.2);
            box-shadow: 4px 4px 12px rgba(104, 217, 212, 0.3) inset,
              0 0 3px 1px rgba(165, 237, 220, 0.3) inset,
              1px 2px 12px rgba(165, 237, 220, 0.4),
              8px 8px 32px rgba(34, 128, 195, 0.4);
          }

          :active {
            color: var(--blue-400);
            background: rgba(34, 128, 195, 0.3);
          }
        }
      `}</style>
    </div>
  )
}

const Gitgrid = () => {
  return (
    <>
      <div className="gitgrid-wrapper">
        <svg
          width="196"
          height="127"
          viewBox="0 0 196 127"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="gitgrid"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M102 2.25C101.034 2.25 100.25 3.0335 100.25 4C100.25 4.9665 101.034 5.75 102 5.75C102.966 5.75 103.75 4.9665 103.75 4C103.75 3.0335 102.966 2.25 102 2.25ZM102 7.25C100.463 7.25 99.1756 6.18335 98.837 4.75H88.8107L60.75 32.8107V41.3107L43.8107 58.25H38.663C38.3245 59.6833 37.0368 60.75 35.5 60.75C33.7051 60.75 32.25 59.2949 32.25 57.5C32.25 55.7051 33.7051 54.25 35.5 54.25C37.0368 54.25 38.3245 55.3167 38.663 56.75H43.1893L59.25 40.6893V32.1893L88.1893 3.25H98.837C99.1756 1.81665 100.463 0.75 102 0.75C103.795 0.75 105.25 2.20507 105.25 4C105.25 5.79493 103.795 7.25 102 7.25ZM119.5 17.75C118.534 17.75 117.75 18.5335 117.75 19.5C117.75 20.4665 118.534 21.25 119.5 21.25C120.466 21.25 121.25 20.4665 121.25 19.5C121.25 18.5335 120.466 17.75 119.5 17.75ZM116.25 19.5C116.25 17.7051 117.705 16.25 119.5 16.25C121.295 16.25 122.75 17.7051 122.75 19.5C122.75 19.9941 122.64 20.4625 122.442 20.8818L126.25 24.6894V52.6894L146.75 73.1894V102.689L157.25 113.189V127H155.75V113.811L145.25 103.311V73.8107L124.75 53.3107V25.3107L121.501 22.0614C121.138 22.3452 120.713 22.5537 120.25 22.663V44V44.3107V60.6893L133.25 73.6893V95.337C134.683 95.6756 135.75 96.9632 135.75 98.5C135.75 100.037 134.683 101.324 133.25 101.663V113.189L147.061 127H144.939L131.75 113.811V101.663C130.557 101.381 129.619 100.443 129.337 99.25H117.663C117.381 100.443 116.443 101.381 115.25 101.663V114.189L119.311 118.25H129.311L138.061 127H135.939L128.689 119.75H118.689L113.75 114.811V101.663C112.317 101.324 111.25 100.037 111.25 98.5C111.25 96.9632 112.317 95.6756 113.75 95.337V67.8108L104.767 76.794C105.073 77.2899 105.25 77.8743 105.25 78.5C105.25 80.0368 104.183 81.3244 102.75 81.663V108.689L111.25 117.189V127H109.75V117.811L101.25 109.311V81.663C99.8167 81.3244 98.75 80.0368 98.75 78.5C98.75 76.7051 100.205 75.25 102 75.25C102.626 75.25 103.21 75.4269 103.706 75.7333L113.75 65.6895V48.6893L118.75 43.6893V22.663C118.407 22.582 118.085 22.4468 117.794 22.2667L106.75 33.3107V63.8107L94.25 76.3107V102.337C95.6833 102.676 96.75 103.963 96.75 105.5C96.75 107.037 95.6834 108.324 94.2501 108.663V119.311L86.5607 127H84.4394L89.9394 121.5L74.75 106.311V89.663C73.3167 89.3244 72.25 88.0368 72.25 86.5C72.25 84.7051 73.7051 83.25 75.5 83.25C76.1258 83.25 76.7102 83.4268 77.2061 83.7333L101.25 59.6893V35.8107L97.25 39.8107V54.3107L63.75 87.8107V127H62.25V87.1894L95.75 53.6894V39.1894L101.25 33.6893V26.8107L89.7501 38.3107V52.3107L81.2668 60.794C81.5732 61.2899 81.75 61.8743 81.75 62.5C81.75 64.2949 80.2949 65.75 78.5 65.75C77.8743 65.75 77.2899 65.5732 76.794 65.2667L50.25 91.8107V104.811L48.7667 106.294C49.0732 106.79 49.25 107.374 49.25 108C49.25 109.795 47.7949 111.25 46 111.25C45.3743 111.25 44.7898 111.073 44.294 110.767L42.8107 112.25H32.8107L22.75 122.311V127H21.25V121.689L32.1893 110.75H42.1893L43.2333 109.706C42.9268 109.21 42.75 108.626 42.75 108C42.75 106.205 44.2051 104.75 46 104.75C46.6258 104.75 47.2102 104.927 47.7061 105.233L48.75 104.189V91.1894L75.7333 64.2061C75.4268 63.7102 75.25 63.1258 75.25 62.5C75.25 60.9632 76.3167 59.6755 77.75 59.337V50.8107L49.0303 79.5304L48.8107 79.7501L38.75 89.8107V95.337C40.1833 95.6756 41.25 96.9632 41.25 98.5C41.25 100.295 39.7949 101.75 38 101.75C36.4632 101.75 35.1755 100.683 34.837 99.25H23.163C22.8245 100.683 21.5368 101.75 20 101.75C19.3743 101.75 18.7898 101.573 18.294 101.267L13.75 105.811V127H12.25V105.189L17.2333 100.206C16.9268 99.7102 16.75 99.1258 16.75 98.5C16.75 96.9632 17.8167 95.6756 19.25 95.337V87.6894L28.6893 78.2501H48.1893L77.75 48.6894V41.75H69.8107L42.3107 69.25H24.3107L10.0614 83.4993C10.4928 84.0509 10.75 84.7454 10.75 85.5C10.75 87.2949 9.29493 88.75 7.5 88.75C6.74543 88.75 6.05092 88.4928 5.49933 88.0614L2.25 91.3107V127H0.75V90.6894L4.55755 86.8818C4.36027 86.4625 4.25 85.9941 4.25 85.5C4.25 83.7051 5.70507 82.25 7.5 82.25C7.99412 82.25 8.46249 82.3603 8.88184 82.5575L23.6894 67.75H41.6894L69.1894 40.25H77.75V31.6893L90.6893 18.75H98.837C99.1756 17.3167 100.463 16.25 102 16.25C103.795 16.25 105.25 17.7051 105.25 19.5C105.25 21.0368 104.183 22.3244 102.75 22.663V60.3107L78.2667 84.794C78.5732 85.2899 78.75 85.8743 78.75 86.5C78.75 88.0368 77.6833 89.3244 76.25 89.663V105.689L91 120.439L92.7501 118.689V108.663C91.3167 108.324 90.25 107.037 90.25 105.5C90.25 103.963 91.3167 102.676 92.75 102.337V75.6894L105.25 63.1894V32.6894L116.733 21.2061C116.427 20.7102 116.25 20.1258 116.25 19.5ZM195.75 127V116.689L186.25 107.189V56.663C187.683 56.3245 188.75 55.0368 188.75 53.5C188.75 51.7051 187.295 50.25 185.5 50.25C184.874 50.25 184.29 50.4268 183.794 50.7333L161.267 28.2061C161.573 27.7102 161.75 27.1257 161.75 26.5C161.75 24.7051 160.295 23.25 158.5 23.25C156.963 23.25 155.676 24.3167 155.337 25.75H135.663C135.324 24.3167 134.037 23.25 132.5 23.25C130.705 23.25 129.25 24.7051 129.25 26.5C129.25 28.0368 130.317 29.3245 131.75 29.663V37.8107L135.25 41.3107V51.3107L162.75 78.8107V95.337C161.317 95.6756 160.25 96.9632 160.25 98.5C160.25 100.295 161.705 101.75 163.5 101.75C164.126 101.75 164.71 101.573 165.206 101.267L180.75 116.811V127H182.25V116.189L177.25 111.189V79.1894L146.25 48.1894V40.3107L157.118 29.4425C157.538 29.6397 158.006 29.75 158.5 29.75C159.126 29.75 159.71 29.5732 160.206 29.2667L182.733 51.7939C182.427 52.2898 182.25 52.8743 182.25 53.5C182.25 55.0368 183.317 56.3245 184.75 56.663V107.811L194.25 117.311V127H195.75ZM37.25 95.337C36.0574 95.6187 35.1187 96.5574 34.837 97.75H23.163C22.8813 96.5574 21.9426 95.6187 20.75 95.337V88.3107L29.3107 79.7501H46.6893L37.25 89.1894V95.337ZM80.2061 59.7333C79.9148 59.5533 79.5929 59.418 79.25 59.337V32.3107L91.3107 20.25H98.837C99.1187 21.4426 100.057 22.3814 101.25 22.663V24.6894L88.2501 37.6894V51.6894L80.2061 59.7333ZM118.75 45.8107V61.3107L131.75 74.3107V95.337C130.557 95.6187 129.619 96.5574 129.337 97.75H117.663C117.381 96.5574 116.443 95.6187 115.25 95.337V49.3107L118.75 45.8107ZM112.75 98.5C112.75 97.5335 113.534 96.75 114.5 96.75C115.466 96.75 116.25 97.5335 116.25 98.5C116.25 99.4665 115.466 100.25 114.5 100.25C113.534 100.25 112.75 99.4665 112.75 98.5ZM20 96.75C19.0335 96.75 18.25 97.5335 18.25 98.5C18.25 99.4665 19.0335 100.25 20 100.25C20.9665 100.25 21.75 99.4665 21.75 98.5C21.75 97.5335 20.9665 96.75 20 96.75ZM5.75 85.5C5.75 84.5335 6.5335 83.75 7.5 83.75C8.4665 83.75 9.25 84.5335 9.25 85.5C9.25 86.4665 8.4665 87.25 7.5 87.25C6.5335 87.25 5.75 86.4665 5.75 85.5ZM38 96.75C37.0335 96.75 36.25 97.5335 36.25 98.5C36.25 99.4665 37.0335 100.25 38 100.25C38.9665 100.25 39.75 99.4665 39.75 98.5C39.75 97.5335 38.9665 96.75 38 96.75ZM130.75 98.5C130.75 97.5335 131.534 96.75 132.5 96.75C133.466 96.75 134.25 97.5335 134.25 98.5C134.25 99.4665 133.466 100.25 132.5 100.25C131.534 100.25 130.75 99.4665 130.75 98.5ZM163.5 96.75C162.534 96.75 161.75 97.5335 161.75 98.5C161.75 99.4665 162.534 100.25 163.5 100.25C164.466 100.25 165.25 99.4665 165.25 98.5C165.25 97.5335 164.466 96.75 163.5 96.75ZM164.25 95.337V78.1893L136.75 50.6893V40.6893L133.25 37.1893V29.663C134.443 29.3813 135.381 28.4426 135.663 27.25H155.337C155.446 27.713 155.655 28.1378 155.939 28.5007L144.75 39.6894V48.8107L175.75 79.8107V109.689L166.267 100.206C166.573 99.7102 166.75 99.1257 166.75 98.5C166.75 96.9632 165.683 95.6756 164.25 95.337ZM183.75 53.5C183.75 52.5335 184.534 51.75 185.5 51.75C186.466 51.75 187.25 52.5335 187.25 53.5C187.25 54.4665 186.466 55.25 185.5 55.25C184.534 55.25 183.75 54.4665 183.75 53.5ZM130.75 26.5C130.75 25.5335 131.534 24.75 132.5 24.75C133.466 24.75 134.25 25.5335 134.25 26.5C134.25 27.4665 133.466 28.25 132.5 28.25C131.534 28.25 130.75 27.4665 130.75 26.5ZM158.5 24.75C157.534 24.75 156.75 25.5335 156.75 26.5C156.75 27.4665 157.534 28.25 158.5 28.25C159.466 28.25 160.25 27.4665 160.25 26.5C160.25 25.5335 159.466 24.75 158.5 24.75ZM100.25 19.5C100.25 18.5335 101.034 17.75 102 17.75C102.966 17.75 103.75 18.5335 103.75 19.5C103.75 20.4665 102.966 21.25 102 21.25C101.034 21.25 100.25 20.4665 100.25 19.5ZM33.75 57.5C33.75 56.5335 34.5335 55.75 35.5 55.75C36.4665 55.75 37.25 56.5335 37.25 57.5C37.25 58.4665 36.4665 59.25 35.5 59.25C34.5335 59.25 33.75 58.4665 33.75 57.5ZM93.5 103.75C92.5335 103.75 91.75 104.534 91.75 105.5C91.75 106.466 92.5335 107.25 93.5 107.25C94.4665 107.25 95.25 106.466 95.25 105.5C95.25 104.534 94.4665 103.75 93.5 103.75ZM73.75 86.5C73.75 85.5335 74.5335 84.75 75.5 84.75C76.4665 84.75 77.25 85.5335 77.25 86.5C77.25 87.4665 76.4665 88.25 75.5 88.25C74.5335 88.25 73.75 87.4665 73.75 86.5ZM78.5 60.75C77.5335 60.75 76.75 61.5335 76.75 62.5C76.75 63.4665 77.5335 64.25 78.5 64.25C79.4665 64.25 80.25 63.4665 80.25 62.5C80.25 61.5335 79.4665 60.75 78.5 60.75ZM44.25 108C44.25 107.034 45.0335 106.25 46 106.25C46.9665 106.25 47.75 107.034 47.75 108C47.75 108.966 46.9665 109.75 46 109.75C45.0335 109.75 44.25 108.966 44.25 108ZM102 76.75C101.034 76.75 100.25 77.5335 100.25 78.5C100.25 79.4665 101.034 80.25 102 80.25C102.966 80.25 103.75 79.4665 103.75 78.5C103.75 77.5335 102.966 76.75 102 76.75Z"
            fill="currentColor"
          />
        </svg>
      </div>
      <style jsx>{`
        .gitgrid-wrapper {
          position: fixed;
          bottom: 0;
          right: 0;
          z-index: 0;
          perspective: 1000px;
        }

        .gitgrid {
          color: var(--blue-800);
          width: 75vw;
          max-width: 1200px;
          min-width: 600px;
          height: auto;
          transform: rotate3d(1, -1, 0, 45deg);
          margin-bottom: -4%;
          opacity: 0.33;
        }
      `}</style>
    </>
  )
}

const Div = () => {
  return (
    <>
      <svg
        width="120"
        height="1"
        viewBox="0 0 112 1"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line
          x1="0"
          y1="0.5"
          x2="112"
          y2="0.5"
          stroke="var(--blue-500)"
          stroke-width="7"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-dasharray="21 18"
        />
      </svg>
      <style jsx>{`
        svg {
          position: relative;
          width: 7em;
          margin: 32px 4px;
          opacity: 0.25;
          overflow: visible;
        }
      `}</style>
    </>
  )
}

const Feature = ({ activeId, setActiveId, item }) => {
  const { ref, inView, entry } = useInView({
    rootMargin: '-100px 0px',
  })

  React.useEffect(() => {
    if (inView) {
      setActiveId(item.id)
    } else if (activeId === item.id) {
      setActiveId(null)
    }
  }, [inView])

  React.useEffect(() => {
    if (!activeId && inView) {
      setActiveId(item.id)
    }
  }, [activeId])

  return (
    <>
      <div
        key={item.id}
        className={`feature ${inView && activeId === item.id ? 'visible' : ''}`}
      >
        <div className="content" ref={ref}>
          <div className="title-wrapper">
            <h2>{item.title}</h2>
          </div>
          <Div />
          <p>{item.description}</p>
        </div>
      </div>
      <style jsx>{`
        .feature {
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: stretch;
          padding: 32px 0;
          opacity: 0.1;
          transition: opacity 0.6s cubic-bezier(0.215, 0.61, 0.355, 1);
          filter: blur(1px);
          min-height: 75vh;
        }

        @media (min-width: 1200px) {
          .feature {
            min-height: 100vh;
            opacity: 0.3;
          }
        }

        .visible {
          filter: none;
          opacity: 1;
        }

        @media (min-width: 1200px) {
          .feature {
            justify-content: center;
          }
        }

        h2 {
          font-size: unquote('clamp(2rem, 1.75rem + 2vw, 3.375em)');
          line-height: 1.25;
          font-weight: 600;
          display: block;
          color: transparent;
          background: linear-gradient(
            to bottom right,
            #fff,
            var(--blue-100) 10%,
            var(--blue-200) 25%,
            var(--blue-300) 50%,
            var(--blue-450) 60%,
            var(--blue-500) 70%
          );
          text-shadow: 0 0 7px rgba(165, 237, 220, 0.2),
            0 0 10px rgba(165, 237, 220, 0.15),
            0 0 18px rgba(165, 237, 220, 0.15),
            0 0 42px rgba(104, 217, 212, 0.15);
          -webkit-background-clip: text;
          background-clip: text;
        }

        .title-wrapper {
          position: relative;
        }

        p {
          font-size: 22px;
          line-height: 1.8;
          font-weight: 400;
          color: var(--blue-400);
          text-shadow: 0 0 2px rgba(104, 217, 212, 0.3),
            0 0 4px rgba(104, 217, 212, 0.3);
        }
      `}</style>
    </>
  )
}

const Story = ({ data }) => {
  const [activeId, setActiveId] = React.useState(data.features[0].id)

  return (
    <>
      <div className="container">
        <div className="left">
          {data.features.map(item => (
            <Feature
              activeId={activeId}
              setActiveId={setActiveId}
              item={item}
            />
          ))}
        </div>
        <div className="right">
          <div className="preview-wrapper">
            <div className="preview">
              {data.panes.map(pane => (
                <div
                  className={`pane ${
                    pane.basePosition ? pane.basePosition : ''
                  } ${
                    pane.positions[activeId]
                      ? pane.positions[activeId]
                      : pane.positions.default
                  }`}
                  style={{
                    width: pane.width + '%',
                    height: pane.height === 'auto' ? 'auto' : pane.height + '%',
                  }}
                >
                  {pane.video && (
                    <div className="video-wrapper">
                      <Video src={pane.video} />
                    </div>
                  )}
                  {pane.file && (
                    <div className="file-wrapper">
                      {pane.file.name && (
                        <div className="filename">{pane.file.name}</div>
                      )}
                      <div
                        className={`file ${pane.file.name ? 'with-name' : ''}`}
                        style={{
                          fontSize:
                            1.25 *
                              (pane.file.textScale ? pane.file.textScale : 1) +
                            'em',
                        }}
                      >
                        <div className="glow-border"></div>
                        <div className="code-wrapper">
                          <SyntaxHighlighter
                            languag={
                              pane.file.language
                                ? pane.file.language
                                : 'javascript'
                            }
                            useInlineStyles={false}
                            // wrapLines={true}
                            // wrapLongLines={true}
                          >
                            {pane.file.code}
                          </SyntaxHighlighter>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .container {
          position: relative;
          width: 100%;
          max-width: 1500px;
          margin: 0 auto;
          display: flex;
          flex-direction: column-reverse;
          gap: 48px;
          padding: 72px 32px;
        }

        @media (min-width: 1200px) {
          .container {
            gap: 48px;
            padding: 0 48px;
            flex-direction: row;
          }
        }

        .left {
          width: 100%;
          max-width: 650px;
          margin: 0 auto;
        }

        @media (min-width: 1200px) {
          .left {
            width: 40%;
          }
        }

        .right {
          width: 100%;
          position: sticky;
          -moz-position: sticky;

          top: 24px;
          display: flex;
          margin: 0 auto;
          flex-direction: column;
          justify-content: center;
          margin-bottom: 24px;
          transform: scale(0.85);

          --right-rotation: -5deg;

          // display: none;
        }

        @media (min-width: 650px) {
          .right {
            width: 85%;
            max-width: 600px;
          }
        }

        @media (min-width: 950px) {
          .right {
            width: 75%;
          }
        }

        @media (min-width: 1200px) {
          .right {
            width: 60%;
            max-width: none;
            height: 100vh;
            top: 32px;
            margin-bottom: 0;

            --right-rotation: -8deg;
          }
        }

        .video-wrapper {
          width: 100%;
          height: relative;
          background: linear-gradient(
            to bottom right,
            var(--blue-100) 10%,
            var(--blue-200) 20%,
            var(--blue-300) 40%,
            var(--blue-450) 70%,
            var(--blue-500) 85%
          );
          box-shadow: 4px 4px 16px rgba(104, 217, 212, 0.15),
            8px 8px 32px rgba(34, 128, 195, 0.15),
            16px 16px 64px rgba(34, 128, 195, 0.3);
          border-radius: 10px;
          overflow: hidden;

          :global(video) {
            display: block;
          }
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
          perspective: 1000px;
        }

        .pane {
          position: absolute;
          display: block;
          transition: all 750ms cubic-bezier(0.215, 0.61, 0.355, 1);
        }

        .file-wrapper {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          width: 100%;
          height: 100%;
        }

        .file {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: stretch;
          justify-content: stretch;
          width: 100%;
          flex: 1;
        }

        .code-wrapper {
          display: block;
          width: calc(100% - 3px);
          flex: 1;
          position: relative;
          margin: 1.5px;
          box-shadow: inset 0 0 256px rgba(16, 38, 127, 0.5),
            4px 4px 16px rgba(22, 63, 146, 0.2),
            16px 16px 64px rgba(16, 38, 127, 0.5);
          background: linear-gradient(
            to bottom right,
            var(--blue-900),
            var(--blue-850) 30%,
            var(--blue-800) 70%,
            var(--blue-750)
          );
          border-radius: 10px;
          overflow: hidden;
        }

        .code-wrapper:after {
          content: '';
          display: block;
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0.1;
          background: repeating-linear-gradient(
            var(--blue-300),
            var(--blue-400) 2px,
            var(--blue-800) 4px,
            var(--blue-850) 5px,
            var(--blue-800) 6px
          );
          mix-blend-mode: overlay;
          border-radius: 10px;
        }

        .glow-border {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            to bottom right,
            var(--blue-750),
            var(--blue-450) 40%,
            var(--blue-650) 65%,
            var(--blue-600) 100%
          );
          border-radius: 11px;
          opacity: 0.5;
        }

        .file.with-name .code-wrapper {
          border-radius: 0 10px 10px 10px;
        }

        .file.with-name .code-wrapper:after {
          border-radius: 0 10px 10px 10px;
        }

        .file.with-name .glow-border {
          border-radius: 0 11px 11px 11px;
        }

        .filename {
          position: relative;
          display: inline-block;
          padding: 8px 32px;
          border-radius: 10px 10px 0 0;
          font-size: 1.125em;
          color: var(--blue-400);
          font-weight: bold;
          lettter-spacing: 0.1em;
          border: 1px solid var(--blue-750);
          border-bottom: none;
          box-shadow: inset 0 0 256px rgba(16, 38, 127, 0.5),
            4px 4px 16px rgba(27, 97, 177, 0.2),
            16px 16px 64px rgba(16, 38, 127, 0.5);
          background: linear-gradient(
            to bottom right,
            var(--blue-800),
            var(--blue-950)
          );
          font-weight: medium;
          font-family: SFMono-Regular, Menlo, Monaco, Consolas,
            'Liberation Mono', 'Courier New', monospace;
          text-shadow: 0 0 7px rgba(165, 237, 220, 0.2),
            0 0 10px rgba(165, 237, 220, 0.2),
            0 0 18px rgba(165, 237, 220, 0.15),
            0 0 42px rgba(104, 217, 212, 0.15);
        }

        .absolute-right {
          right: 0;
        }

        .back {
          transform: rotate3d(0, 1, 0, var(--right-rotation))
            translate3d(4%, 7%, -25px);
          z-index: -1;
        }

        .front {
          transform: rotate3d(0, 1, 0, var(--right-rotation))
            translate3d(-4%, -7%, 25px);
        }

        .front-bottom {
          transform: rotate3d(0, 1, 0, var(--right-rotation))
            translate3d(-4%, 7%, 25px);
        }

        .foreground {
          transform: rotate3d(0, 1, 0, var(--right-rotation))
            translate3d(4%, -7%, 100px);
        }

        .out-top {
          transform: rotate3d(0, 1, 0, var(--right-rotation))
            translate3d(-4%, -50%, 75px);
          transition-duration: 400ms;
          transition-timing-function: cubic-bezier(0.225, 0.125, 0.44, 0.295);
          opacity: 0;
        }

        .out-right {
          transform: rotate3d(0, 1, 0, var(--right-rotation))
            translate3d(100%, -7%, 100px);
          transition-duration: 400ms;
          transition-timing-function: cubic-bezier(0.225, 0.125, 0.44, 0.295);
          opacity: 0;
        }

        .out-bottom {
          transform: rotate3d(0, 1, 0, var(--right-rotation))
            translate3d(-4%, 50%, -25px);
          transition-duration: 400ms;
          transition-timing-function: cubic-bezier(0.225, 0.125, 0.44, 0.295);
          opacity: 0;
        }

        /* Code Styles */

        :global(.hljs) {
          font-size: unquote('clamp(0.75em,0.676em + 0.37vw, 1em)			');
          padding: 32px;
          color: var(--blue-250);
          font-weight: medium;
          font-family: SFMono-Regular, Menlo, Monaco, Consolas,
            'Liberation Mono', 'Courier New', monospace;
          text-shadow: 0 0 7px rgba(165, 237, 220, 0.2),
            0 0 10px rgba(165, 237, 220, 0.15),
            0 0 18px rgba(165, 237, 220, 0.1), 0 0 42px rgba(104, 217, 212, 0.1);
        }

        :global(.hljs-number) {
          color: var(--blue-400);
        }

        :global(.hljs-meta) {
          color: var(--blue-650);
        }

        :global(.hljs-attr),
        :global(.hljs-attribute) {
          color: #d07ea5;
        }

        :global(.hljs-string) {
          color: var(--blue-400);
        }
      `}</style>
    </>
  )
}

const Page = props => {
  return (
    <>
      <div className={`wrapper`}>
        <Gitgrid />
        <Navbar />
        <Story data={storyData} />
        <div className="container">
          <div className="box">
            <div className="glow"></div>
            <div className="content"></div>
          </div>
        </div>
        <Story data={storyData} />
      </div>
      <style jsx>{`
        :global(:root) {
          --blue-0: #ffffff;
          --blue-50: #f2fdfc;
          --blue-100: #e6faf8;
          --blue-150: #d1faf6;
          --blue-200: #c2f7eb;
          --blue-250: #b4f4e0;
          --blue-300: #a5eddc;
          --blue-350: #96e7d8;
          --blue-400: #68d9d4;
          --blue-450: #46c6d1;
          --blue-500: #2ab7cf;
          --blue-550: #1f97cb;
          --blue-600: #2280c3;
          --blue-650: #1b61b1;
          --blue-700: #163f92;
          --blue-750: #10267f;
          --blue-800: #121264;
          --blue-850: #120849;
          --blue-900: #110431;
          --blue-950: #09011e;
          --blue-1000: #000000;

          --tina-blue: rgb(5, 116, 228);
        }

        .wrapper {
          position: relative;
          width: 100vw;
          height: 100vh;
          overflow-y: auto;
          overflow-x: hidden;
          background: linear-gradient(
            to bottom right,
            var(--blue-500) 1%,
            var(--blue-600) 5%,
            var(--blue-700) 15%,
            var(--blue-800) 30%,
            var(--blue-950) 60%,
            var(--blue-900) 100%
          );
          background-attachment: fixed;
        }

        .box {
          position: relative;
          padding: 1.5px;
        }

        .content {
          position: relative;
          z-index: 1000;
          display: block;
          min-height: 50vh;
          box-shadow: inset 0 0 256px rgba(16, 38, 127, 0.5),
            4px 4px 16px rgba(22, 63, 146, 0.2),
            16px 16px 64px rgba(16, 38, 127, 0.5);
          background: linear-gradient(
            to top left,
            var(--blue-800) 0%,
            var(--blue-850) 40%,
            var(--blue-700) 90%,
            var(--blue-650) 110%
          );
          box-shadow: inset 0 0 64px -32px rgba(104, 217, 212, 0.5),
            0 0 24px rgba(104, 217, 212, 0.15), 0 0 48px rgba(16, 38, 127, 0.3);
          border-radius: 10px;
        }

        .glow {
          content: '';
          display: block;
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            to bottom right,
            var(--blue-650),
            var(--blue-450) 40%,
            var(--blue-650) 65%,
            var(--blue-700) 100%
          );
          border-radius: 11px;
          opacity: 0.5;
        }

        .container {
          position: relative;
          width: 100%;
          max-width: 1500px;
          margin: 0 auto;
          padding: 72px 32px;
        }

        @media (min-width: 1200px) {
          .container {
            padding: 48px;
          }
        }
      `}</style>
    </>
  )
}

export default Page
