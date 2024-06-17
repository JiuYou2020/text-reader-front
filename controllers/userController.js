import {useDispatch} from "react-redux";
import {useRouter} from "expo-router";
import {loginUser, registerUser} from "@/api/apiEndpoints";
import {login, showTip} from "@/redux/store";
import {setItem} from "@/utils/asyncStorageService";

export const useLogin = () => {
    const dispatch = useDispatch();
    const router = useRouter();

    const handleLogin = async (username, password) => {
        const {success, errCode, errMessage, data} = await loginUser(username, password);
        if (success) {
            const userId = data;
            // 登录成功后更新 Redux 状态和 AsyncStorage
            dispatch(login({username, accountId: userId, password}));
            await setItem('user', {username, accountId: userId, password})
            router.replace('/my');
        } else {
            dispatch(showTip('登录失败：' + errMessage))
        }
    }

    return {handleLogin};
};


export const useRegister = () => {
    const dispatch = useDispatch();
    const router = useRouter();

    const handleRegister = async (username, password) => {
        const {success, errCode, errMessage, data} = await registerUser(username, password);
        if (success) {
            router.replace('/login');
            dispatch(showTip('注册成功，请登录'));
        } else {
            dispatch(showTip('注册失败：' + errMessage));
        }
    }

    return {handleRegister};
}
