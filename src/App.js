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

import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { setCurrentUser } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selectors';

class App extends React.Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser } = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      // Sets user either is authenticated or null
      setCurrentUser(userAuth);

      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        // With snapshot, the user is updated with the one saved in the database
        // So if user is updated somewhere else in the app, onSnapshot listens
        // to the changes and update current user data
        userRef.onSnapshot(snapShot => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
          });
        });
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route
            exact
            path='/'
            render={() =>
              this.props.currentUser ? (<HomePage />) : (<SignInAndSignUpPage />)
            }
          />
          <Route 
            path='/shop' 
            render={({ match }) => this.props.currentUser ? (<ShopPage match={match} />) : (<Redirect to='/' />)} 
          />
          <Route path='/contact' component={ContactPage} />
          <Route
            path='/checkout' 
            render={() =>
              this.props.currentUser ? (<CheckoutPage />) : (<Redirect to='/' />)
            }
          />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
