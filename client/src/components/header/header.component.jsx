import React from 'react';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
import { selectCartHidden } from '../../redux/cart/cart.selectors';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { signOutStart } from '../../redux/user/user.actions';

import { ReactComponent as Logo } from '../../assets/crown.svg';

import {
  HeaderContainer,
  LogoContainer,
  OptionsContainer,
  OptionLink
} from './header.styles';

const Header = ({ currentUser, hidden }) => {
  const dispatch = useDispatch();

  const handleSignOut = () => {
    dispatch(signOutStart());
  };

  return (
    <HeaderContainer>
      <LogoContainer to='/'>
        <Logo />
      </LogoContainer>
      <OptionsContainer>
        {currentUser &&
          <OptionLink to='/shop'>
            SHOP
          </OptionLink>
        }
        <OptionLink to='/contact'>
          CONTACT
        </OptionLink>
        {currentUser ? (
          <OptionLink as='div' onClick={handleSignOut}>
            SIGN OUT
          </OptionLink>
        ) : (
            <OptionLink to='/'>
              SIGN IN
            </OptionLink>
          )}
        {currentUser && <CartIcon />}
      </OptionsContainer>
      {hidden ? null : <CartDropdown />}
    </HeaderContainer>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  hidden: selectCartHidden
});

export default connect(mapStateToProps)(Header);
