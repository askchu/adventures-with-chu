import { useState, useEffect } from 'react';
import { storage, firestore, timestamp } from '../firebase';
import { useAuth } from '../component/Authentication/AuthContext/AuthContext';
import instance from '../axios-orders';

const useStorage = (file, id) => {
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState(null);
    const [url, setUrl] = useState(null);
    const { currentUser } = useAuth();


    const userId = currentUser.uid;
    // useEffect is going to run everytime the [file] changes
    useEffect(() => {
        // references
        console.log(id + ' from useStorage.js')
        const storageRef = storage.ref(file.name);
        const collectionRef = firestore.collection(userId)
        // const collectionRef = firestore.collection('images')
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"];
        const date = new Date()
        const month = monthNames[date.getMonth()];
        const day = String(date.getDate()).padStart(2, '0');
        const year = date.getFullYear();
        const output = year + '/' + month + '/' + day;


        storageRef.put(file).on('state_changed', (snap) => {
            let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
            setProgress(percentage);
        }, (err) => {
            setError(err);
        }, async () => {
            const url = await storageRef.getDownloadURL();
            const createdAt = timestamp();
            collectionRef.add({ url: url, createdAt });
            setUrl(url);
            // add instance post here of url & createdAt
            const info = {
                imageUrl: url
            }
            await instance.post(`/${currentUser.uid}/images/${output}/${id}.json`, info)
                .then(response => {
                    // console.log(response)
                    console.log('img uploaded to firebase DB')
                })
                .catch(err => console.log(err));
        })


    }, [file]);

    return { progress, url, error }
}

export default useStorage;