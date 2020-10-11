import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import './App.scss';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shoppage/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import CheckoutPage from './pages/checkout/checkout.component';
import ContactPage from './pages/contact/contact.component';

import { selectCurrentUser } from './redux/user/user.selectors';

const App = (props) => {
  const { currentUser } = props;
   
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

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

export default connect(mapStateToProps)(App);
