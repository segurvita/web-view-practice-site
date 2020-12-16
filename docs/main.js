const sendVideoPlayingToUnity = (isPlaying) => {
    console.log('video is playing: ' + isPlaying);
    if (window.vuplex) {
        window.vuplex.postMessage(isPlaying);
    }
}

const toggleVideo = (isPlaying) => {
    const v = document.getElementById('video');
    const state = document.getElementById('state');
    if (isPlaying) {
        v.play();
        state.textContent = '再生中';
    } else {
        v.pause();
        state.textContent = '停止中';
    }
}

const addMessageListenerFromUnity = () => {
    window.vuplex.addEventListener('message', (event) => {
        const json = event.data;
        console.log('JSON received: ' + json);
        if (json.target === "video") {
            toggleVideo(json.play === "true");
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const v = document.getElementById('video');
    const state = document.getElementById('state');

    v.addEventListener('play', () => {
        state.textContent = '再生中';
        sendVideoPlayingToUnity(true);
    })
    v.addEventListener('pause', () => {
        state.textContent = '停止中';
        sendVideoPlayingToUnity(false);
    })

    if (window.vuplex) {
        addMessageListenerFromUnity();
    } else {
        window.addEventListener('vuplexready', addMessageListenerFromUnity);
    }
});
