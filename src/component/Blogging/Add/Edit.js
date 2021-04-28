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
    console.log(id);
    const [draftData, setDraftData] = useState([]);



    // TODO: Grab images from /userId/draft data instead
    // Grabs images from /userId/images database
    const { datas } = GetData(docs, id, savedDescription, deletedImage);

    console.log(datas);



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
            setCountId(id);
            setError('');

        } else {
            setFile(null);
            setCountId('');
            setError('Please select an image file (png or jpeg)');
        }
    }


    // console.log(images);


    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
    const date = new Date()
    const month = monthNames[date.getMonth()];
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    const output = year + '/' + month + '/' + day;


    console.log(count.id);



    const saveDraft = () => {
        let titleValue = ''
        if (titlePlaceholder || titleRef.current.value !== titleValue) {
            if (titlePlaceholder !== titleRef.current.value) {
                titleValue = titleRef.current.value;
            }
            if (titlePlaceholder === titleRef.current.value) {
                titleValue = titlePlaceholder;
            }
        }

        let contentValue = ''
        if (contentPlaceholder || contentRef.current.value !== contentValue) {
            if (contentPlaceholder !== contentRef.current.value) {
                contentValue = contentRef.current.value;
            }
            if (contentRef.current.value === '') {
                contentValue = contentPlaceholder;
            }
        }

        let res = []
        if (datas.length > 0 && countData) {
            countData.push(count.id);
            res = countData;
        }
        if (datas.length > 0 && !countData) {
            res = [count.id]
        }
        if (datas.length == 0 && countData) {
            res = countData;
        }


        let contentObjectKey = '';
        let contentKey = '';
        console.log(contentObjectKey);
        console.log(contentKey)
        if (draftData.length > 0) {
            contentObjectKey = draftData[0].content;
            contentKey = Object.keys(contentObjectKey);
            setTitlePlaceholder(contentObjectKey[contentKey].title);
            setContentPlaceholder(contentObjectKey[contentKey].content)
        }



        let post = {
            title: titleValue,
            content: contentValue,
            // images: datas
        }


        instance.put(`/${currentUser.uid}/drafts/${id}/content/${contentKey}.json`, post)
            .then(response => {
                console.log(response)
            })
            .catch(error => console.log(error));

        // Delete Count
        instance.request({
            method: 'delete',
            url: `/${currentUser.uid}/count/${count.id}.json`
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

    const [deleteDraft, setDeleteDrafts] = useState(false);

    const requestToDelete = () => {
        setDeleteDrafts(true);
    }

    const dontDelete = () => {
        setDeleteDrafts(false);
    }

    if (deleteDraft === true) {
        options = (
            <div className='container' >
                <div className='backdrop' onClick={handleClick}>
                    <div className='options'>
                        <h2>Delete Draft?</h2>
                        <div className='actions'>
                            <button onClick={noSave}>Yes</button>
                            <button onClick={dontDelete}>No</button>
                        </div>
                    </div>
                </div>
            </div >
        )
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

    const [titlePlaceholder, setTitlePlaceholder] = useState('');
    const [contentPlaceholder, setContentPlaceholder] = useState('');
    const [imageData, setImageData] = useState([])
    const [countData, setCountData] = useState([]);

    // TODO: grab images from user/images folder and display it on showCurrentImages

    const grabDraftData = async () => {
        await instance.get(`/${currentUser.uid}/drafts/${id}.json`)
            .then(response => {
                console.log(response)
                let res = []
                res.push({
                    content: response.data.content,
                    // title: response.data.content,
                    images: response.data.images
                })
                setDraftData(res)
                setImageData(response.data.images)
                let contentObjectKey = '';
                let contentKey = '';
                if (res.length > 0) {
                    contentObjectKey = res[0].content;
                    contentKey = Object.keys(contentObjectKey);
                    setTitlePlaceholder(contentObjectKey[contentKey].title);
                    setContentPlaceholder(contentObjectKey[contentKey].content)
                }
            }).catch(err => console.log(err));

    }
    console.log(imageData);
    console.log(titlePlaceholder)

    let draftImages = [];


    useEffect(async (deletedImage) => {
        window.scrollTo(0, 0)
        // grabCountData();
        grabDraftData();



    }, [deletedImage])

    console.log(titlePlaceholder);

    const submitPostHandler = (event) => {
        event.preventDefault();
        console.log('post submitted')
        // history.push('/profile-blogs');
    }
    console.log(datas);


    // Delete Image URL

    let deleteUrl = '';


    // if (imageDraft || datas) {

    //     console.log(selectedId);

    //     function search(idKey, myArray) {
    //         if (myArray) {
    //             for (var i = 0; i < myArray.length; i++) {
    //                 if (myArray[i].id === idKey) {
    //                     return myArray.indexOf(myArray[i]);
    //                 }
    //             }

    //         } else {
    //             console.log('no images in draft');
    //         }

    //     }

    // const searchIndex = search(selectedId, imageDraft)
    // console.log(searchIndex);

    // if (searchIndex == undefined) {
    //     deleteUrl = `/${currentUser.uid}/images/${output}/${count.id}/${selectedId}.json`;
    // } else {
    //     deleteUrl = `/${currentUser.uid}/drafts/${id}/images/${searchIndex}.json`;
    // }
    // console.log(deleteUrl);
    // // }


    // console.log(deleteUrl);







    return (
        <div className='container-add'>
            <div className='title'>
                <h1>Edit Draft #{id}</h1>
                <div className='choices'>
                    <button onClick={requestToDraft}>Back</button>
                    <button className='delete' onClick={requestToDelete}>Delete</button>
                </div>
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

                <ShowCurrentImages data={datas} setSelectedImg={setSelectedImg} setSelectedId={setSelectedId} setSelectedDescription={setSelectedDescription} imageDraft={imageData}
                />
                {selectedImg &&
                    <ModalDescription
                        selectedImg={selectedImg} setSelectedImg={setSelectedImg}
                        selectedId={selectedId}
                        setSelectedId={setSelectedId}
                        selectedDescription={selectedDescription} setSelectedDescription={setSelectedDescription}
                        count={id}
                        savedDescription={setSavedDescription}
                        deletedImage={setDeletedImage}
                        deletedImageUrl={deleteUrl}
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
