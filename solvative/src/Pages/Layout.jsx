import React, { createContext, useState, useContext } from 'react'
import SearchBar from '../Components/SearchBar'
import Table from '../Components/Table';
import '../Styles/Layout.css';
import Pagination from '../Components/Pagination';

const searchBarContext = createContext();

export default function Layout() {
    const [searchVal, setSearchVal] = useState('');

    return (
        <div className='p16 grid'>
            <searchBarContext.Provider value={{searchVal, setSearchVal}} className="grid">
                <section className='search-container flex'><SearchBar /></section>
                <section><Table /></section>
            </searchBarContext.Provider>
        </div>
    )
}

export const useSearchBarContext = () => {
    return useContext(searchBarContext);
};  