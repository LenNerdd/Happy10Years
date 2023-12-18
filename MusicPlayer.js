var note = document.getElementById('note');
var audio = document.getElementById('backgroundMusic');
var video = document.getElementById('openVideo');

// Function to pause the audio
function pauseAudio() {
    if (!audio.paused) {
        console.log('Paused audio successfully')
        audio.pause();
    }
}

// Function to resume the audio
function resumeAudio() {
    if (audio.paused) {
        audio.play().then(function () {
            console.log('Audio resumed successfully');
        }).catch(function (error) {
            console.error('Error resuming audio:', error.message);
        });
    }
}

if (video) {
    // Play audio when the document is ready
    audio.play().then(function () {
        console.log('Audio played successfully');
    }).catch(function () {
        console.log("Before opened: ", noteOpen)
        note.addEventListener('click', function () {
            if (noteOpen == false) {
                console.log("After opened, but variable not updated: ", noteOpen)
                resumeAudio();
                noteOpen = true;
                console.log("After opened and variable updated: ", noteOpen)
            }
        });
    });

    // Event listener to pause audio when video is opened
    video.addEventListener('click', function (event) {
        console.log(noteOpen)
        event.preventDefault();
        pauseAudio();

        var videoUrl = './video/Happy10Years.mp4';

        var modal = document.createElement('div');
        modal.className = 'video-modal';

        var videoElement = document.createElement('video');
        videoElement.src = videoUrl;
        videoElement.controls = true;

        modal.appendChild(videoElement);

        document.body.appendChild(modal);

        videoElement.addEventListener('ended', function () {
            resumeAudio();
            document.body.removeChild(modal);
        });

        modal.addEventListener('click', function (event) {
            if (event.target === modal) {
                resumeAudio();
                document.body.removeChild(modal);
            }
        });
    });
} else {
    // Play audio when the document is ready
    audio.play().then(function () {
        console.log('Audio played successfully');
    }).catch(function (error) {
        // Event listener to resume audio when clicking on the body
        document.body.addEventListener('click', function () {
            resumeAudio();
        });
    });
}
