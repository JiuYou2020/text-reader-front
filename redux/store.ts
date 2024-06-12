import {configureStore, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Book} from "@/constants/Book";

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

/**
 * 创建一个名为books的slice，用于管理书籍相关状态。
 * @param {Object} createSlice配置对象
 * @param {string} name slice的名称，用于标识这个状态切片。
 * @param {Object} initialState 初始状态对象，这里是指定书籍的初始状态。
 * @param {Object} reducers 定义了对状态进行修改的操作。
 * @returns {Object} 返回一个包含actions和reducers的对象，用于在Redux中进行状态管理。
 * ```ts
 *  // 示例：添加一本书
 *   const handleAddBook = (newBook: Book) => {
 *     dispatch(addBook(newBook));
 *   };
 *
 *   // 示例：加载书籍列表
 *   const handleLoadBooks = (books: Book[]) => {
 *     dispatch(loadBooks(books));
 *   };
 *
 *   // 示例：更新阅读位置
 *   const handleUpdateReadingPosition = (bookId: string, newPosition: number) => {
 *     dispatch(updateReadingPosition({ bookId, position: newPosition }));
 *   };
 * ```
 */
const bookSlice = createSlice({
    name: 'books',
    initialState: initialBooksState,
    reducers: {
        /**
         * 添加一本书到书籍列表中。
         * @param {Object} state 当前的状态对象。
         * @param {PayloadAction<Book>} action 添加书籍的动作，携带新书的信息。
         */
        addBook(state, action: PayloadAction<Book>) {
            state.books.push(action.payload);
        },
        /**
         * 加载书籍列表，替换现有的书籍列表。
         * @param {Object} state 当前的状态对象。
         * @param {PayloadAction<Book[]>} action 加载书籍的动作，携带一个书籍数组。
         */
        loadBooks(state, action: PayloadAction<Book[]>) {
            state.books = action.payload;
        },
        /**
         * 更新书籍的阅读位置。
         * @param {Object} state 当前的状态对象。
         * @param {PayloadAction<{bookId: string; position: number}>} action 更新阅读位置的动作，携带书籍ID和新的阅读位置。
         */
        updateReadingPosition(state, action: PayloadAction<{ bookId: string; position: number }>) {
            const book = state.books.find((b) => b.id === action.payload.bookId);
            if (book) {
                book.lastReadPosition = action.payload.position;
            }
        },
        /**
         * 删除书籍项
         * @param {Object} state 当前的书籍状态对象。
         * @param {PayloadAction<string>} action 删除书籍的动作，携带要删除书籍的ID。
         */
        removeBook(state, action: PayloadAction<string>) {
            state.books = state.books.filter((book) => book.id !== action.payload);
        },


    },
});

// 导出 actions 和 reducer
export const {showTip, hideTip} = tipSlice.actions;
export const {login, logout, updateUser} = userSlice.actions;
export const {addBook, loadBooks, updateReadingPosition, removeBook} = bookSlice.actions;

// 创建 Redux store
const store = configureStore({
    reducer: {
        tip: tipSlice.reducer,
        user: userSlice.reducer,
        book: bookSlice.reducer,
    },
    devTools: process.env.NODE_ENV !== 'production', // 只在开发环境中启用
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
