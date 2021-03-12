import React from 'react'
import './Browse.css';



export default function Browse() {
    const token = process.env.GNEWS;
    console.log(token);

    if (process.env.NODE_ENV === 'development') {
        console.log('dev mode' + process.env.REACT_APP_DEV_MODE);
    }
    // { process.env.NODE_ENV === 'development' ? process.env.REACT_APP_DEV_MODE : process.env.REACT_APP_GNEWS }

    return (
        <div className="home">
            <div className='search containers'>
                <form className='browseForm'>
                    <div className='browseInput'>
                        <label>Browse</label>
                        <input type='text' />
                    </div>
                    <button type='submit'>Search</button>
                </form>
            </div>
        </div>
    )
}
