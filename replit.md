# Amharic Text-to-Speech Application

## Overview

This is a Flask-based web application that converts Amharic text to speech using Google's Text-to-Speech (gTTS) service. The application provides a simple web interface where users can input Amharic text and receive an audio file with the spoken version of their text.

## System Architecture

The application follows a traditional server-side rendered web application architecture with:

- **Frontend**: HTML templates with Bootstrap for responsive UI, enhanced with JavaScript for user interactions
- **Backend**: Flask web framework serving both the web interface and API endpoints
- **Text-to-Speech Engine**: Google Text-to-Speech (gTTS) library for audio generation
- **Deployment**: Gunicorn WSGI server with autoscale deployment target
- **File Management**: Temporary file system with automatic cleanup mechanism

## Key Components

### Web Framework
- **Flask Application**: Main application server handling HTTP requests and responses
- **Template Engine**: Jinja2 templates for server-side rendering
- **Static Assets**: CSS and JavaScript files for enhanced user experience

### Text-to-Speech Processing
- **gTTS Integration**: Converts Amharic text to audio using Google's TTS service
- **Temporary File Management**: Generates temporary audio files with automatic cleanup after specified time
- **Audio Format**: MP3 output format for broad compatibility

### User Interface
- **Bootstrap Framework**: Dark theme with responsive design
- **Font Awesome Icons**: Professional iconography throughout the interface
- **Progressive Enhancement**: JavaScript for improved user experience with graceful degradation

### Security & Middleware
- **ProxyFix Middleware**: Proper handling of proxy headers for deployment
- **Session Management**: Flask sessions with configurable secret key
- **Input Validation**: Server-side validation for Amharic text content

## Data Flow

1. **User Input**: User enters Amharic text via web form
2. **Validation**: Server validates text contains Amharic characters
3. **TTS Processing**: gTTS converts text to audio file
4. **File Storage**: Temporary audio file created with unique identifier
5. **Response**: Audio player served to user with download capability
6. **Cleanup**: Automatic file cleanup after specified time period

## External Dependencies

### Core Dependencies
- **Flask**: Web framework for HTTP handling and templating
- **gTTS**: Google Text-to-Speech library for audio generation
- **Gunicorn**: Production WSGI server
- **Werkzeug**: WSGI utilities and middleware

### UI Dependencies
- **Bootstrap**: CSS framework with dark theme variant
- **Font Awesome**: Icon library for enhanced visual design

### Database Preparation
- **PostgreSQL**: Database packages included for future data persistence needs
- **psycopg2-binary**: PostgreSQL adapter for Python

## Deployment Strategy

The application is configured for production deployment with:

- **Gunicorn WSGI Server**: Multi-worker production server
- **Autoscale Target**: Automatic scaling based on demand
- **Port Configuration**: Runs on port 5000 with proper binding
- **Environment Configuration**: Configurable via environment variables

### Development vs Production
- **Development**: Direct Flask development server with debug mode
- **Production**: Gunicorn with worker processes and autoscale capabilities

## User Preferences

Preferred communication style: Simple, everyday language.

## Changelog

Changelog:
- June 15, 2025. Initial setup