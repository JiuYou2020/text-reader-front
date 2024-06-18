import {createSlice, PayloadAction} from '@reduxjs/toolkit';

// 定义用户状态类型
interface UserState {
    isLoggedIn: boolean;
    username: string;
    accountId: string;
    password: string;
}

// 用户状态的初始状态
const initialUserState: UserState = {
    isLoggedIn: false,
    username: "",
    accountId: "",
    password: "",
};

// 创建用户 slice
const userSlice = createSlice({
    name: 'users',
    initialState: initialUserState,
    reducers: {
        login(state, action: PayloadAction<{
            username: string,
            accountId: string,
            password: string
        }>) {
            state.isLoggedIn = true;
            state.username = action.payload.username;
            state.accountId = action.payload.accountId;
            state.password = action.payload.password;
        },
        logout(state) {
            state.isLoggedIn = false;
            state.username = "";
            state.accountId = "";
            state.password = "";
        },
        updateUser(state, action: PayloadAction<{ username: string, password: string }>) {
            state.username = action.payload.username;
            state.password = action.payload.password;
        },
    },
});

export default userSlice;
