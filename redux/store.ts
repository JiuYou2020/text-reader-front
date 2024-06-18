import {combineReducers, configureStore} from '@reduxjs/toolkit';
import tipSlice from "@/redux/slices/tipSlice";
import userSlice from "@/redux/slices/userSlice";
import bookSlice from "@/redux/slices/bookSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {persistReducer, persistStore} from 'redux-persist';


// 配置持久化存储
const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['user', 'book'], // 仅持久化这两个 slice
};

const rootReducer = combineReducers({
    tip: tipSlice.reducer,
    user: userSlice.reducer,
    book: bookSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

// 创建 Redux store
const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== 'production', // 只在开发环境中启用
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(
        {
            serializableCheck: {
                ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE',],
            },
        }
    ),
});

const persistor = persistStore(store);

export const {addBook, loadBooks, updateReadingPosition, removeBook} = bookSlice.actions;
export const {showTip, hideTip} = tipSlice.actions;
export const {login, logout, updateUser} = userSlice.actions;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export {store, persistor};
