import React from 'react'

export default function Error(props) {
    return (
        <div className='error'>
            <h4>{props.message}</h4>
        </div>
    )
}
