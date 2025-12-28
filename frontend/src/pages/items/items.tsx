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
      console.log('Fetched items:', response.data);
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
              <div className={style.itemsGrid}>
                  {data.items.length > 0 ? 
                    data.items.map((item) => (
                        <ItemCard item={item} key={item._id} />
                    )) 
                    : 
                    <p>No items found.</p>
                  }
              </div>
            </div>
        </div>
    </>
  );
}

export default ItemsPage;