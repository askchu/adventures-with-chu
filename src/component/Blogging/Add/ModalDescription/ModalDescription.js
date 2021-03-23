import React, { useRef } from 'react'
import instance from '../../../../axios-orders';
import { useAuth } from '../../../Authentication/AuthContext/AuthContext';
import { useHistory } from 'react-router-dom'

export default function ModalDescription({
    selectedImg, setSelectedImg,
    selectedId, setSelectedId,
    selectedDescription, setSelectedDescription,
    count, savedDescription }) {
    const { currentUser } = useAuth();
    const textRef = useRef();
    const history = useHistory();


    const handleClick = (e) => {
        if (e.target.classList.contains('backdrop2')) {
            setSelectedImg(null);
            setSelectedId(null);
            setSelectedDescription(null);
            savedDescription(null);
        }
    }

    console.log(selectedId);

    const addDescription = (data) => {
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"];
        const date = new Date()
        const month = monthNames[date.getMonth()];
        const day = String(date.getDate()).padStart(2, '0');
        const year = date.getFullYear();
        const output = year + '/' + month + '/' + day;


        instance.request({
            method: 'put',
            url: `/${currentUser.uid}/images/${output}/${count}/${selectedId}.json`,
            data: data
        }).then(response => {
            console.log(response);
            // history.push('/profile-blogs-new');
            savedDescription(data.description);
        })
            .catch(err => console.log(err));
    }


    const saveData = (e) => {

        const data = {
            description: textRef.current.value,
            imageUrl: selectedImg
        }
        console.log(data);

        addDescription(data);
        setSelectedImg(null);
        e.preventDefault();
        console.log(`saved description of ${data.description}`);
    }

    return (
        <div className='container'>
            <div className='backdrop2' onClick={handleClick}>
                <div className='content'>
                    <img src={selectedImg} alt='enlarged pic' />
                    <div className='modal-form'>
                        <label>Description</label>
                        {/* {selectedId} */}
                        <textarea ref={textRef} placeholder={selectedDescription} />
                        <button onClick={saveData}>Save</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
