import React from 'react'
import useFirestore from '../../../hooks/useFirestore';
import './ImageGrid.css';
import { useAuth } from '../../Authentication/AuthContext/AuthContext';

export default function ImageGrid({ setSelectedImg }) {
    const { currentUser } = useAuth();
    const id = currentUser.uid
    // const { docs } = useFirestore('images')
    const { docs } = useFirestore(id)
    console.log(docs);

    return (
        <div className='img-grid'>
            {docs && docs.map(doc => (
                <div className='img-wrap' key={doc.id}
                    onClick={() => setSelectedImg(doc.url)}>
                    <img src={doc.url} alt='uploaded pic' />
                </div>
            ))}
        </div>
    )
}
