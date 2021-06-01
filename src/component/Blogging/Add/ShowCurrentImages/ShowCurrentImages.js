import React, { useEffect, useState } from 'react'
import instance from '../../../../axios-orders'
import useFirestore from '../../../../hooks/useFirestore';
import { useAuth } from '../../../Authentication/AuthContext/AuthContext';
import { motion } from 'framer-motion';


export default function ShowCurrentImages({ data, setSelectedImg, setSelectedId, setSelectedDescription, imageDraft }) {


    const handleClick = (url, id, content) => {
        setSelectedImg(url);
        setSelectedId(id);
        setSelectedDescription(content)
        // console.log(id);
    }

    // console.log(imageDraft)
    let draftImages = []




    return (
        <div className='img-grid'>
            {data && data.map(doc => (
                // uses framer-motion npm
                <motion.div className='img-wrap' key={doc.id}
                    layout
                    whileHover={{ opacity: 1 }}
                    // onClick={() => setSelectedImg(doc.imageUrl)}
                    onClick={() => handleClick(doc.imageUrl, doc.id, doc.description)}
                >

                    <motion.img src={doc.imageUrl} alt='uploaded pic'
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    />

                </motion.div>
            ))
            }
        </div >
    )
}