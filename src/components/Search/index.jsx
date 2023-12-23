import React, { useContext } from 'react';
import debounce from 'lodash.debounce';

import style from './Search.module.scss';

import Close from '../../assetc/img/close.svg';
import { setSearchValue, selectFilter } from '../../redax/slices/filterSlice';

import { useSelector, useDispatch } from 'react-redux';

export default function Search() {
  const { searchValue } = useSelector(selectFilter);
  const dispatch = useDispatch();
  const [value, setValue] = React.useState('');
  const inputRef = React.useRef();

  const onClickClear = () => {
    dispatch(setSearchValue(''));
    // document.querySelector('input').focus();
    inputRef.current.focus();
  };

  const updateSearchValue = React.useCallback(
    debounce((str) => {
      dispatch(setSearchValue(str));
    }, 1000),
    []
  );

  const onChangeInput = (event) => {
    setValue(event.target.value);
    updateSearchValue(event.target.value);
  };

  React.useEffect(() => {
    //console.log(document.querySelector('input'));
    document.querySelector('input');
  }, []);

  return (
    <div className={style.contener}>
      <input
        ref={inputRef}
        value={value}
        onChange={onChangeInput}
        className={style.root}
        placeholder="Поиск пиццы.."
      />
      {searchValue && <img onClick={onClickClear} src={Close} alt="крестик" />}
    </div>
  );
}
