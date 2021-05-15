import React, { useEffect, useState } from 'react';
import instance from '../../../axios-orders';
import { useAuth } from '../../Authentication/AuthContext/AuthContext';
import ImageGrid from '../../Blogging/ImageGrid/ImageGrid';
import Modal from '../../Blogging/ImageGrid/Modal/Modal';
import Profile from '../Profile';
import { motion } from 'framer-motion';

export default function ProfileGallery() {
    const { currentUser } = useAuth();
    const [blogData, setBlogData] = useState([]);
    const [selectedImg, setSelectedImg] = useState(null);

    useEffect(async () => {
        await instance.get(`users/${currentUser.uid}/blogs.json`)
            .then(response => {
                console.log(response.data)
                let data = [];
                for (let key in response.data) {
                    data.push({
                        ...response.data[key],
                        id: key
                    })
                }
                setBlogData(data);
            })
            .catch(err => console.log(err));
    }, [])

    let image = [];
    if (blogData) {
        if (blogData.length > 0) {
            blogData.map(doc => {
                console.log(doc.images);
                let imageValues = Object.values(doc.images);
                console.log(imageValues);
                imageValues.map(img => {
                    image.push({
                        id: img.id,
                        url: img.imageUrl
                    });
                })
                console.log(image);
            })
            // image = blogData.map(doc => (
            //     <div className='img-wrap' key={doc.id}>

            //     </div>
            // ))
        }
    }
    console.log(selectedImg);


    const imgClicked = (img) => {
        setSelectedImg(img);
    }

    return (
        <div className='container'>
            <Profile />
            <div className='profile-content'>
                <div className='img-grid'>
                    {image.map(doc => (
                        <motion.div className='img-wrap' key={doc.id}
                            whileHover={{ opacity: 1 }}
                            onClick={() => setSelectedImg(doc.url)}>
                            <motion.img src={doc.url} alt='uploaded pic'
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.1 }}
                            />
                        </motion.div>
                        // <div className='img-wrap' key={doc.id}>
                        //     <img src={doc.url} onClick={() => imgClicked(doc.url)} />
                        // </div>
                    ))}
                    {selectedImg &&
                        <Modal selectedImg={selectedImg} setSelectedImg={setSelectedImg} />}
                </div>
            </div>
        </div >
    )
}