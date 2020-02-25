import Api from './api';

const api = new Api({
    baseURI: 'http://106.13.61.216:8888',
    // baseURI: 'http://127.0.0.1:8888',
    headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json; charset=utf-8'
    }
});

export default api;
