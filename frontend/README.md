# Airbnb Scraper Frontend

This is the frontend for the Airbnb Scraper project, built with Next.js and Tailwind CSS.

## Features

- Responsive, Airbnb-like UI built with Tailwind CSS
- Search listings by location, dates, number of guests, price range, and rating
- View listing details including amenities, host information, and pricing
- Pagination support for loading more listings
- Server-side rendering for improved SEO and performance

## Setup Instructions

1. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

2. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Development

- **Pages**: All pages are in the `src/pages` directory. Next.js uses file-based routing.
- **Components**: Reusable UI components are in the `src/components` directory.
- **API Integration**: API calls are handled through custom hooks in the `src/hooks` directory.
- **TypeScript Interfaces**: Data type definitions are stored in the `src/interfaces` directory.

## Building for Production

```bash
npm run build
# or
yarn build
```

Then start the production server:

```bash
npm run start
# or
yarn start
```

## Troubleshooting

If you encounter module import errors (such as with `next/app`), try:

1. Ensuring all dependencies are installed: `npm install`
2. Clearing Next.js cache: `rm -rf .next`
3. Restarting the development server

For TypeScript issues, make sure your `tsconfig.json` file is correctly configured and you have the latest types installed.

## Project Structure

- `/src/components` - React components
  - `/layout` - Layout components
  - `/listings` - Listing components
  - `/search` - Search components
- `/src/hooks` - Custom React hooks
- `/src/interfaces` - TypeScript interfaces
- `/src/pages` - Next.js pages
- `/src/styles` - Global styles

## API Integration

This frontend connects to the Django backend at `http://localhost:8000/api/`. Make sure the backend server is running before using the frontend.

## Built With

- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [React Icons](https://react-icons.github.io/react-icons/) - Icon library
- [React DatePicker](https://reactdatepicker.com/) - Date picker component 