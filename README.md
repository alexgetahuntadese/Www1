# Amharic Text-to-Speech Application

A Flask-based web application that converts Amharic text to speech using Google's Text-to-Speech (gTTS) service.

## Features

- Convert Amharic text to natural-sounding speech
- Voice customization options (speed and style preferences)
- Responsive web interface with dark theme
- Audio playback and download functionality
- Automatic file cleanup
- Mobile-friendly design

## Deployment on Vercel

### Prerequisites
- Vercel account
- Node.js installed locally (for Vercel CLI)

### Quick Deploy
1. Fork this repository or download the code
2. Install Vercel CLI: `npm i -g vercel`
3. Login to Vercel: `vercel login`
4. Deploy: `vercel --prod`

### Manual Deploy via Vercel Dashboard
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your Git repository
4. Vercel will automatically detect the configuration from `vercel.json`
5. Click "Deploy"

### Environment Variables
The application uses `SESSION_SECRET` for Flask sessions. This is automatically configured in the `vercel.json` file.

## Local Development

### Installation
```bash
pip install Flask gTTS Werkzeug gunicorn
```

### Running Locally
```bash
python main.py
```

The application will be available at `http://localhost:5000`

## Usage

1. Enter Amharic text in the text area
2. Select voice settings:
   - Speed: Normal or Slow (for clearer pronunciation)
   - Style: Default, Male-oriented, or Female-oriented
3. Click "Convert to Speech"
4. Listen to the generated audio or download the MP3 file

## Technical Details

- **Backend**: Flask web framework
- **TTS Engine**: Google Text-to-Speech (gTTS)
- **Frontend**: Bootstrap 5 with dark theme
- **Deployment**: Optimized for Vercel serverless functions
- **Audio Format**: MP3 for broad compatibility

## File Structure

```
├── app.py              # Main Flask application
├── main.py             # Local development entry point
├── wsgi.py             # WSGI entry point for deployment
├── vercel.json         # Vercel deployment configuration
├── templates/
│   └── index.html      # Main web interface
├── static/
│   ├── css/
│   │   └── style.css   # Custom styles
│   └── js/
│       └── main.js     # Frontend JavaScript
└── README.md           # This file
```

## Voice Options

The application provides several voice customization options:

- **Speed Control**: Normal speed for regular listening, slow speed for learning and pronunciation
- **Voice Style**: While gTTS provides a neutral voice, the application offers style preferences that can be enhanced with future audio processing features

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers

## License

This project is open source and available under the MIT License.