import React, { useEffect, lazy, Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';

import Header from './components/header/header.component';
import Spinner from './components/spinner/spinner.component';
import ErrorBoundary from './components/error-boundary/error-boundary.component';

import { selectCurrentUser, selectUserLoading } from './redux/user/user.selectors';
import { checkUserSession } from './redux/user/user.actions';

import { GlobalStyle } from './global.styles';

const HomePage = lazy(() => import('./pages/homepage/homepage.component'));
const ShopPage = lazy(() => import('./pages/shoppage/shop.component'));
const SignInAndSignUpPage = lazy(() => import('./pages/sign-in-and-sign-up/sign-in-and-sign-up.component'));
const CheckoutPage = lazy(() => import('./pages/checkout/checkout.component'));
const ContactPage = lazy(() => import('./pages/contact/contact.component'));

const App = () => {
  const currentUser = useSelector(selectCurrentUser);
  const loading = useSelector(selectUserLoading)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserSession());
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <GlobalStyle />
      <Header />
      {loading &&
        <Spinner />
      }
      {!loading &&
        <Switch>
          <ErrorBoundary>
            <Suspense fallback={<Spinner />}>
              <Route
                exact
                path='/'
                render={() =>
                  currentUser ? (<HomePage />) : (<SignInAndSignUpPage />)
                }
                />
              <Route
                path='/shop'
                render={({ match }) => currentUser ? (<ShopPage match={match} />) : (<Redirect to='/' />)}
                />
              <Route path='/contact' component={ContactPage} />
              <Route
                path='/checkout'
                render={() =>
                  currentUser ? (<CheckoutPage />) : (<Redirect to='/' />)
                }
                />
            </Suspense>
          </ErrorBoundary>
        </Switch>
      }
    </div>
  );
}

export default App;
