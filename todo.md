# Hello Space TODO List

## CI/CD

- on Vercel, why the /api/auth/providers is not accessible (401 / fetch failed)

## Func

- filter pictures with keyword (and search & highlight the keyword in title, copyright, explanation)

- once signedin :

  - update profile picture + profile banner

    - allow to remove avatar
    - add loading indicator while processing uploads / deletes on banner & avatar
    - handle the refresh of banner or avatar without reloading entirely the page (react-query?)

  - droit à l'oubli
  - rgpd

- add a shop to buy the pictures we liked on t-shirts, sweats, mugs or plates

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
