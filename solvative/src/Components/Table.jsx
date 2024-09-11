import React, { useContext, useEffect, useState } from 'react'
import { useSearchBarContext } from '../Pages/Layout';
import axios from 'axios';
import Pagination from './Pagination';
import { useDebounce } from '../CustomHooks/useDebounce';

export default function Table() {

const {searchVal} = useSearchBarContext();
const [cityData, setCityData] = useState([]);
const [loading, setLoading] = useState(false);
const [itemsPerPage, setItemsPerPage] = useState(5);
const [paginationLinkList, setPaginationLinkList] = useState([]);
const [currentpaginationLink, setCurrentPaginationLink] = useState(`/v1/geo/cities?offset=0&limit=5&namePrefix=''`);
const [offset, setOffset] = useState(0);
const debouncedSearchValue = useDebounce(searchVal, 500);
const debouncedItemsPerPage = useDebounce(itemsPerPage, 500);
const [limitError, setlimitError] = useState(false);

useEffect(() => {
    console.log('searchval', searchVal);
   
    if(searchVal.length > 0){
        fetchData('search');
    }else{
        setCityData([]);
    }
 },[debouncedSearchValue]);

 useEffect(() => {
    fetchData('pagination');
 },[currentpaginationLink]);

 useEffect(() => {
    if(debouncedItemsPerPage <= 10){
        fetchData('itemsPerPage');
        setlimitError(false);
    }else{
        setlimitError(true);
    }
    
 },[debouncedItemsPerPage]);


 const fetchData = async(from) => {
    setLoading(true);
    let url;
    if(from == 'search'){
        url = `/v1/geo/cities?offset=0&limit=5&namePrefix=${searchVal}`
    }else if(from === 'itemsPerPage'){
        url = `/v1/geo/cities?offset=0&limit=${itemsPerPage}&namePrefix=${searchVal}`;
    }else{
        url = currentpaginationLink;
    }
    const options = {
        method: 'GET',
        url: `https://wft-geo-db.p.rapidapi.com${url}`,
        headers: {
            'x-rapidapi-key': '9a8c42f994msh73af891e19917d0p15ea3djsnb1d771944446',
            'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com'
        },
    };
    
    try {
        const response = await axios.request(options);
        console.log(response.data);
        setCityData(response.data.data);
        setPaginationLinkList(response.data.links);
        setOffset(response.data.metadata.currentOffset);
    } catch (error) {
        console.error(error);
    }finally{
        setLoading(false);
    }
}

  const searchResultRender = () => {
    if (searchVal.length === 0 || searchVal === undefined || searchVal === null) {
        return <tr>Start searching</tr>;
    } else {
        if(cityData.length > 0){

            return cityData.map((city, index) => (
                <tr key={`${index}_${city.id}`}>
                    <td>{offset + index + 1}</td>
                    <td>{city.name}</td>
                    <td className='per-page-container flex'>
                    <img src={`https://flagsapi.com/${city.countryCode}/shiny/16.png`} />
                    {city.country}</td>
                </tr>
            ));

        }else{
            return <tr>No result found</tr>
        }
        
    }
};

    if(loading){
        return <div className="spinner"></div>
    }

  return (
    <div className='grid'>
        <div className='flex per-page-container'>
            <label htmlFor="">Items per Page</label>
            <input type="number" value={itemsPerPage} placeholder='Items per page' onChange={(e) => setItemsPerPage(e.target.value)} min={5} max={10}/>
        </div>
        {limitError && <small className="error">Please select a value between 1 and 10 for items per page.</small>}
        <table>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Place Name</th>
                    <th>Country</th>
                </tr>
                
            </thead>
            <tbody>
                {searchResultRender()}
            </tbody>
        </table>
        {
            paginationLinkList?.length > 0 && <Pagination list={paginationLinkList} setCurrentLinkFn={setCurrentPaginationLink} />
        }
        
    </div>
  )
}
