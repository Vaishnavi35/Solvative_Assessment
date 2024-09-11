import React from 'react';
import { useSearchBarContext } from '../Pages/Layout';

export default function SearchBar() {

  const {setSearchVal} = useSearchBarContext();

  return (
    <div>
        <input type="text" placeholder='Search Places...' onChange={(e) => setSearchVal(e.target.value)} className='search-input'/>
    </div>
  )
}
