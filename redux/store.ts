import {configureStore, createSlice, PayloadAction} from '@reduxjs/toolkit';

interface TipState {
    message: string;
    visible: boolean;
}

const initialState: TipState = {
    message: '',
    visible: false,
};

const tipSlice = createSlice({
    name: 'tip',
    initialState,
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

export const {showTip, hideTip} = tipSlice.actions;

const store = configureStore({
    reducer: {
        tip: tipSlice.reducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
