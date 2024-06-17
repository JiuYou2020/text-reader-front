import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Book} from '@/constants/Book';

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

export default bookSlice;
