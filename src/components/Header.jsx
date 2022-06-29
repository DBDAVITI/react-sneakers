import React from 'react';
import {Link} from 'react-router-dom';
import AppContext from '../AppContext';


function Header (props) {
    const {cartItems} = React.useContext(AppContext)
    const totalPrice = cartItems.reduce((sum , obj) => obj.price + sum , 0)

    return (
        <header className='d-flex justify-between align-center p-30' >
            <Link className='header-logo' to='/'>
        <div className='headerLeft d-flex'>
              <img width={40} height={40} src='/img/logo.png' alt="#" />
              <div>
                   <h3>REACT SNEAKERS</h3>
                   <p>Магазин лучших кроссовок</p>
              </div>
        </div>
            </Link>
              <ul className='headerRight'>
                  <li className="cu-p" onClick={props.onClickCart} >
                    <img className='mr-10' width={18} height={18} src='/img/cart.svg' alt='#' />
                    <span><b>{totalPrice}USD</b></span>
                  </li>
                  <Link to='/favorites'>
                  <li className="favorites" >
                      <img  src='/img/favorites.svg' alt='#' />
                  </li>
                  </Link>
                  <Link to='/orders'>
                  <li>
                      <img className='ml-10' src='/img/user.svg' alt='#' />
                  </li>
                  </Link>
              </ul>
        
    </header>
    )
}
export default Header ;