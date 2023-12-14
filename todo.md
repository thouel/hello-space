# Hello Space TODO List

## CI/CD

- on Vercel, why the /api/auth/providers is not accessible (401 / fetch failed)

## Func

- once signedin :

  - close menus when clicked : on profile picture, on sort
  - on / : passer liked link + infinite scroll compatible with dark mode
  - on /s/liked : passer homepage link + sort button compatible with dark mode
  - on picturecard: passer buttons compatible with dark mode
  - update profile picture + profile banner

    - add 'profile picture not found' image

  - droit à l'oubli
  - rgpd

- filter pictures with keyword (and search & highlight the keyword in title, copyright, explanation)
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
