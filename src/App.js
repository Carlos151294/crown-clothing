import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import './App.scss';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shoppage/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import CheckoutPage from './pages/checkout/checkout.component';
import ContactPage from './pages/contact/contact.component';

import { selectCurrentUser } from './redux/user/user.selectors';
import { useSelector } from 'react-redux';

const App = () => {
  const currentUser = useSelector(selectCurrentUser);
   
  return (
    <div>
      <Header />
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
    </div>
  );
}

export default App;
