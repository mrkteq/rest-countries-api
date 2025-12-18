# Countries REST API

Search and filter country data with REST API integration, demonstrating async JavaScript patterns and responsive design.

![Countries API](/Screenshot.png)

**[Live Demo](https://api-for-countries.netlify.app/)** | **[Portfolio](https://marktucker-portfolio.netlify.app/)**

## Tech Stack

- **JavaScript (ES6+)** - Async/await, fetch API, array methods
- **HTML5** - Semantic markup with ARIA attributes
- **CSS3** - Responsive grid layout with mobile-first approach
- **REST Countries API** - Third-party data source

## Features

- Real-time search with debounced input for performance
- Multi-select region filtering with URL state persistence
- Responsive card grid adapting to viewport size
- Loading states and error handling for async operations
- Lazy loading for country detail images

## Technical Implementation

### Architecture
Modular JavaScript structure with separation of concerns: API service layer, UI rendering functions, and state management through closure patterns.

### Key Challenges Solved
1. **Search Performance**: Implemented 300ms debounce on search input to prevent excessive API calls while maintaining responsive feel
2. **State Management**: Used URL parameters to persist filter state, enabling shareable links and browser back/forward navigation
3. **Error Handling**: Implemented comprehensive try-catch blocks with user-friendly error messages and retry mechanisms

### Performance Optimizations
- Debounced search input reduces API calls by ~85%
- Intersection Observer for lazy loading images below fold
- CSS containment on card elements improves paint performance
- Template literals cached in closure to avoid repeated parsing

## Metrics

| Metric | Score |
|--------|-------|
| Lighthouse Performance | 49 |
| Lighthouse Accessibility | 91 |
| Lighthouse Best Practices | 69 |
| Lighthouse SEO | 91 |
| Initial Load Time | ~630ms |
| Time to Interactive | ~120ms |

## Installation
```bash
# Clone repository
git clone https://github.com/mrkteq/rest-countries-api.git

# Open index.html in browser
# No build process required
```

## Deployment

Deployed on Netlify with automatic HTTPS and global CDN distribution.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT
