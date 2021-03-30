import React, { useEffect, useState } from 'react';
import Profile from '../Profile';
import { Link } from 'react-router-dom';
import GetCount from '../../Blogging/Add/GetCount/GetCount';
import instance from '../../../axios-orders';
import { useAuth } from '../../Authentication/AuthContext/AuthContext';
import Posts from '../../Blogging/Posts/Posts';
import Aux from '../../../hoc/Auxilary/Auxilary';


export default function ProfileBlogs() {

    // const [count, setCount] = useState(1);
    const { currentUser } = useAuth();
    const [drafts, setDrafts] = useState([]);
    const [posts, setPosts] = useState([]);

    console.log(drafts);


    const { info } = GetCount();
    console.log(info);
    // console.log(count.count);

    const addCount = () => {
        console.log(info[0].count)
        console.log(info[0].name)
    }

    // console.log(count);

    console.log(drafts.length);

    let createBlog = [];
    if (drafts.length === 0) {
        createBlog = (
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
                    <p onClick={addCount} style={{ fontSize: "1.5rem" }}>Create your first blog!</p>
                    <i className="fas fa-plus" style={{ marginBottom: '20px', fontSize: '1.2rem' }}></i>
                </Link>
            </div >
        )
    } else {
        createBlog = (
            <Aux>
                <div className='newPost'>
                    <button>
                        <Link to='profile-blogs-new'>
                            <i class="fas fa-plus"></i>
                        </Link>
                    </button>
                </div>
                <div className='blogs'>
                    <div><h3>Drafts ({drafts.length})</h3></div>
                    <div><h3>Blogs ({posts.length})</h3></div>
                </div>
            </Aux>
        )
    }

    useEffect(async (info) => {
        await instance.get(`/${currentUser.uid}/drafts.json`)
            .then(response => {
                console.log(response.data)
                const results = [];
                for (let key in response.data) {
                    results.unshift({
                        ...response.data[key],
                        id: key
                        // title: key.title,
                        // description: key.description,
                        // imageUrl: key.imageUrl
                    })
                }
                setDrafts(results);
            })
            .catch(err => console.log(err));
    }, [info])

    return (
        <div>
            <Profile />
            <div className='containers'>
                {createBlog}
            </div>
        </div>
    )
}