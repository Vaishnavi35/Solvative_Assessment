import React, {useEffect, useRef} from 'react';
import { useSearchBarContext } from '../Pages/Layout';

export default function SearchBar() {

  const {setSearchVal} = useSearchBarContext();
  const searchRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key === '/') {
        event.preventDefault();
        if (searchRef.current) {
          searchRef.current.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div>
        <input type="text" ref={searchRef} placeholder='Search Places...' onChange={(e) => setSearchVal(e.target.value)} className='search-input'/>
    </div>
  )
}
