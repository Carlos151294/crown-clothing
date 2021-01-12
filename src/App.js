import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shoppage/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import CheckoutPage from './pages/checkout/checkout.component';
import ContactPage from './pages/contact/contact.component';
import { SpinnerContainer, SpinnerOverlay } from './components/with-spinner/with-spinner.styles';
import { selectCurrentUser, selectUserLoading } from './redux/user/user.selectors';
import { checkUserSession } from './redux/user/user.actions';

import { GlobalStyle } from './global.styles';

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
        <SpinnerOverlay>
            <SpinnerContainer />
        </SpinnerOverlay>
      }
      {!loading &&
        <Switch>
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
        </Switch>
      }
    </div>
  );
}

export default App;
