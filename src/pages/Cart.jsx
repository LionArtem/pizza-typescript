import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearItem } from '../redax/slices/cartSlice';

import { Link } from 'react-router-dom';

import cart from '../assetc/img/cart.svg';
import trash from '../assetc/img/trash.svg';
import grey from '../assetc/img/grey-arrow-left.svg';
import CartItem from '../components/CartItem';
import CartEmpty from '../components/CartEmpty';
import { selectCart } from '../redax/slices/cartSlice';

function Cart() {
  const dispatch = useDispatch();
  const { items, totalPrice } = useSelector(selectCart);

  const totalCount = items.reduce((sum, item) => sum + item.count, 0);

  const onClickClear = () => {
    if (window.confirm('Вы действительно хотите очистить карзину?'))
      dispatch(clearItem());
  };

  if (!totalPrice) {
    return <CartEmpty />;
  }

  return (
    <div className="cart">
      <div className="cart__top">
        <h2 className="content__title">
          <img width="38" src={cart} alt="cart" />
          Корзина
        </h2>
        <div onClick={onClickClear} className="cart__clear">
          <img width="25" src={trash} alt="cart" />
          <span>Очистить корзину</span>
        </div>
      </div>

      <div className="cart__item-remove">
        {items.map((item) => (
          <CartItem key={item.id} {...item} />
        ))}
      </div>

      <div className="cart__bottom">
        <div className="cart__bottom-details">
          <span>
            Всего пицц: <b>{totalCount} шт.</b>
          </span>
          <span>
            Сумма заказа: <b>{totalPrice} руб.</b>
          </span>
        </div>
        <div className="cart__bottom-buttons">
          <Link
            to="/"
            className="button button--outline button--add go-back-btn"
          >
            <img width="15" src={grey} alt="cart" />
            <span>Вернуться назад</span>
          </Link>
          <div className="button pay-btn">
            <span>Оплатить сейчас</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
