const sendVideoPlayingToUnity = (isPlaying) => {
    console.log('video is playing: ' + isPlaying);
    if (window.vuplex) {
        window.vuplex.postMessage(isPlaying);
    }
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
});
