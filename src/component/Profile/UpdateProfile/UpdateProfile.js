import React, { useEffect, useRef, useState } from 'react'
import img from '../../../assets/images/logo3.png';
import { useAuth } from '../../Authentication/AuthContext/AuthContext';
import { Link, useHistory } from "react-router-dom";
import Error from '../../Authentication/Error/Error';
import firebase, { storage } from '../../../firebase';
import instance from '../../../axios-orders';
import ProgressBar from '../../ProgressBar/ProfileImageProgressBar';
import ShowCurrentImages from '../../Blogging/Add/ShowCurrentImages/ShowCurrentImages';
import GetData from '../../Blogging/Add/GetData/GetImageData';
import useFirestore from '../../../hooks/useFirestore';


export default function UpdateProfile() {

    const nameRef = useRef();
    const locationRef = useRef();
    const imageRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmedRef = useRef();
    const { currentUser, updateProfile } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState(null);
    const history = useHistory();
    const [profile, setProfile] = useState([]);
    const [email, setEmail] = useState('');
    const { docs } = useFirestore(currentUser.uid);

    async function submitHandler(e) {
        e.preventDefault();

        console.log(nameRef.current.value);
        // console.log(emailRef.current.value);
        // console.log(passwordRef.current.value);
        // console.log(image);
        if (passwordRef.current.value !== passwordConfirmedRef.current.value) {
            return setError('Passwords do not match');
        }


        let nameValue = profileName;
        let locationValue = profileLocation;
        let imageValue = profilePic;

        if (locationRef.current.value !== locationValue) {
            locationValue = locationRef.current.value;
        }
        if (nameRef.current.value !== nameValue) {
            nameValue = nameRef.current.value;
        }
        if (!profilePic) {
            imageValue = ''
        }




        const profile = {
            images: imageValue,
            location: locationValue,
            name: nameValue,
            following: '',
            followers: ''
        }

        let emailAddress = email;
        if (emailRef.current.value !== email) {
            emailAddress = emailRef.current.value
        }

        if (profileId) {
            setError('');
            setLoading(true);
            await instance.put(`users/${currentUser.uid}/profile/${profileId}.json`, profile)
                .then(response => {
                    console.log(response.data)
                })
                .catch(err => console.log(err));
            await updateProfile(emailAddress, passwordRef.current.value
            )
            history.push("/profile-blogs");
        }

        if (!profileId) {
            try {
                setError('');
                setLoading(true);
                await updateProfile(emailAddress, passwordRef.current.value
                )
                await instance.post(`users/${currentUser.uid}/profile.json`, profile)
                    .then(response => {
                        console.log(response.data)
                    })
                    .catch(err => console.log(err));
                history.push("/profile-blogs");

                // const storage = firebase.storage().ref(`${currentUser.uid}/profilePic/${image.name}`)
                // const uploadPic = storage.put(image);
                // uploadPic.on(firebase.storage.TaskEvent.STATE_CHANGED,
                //     () => {
                //         let downloadURL = uploadPic.snapshot.downloadURL
                //         console.log('Picture has been uploaded');
                //     })

                // console.log('Account updated...')
            } catch (e) {
                setError(`Failed to update account, ${e}`);
            }
        }

        setLoading(false);
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


    console.log(currentUser.uid)

    const handleChange = (e) => {
        if (ifProfile == false) {
            addProfile();
        }


        const types = ['image/png', 'image/jpeg'];
        let selected = e.target.files[0];


        if (selected && types.includes(selected.type)) {
            setImage(selected);
            setError('');

        } else {
            setImage(null);
            setError('Please select an image file (png or jpeg)');
        }

    }

    const [ifProfile, setIfProfile] = useState(false);
    const [profileName, setProfileName] = useState('');
    const [profileLocation, setProfileLocation] = useState('');
    const [profileId, setProfileId] = useState('');
    const [profilePic, setProfilePic] = useState([]);
    const [dataChanged, setDataChanged] = useState(null);
    const { datas } = GetData(docs, profileId, dataChanged);
    console.log(datas);
    console.log(ifProfile);

    // TODO: FIX THIS


    useEffect(async () => {


        await instance.get(`users/${currentUser.uid}/profile.json`)
            .then(response => {
                console.log(response.data)
                let dataValue = '';
                let dataId = '';
                if (!response.data) {
                    console.log("There is no data");
                }
                if (response.data) {
                    dataValue = Object.values(response.data)
                    dataId = Object.keys(response.data);
                    console.log(dataValue);
                    console.log(dataId);
                    setIfProfile(true);
                }
                if (!profileName) {
                    if (dataValue) {
                        setProfileName(dataValue[0].name);
                    }
                }
                if (!profileLocation) {
                    if (dataValue) {
                        setProfileLocation(dataValue[0].location);
                    }
                }
                setProfileId(dataId[0]);
                setProfilePic(dataValue[0].images)
                setEmail(currentUser.email);
            })
            .catch(err => console.log(err));



    }, [datas])



    const deleteImg = async (e) => {
        e.preventDefault();
        await instance.delete(`users/${currentUser.uid}/profile/${profileId}/images/${datas[0].id}.json`)
            .then(response => {
                console.log(response.data)
                setDataChanged('changed');
            })
            .catch(err => console.log(err));
        imageRef.current.value = null;

    }

    console.log(datas);

    let showImg = ''
    if (!datas) {
        showImg = (
            <div></div>
        );
    }
    if (datas !== null) {
        if (datas.length > 0) {
            const images = Object.values(datas[0]);
            console.log(images);
            showImg = (
                <div className='img'>
                    <img key={datas[0].id} src={images[1]} />
                    <button onClick={deleteImg}>Delete</button>
                </div>
            )
        }
    }



    console.log(profilePic);
    console.log(profileName);
    console.log(profileId);



    return (
        <div className='container'>

            <div className='signUp'>
                <figure>
                    <img src={img} alt={"adventures with chu"} />
                </figure>
                <h1>Edit Profile</h1>
                {/* {JSON.stringify(currentUser.email)} */}
                {/* {JSON.stringify(currentUser.email)} */}
                {/* {currentUser && currentUser.email} */}
                {/* {currentUser.email} */}
                {error && <Error message={error} />}
                {/* <form onSubmit={submitHandler}> */}
                <form>
                    <div className='input-form'>
                        <label>Profile Name:</label>
                        <input type='text' ref={nameRef} value={profileName} onChange={event => setProfileName(event.target.value)} />
                    </div>
                    <div className='input-form'>
                        <label>Location:</label>
                        <input type='text' ref={locationRef} value={profileLocation} onChange={event => setProfileLocation(event.target.value)} />
                    </div>
                    <div className='input-form'>
                        <label>Profile Picture:</label>
                        <input type='file' accept="image/png, image/jpeg" onChange={handleChange} ref={imageRef} />
                        {image && <div>{image.name}</div>}
                        {image && <ProgressBar file={image} setFile={setImage} id={profileId} />}
                    </div>
                    {showImg}
                    {/* <ShowCurrentImages data={datas} /> */}
                    {/* <ShowCurrentImages data={datas} setSelectedImg={setSelectedImg} setSelectedId={setSelectedId} setSelectedDescription={setSelectedDescription} /> */}

                    <div className='input-form'>
                        <label>Email Address</label>
                        <input type='email' ref={emailRef} value={email} onChange={event => setEmail(event.target.value)} />
                    </div>
                    <div className='input-form'>
                        <label>Password</label>
                        <input type='password' ref={passwordRef} minLength="6" autoComplete='off' placeholder="Leave blank to keep original" />
                    </div>
                    <div className='input-form'>
                        <label>Confirm New Password</label>
                        <input type='password' ref={passwordConfirmedRef} minLength="6" autoComplete='off' placeholder="Leave blank to keep original" />
                    </div>

                    <button disabled={loading} type='submit' className='button'
                        onClick={submitHandler}
                    >Update
                    </button>
                </form>
                <div className='login'>
                    <p><span><a href='/profile-blogs'>Cancel</a></span></p>
                </div>
            </div>
        </div >
    )
}
