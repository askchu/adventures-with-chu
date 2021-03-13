import React, { useState } from 'react';
import Profile from '../Profile';
import { Link } from 'react-router-dom';

export default function ProfileBlogs() {

    let blog = [];
    if (blog.length === 0) {
        blog = (
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignContent: 'center',
                textAlign: 'center',
                width: '100%',
                maxWidth: '300px',
                margin: '40px auto',
                padding: '10px',
                border: '1px solid #111',
                boxShadow: '2px 2px 2px #1115'
            }
            }>
                <Link to='profile-blogs-new'>
                    <p style={{ fontSize: "1.5rem" }}>Create your first blog!</p>
                    <i class="fas fa-plus" style={{ marginBottom: '20px', fontSize: '1.2rem' }}></i>
                </Link>
            </div >
        )
    }
    return (
        <div>
            <Profile />
            <div className='containers'>
                {/* <div className='newPost'>
                    <button>
                        <Link to='profile-blogs-new'>
                            New Blog <i class="fas fa-plus"></i>
                        </Link>
                    </button>
                </div> */}
                {blog}
            </div>
        </div>
    )
}