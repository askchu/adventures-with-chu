import React, { useEffect, useState } from 'react';
import instance from '../../../axios-orders';
import { useAuth } from '../../Authentication/AuthContext/AuthContext';
import ImageGrid from '../../Blogging/ImageGrid/ImageGrid';
import Modal from '../../Blogging/ImageGrid/Modal/Modal';
import Profile from '../Profile';
import { motion } from 'framer-motion';
import Footer from '../../Navigation/Footer/Footer';
import { Link } from 'react-router-dom';


export default function ProfileGallery() {
    const { currentUser } = useAuth();
    const [blogData, setBlogData] = useState([]);
    const [selectedImg, setSelectedImg] = useState(null);

    useEffect(async () => {
        await instance.get(`users/${currentUser.uid}/blogs.json`)
            .then(response => {
                // console.log(response.data)
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
    let showImages = <div></div>;
    // console.log(blogData);
    if (blogData) {
        const blogLength = Object.keys(blogData);
        if (blogLength.length > 0) {
            blogData.map(doc => {
                if (doc.images) {
                    // console.log(doc.images);
                    let imageValues = Object.values(doc.images);
                    // console.log(imageValues);
                    imageValues.map(img => {
                        image.push({
                            id: img.id,
                            url: img.imageUrl
                        });
                    })
                    // console.log(image);
                }

            })
            showImages = image.map(doc => (
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
    }
    // console.log(selectedImg);


    const imgClicked = (img) => {
        setSelectedImg(img);
    }

    return (
        <div className='home'>

            <div className='profile'>
                <Profile />
                <main>
                    <div className='userContent'>
                        <div className='tags'>
                            <p>
                                <Link to='profile-blogs'><i className="fas fa-scroll"></i>Blogs</Link>
                            </p>
                            <p>
                                <Link to='profile-gallery'><i className="far fa-image"></i>Gallery</Link>
                            </p>
                        </div>
                    </div>
                </main>
                <div className='profile-content'>
                    <div className='img-grid'>
                        {/* {image.map(doc => (
                            <motion.div className='img-wrap' key={doc.id}
                                whileHover={{ opacity: 1 }}
                                onClick={() => setSelectedImg(doc.url)}>
                                <motion.img src={doc.url} alt='uploaded pic'
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.1 }}
                                />
                            </motion.div>

                        ))} */}
                        {showImages}
                        {selectedImg &&
                            <Modal selectedImg={selectedImg} setSelectedImg={setSelectedImg} />}
                    </div>
                </div>
            </div >
            <Footer />
        </div>

    )
}