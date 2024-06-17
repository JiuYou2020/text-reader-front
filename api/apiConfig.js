// src/api/apiConfig.js
const debug = process.env.NODE_ENV !== 'production';

const BASE_URL = debug ? 'http://localhost:8080' : 'https://your-production-url.com';

const API_URLS = {
    GET_ANNOUNCE: `${BASE_URL}/notification/announce`,
    LOGIN: `${BASE_URL}/user/users/login`,
    REGISTER: `${BASE_URL}/user/users/register`,

    // 添加其他需要的 API 端点
};

export default API_URLS;
