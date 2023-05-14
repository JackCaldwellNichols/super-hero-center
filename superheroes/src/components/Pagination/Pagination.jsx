import React from 'react'
import './pagination.scss'

const Pages = ({perPageNumber, total, paginate}) => {

const pageNumbers = []

for(let i = 1; i<= Math.ceil(total / perPageNumber); i++){
    pageNumbers.push(i)
}

  return (
    <>
    <ul className='list'>
      {pageNumbers.map(number => (
        <li key={number} className='pageNum'>
            <a onClick={() => paginate(number)}>
                {number}
            </a>
        </li>
      ))}
    </ul>
    </>
  )
}

export default Pages
