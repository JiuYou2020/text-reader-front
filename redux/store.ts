import {configureStore, createSlice, PayloadAction} from '@reduxjs/toolkit';

// 定义提示状态类型
interface TipState {
    message: string;
    visible: boolean;
}

// 提示状态的初始状态
const initialTipState: TipState = {
    message: '',
    visible: false,
};

// 创建提示 slice
const tipSlice = createSlice({
    name: 'tip',
    initialState: initialTipState,
    reducers: {
        showTip(state, action: PayloadAction<string>) {
            state.message = action.payload;
            state.visible = true;
        },
        hideTip(state) {
            state.visible = false;
        },
    },
});

// 定义用户状态类型
interface UserState {
    isLoggedIn: boolean;
    username: string | null;
    accountId: string | null;
    password: string | null;
}

// 用户状态的初始状态
const initialUserState: UserState = {
    // isLoggedIn: true,
    // username: "张三",
    // accountId: "1",
    // password: "123456",
    isLoggedIn: false,
    username: null,
    accountId: null,
    password: null,
};

// 创建用户 slice
const userSlice = createSlice({
    name: 'user',
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
            state.username = null;
            state.accountId = null;
            state.password = null;
        },
        updateUser(state, action: PayloadAction<{ username: string, password: string }>) {
            state.username = action.payload.username;
            state.password = action.payload.password;
        },
    },
});

// 导出 actions 和 reducer
export const {showTip, hideTip} = tipSlice.actions;
export const {login, logout, updateUser} = userSlice.actions;

// 创建 Redux store
const store = configureStore({
    reducer: {
        tip: tipSlice.reducer,
        user: userSlice.reducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
