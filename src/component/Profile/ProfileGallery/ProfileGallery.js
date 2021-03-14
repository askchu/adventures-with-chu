import React, { useState } from 'react';
import ImageGrid from '../../Blogging/ImageGrid/ImageGrid';
import Modal from '../../Blogging/ImageGrid/Modal/Modal';
import Profile from '../Profile';

export default function ProfileGallery() {
    const [selectedImg, setSelectedImg] = useState(null);

    return (
        <div className='container'>
            <Profile />
            <div className='profile-content'>
                <ImageGrid setSelectedImg={setSelectedImg} />
                {selectedImg &&
                    <Modal selectedImg={selectedImg} setSelectedImg={setSelectedImg} />}
            </div>
        </div>
    )
}