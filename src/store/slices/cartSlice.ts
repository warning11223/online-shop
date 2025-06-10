import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ICartItem {
    id: number;
    title: string;
    quantity: number;
    price: number;
}

interface CartState {
    items: ICartItem[];
    phoneNumber: string;
}

const initialState: CartState = {
    items: [],
    phoneNumber: '',
};

const cartSlice = createSlice({
    name: 'cartSlice',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<ICartItem>) => {
            const existingItem = state.items.find(item => item.id === action.payload.id);

            if (existingItem) {
                existingItem.quantity += action.payload.quantity;
            } else {
                state.items.push(action.payload);
            }
        },
        updateCartItemQuantity: (state, action: PayloadAction<{ id: number, quantity: number }>) => {
            const item = state.items.find(item => item.id === action.payload.id);
            if (item) {
                item.quantity = action.payload.quantity;
            }
        },
        clearCart: (state) => {
            state.items = [];
        },
        setPhoneNumber: (state, action: PayloadAction<string>) => {
            state.phoneNumber = action.payload;
        },
    },
});

export const { addToCart, clearCart, updateCartItemQuantity, setPhoneNumber } = cartSlice.actions;

export default cartSlice.reducer;
