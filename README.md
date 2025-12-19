# Countries REST API

A modern Vue.js application for searching and filtering country data with REST API integration, featuring dark mode, responsive design, and smooth transitions.

![Countries API](/Screenshot.png)

**[Live Demo](https://api-for-countries.netlify.app/)** | **[Portfolio](https://marktucker-portfolio.netlify.app/)**

## Tech Stack

- **Vue.js 3** - Composition API, reactive state management
- **Vue Router** - Client-side routing with dynamic routes
- **Axios** - HTTP client for API requests
- **Vite** - Fast build tool and development server
- **REST Countries API** - Third-party data source
- **CSS3** - Responsive grid layout with mobile-first approach

## Features

- Real-time search with debounced input for optimal performance
- Multi-select region filtering with URL state persistence
- Fully responsive design adapting to all screen sizes
- Dark/Light theme toggle with persistent preference
- Loading states and skeleton screens for better UX
- Smooth page transitions and animations
- Shareable country detail pages via URL routing
- Optimized bundle splitting and lazy loading

## Technical Implementation

### Architecture
Modern Vue.js 3 application using Composition API with:
- **Component-based architecture** - Reusable Vue components (CountryList, CountryDetails, SearchFilter)
- **Composables** - Custom composables for theme management and debouncing
- **Service layer** - Centralized API service with Axios for all HTTP requests
- **Vue Router** - Client-side routing with dynamic routes and scroll behavior

## Project Structure

```
src/
├── components/          # Vue components
│   ├── CountryList.vue
│   ├── CountryDetails.vue
│   └── SearchFilter.vue
├── composables/         # Reusable composition functions
│   ├── useDebounce.js
│   └── useTheme.js
├── services/            # API service layer
│   └── api.js
├── utils/               # Utility functions
│   └── formatters.js
├── router.js            # Vue Router configuration
├── App.vue              # Root component
└── main.js              # Application entry point
```

## Installation

```bash
# Clone repository
git clone https://github.com/mrkteq/rest-countries-api.git

# Navigate to project directory
cd rest-countries-api

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Development

The development server will start on `http://localhost:5173` (or the next available port).

## Deployment

Deployed on Netlify with automatic HTTPS and global CDN distribution. The build process uses Vite to create an optimized production bundle.

## License

MIT
