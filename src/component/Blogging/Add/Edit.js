import React, { useState, useRef, useEffect } from 'react'
import './Add.css'
import { useAuth } from '../../Authentication/AuthContext/AuthContext';
import { useHistory, useParams } from 'react-router-dom';
import ProgressBar from '../../ProgressBar/ProgressBar';
import useFirestore from '../../../hooks/useFirestore';
import instance from '../../../axios-orders';
import GetData from './GetData/GetData';
import ShowCurrentImages from './ShowCurrentImages/ShowCurrentImages';
import ModalDescription from './ModalDescription/ModalDescription';




export default function Edit() {
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
    const { id } = useParams();
    // console.log(id);

    // TODO: Grab images from /userId/draft data instead
    // Grabs images from /userId/images database
    const { datas } = GetData(docs, count.id, savedDescription, deletedImage);

    // console.log(datas);



    const handleChange = (e) => {
        const types = ['image/png', 'image/jpeg'];
        let selected = e.target.files[0];
        let countArrayNumber = 0

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
    // console.log(images);


    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
    const date = new Date()
    const month = monthNames[date.getMonth()];
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    const output = year + '/' + month + '/' + day;






    const saveDraft = () => {
        let titleValue = ''
        if (draftData[0].title || titleRef.current.value !== titleValue) {
            if (draftData[0].title !== titleRef.current.value) {
                titleValue = titleRef.current.value;
            }
            if (titleRef.current.value === '') {
                titleValue = draftData[0].title;
            }
        }

        let contentValue = ''
        if (draftData[0].content || contentRef.current.value !== contentValue) {
            if (draftData[0].content !== contentRef.current.value) {
                contentValue = contentRef.current.value;
            }
            if (contentRef.current.value === '') {
                contentValue = draftData[0].content;
            }
        }

        const post = {
            title: titleValue,
            content: contentValue,
            images: images
        }
        // console.log(post);

        // create db in drafts
        instance.put(`/${currentUser.uid}/drafts/${id}.json`, post)
            .then(response => {
                console.log(response)
                // console.log(response.data)
            })
            .catch(error => console.log(error));

        // Delete images path
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

        console.log('saved to drafts');
        history.push('/profile-blogs');
    }

    const noSave = () => {
        // Deletes draft
        instance.request({
            method: 'delete',
            url: `/${currentUser.uid}/drafts/${id}.json`
        }).then(response => {
            console.log(response);
            console.log(`draft ${id} deleted`)

        })
            .catch(err => console.log(err));

        // // Delete Count
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
                            <button onClick={saveDraft}>Yes</button>
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



    const grabCountData = async () => {
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

    const [draftData, setDraftData] = useState([]);
    const [titlePlaceholder, setTitlePlaceholder] = useState('');
    const [contentPlaceholder, setContentPlaceholder] = useState('');

    const grabDraftData = async () => {
        await instance.get(`/${currentUser.uid}/drafts/${id}.json`)
            .then(response => {
                console.log(response)
                let res = []
                res.push({
                    content: response.data.content,
                    title: response.data.title,
                    images: response.data.images
                })
                setDraftData(res)
                setTitlePlaceholder(response.data.title)
                setContentPlaceholder(response.data.content)
            }).catch(err => console.log(err));
    }
    // console.log(draftData);


    useEffect(async () => {
        window.scrollTo(0, 0)
        grabCountData();
        grabDraftData();
    }, [])


    // console.log(count);
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



    return (
        <div className='container-add'>
            <div className='title'>
                <h1>Edit Draft #{id}</h1>
                <button onClick={requestToDraft}>Back</button>
                <button onClick={requestToDraft}>Delete</button>
            </div>
            <form className='newBlog'>
                <div className='newBlog-input'>
                    <label>Title </label>
                    <input type='text' ref={titleRef} value={titlePlaceholder} onChange={event => setTitlePlaceholder(event.target.value)} />
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
                        {file && <ProgressBar file={file} setFile={setFile} id={countId} setId={setCountId} />}
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
                    />}
                {/* <h4>Add a description to any images by clicking on the image</h4> */}
                <div className='newBlog-input'>
                    <label>Content </label>
                    <textarea rows='20' cols='100' value={contentPlaceholder} ref={contentRef} onChange={event => setContentPlaceholder(event.target.value)}></textarea>
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
