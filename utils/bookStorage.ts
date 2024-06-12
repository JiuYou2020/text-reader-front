import AsyncStorage from "@react-native-async-storage/async-storage";
import {Book} from "@/constants/Book";

export const fetchBookFromStorage = async (bookId: string): Promise<Book | null> => {
    try {
        const storedBook = await AsyncStorage.getItem(bookId);
        return storedBook ? JSON.parse(storedBook) : null;
    } catch (error) {
        console.error('Failed to load book from storage:', error);
        return null;
    }
};

export const saveBookToStorage = async (book: Book): Promise<void> => {
    try {
        await AsyncStorage.setItem(book.id, JSON.stringify(book));
    } catch (error) {
        console.error('Failed to save book to storage:', error);
    }
};
