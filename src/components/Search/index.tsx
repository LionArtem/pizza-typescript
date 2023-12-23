import React from "react";
import debounce from "lodash.debounce";

import style from "./Search.module.scss";

import Close from "../../assetc/img/close.svg";
import { setSearchValue, selectFilter } from "../../redax/slices/filterSlice";

import { useSelector, useDispatch } from "react-redux";

export default function Search() {
  const { searchValue } = useSelector(selectFilter);
  const dispatch = useDispatch();
  const [value, setValue] = React.useState("");
  const inputRef = React.useRef<HTMLInputElement>(null);

  const onClickClear = () => {
    dispatch(setSearchValue(""));
    inputRef.current?.focus();
  };

  const updateSearchValue = React.useCallback(
    debounce((str) => {
      dispatch(setSearchValue(str));
    }, 1000),
    []
  );

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    updateSearchValue(event.target.value);
  };

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
