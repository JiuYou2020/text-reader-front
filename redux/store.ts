import {configureStore, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Book} from "@/constants/Book";
import AsyncStorage from '@react-native-async-storage/async-storage';

//===========================提示===========================
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
//===========================用户状态===========================
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

//===========================书籍===========================
interface BooksState {
    books: Book[];
}

const initialBooksState: BooksState = {
    books: [],
};

const booksSlice = createSlice({
    name: 'books',
    initialState: initialBooksState,
    reducers: {
        addBook(state, action: PayloadAction<Book>) {
            state.books.push(action.payload);
        },
        loadBooks(state, action: PayloadAction<Book[]>) {
            state.books = action.payload;
        },
        updateReadingPosition(state, action: PayloadAction<{ bookId: string; position: number }>) {
            const book = state.books.find((b) => b.id === action.payload.bookId);
            if (book) {
                book.lastReadPosition = action.payload.position;
            }
        },
    },
});
// 加载持久化的书籍信息
const loadPersistedBooks = async () => {
    const keys = await AsyncStorage.getAllKeys();
    const bookKeys = keys.filter(key => key.startsWith('book-'));
    const books = await AsyncStorage.multiGet(bookKeys);
    const parsedBooks = books.map(([key, value]) => JSON.parse(value ?? "{}")); // 使用默认值
    store.dispatch(loadBooks(parsedBooks));
};
loadPersistedBooks();

// 导出 actions 和 reducer
export const {showTip, hideTip} = tipSlice.actions;
export const {login, logout, updateUser} = userSlice.actions;
export const {addBook, loadBooks, updateReadingPosition} = booksSlice.actions;

// 创建 Redux store
const store = configureStore({
    reducer: {
        tip: tipSlice.reducer,
        user: userSlice.reducer,
        books: booksSlice.reducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
