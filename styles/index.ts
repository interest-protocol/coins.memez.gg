import { css } from '@emotion/react';

export const GlobalStyles = css`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family:
      'DM Sans',
      -apple-system,
      system-ui,
      BlinkMacSystemFont,
      'Segoe UI',
      Roboto,
      'Helvetica Neue',
      Arial,
      sans-serif;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    color: #ffffff;
    overflow-y: auto;
    background: #131313;
    min-height: -webkit-fill-available;
  }

  body,
  html {
    overflow-x: hidden;
  }

  a {
    color: inherit;
    text-decoration: none;
  }
  /* width */
  ::-webkit-scrollbar {
    width: 3px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: #0007;
    padding-left: 2px;
    border-radius: 0.5rem;
    transition: all 300ms ease-in-out;
  }

  /* Track on hover */
  ::-webkit-scrollbar-track:hover {
    background: #0003;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 0.5rem;
    border: 5px solid transparent;
  }

  /* Customize pagination component */
  .paginate {
    gap: 0.25rem;
    display: flex;
    list-style: none;
    & li {
      & a {
        width: 2rem;
        height: 2rem;
        display: flex;
        color: #f5b722;
        cursor: pointer;
        align-items: center;
        border-radius: 0.5rem;
        justify-content: center;
      }
      &.previous a {
        margin-right: 1.5rem;
      }
      &.next a {
        margin-left: 1.5rem;
      }
      &.previous a,
      &.next a {
        color: #f5b722;
        border: 1px solid;
      }
      &.selected a {
        color: #000;
        background: #f5b722;
      }
      &.disabled a {
        color: #ffffffa3;
      }
    }
  }
`;
