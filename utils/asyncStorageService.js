import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * 存储数据到 AsyncStorage
 * @param {string} key - 存储数据的键
 * @param {any} value - 存储的数据
 * @returns {Promise<void>}
 */
export const setItem = async (key, value) => {
    try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem(key, jsonValue);
    } catch (error) {
        console.error(`Error setting item with key "${key}":`, error);
        throw error;
    }
};

/**
 * 从 AsyncStorage 获取数据
 * @param {string} key - 获取数据的键
 * @returns {Promise<any>} - 返回获取到的数据
 */
export const getItem = async (key) => {
    try {
        const jsonValue = await AsyncStorage.getItem(key);
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (error) {
        console.error(`Error getting item with key "${key}":`, error);
        throw error;
    }
};

/**
 * 删除 AsyncStorage 中的数据
 * @param {string} key - 删除数据的键
 * @returns {Promise<void>}
 */
export const removeItem = async (key) => {
    try {
        await AsyncStorage.removeItem(key);
    } catch (error) {
        console.error(`Error removing item with key "${key}":`, error);
        throw error;
    }
};

/**
 * 获取 AsyncStorage 中所有的键
 * @returns {Promise<string[]>} - 返回所有的键数组
 */
export const getAllKeys = async () => {
    try {
        const keys = await AsyncStorage.getAllKeys();
        return keys;
    } catch (error) {
        console.error('Error getting all keys:', error);
        throw error;
    }
};

/**
 * 清空 AsyncStorage 中的所有数据
 * @returns {Promise<void>}
 */
export const clear = async () => {
    try {
        await AsyncStorage.clear();
    } catch (error) {
        console.error('Error clearing AsyncStorage:', error);
        throw error;
    }
};
