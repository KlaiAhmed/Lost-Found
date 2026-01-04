import style from './items.module.css';
import ItemCard from '../../components/itemCards/itemCard';
import axios from 'axios';
import { useState,useEffect } from 'react';

const ItemsPage = () => {

  const [data, setData] = useState({ items: [] });

  const fetchItems =  async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/items`);
      setData(response.data);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <>
        <div className={style.container}>
            <div className={style.header}>
              <h1>Lost Something ?</h1>
              <h3>({data.items.length} items found)</h3>
            </div>

            <div className={style.gridContainer}>
                  {data.items.length > 0 ? 
                    <div className={style.itemsGrid}>
                      {data.items.map((item) => (
                          <ItemCard item={item} key={item._id} />
                      ))}
                    </div>
                    : 
                    <p>No items found. Be the first to add one!</p>
                  }
            </div>
        </div>
    </>
  );
}

export default ItemsPage;