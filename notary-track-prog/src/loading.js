export const loading = {
    start: function () {
        let loadingDiv = document.querySelector('.loading');
        loadingDiv.classList.remove('nonedisplay');
    },
    end: function () {
        let loadingDiv = document.querySelector('.loading');
        loadingDiv.classList.add('nonedisplay');
    }
}