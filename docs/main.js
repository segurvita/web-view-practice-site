const sendVideoPlayingToUnity = (isPlaying) => {
    console.log('video is playing: ' + isPlaying);
    if (window.vuplex) {
        window.vuplex.postMessage(isPlaying);
    }
}

const addMessageListenerFromUnity = () => {
    window.vuplex.addEventListener('message', (event) => {
        const json = event.data;
        console.log('JSON received: ' + json);

        const v = document.getElementById('video');
        const state = document.getElementById('state');
        if (json.target == "video") {
            if (json.play) {
                v.play();
                state.textContent = '再生中';
            } else {
                v.pause();
                state.textContent = '停止中';
            }
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
