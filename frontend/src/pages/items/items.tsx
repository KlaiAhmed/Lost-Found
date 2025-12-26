import style from './items.module.css';
import ItemCard from '../../components/itemCards/itemCard';

const ItemsPage = () => {
  return (
    <>
        <div className={style.container}>
            <h1>Items Page</h1>
            <p>This is the items page content.</p>

            <ItemCard />
        </div>
    </>
  );
}

export default ItemsPage;