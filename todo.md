# Hello Space TODO List

## Func

- signin with social (google, twitch)

- filter pictures with keyword (and search & highlight the keyword in title, copyright, explanation)

- once signedin :
  - update profile picture + profile banner
  - droit à l'oubli
  - rgpd

## Tests

- Add UI test

## Chores

- Write proper README.md

## Bugs

- When opening a modal, we scroll to the bottom of the page and start loading immediately (because the {modal} is inserted after {children} in root layout). Perhaps we can use a lib to block body scroll such as [body-scroll-lock](https://www.npmjs.com/package/body-scroll-lock) => mitigated by putting {modal} on top of {children} in root layout

## Useful links

- [https://logs.betterstack.com]
- [https://vercel.com]
