
let recognition = new webkitSpeechRecognition() || new SpeechRecognition();
recognition.continuous = true;
recognition.lang = 'en-US';
recognition.interimResults = true;

let transcription = document.getElementById('transcription');
let startButton = document.getElementById('startButton');
let stopButton = document.getElementById('stopButton');
let errorMessage = document.getElementById('errorMessage');

startButton.addEventListener('click', () => {
    try {
        recognition.start();
        errorMessage.textContent = ''; // Clear any previous error message
    } catch (error) {
        console.error('Speech recognition error:', error);
        errorMessage.textContent = 'Speech recognition error: ' + error.message;
    }
});

stopButton.addEventListener('click', () => {
    recognition.stop();
});

recognition.onresult = function(event) {
    let interimTranscript = '';
    for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
            transcription.textContent += event.results[i][0].transcript;
        } else {
            interimTranscript += event.results[i][0].transcript;
        }
    }
};

recognition.onerror = function(event) {
    console.error('Speech recognition error detected:', event.error);
    errorMessage.textContent = 'Speech recognition error detected: ' + event.error;
};
