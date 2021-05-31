import React, { useEffect, useState } from 'react';
import Profile from '../Profile';
import { Link } from 'react-router-dom';
import GetCount from '../../Blogging/Add/GetCount/GetCount';
import instance from '../../../axios-orders';
import { useAuth } from '../../Authentication/AuthContext/AuthContext';
import Aux from '../../../hoc/Auxilary/Auxilary';
import './ProfileBlogs.css';
import ShowNews from '../../../containers/Home/News/ShowNews/ShowNews';
import Footer from '../../Navigation/Footer/Footer';

export default function ProfileBlogs() {

    const [dropdown, setDropdown] = useState(false);
    const { currentUser } = useAuth();
    const [drafts, setDrafts] = useState([]);
    const [posts, setPosts] = useState([]);
    const [profile, setProfile] = useState([]);

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
    // console.log(drafts.indexOf(2))


    // Grabs count data
    const { info } = GetCount();


    const addCount = () => {
        // console.log(info[0].count)
        // console.log(info[0].name)
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


    // const searchIndex = search(selectedId, imageDraft)
    // console.log(searchIndex);

    // console.log(drafts[0].content[drafts[0].id]);
    // const results = drafts[0].content[drafts[0].id]
    // console.log(results);

    let result = drafts.includes('title')
    // console.table(drafts[0]);


    const [blogData, setBlogData] = useState([]);
    console.log(blogData);

    draftList = (
        drafts.map((savedDraft) => {
            // Grabs the content object array
            // let contentObjectKey = savedDraft.content[savedDraft.id];
            let contentObjectKey = savedDraft.content;

            let contentKey = '';
            // Grabs the key object
            if (savedDraft.content) {
                contentKey = Object.keys(contentObjectKey);
            }
            console.log(contentKey)

            // Grabs the title value in the key object
            // console.log(contentObjectKey[contentKey].title)






            const link = `/profile-blogs/${savedDraft.id}/edit`
            if (savedDraft.content) {
                if (contentObjectKey[contentKey].title == '') {
                    // grabs the index in the array
                    const count = indexOfDrafts.indexOf(savedDraft.id) + 1;
                    draftTitle = (
                        <Link to={link}>
                            {/* prints out the number in the index */}
                        Draft #{count}
                        </Link>
                    )
                } else {
                    draftTitle = (
                        <Link to={link}>
                            {contentObjectKey[contentKey].title}
                        </Link>
                    )
                }
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

    console.log(blogData);

    const eachBlog = (
        blogData.map((el) => {
            let contentObjectKey = el.content;

            let contentKey = '';
            // Grabs the key object
            if (el.content) {
                contentKey = Object.keys(contentObjectKey);
            }
            // console.log(contentKey)
            // console.log(el);
            console.log(contentObjectKey[contentKey].title)

            let imageObjectKey = '';
            let imageKey = '';
            let imageUrl = '';
            console.log(el.images);

            if (el.images) {
                // imageObjectKey = el.images;
                // console.log(imageObjectKey);
                // imageKey = Object.keys(imageObjectKey);
                // console.log(imageKey);
                // imageUrl = imageObjectKey[imageKey].imageUrl;
                for (let i = 0; i < 1; i++) {
                    imageObjectKey = el.images;
                    console.log(imageObjectKey);
                    imageKey = Object.keys(imageObjectKey);
                    console.log(imageKey);
                    console.log(imageKey[i]);
                    // imageUrl = imageObjectKey[imageKey].imageUrl;
                    console.log(imageObjectKey[imageKey[i]].imageUrl);
                    imageUrl = imageObjectKey[imageKey[i]].imageUrl;
                }

            }


            console.log(imageKey);

            let blogPost = ''

            let link = `/profile/blogs/${el.id}`;

            if (!el.images) {
                blogPost = (

                    <Link to={link}>
                        <div className='card'>
                            {/* <ShowNews
                            key={el.id}
                            title={contentObjectKey[contentKey].title}
                            content={contentObjectKey[contentKey].content}
                            description={contentObjectKey[contentKey].content}
                            author={currentUser.displayName} /> */}
                            <h2>{contentObjectKey[contentKey].title}</h2>
                            {/* <div className='img'>
                            <img src={imageUrl} />
                        </div> */}
                            <div className='info'>
                                {/* <p>By: {profile[0].name}</p> */}
                                <p>{contentObjectKey[contentKey].date}</p>
                            </div>
                            <p>{contentObjectKey[contentKey].content}</p>
                        </div>
                    </Link>
                )
            }
            if (el.images) {
                blogPost = (

                    <Link to={link}>
                        <div className='cardWithImg'>
                            {/* <ShowNews
                            key={el.id}
                            title={contentObjectKey[contentKey].title}
                            content={contentObjectKey[contentKey].content}
                            description={contentObjectKey[contentKey].content}
                            author={profile[0].name} /> */}
                            <h2>{contentObjectKey[contentKey].title}</h2>
                            {/* <p>By: {profile[0].name}</p> */}
                            <p>{contentObjectKey[contentKey].date}</p>
                            <div className='details'>
                                <div className='img'>
                                    <img src={imageUrl} />
                                </div>
                                <div className='info'>
                                    <p>{contentObjectKey[contentKey].content}</p>
                                </div>
                            </div>
                        </div>
                    </Link>
                )
            }

            return (
                <div className='perBlog'>
                    { blogPost}
                </div>
            )

        }))


    console.log(blogData.length);
    console.log(drafts.length);

    let createBlog = [];
    if (drafts.length === 0 && blogData.length === 0) {
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
                        <button onClick={addCount}>
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
                        {/* <div>
                            <h3>Blogs ({blogData.length})</h3>
                            {eachBlog}
                        </div> */}
                    </div>

                </div>
                <div className='showBlogs'>
                    <div>
                        <h3>Blogs ({blogData.length})</h3>
                        <div className='blog-grid'>
                            {eachBlog}
                        </div>
                    </div>
                </div>
            </Aux>
        )
    }

    console.log(profile);



    const [countArray, setCountArray] = useState([]);
    console.log(countArray);

    const indexOfCounts = [];


    // Deletes all of the count except for the newest one made
    if (countArray.length > 0) {
        for (let x of countArray) {
            indexOfCounts.push(x.id)
        }
        console.log(indexOfCounts);
        console.log(indexOfCounts.length);
        const length = indexOfCounts.length - 1;
        console.log(length);
        for (let i = 0; i < length; i++) {
            // console.log(indexOfCounts[i]);
            instance.request({
                method: 'delete',
                url: `users/${currentUser.uid}/count/${indexOfCounts[i]}.json`
            }).then(response => {
                console.log(response);
            })
                .catch(err => console.log(err));
        }
    }

    const addProfile = async () => {
        const profile = {
            images: '',
            location: '',
            name: '',
            following: '',
            followers: ''
        }
        await instance.post(`users/${currentUser.uid}/profile.json`, profile)
            .then(response => {
                console.log(response.data)
            })
            .catch(err => console.log(err));
    }



    useEffect(async (info) => {
        // resets scrollbar back to the top
        window.scrollTo(0, 0)

        // Grabs Drafts Data
        await instance.get(`users/${currentUser.uid}/drafts.json`)
            .then(response => {
                console.log(response.data)
                const results = [];
                for (let key in response.data) {
                    results.unshift({
                        ...response.data[key],
                        id: key,
                    })
                }
                setDrafts(results);
            })
            .catch(err => console.log(err));

        //  Grabs Profile Data
        await instance.get(`users/${currentUser.uid}/profile.json`)
            .then(response => {
                console.log(response.data)
                const results = [];
                for (let key in response.data) {
                    results.unshift({
                        ...response.data[key],
                        id: key,
                    })
                }
                setProfile(results);
            })
            .catch(err => console.log(err));

        // Grabs Count Data
        await instance.get(`users/${currentUser.uid}/count.json`)
            .then(response => {
                console.log(response.data)
                const results = [];
                for (let key in response.data) {
                    results.push({
                        // ...response.data,
                        id: key,
                        // name: response.data.name
                    })
                }
                console.log(results);
                setCountArray(results);
            }).catch(err => console.log(err));

        // Grabs Blog Data
        await instance.get(`users/${currentUser.uid}/blogs.json`)
            .then(response => {
                console.log(response.data)
                const results = [];
                for (let key in response.data) {
                    results.unshift({
                        ...response.data[key],
                        id: key,
                        // name: response.data.name
                    })
                }
                console.log(results);
                setBlogData(results);
            }).catch(err => console.log(err));





    }, [info])

    console.log(profile);

    return (
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
            <div className='containers'>
                {createBlog}
            </div>
        </div>
    )
}