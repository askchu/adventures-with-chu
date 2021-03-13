import React, { useState } from 'react';
import Profile from '../Profile';

export default function SavedPosts() {
    return (
        <div className='container'>
            <Profile />
            <div className='containers'>
                <p>I am a saved post</p>
            </div>
        </div>
    )
}