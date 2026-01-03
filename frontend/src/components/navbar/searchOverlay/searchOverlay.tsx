import { useEffect, useRef } from 'react';
import style from'./searchOverlay.module.css';
import { Link } from 'react-router-dom';
import Icons from '../../../utils/getIcon';
import logo from '../../../assets/logo.png';
import { motion, scale } from 'framer-motion';
import useIsMobile from '../../../hooks/useIsMobile';

type SearchOverlayProps = {
    searchTerm: string;
    setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
    onClose: () => void;
};

const Search_overlay = ({ onClose,searchTerm,setSearchTerm }:SearchOverlayProps) => {
  const searchRef = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  
  useEffect(() => {
    if (input.current) {
      input.current.focus();
    }
  }, []);

  useEffect(() => {
    const handler = (e:MouseEvent) => {
      const target = e.target as Node;
      if (searchRef.current && !searchRef.current.contains(target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handler);

    return () => document.removeEventListener('mousedown', handler);
  }, [onClose, input, searchRef]);

  return (
    <motion.div className={style.searchContainer} ref={searchRef}
      initial={{ scaleY: 0.3, y: '-10vh', opacity: 0 }}
      animate={{ scaleY: 1 , y:0, opacity: 1 }}
      exit={{ scaleY: 0.3, y: '-10vh', opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
        
      <div className={style.firstRow}>
        
        {!useIsMobile() &&(<img src={logo} alt="logo" className={style.logoSearch}/>)}

        <motion.form 
        initial={{ scaleX: 0.3, x:'+25vw' }}
        animate={{ scaleX: 1 , x:0 }}
        transition={{ delay:0.1, duration: 0.1 }}  
        className={style.searchBarContainer} onSubmit={handleSubmit}>

          <Icons name='search' className={style.searchIcon}/>

          <motion.input type="text" placeholder="Search" ref={input} value={searchTerm} onChange={(e)=>{setSearchTerm(e.target.value)}} />

          <Icons name='close' className={style.clear_search} onPointerDown={()=> {setSearchTerm('')}}/>

        </motion.form>

        <button onClick={onClose}>Cancel</button>
      </div>

      <h4>Popular Search Terms</h4>

      {/* Placeholder until api integration */}
      <motion.div 
      initial={{ x: '25%', opacity: 0 }}
      animate={{ x: 0 , opacity: 1 }} 
      transition={{ duration: 0.2, delay: 0.1 }}
      className={style.popular_searches}>
        <Link to="/" className={style.term}>watch</Link>
        <Link to="/" className={style.term}>casquette</Link>
        <Link to="/" className={style.term}>Bonnet</Link>
        <Link to="/" className={style.term}>sac a main</Link>
        <Link to="/" className={style.term}>sunglasses</Link>
        <Link to="/" className={style.term}>bracelet</Link>
        <Link to="/" className={style.term}>bracelet</Link>
      </motion.div>

    </motion.div>
  );
};

export default Search_overlay;