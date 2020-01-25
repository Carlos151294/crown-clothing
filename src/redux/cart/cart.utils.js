export const addItemToCart = (cartItems, cartItemToAdd) => {
    const cartItemExists = cartItems.find(item => item.id === cartItemToAdd.id);

    if (cartItemExists) {
        return cartItems
            .map(cartItem =>
                cartItem.id === cartItemToAdd.id ?
                { ...cartItem, quantity: cartItem.quantity + 1 } :
                cartItem
            );
    }

    return [...cartItems, { ...cartItemToAdd, quantity: 1 }];
}

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
    if (cartItemToRemove.quantity === 1) {
        return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id);
    }

    return cartItems
        .map(cartItem => cartItem.id === cartItemToRemove.id ?
            { ...cartItem, quantity: cartItem.quantity - 1 } :
            cartItem
        );
}