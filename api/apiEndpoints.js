import API_URLS from "./apiConfig";
import axios from "axios";

// 登录用户
export const loginUser = async (username, password) => {
    try {
        const response = await axios.get(API_URLS.LOGIN + `?username=${username}&password=${password}`);
        return response.data;
    } catch (error) {
        console.error('登录失败', error);
        return {success: false, errMessage: 'axios error'};
    }
};

// 注册用户
export const registerUser = async (username, password) => {
    try {
        const response = await axios.post(API_URLS.REGISTER, {
            username,
            password
        }, {
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error('注册失败', error);
        return {success: false, errMessage: 'axios error'};
    }
}

//获取公告
export const getAnnouncement = async () => {
    try {
        const response = await axios.get(API_URLS.GET_ANNOUNCE, {timeout: 3000});
        return response.data;
    } catch (error) {
        console.error('获取公告失败', error);
        return {success: false, errMessage: 'axios error'};
    }
};
