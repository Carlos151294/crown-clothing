import { takeLatest, put, all, call } from 'redux-saga/effects';

import UserActionTypes from './user.types';

import { signInSuccess, signInFailure, signOutSuccess, signOutFailure, loadingUserData, signUpSuccess, signUpFailure } from './user.actions';

import { auth, googleProvider, createUserProfileDocument, getCurrentUser } from '../../firebase/firebase.utils';

export function* getSnapshotFromUserAuth(user) {
    try {
        // User saved in firestore
        const userRef = yield call(createUserProfileDocument, user);
        const userSnapshot = yield userRef.get();

        yield put(signInSuccess({
            id: userSnapshot.id,
            ...userSnapshot.data()
        }));
    } catch (error) {
        yield put(signInFailure(error))
    }
}

export function* signInWithGoogle() {
    try {
        yield put(loadingUserData());
        const { user } = yield auth.signInWithPopup(googleProvider);
        yield getSnapshotFromUserAuth(user);
    } catch (error) {
        yield put(signInFailure(error))
    }
}

export function* signInWithEmail({ payload: { email, password } }) {
    try {
        yield put(loadingUserData());
        const { user } = yield auth.signInWithEmailAndPassword(email, password);
        yield getSnapshotFromUserAuth(user);
    } catch (error) {
        yield put(signInFailure(error));
    }
}

export function* isUserAuthenticated() {
    try {
        const userAuth = yield getCurrentUser();
        if (!userAuth) {
            yield put(signInFailure('User is not authenticated'));
            return;
        };
        yield getSnapshotFromUserAuth(userAuth);
    } catch (error) {
        yield put(signInFailure(error));
    }
}

export function* signOut() {
    try {
        yield put(loadingUserData());
        yield auth.signOut();
        yield put(signOutSuccess());
    } catch (error) {
        yield put(signOutFailure(error));
    }
}

export function* signUp({ payload: { displayName, email, password } }) {
    try {
        // User credentials added for authentication
        const { user } = yield auth.createUserWithEmailAndPassword(email, password);
        const userData = { ...user, displayName };
        console.log(userData);
        yield put(signUpSuccess(userData));
    } catch (error) {
        yield put(signUpFailure(error));
    }
}

export function* signInAfterSignUp({ payload }) {
    yield getSnapshotFromUserAuth(payload);
}

export function* onGoogleSignInStart() {
    yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle)
}

export function* onEmailSignInStart() {
    yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail)
}

export function* onCheckUserSession() {
    yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* onSignOutStart() {
    yield takeLatest(UserActionTypes.SIGN_OUT_START, signOut);
}

export function* onSignUpStart() {
    yield takeLatest(UserActionTypes.SIGN_UP_START, signUp);
}

export function* onSignUpSuccess() {
    yield takeLatest(UserActionTypes.SIGN_UP_SUCCESS, signInAfterSignUp);
}

export function* userSagas() {
    yield all([
        call(onGoogleSignInStart),
        call(onEmailSignInStart),
        call(onCheckUserSession),
        call(onSignOutStart),
        call(onSignUpStart),
        takeLatest(UserActionTypes.SIGN_UP_SUCCESS, signInAfterSignUp)
    ]);
}