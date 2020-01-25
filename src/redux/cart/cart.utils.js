export const addItemToCart = (cartItems, cartItemToAdd) => {
    const cartItemExists = cartItems.find(item => item.id === cartItemToAdd.id);

    // When item exists, increase quantity
    if (cartItemExists) {
        return cartItems
            .map(cartItem =>
                cartItem.id === cartItemToAdd.id ?
                { ...cartItem, quantity: cartItem.quantity + 1 } :
                cartItem
            );
    }

    // When item does NOT exists, create item with quantity equal to 1
    return [...cartItems, { ...cartItemToAdd, quantity: 1 }];
}

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
    // When it is the last item, remove from cart
    if (cartItemToRemove.quantity === 1) {
        return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id);
    }

    // When it is NOT the last item, decrease the quantity's item
    return cartItems
        .map(cartItem => cartItem.id === cartItemToRemove.id ?
            { ...cartItem, quantity: cartItem.quantity - 1 } :
            cartItem
        );
}