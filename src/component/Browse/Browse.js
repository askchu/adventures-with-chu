import React from 'react'
import './Browse.css';

export default function Browse() {
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
