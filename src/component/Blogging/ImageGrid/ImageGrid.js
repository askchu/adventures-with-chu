import React from 'react'
import useFirestore from '../../../hooks/useFirestore';
import './ImageGrid.css';
import { useAuth } from '../../Authentication/AuthContext/AuthContext';
import { motion } from 'framer-motion';

export default function ImageGrid({ setSelectedImg }) {
    const { currentUser } = useAuth();
    const id = currentUser.uid
    // const { docs } = useFirestore('images')
    const { docs } = useFirestore(id)
    // console.log(docs);

    return (
        <div className='img-grid'>
            {docs && docs.map(doc => (
                <motion.div className='img-wrap' key={doc.id}
                    whileHover={{ opacity: 1 }}
                    onClick={() => setSelectedImg(doc.url)}>
                    <motion.img src={doc.url} alt='uploaded pic'
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.1 }}
                    />
                </motion.div>
            ))
            }
        </div >
    )
}
