# Hello Space TODO List

## CI/CD

## Func

- filter pictures with keyword (and search & highlight the keyword in title, copyright, explanation)

- once signedin :

  - update profile picture + profile banner

    - add loading indicator while processing uploads / deletes
    - save custom avatar to profile
    - save custom banner to profile

  - droit à l'oubli
  - rgpd

## Tests

- Add UI test

## Chores

- Write proper README.md

## Bugs

- in modal, make the cross visible in light and dark theme

- When opening a modal, we scroll to the bottom of the page and start loading immediately (because the {modal} is inserted after {children} in root layout). Perhaps we can use a lib to block body scroll such as [body-scroll-lock](https://www.npmjs.com/package/body-scroll-lock) => mitigated by putting {modal} on top of {children} in root layout

## Useful links

- [https://logs.betterstack.com]
- [https://vercel.com]
