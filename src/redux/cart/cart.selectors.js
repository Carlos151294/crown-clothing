import { createSelector } from 'reselect';

// Input selector
const selectCart = state => state.cart;

export const selectCartItems = createSelector(
    [selectCart],
    (cart) => cart.cartItems
);

export const selectCartItemsCount = createSelector(
    [selectCartItems],
    cartItems => cartItems.reduce((accumulator, cartItem) => accumulator + cartItem.quantity, 0)
);