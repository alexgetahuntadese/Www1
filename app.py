import os
import tempfile
import logging
from flask import Flask, render_template, request, jsonify, send_file, flash, redirect, url_for
from gtts import gTTS
from werkzeug.middleware.proxy_fix import ProxyFix
import uuid
import time
from threading import Timer

# Configure logging
logging.basicConfig(level=logging.DEBUG)

# Create the app
app = Flask(__name__)
app.secret_key = os.environ.get("SESSION_SECRET", "default_secret_key_for_dev")
app.wsgi_app = ProxyFix(app.wsgi_app, x_proto=1, x_host=1)

# Store for temporary files with cleanup
temp_files = {}

def cleanup_temp_file(file_id):
    """Clean up temporary file after specified time"""
    if file_id in temp_files:
        try:
            if os.path.exists(temp_files[file_id]['path']):
                os.remove(temp_files[file_id]['path'])
            del temp_files[file_id]
            logging.info(f"Cleaned up temporary file: {file_id}")
        except Exception as e:
            logging.error(f"Error cleaning up file {file_id}: {str(e)}")

@app.route('/')
def index():
    """Main page with text-to-speech interface"""
    return render_template('index.html')

@app.route('/convert', methods=['POST'])
def convert_text():
    """Convert Amharic text to speech"""
    try:
        # Get text from form
        text = request.form.get('text', '').strip()
        
        if not text:
            flash('Please enter some Amharic text to convert.', 'error')
            return redirect(url_for('index'))
        
        # Validate that text contains at least some Amharic characters
        amharic_chars = any('\u1200' <= char <= '\u137f' for char in text)
        if not amharic_chars:
            flash('Please enter text that contains Amharic characters.', 'warning')
        
        # Create TTS object for Amharic
        tts = gTTS(text=text, lang='am', slow=False)
        
        # Generate unique filename
        file_id = str(uuid.uuid4())
        temp_dir = tempfile.gettempdir()
        filename = f"amharic_tts_{file_id}.mp3"
        filepath = os.path.join(temp_dir, filename)
        
        # Save TTS to file
        tts.save(filepath)
        
        # Store file info for cleanup
        temp_files[file_id] = {
            'path': filepath,
            'filename': filename,
            'text': text[:50] + '...' if len(text) > 50 else text,
            'created': time.time()
        }
        
        # Schedule cleanup after 1 hour
        Timer(3600, cleanup_temp_file, args=[file_id]).start()
        
        flash('Text converted to speech successfully!', 'success')
        return render_template('index.html', 
                             audio_file_id=file_id, 
                             converted_text=text,
                             filename=filename)
        
    except Exception as e:
        logging.error(f"Error converting text to speech: {str(e)}")
        flash(f'Error converting text to speech: {str(e)}', 'error')
        return redirect(url_for('index'))

@app.route('/audio/<file_id>')
def serve_audio(file_id):
    """Serve audio file for playback"""
    try:
        if file_id not in temp_files:
            flash('Audio file not found or expired.', 'error')
            return redirect(url_for('index'))
        
        file_info = temp_files[file_id]
        if not os.path.exists(file_info['path']):
            flash('Audio file not found.', 'error')
            return redirect(url_for('index'))
        
        return send_file(
            file_info['path'],
            mimetype='audio/mpeg',
            as_attachment=False,
            download_name=file_info['filename']
        )
        
    except Exception as e:
        logging.error(f"Error serving audio file: {str(e)}")
        flash('Error loading audio file.', 'error')
        return redirect(url_for('index'))

@app.route('/download/<file_id>')
def download_audio(file_id):
    """Download audio file"""
    try:
        if file_id not in temp_files:
            flash('Audio file not found or expired.', 'error')
            return redirect(url_for('index'))
        
        file_info = temp_files[file_id]
        if not os.path.exists(file_info['path']):
            flash('Audio file not found.', 'error')
            return redirect(url_for('index'))
        
        return send_file(
            file_info['path'],
            mimetype='audio/mpeg',
            as_attachment=True,
            download_name=file_info['filename']
        )
        
    except Exception as e:
        logging.error(f"Error downloading audio file: {str(e)}")
        flash('Error downloading audio file.', 'error')
        return redirect(url_for('index'))

@app.route('/health')
def health_check():
    """Health check endpoint"""
    return jsonify({'status': 'healthy', 'service': 'Amharic TTS'})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
