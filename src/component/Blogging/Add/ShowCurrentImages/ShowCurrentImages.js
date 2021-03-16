import React, { useEffect, useState } from 'react'
import instance from '../../../../axios-orders'
import useFirestore from '../../../../hooks/useFirestore';
import { useAuth } from '../../../Authentication/AuthContext/AuthContext';


export default function ShowCurrentImages({ data, setSelectedImg }) {

    return (
        <div className='img-grid'>
            {data && data.map(doc => (
                <div className='img-wrap' key={doc.id}
                    onClick={() => setSelectedImg(doc.imageUrl)}
                >
                    <img src={doc.imageUrl} alt='uploaded pic' />
                </div>
            ))}
        </div>
    )
}