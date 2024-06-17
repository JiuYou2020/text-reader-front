import {configureStore} from '@reduxjs/toolkit';
import tipSlice from "@/redux/slices/tipSlice";
import userSlice from "@/redux/slices/userSlice";
import bookSlice from "@/redux/slices/bookSlice";

// 创建 Redux store
const store = configureStore({
    reducer: {
        tip: tipSlice.reducer,
        user: userSlice.reducer,
        book: bookSlice.reducer,
    },
    devTools: process.env.NODE_ENV !== 'production', // 只在开发环境中启用
});


export const {addBook, loadBooks, updateReadingPosition, removeBook} = bookSlice.actions;
export const {showTip, hideTip} = tipSlice.actions;
export const {login, logout, updateUser} = userSlice.actions;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
