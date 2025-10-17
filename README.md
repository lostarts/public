# Lost Arts Public

A simple, modern one-page website showcasing traditional arts and crafts.

## Project Structure

```
LostArts_Publix/
├── index.html          # Main HTML file
├── styles.css          # CSS stylesheet
└── README.md          # This file
```

## Features

- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Modern Styling**: Clean, professional appearance with smooth animations
- **Single Page**: All content accessible through smooth scrolling navigation
- **Sections**:
  - Hero section with call-to-action
  - About section
  - Services section with cards
  - Contact information
  - Footer

## Getting Started

1. **Open the website**: Simply open `index.html` in any web browser
2. **Local Development**: Use a local server for best experience:
   ```bash
   # Using Python (if installed)
   python -m http.server 8000
   
   # Using Node.js (if installed)
   npx serve .
   
   # Using PHP (if installed)
   php -S localhost:8000
   ```
3. **View**: Navigate to `http://localhost:8000` in your browser

## Customization

### Colors
The website uses a modern color palette:
- Primary: `#2c3e50` (dark blue-gray)
- Accent: `#3498db` (blue)
- Action: `#e74c3c` (red)
- Background: `#f8f9fa` (light gray)

### Content
- Edit `index.html` to change text content
- Modify `styles.css` to adjust colors, fonts, and layout
- Add images by placing them in the project folder and referencing them in HTML

### Adding Images
1. Create an `images/` folder in your project
2. Add your image files
3. Reference them in HTML: `<img src="images/your-image.jpg" alt="Description">`

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers

## Deployment

### GitHub Pages
1. Push your project to a GitHub repository
2. Go to repository Settings > Pages
3. Select source branch (usually `main`)
4. Your site will be available at `https://username.github.io/repository-name`

### Other Hosting Options
- Netlify (drag and drop deployment)
- Vercel
- Any web hosting service that supports static files

## License

This project is open source and available under the [MIT License](LICENSE).

## Contact

For questions or suggestions, please contact: info@lostartspublix.com
