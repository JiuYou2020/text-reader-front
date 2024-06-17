import {createSlice, PayloadAction} from "@reduxjs/toolkit";

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

export default tipSlice;
