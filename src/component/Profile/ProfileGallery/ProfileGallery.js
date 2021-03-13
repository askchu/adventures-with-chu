import React, { useState } from 'react';
import Profile from '../Profile';

export default function ProfileGallery() {
    return (
        <div className='container'>
            <Profile />
            <div className='containers'>
                <p>I am a gallery</p>
            </div>
        </div>
    )
}