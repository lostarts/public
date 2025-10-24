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

## Interactive Text-to-Image System

The website features an interactive hover system where specific text elements display related images when hovered over. This system is designed to be easily customizable for content updates.

### How It Works

**1. HTML Structure**: Interactive text elements use a `data-image-id` attribute:
```html
<span class="interactive-text" data-image-id="tools">tools</span>
```

**2. JavaScript Mapping**: The `imageMap` object in `script.js` defines text-to-image relationships:
```javascript
const imageMap = {
    'tools': 'assets/images/AoT.jpg',
    'workspace': 'assets/images/Beth Corzo-Duchardt - Cube_07_31_15a.JPG',
    'woodworking': 'assets/images/Center for the Lost Arts_85.jpg',
    // Add more mappings as needed
};
```

**3. Smart Positioning**: Images appear in optimal locations relative to the triggering text:
- Prefers above/below the text, falls back to left/right
- Automatically adjusts for mobile vs desktop screen sizes
- Ensures images don't interfere with text positioning

### Updating Content

To add new interactive text elements:

1. **Add HTML**: Wrap text with the interactive class and data attribute:
   ```html
   <span class="interactive-text" data-image-id="your-key">Your Text</span>
   ```

2. **Update imageMap**: Add the relationship in `script.js`:
   ```javascript
   const imageMap = {
       // existing mappings...
       'your-key': 'assets/images/your-image.jpg'
   };
   ```

3. **Add Images**: Place your images in the `assets/images/` folder

### Available Images
Current images in `assets/images/`:
- `AoT.jpg`
- `Beth Corzo-Duchardt - Cube_07_31_15a.JPG`
- `Center for the Lost Arts_85.jpg`
- `changchair.jpg`
- `craightonhead.jpg`
- `failed.jpg`
- `graciecoudla.jpg`
- `img_9823.jpg`
- `LostArts_Eye_White.png`
- `LostArts_Stack_White.png`

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
