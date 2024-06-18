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
 */
const bookSlice = createSlice({
    name: 'books',
    initialState: initialBooksState,
    reducers: {
        /**
         * 添加一本书到书籍列表中。
         */
        addBook(state, action: PayloadAction<Book>) {
            state.books.push(action.payload);
        },
        /**
         * 加载书籍列表，替换现有的书籍列表。
         */
        loadBooks(state, action: PayloadAction<Book[]>) {
            state.books = action.payload;
        },
        /**
         * 更新书籍的阅读位置。*/
        updateReadingPosition(state, action: PayloadAction<{ bookId: string; position: number }>) {
            const book = state.books.find((b) => b.id === action.payload.bookId);
            if (book) {
                book.lastReadPosition = action.payload.position;
            }
        },
        /**
         * 删除书籍项
         */
        removeBook(state, action: PayloadAction<string>) {
            state.books = state.books.filter((book) => book.id !== action.payload);
        },

    },
});

export default bookSlice;
