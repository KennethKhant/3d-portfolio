# 3D Business Card

Netflix-style welcome + 3D flippable business card (Next.js 15, Tailwind v4, Framer Motion).

## Routes
- /welcome — intro splash (auto-redirects to /about)
- /about — 3D, tilt + flip business card

## Dev
npm i
npm run dev

## Build & start
npm run build
npm start

## Tuning the card size
Edit the wrapper in app/about/page.tsx (FlipCard):
className="... h-[220px] w-[380px] sm:h-[260px] sm:w-[560px]"

