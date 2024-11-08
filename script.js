let player;
let videoHistory = [];

function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '360',
        width: '640',
        videoId: '',
        events: {
            'onReady': onPlayerReady,
        }
    });
}

function onPlayerReady(event) {
    document.getElementById('video-url').value = '';
}


function addVideo() {
    const url = document.getElementById('video-url').value;
    const videoId = extractVideoId(url);
    if (videoId) {
        player.loadVideoById(videoId);
        addToHistory(url, videoId);
    } else {
        alert('Enlace no válido de YouTube.');
    }
}

function extractVideoId(url) {
    const regex = /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([^\&\?\/]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
}

function addToHistory(url, videoId) {
    if (!videoHistory.some(video => video.id === videoId)) {
        videoHistory.push({ id: videoId, url: url });
        updateCarousel();
        updateHistory();
    }
}

function updateCarousel() {
    const carousel = document.querySelector('.carousel');
    carousel.innerHTML = ''; 
    videoHistory.forEach((video, index) => {
        const slide = document.createElement('div');
        slide.classList.add('slide');
        
        const img = document.createElement('img');
        img.src = `https://img.youtube.com/vi/${video.id}/0.jpg`;
        img.alt = `Video ${index + 1}`;
        img.addEventListener('click', () => loadAndPlayVideo(video.id));
        
        slide.appendChild(img);
        carousel.appendChild(slide);
    });
}

function updateHistory() {
    const historyContainer = document.getElementById('history');
    historyContainer.innerHTML = '';
    videoHistory.forEach((video) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <span>${video.url}</span>
            <a href="https://www.y2mate.com/en/youtube/${video.id}" target="_blank" class="download-link">Descargar</a>
        `;
        historyContainer.appendChild(listItem);
    });
}

function loadAndPlayVideo(videoId) {
    player.loadVideoById(videoId);
}

function playVideo() {
    player.playVideo();
}

function pauseVideo() {
    player.pauseVideo();
}

function muteVideo() {
    player.mute();
}

function unmuteVideo() {
    player.unMute();
}

function changeVolume(volume) {
    player.setVolume(volume);
}

function toggleFullscreen() {
    const iframe = document.querySelector('#player iframe');
    if (iframe.requestFullscreen) {
        iframe.requestFullscreen();
    } else if (iframe.mozRequestFullScreen) { 
        iframe.mozRequestFullScreen();
    } else if (iframe.webkitRequestFullscreen) { 
        iframe.webkitRequestFullscreen();
    } else if (iframe.msRequestFullscreen) { 
        iframe.msRequestFullscreen();
    }
}
function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.ENDED) {
        console.log('El video ha terminado');
    }
}
