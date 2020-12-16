const showUserAgent = () => {
    const u = document.getElementById('userAgent');
    u.textContent = window.navigator.userAgent;
};

document.addEventListener('DOMContentLoaded', () => {
    showUserAgent();
});
