# Deployment Guide for Amharic TTS on Vercel

## Quick Deployment Steps

### 1. Prepare Your Code
Your application is now ready for Vercel deployment with these key files:
- `vercel.json` - Deployment configuration
- `wsgi.py` - WSGI entry point for Vercel
- `app.py` - Main Flask application
- `README.md` - Documentation

### 2. Deploy to Vercel

#### Option A: Using Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Login to your Vercel account
vercel login

# Deploy from your project directory
vercel --prod
```

#### Option B: Using Git + Vercel Dashboard
1. Push your code to GitHub, GitLab, or Bitbucket
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your repository
5. Vercel automatically detects the configuration
6. Click "Deploy"

### 3. Configuration Details

The `vercel.json` file is configured with:
- Python runtime using `@vercel/python`
- WSGI entry point through `wsgi.py`
- 30-second function timeout for TTS processing
- 50MB lambda size limit for audio file handling
- Environment variables for Flask sessions

### 4. Post-Deployment

After successful deployment:
- Your app will be available at a `.vercel.app` URL
- Test the Amharic text-to-speech functionality
- Verify audio generation and playback work correctly
- Check mobile responsiveness

### 5. Custom Domain (Optional)

To add a custom domain:
1. Go to your project dashboard on Vercel
2. Click "Domains"
3. Add your custom domain
4. Configure DNS records as instructed

## Important Notes

- **TTS Processing**: The app uses Google's TTS service, which requires internet connectivity
- **File Storage**: Audio files are temporarily stored and automatically cleaned up
- **Performance**: First request may have cold start latency; subsequent requests are faster
- **Limits**: Vercel has execution time and memory limits suitable for TTS processing

## Troubleshooting

### Common Issues:
1. **Deployment fails**: Check that all dependencies are properly specified
2. **TTS errors**: Verify Google TTS service is accessible
3. **Audio playback issues**: Ensure browser supports MP3 audio playback
4. **Mobile issues**: Test responsive design on various devices

### Support:
- Check Vercel deployment logs for detailed error information
- Verify network connectivity for TTS service calls
- Test locally before deploying to isolate environment-specific issues