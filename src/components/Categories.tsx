import { useSelector } from 'react-redux';
import { selectFilter } from '../redax/slices/filterSlice';
import { selectPizzeData } from '../redax/slices/pizzaSlice';

type CategoriesProps = {
  onClickCategory: any;
};

const Categories: React.FC<CategoriesProps> = ({ onClickCategory }) => {
  const { categoryId } = useSelector(selectFilter);
  const { status } = useSelector(selectPizzeData);

  const categories = [
    'Все',
    'Мясные',
    'Вегетарианская',
    'Гриль',
    'Острые',
    'Закрытые',
  ];

  return (
    <div className="categories">
      <ul>
        {categories.map((values, i) => (
          <li
            key={i}
            onClick={() => onClickCategory(i)}
            className={
              categoryId === i ? (status === 'loading' ? '' : 'active') : ''
            }
          >
            {values}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
