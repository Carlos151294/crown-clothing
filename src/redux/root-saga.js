import { all, call, spawn } from 'redux-saga/effects';

import { userSagas } from './user/user.sagas';
import { shopSagas } from './shop/shop.sagas';
import { cartSagas } from './cart/cart.sagas';

export default function* rootSaga() {
    yield all([
        spawn(userSagas),
        call(shopSagas),
        spawn(cartSagas)
    ]);
}