import React from 'react';

export default function Pagination ({ list, setCurrentLinkFn }) {

  return (
    <div className="pagination flex">

    {
        list.map((link, i) =>(
            <button
              key={`${i}_${link.rel}`}
              onClick={() => setCurrentLinkFn(link.href)} 
              className='capitalize'>
              {link.rel}
            </button>
        ))
    }
    
    </div>
  );
};

