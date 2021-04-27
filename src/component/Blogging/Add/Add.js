import React, { useState, useRef, useEffect } from 'react'
import './Add.css';
import { useAuth } from '../../Authentication/AuthContext/AuthContext';
import { useHistory } from 'react-router-dom';
import ProgressBar from '../../ProgressBar/ProgressBar';
import useFirestore from '../../../hooks/useFirestore';
import instance from '../../../axios-orders';
import GetData from './GetData/GetData';
import ShowCurrentImages from './ShowCurrentImages/ShowCurrentImages';
import ModalDescription from './ModalDescription/ModalDescription';




export default function Add() {
    const inputRef = useRef();
    const titleRef = useRef();
    const contentRef = useRef();
    const { currentUser, updateProfile } = useAuth();
    const [error, setError] = useState('');
    // const [loading, setLoading] = useState(false);
    const [file, setFile] = useState(null);
    const { docs } = useFirestore(currentUser.uid);
    const history = useHistory();


    // const [info, setInfo] = useState([]);
    const [count, setCount] = useState([]);
    const [countId, setCountId] = useState('');
    const [selectedImg, setSelectedImg] = useState(null);
    const [selectedId, setSelectedId] = useState(null);
    const [selectedDescription, setSelectedDescription] = useState(null);
    const [savedDescription, setSavedDescription] = useState(null);
    const [deletedImage, setDeletedImage] = useState(null);
    const [saveDrafts, setSaveDrafts] = useState(false);


    // Grabs images from /userId/images database
    const { datas } = GetData(docs, count.id, savedDescription, deletedImage);
    console.log(datas);
    console.log(count.id);


    const handleChange = async (e) => {
        const types = ['image/png', 'image/jpeg'];
        let selected = e.target.files[0];
        let countArrayNumber = 0

        // await instance.get(`/${currentUser.uid}/drafts/${count.id}.json`)
        //     .then(response => {
        //         console.log(response.data)
        //     }).catch(err => {
        //         console.log(err);
        //     })



        if (count.length > 1) {
            countArrayNumber = count.length - 1;
        }
        console.log(countArrayNumber);
        if (selected && types.includes(selected.type)) {
            setFile(selected);
            setCountId(count.id);
            setError('');

        } else {
            setFile(null);
            setCountId('');
            setError('Please select an image file (png or jpeg)');
        }
    }


    const images = datas;
    console.log(images);


    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
    const date = new Date()
    const month = monthNames[date.getMonth()];
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    const output = year + '/' + month + '/' + day;



    const [imgData, setImgData] = useState(false);




    const saveToDrafts = () => {
        const post = {
            title: titleRef.current.value,
            content: contentRef.current.value,
        }
        // // console.log(imgData);
        // if (datas.length > 0) {
        //     post.imageId.push(count.id);
        // }

        // // console.log(post);

        // // create db in drafts
        // instance.post(`/${currentUser.uid}/drafts.json`, post)
        //     .then(response => {
        //         console.log(response)
        //         // console.log(response.data)
        //     })
        //     .catch(error => console.log(error));


        // // Delete Count
        // instance.request({
        //     method: 'delete',
        //     url: `/${currentUser.uid}/count/${count.id}.json`
        //     // data: data
        // }).then(response => {
        //     console.log(response);
        //     console.log(`${count.id} count file is deleted`);

        // })
        //     .catch(err => console.log(err));


        save(count.id, post);

        console.log('saved to drafts');
        history.push('/profile-blogs');
    }

    const noSave = () => {
        console.log('not saved to drafts');
        instance.request({
            method: 'delete',
            url: `/${currentUser.uid}/images/${output}/${count.id}.json`
            // data: data
        }).then(response => {
            console.log(response);
            console.log(`${count.id} image file is deleted`);

        })
            .catch(err => console.log(err));

        // Delete Count
        instance.request({
            method: 'delete',
            url: `/${currentUser.uid}/count/${count.id}.json`
            // data: data
        }).then(response => {
            console.log(response);
            console.log(`${count.id} count file is deleted`);

        })
            .catch(err => console.log(err));
        history.push('/profile-blogs');
    }

    const handleClick = (e) => {
        if (e.target.classList.contains('backdrop')) {
            setSaveDrafts(false);
        }
    }

    let options = [];
    if (saveDrafts === true) {
        options = (
            <div className='container' >
                <div className='backdrop' onClick={handleClick}>
                    <div className='options'>
                        <h2>Save to Drafts?</h2>
                        <div className='actions'>
                            <button onClick={saveToDrafts}>Yes</button>
                            <button onClick={noSave}>No</button>
                        </div>
                    </div>
                </div>
            </div >
        )
    }



    const requestToDraft = () => {
        setSaveDrafts(true);
    }



    const grabCount = async () => {
        console.log(count);
        await instance.get(`/${currentUser.uid}/count.json`)
            .then(response => {
                console.log(response.data)
                console.log(response.data.length)
                let res = []
                for (let key in response.data) {
                    res.push({
                        ...response.data[key],
                        id: key
                    })
                }
                console.log(res.length);
                let arrayNum = 0;

                if (res.length > 1) {
                    arrayNum = res.length - 1;
                }
                setCount(res[arrayNum]);
            })
            .catch(err => console.log(err));
    }

    const save = (countId, post) => {

        instance.post(`/${currentUser.uid}/drafts/${countId}/content/${countId}.json`, post)
            .then(response => {
                console.log(response)
                // console.log(response.data)
            })
            .catch(error => console.log(error));

        let id = {
            id: countId
        }

        instance.post(`/${currentUser.uid}/drafts/${countId}.json`, id)
            .then(response => {
                console.log(response)
                // console.log(response.data)
            })
            .catch(error => console.log(error));
    }


    useEffect(async () => {
        window.scrollTo(0, 0)
        console.log(count);
        grabCount();
    }, [])


    console.log(count);
    // const key = dataId[0]
    // console.log(key.id);


    const editPost = (newCount) => {

        const countId = count[0].id

        instance.request({
            method: 'put',
            url: `/${currentUser.uid}/count/${countId}.json`,
            data: newCount
        }).then(response => {
            this.props.history.push(`/profile-blogs`);
        })
            .catch(err => console.log(err));
    }


    const submitPostHandler = (event) => {
        event.preventDefault();
        console.log('post submitted')
        // history.push('/profile-blogs');
    }

    console.log(selectedImg);
    console.log(selectedId);
    console.log(`this is savedDescription from Add Page ${savedDescription}`)


    console.log(saveDrafts);


    // deleted image URL
    const deleteUrl = `/${currentUser.uid}/images/${output}/${count.id}/${selectedId}.json`;
    console.log(deleteUrl);

    return (
        <div className='container-add'>
            <div className='title'>
                <h1>New Blog</h1>
                <button onClick={requestToDraft}>Back</button>

            </div>
            <form className='newBlog'>
                <div className='newBlog-input'>
                    <label>Title </label>
                    <input type='text' ref={titleRef} />
                    {/* autoFocus: focuses on the input as soon as user arrives on page */}
                </div>
                <div className='newBlog-input'>
                    <label>Images </label>
                    <div className='inputFile'>
                        <input type='file' onChange={handleChange} ref={inputRef} />
                        <span><i className="fas fa-plus"></i></span>
                    </div>
                    <h4>Click on any image to edit and add a description</h4>
                    <div className='output'>
                        {error && <div className='errors'>{error}</div>}
                        {file && file.name}
                        {file && <ProgressBar file={file} setFile={setFile} id={count.id} setId={setCountId} />}
                    </div>
                </div>

                <ShowCurrentImages data={datas} setSelectedImg={setSelectedImg} setSelectedId={setSelectedId} setSelectedDescription={setSelectedDescription} />
                {selectedImg &&
                    <ModalDescription
                        selectedImg={selectedImg} setSelectedImg={setSelectedImg}
                        selectedId={selectedId}
                        setSelectedId={setSelectedId}
                        selectedDescription={selectedDescription} setSelectedDescription={setSelectedDescription}
                        count={count.id}
                        savedDescription={setSavedDescription}
                        deletedImage={setDeletedImage}
                        deletedImageUrl={deleteUrl}
                    />}
                {/* <h4>Add a description to any images by clicking on the image</h4> */}
                <div className='newBlog-input'>
                    <label>Content </label>
                    <textarea rows='20' cols='100' placeholder='Start writing here...' ref={contentRef}></textarea>
                </div>
                <div className='newBlog-post'>
                    <button
                        // disabled={loading}
                        type='submit'
                        onClick={submitPostHandler}
                    >Post
                </button>
                </div>
            </form>
            {options}
        </div>
    )
}
