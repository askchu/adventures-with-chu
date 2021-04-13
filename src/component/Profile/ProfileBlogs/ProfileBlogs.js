import React, { useEffect, useState } from 'react';
import Profile from '../Profile';
import { Link } from 'react-router-dom';
import GetCount from '../../Blogging/Add/GetCount/GetCount';
import instance from '../../../axios-orders';
import { useAuth } from '../../Authentication/AuthContext/AuthContext';
import Aux from '../../../hoc/Auxilary/Auxilary';
import './ProfileBlogs.css';

export default function ProfileBlogs() {

    const [dropdown, setDropdown] = useState(false);
    const { currentUser } = useAuth();
    const [drafts, setDrafts] = useState([]);
    const [posts, setPosts] = useState([]);

    // const { data } = GrabDraftData;
    // console.log(data);

    // const onMouseClick = () => {
    //     if (window.innerWidth < 960) {
    //         setDropdown(false);
    //     } else {
    //         setDropdown(true);
    //     }
    // };

    // const onMouseLeave = () => {
    //     if (window.innerWidth < 960) {
    //         setDropdown(false);
    //     } else {
    //         setDropdown(false);
    //     }
    // };

    console.log(dropdown);
    const onMouseClick = () => {
        if (dropdown == true) {
            setDropdown(false);
        } else {
            setDropdown(true);
        }
        console.log(dropdown);
    }

    console.log(drafts);
    console.log(drafts.indexOf(2))


    const { info } = GetCount();
    console.log(info);


    const addCount = () => {
        console.log(info[0].count)
        console.log(info[0].name)
    }

    // console.log(count);

    console.log(drafts.length);


    let draftList = '';
    let draftTitle = '';

    // Grabs the draft ID into an array
    const indexOfDrafts = [];
    const idOfDrafts = drafts.map((el) => {
        indexOfDrafts.unshift(el.id)
    })

    draftList = (
        drafts.map((savedDraft) => {
            if (savedDraft.title == '') {
                // grabs the index in the array
                const count = indexOfDrafts.indexOf(savedDraft.id) + 1;
                draftTitle = (
                    <Link to='#'>
                        {/* prints out the number in the index */}
                        Draft #{count}
                    </Link>
                )
            } else {
                draftTitle = (
                    <Link to='#'>
                        {savedDraft.title}
                    </Link>
                )
            }
            return (
                <ul>
                    <li key={savedDraft.id}>
                        {draftTitle}
                    </li>
                </ul>

            )
        }
        ))



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
                <div className='mainTabs'>
                    <div className='newPost'>
                        <button>
                            <Link to='profile-blogs-new'>
                                <i className="fas fa-plus"></i>
                            </Link>
                        </button>
                    </div>
                    <div className='posts'>
                        <div>
                            <h3 onClick={onMouseClick}>Drafts ({drafts.length})</h3>
                            {dropdown && draftList}
                        </div>
                        <div><h3>Blogs ({posts.length})</h3></div>
                    </div>
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