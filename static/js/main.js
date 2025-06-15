// Main JavaScript for Amharic TTS Application

document.addEventListener('DOMContentLoaded', function() {
    // Get form and button elements
    const form = document.getElementById('ttsForm');
    const submitBtn = document.getElementById('convertBtn');
    const btnText = submitBtn.querySelector('.btn-text');
    const spinner = submitBtn.querySelector('.spinner-border');
    const textArea = document.getElementById('text');

    // Form submission handling
    if (form) {
        form.addEventListener('submit', function(e) {
            const text = textArea.value.trim();
            
            // Validate input
            if (!text) {
                e.preventDefault();
                showAlert('Please enter some text to convert.', 'warning');
                return;
            }

            // Show loading state
            showLoadingState();
        });
    }

    // Text area enhancements
    if (textArea) {
        // Auto-resize textarea
        textArea.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = (this.scrollHeight) + 'px';
        });

        // Character counter (optional)
        const maxChars = 5000; // gTTS limit
        textArea.addEventListener('input', function() {
            const remaining = maxChars - this.value.length;
            if (remaining < 100) {
                // Show warning when approaching limit
                if (remaining < 0) {
                    this.value = this.value.substring(0, maxChars);
                }
            }
        });
    }

    // Audio player enhancements
    const audioPlayer = document.querySelector('.audio-player');
    if (audioPlayer) {
        // Add loading state for audio
        audioPlayer.addEventListener('loadstart', function() {
            console.log('Audio loading started');
        });

        audioPlayer.addEventListener('canplay', function() {
            console.log('Audio ready to play');
        });

        audioPlayer.addEventListener('error', function(e) {
            console.error('Audio error:', e);
            showAlert('Error loading audio. Please try again.', 'error');
        });

        // Auto-play prevention (good UX practice)
        audioPlayer.addEventListener('loadeddata', function() {
            // Optional: Add play button overlay
        });
    }

    // Utility functions
    function showLoadingState() {
        if (submitBtn && btnText && spinner) {
            submitBtn.disabled = true;
            btnText.textContent = 'Converting...';
            spinner.classList.remove('d-none');
            submitBtn.classList.add('loading');
        }
    }

    function hideLoadingState() {
        if (submitBtn && btnText && spinner) {
            submitBtn.disabled = false;
            btnText.textContent = 'Convert to Speech';
            spinner.classList.add('d-none');
            submitBtn.classList.remove('loading');
        }
    }

    function showAlert(message, type = 'info') {
        // Create alert element
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert alert-${type === 'error' ? 'danger' : type} alert-dismissible fade show`;
        alertDiv.innerHTML = `
            <i class="fas fa-${type === 'error' ? 'exclamation-triangle' : type === 'warning' ? 'exclamation-triangle' : 'info-circle'} me-2"></i>
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;

        // Insert at top of container
        const container = document.querySelector('.container');
        const firstRow = container.querySelector('.row');
        const alertContainer = document.createElement('div');
        alertContainer.className = 'row justify-content-center mb-4';
        alertContainer.innerHTML = `<div class="col-lg-8"></div>`;
        alertContainer.querySelector('.col-lg-8').appendChild(alertDiv);
        
        container.insertBefore(alertContainer, firstRow);

        // Auto-dismiss after 5 seconds
        setTimeout(() => {
            if (alertDiv.parentNode) {
                alertDiv.classList.remove('show');
                setTimeout(() => {
                    if (alertContainer.parentNode) {
                        alertContainer.remove();
                    }
                }, 150);
            }
        }, 5000);
    }

    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + Enter to submit form
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            if (form && !submitBtn.disabled) {
                form.submit();
            }
        }
    });

    // Download tracking (optional)
    const downloadLinks = document.querySelectorAll('a[href*="/download/"]');
    downloadLinks.forEach(link => {
        link.addEventListener('click', function() {
            console.log('Audio download initiated');
            // Optional: Add analytics tracking here
        });
    });

    // Service worker registration for offline functionality (optional)
    if ('serviceWorker' in navigator) {
        // Uncomment if you want to add offline support
        // navigator.serviceWorker.register('/sw.js').catch(console.error);
    }

    // Amharic text validation helper
    function containsAmharic(text) {
        // Unicode range for Amharic: U+1200–U+137F
        const amharicRegex = /[\u1200-\u137F]/;
        return amharicRegex.test(text);
    }

    // Real-time Amharic validation
    if (textArea) {
        let validationTimeout;
        textArea.addEventListener('input', function() {
            clearTimeout(validationTimeout);
            validationTimeout = setTimeout(() => {
                const text = this.value.trim();
                if (text && !containsAmharic(text)) {
                    // Optional: Show subtle warning
                    this.classList.add('border-warning');
                } else {
                    this.classList.remove('border-warning');
                }
            }, 1000);
        });
    }
});

// Global error handler
window.addEventListener('error', function(e) {
    console.error('Global error:', e.error);
});

// Handle page visibility for audio pause
document.addEventListener('visibilitychange', function() {
    const audioPlayer = document.querySelector('.audio-player');
    if (audioPlayer && document.hidden) {
        // Optional: Pause audio when tab is hidden
        // audioPlayer.pause();
    }
});
