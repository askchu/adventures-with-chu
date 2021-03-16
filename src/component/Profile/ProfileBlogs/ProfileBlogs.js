import React, { useEffect, useState } from 'react';
import Profile from '../Profile';
import { Link } from 'react-router-dom';
import GetCount from '../../Blogging/Add/GetCount/GetCount';
import instance from '../../../axios-orders';
import { useAuth } from '../../Authentication/AuthContext/AuthContext';


export default function ProfileBlogs() {

    // const [count, setCount] = useState(1);
    const { currentUser } = useAuth();

    // FIXME: grab all data instead of each letter
    const { info } = GetCount();
    console.log(info);
    // console.log(count.count);

    const addCount = () => {
        console.log(info[0].count)
        console.log(info[0].name)

        // const newCount = {
        //     count: 2
        // }

        // instance.request({
        //     method: 'put',
        //     url: `/${currentUser.uid}/count/${info}.json`,
        //     data: newCount
        // }).then(response => {
        //     console.log(response);
        // })
        //     .catch(err => console.log(err));
    }

    // console.log(count);

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
                    <p onClick={addCount} style={{ fontSize: "1.5rem" }}>Create your first blog!</p>
                    <i class="fas fa-plus" style={{ marginBottom: '20px', fontSize: '1.2rem' }}></i>
                </Link>
            </div >
        )
    }




    // useEffect(async () => {
    //     await instance.get(`/${currentUser.uid}/count.json`)
    //         .then(response => {
    //             console.log(response.data)
    //             let res = []
    //             for (let key in response.data) {
    //                 res.push({
    //                     ...response.data[key],
    //                     id: key
    //                 })
    //             }
    //             setCount(res);
    //         })
    //         .catch(err => console.log(err));
    // }, [])

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