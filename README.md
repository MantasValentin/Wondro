# Wondro Ecommerce

This is a nearly functional ecommerce website for my portfolio, lacks payment processing and admin page.

## Requirements

As this website uses Firebase for account and data handling, you will need to set up a connection to your Firebase project with your environment variables in ".env.local" file.

```bash
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=
```

Set up Realtime Database and add Google authentication or delete "OAuthButtons.tsx" file to only require Realtime Database.

## Getting Started

To get all the packages.

```bash
npm install
# or
yarn install
# or
pnpm install
```

To launch the app.

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

## Visit site

https://wondro.vercel.app/
