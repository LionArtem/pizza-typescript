import React from 'react';

import { useNavigate, Link } from 'react-router-dom';

// import axios from 'axios';
import qs from 'qs';

import { useSelector, useDispatch } from 'react-redux';
import {
  selectFilter,
  setCategoryId,
  setCurrentPage,
  setFilters,
} from '../redax/slices/filterSlice';
import { fetchPizzas, selectPizzeData } from '../redax/slices/pizzaSlice';

import Categories from '.././components/Categories';
import { Sort, list } from '.././components/Sort';
import PizzaBlock from '.././components/pizzablock';
import MyLoader from '.././components/pizzablock/sceleton'; //скелетон
import Pagination from '../components/Pagination';
// import pizzas from '.././assetc/pizze.json';

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const { categoryId, sort, currentPage, searchValue } =
    useSelector(selectFilter);

  const { items, status } = useSelector(selectPizzeData);
  //const [items, setItems] = React.useState([]);
  // const [isLoading, setIsLoading] = React.useState(true);

  const onClickCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };

  const getPizzas = async () => {
    const order = sort.sort.includes('-') ? 'asc' : 'desc';
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';

    dispatch(
      fetchPizzas({
        sort,
        order,
        category,
        search,
        currentPage,
      })
    );
    window.scrollTo(0, 0);
  };

  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sort,
        categoryId,
        currentPage,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sort, currentPage]);

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = list.find((obj) => obj.sort === params.sortProperty);
      dispatch(
        setFilters({
          ...params,
          sort,
        })
      );
      isSearch.current = true;
    }
  }, []);

  React.useEffect(() => {
    if (!isSearch.current) {
      getPizzas();
    }
    isSearch.current = false;
  }, [categoryId, sort, searchValue, currentPage]);

  const pizzas = items
    // .filter((obj) => {
    //   if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
    //     return true;
    //   }
    //   return false;
    // })
    .map((obj, i) => (
      <Link key={obj.id} to={`/pizza/${obj.id}`}>
        <PizzaBlock {...obj} />
      </Link>
    ));

  return (
    <>
      <div className="content__top">
        <Categories onClickCategory={onClickCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === 'error' ? (
        <div>
          <p>error</p>
        </div>
      ) : (
        <div className="content__items">
          {/* {pizzas.map((obj, i) => (
          <PizzaBlock {...obj} key={obj.id} />
        ))} */}
          {status === 'loading'
            ? [...new Array(6)].map((_, i) => <MyLoader key={i} />)
            : pizzas}
        </div>
      )}
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </>
  );
};

export default Home;
