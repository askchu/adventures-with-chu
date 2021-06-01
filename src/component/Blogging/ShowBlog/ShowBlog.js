import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom';
import instance from '../../../axios-orders';
import { useAuth } from '../../Authentication/AuthContext/AuthContext';
import './ShowBlog.css';

export default function ShowBlog() {
    const { id } = useParams();
    // console.log(id);
    const { currentUser } = useAuth();
    const history = useHistory();

    const [content, setContent] = useState([]);
    const [image, setImages] = useState([]);
    const [profileName, setProfileName] = useState('');

    // console.log(image);

    useEffect(async () => {
        window.scrollTo(0, 0)
        await instance.get(`users/${currentUser.uid}/blogs/${id}.json`)
            .then(response => {
                // console.log(response.data)
                let content = []
                let images = []
                content.push({
                    content: response.data.content
                })
                if (response.data.images) {
                    images.push({
                        images: response.data.images
                    })
                    setImages(images);
                }
                setContent(content);
            }).catch(err => console.log(err));


        await instance.get(`users/${currentUser.uid}/profile.json`)
            .then(response => {
                // console.log(response.data)
                let dataValue = Object.values(response.data)
                // console.log(dataValue);
                setProfileName(dataValue[0].name);
                // let content = []
                // let images = []
                // content.push({
                //     content: response.data.content
                // })
                // if (response.data.images) {
                //     images.push({
                //         images: response.data.images
                //     })
                //     setImages(images);
                // }
                // setContent(content);
            }).catch(err => console.log(err));
    }, [])

    let title = '';
    let details = '';
    let date = '';

    if (content.length > 0) {
        const contentObjectKey = content[0].content;
        const contentKey = Object.keys(contentObjectKey);
        title = contentObjectKey[contentKey].title
        details = contentObjectKey[contentKey].content
        date = contentObjectKey[contentKey].date
    }


    let pictures = <div></div>
    let userGallery = <div></div>
    let eachImg = [];
    let imageObjectKey = '';
    if (image.length > 0) {

        imageObjectKey = Object.values(image[0].images)
        // console.log(imageObjectKey);
        // console.log(imageObjectKey.length);
        for (let i = 0; i < imageObjectKey.length; i++) {
            // console.log(imageObjectKey[i].id);
            eachImg.push({
                id: imageObjectKey[i].id,
                imageUrl: imageObjectKey[i].imageUrl,
                description: imageObjectKey[i].description
            })
        }
        // console.log(eachImg);
        // imageObjectKey.map(el => {
        //     console.log(el.id);
        //     eachImg = (
        //         <p>{el.id}</p>
        //     )
        // })

        // pictures = eachImg.map(el => (
        //     <div className='img'>
        //         <img src={el.imageUrl} />
        //         <p>{el.description}</p>
        //     </div>
        // ))


        pictures = eachImg.map(el => {
            if (el.description) {
                return (
                    <div className='img'>
                        <img src={el.imageUrl} />
                        <p>{el.description}</p>
                    </div>
                )
            }
            if (!el.description) {
                return (
                    <div className='noDesc'>
                        <img src={el.imageUrl} />
                    </div>
                )
            }
        })
        userGallery = <div className='gallery'>
            <h4>Gallery</h4>
            <div className='img-grid'>
                {pictures}
                {/* {eachImg.map(el => (
                            <div className='img'>
                                <img src={el.imageUrl} />
                                <p>{el.description}</p>
                            </div>
                        ))} */}
            </div>
        </div>
    }



    return (
        <div className='container'>
            <div className='showBlog'>
                <header>
                    <h2>{title}</h2>
                    <h4>Author: {profileName} </h4>
                    <h4>Posted: {date}</h4>
                </header>
                {/* <div className='gallery'>
                    <h4>Gallery</h4>
                    <div className='img-grid'>
                        {pictures}
                       
                    </div>
                </div> */}
                {userGallery}

                <div className='synopsis'>
                    <p>{details}</p>
                </div>
            </div>
            <div className='backButton' >
                <button onClick={() => history.goBack()}>Back</button>
            </div>

        </div>
    )
}
