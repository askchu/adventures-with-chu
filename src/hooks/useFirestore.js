import { useState, useEffect } from 'react';
import { firestore } from '../firebase';

const useFirestore = (collection) => {
    const [docs, setDocs] = useState([]);


    useEffect(() => {
        const unsub = firestore.collection(collection)
            .orderBy('createdAt', 'desc')
            // sort by createdAt and added by descending order
            .onSnapshot((snap) => {
                let documents = [];
                snap.forEach(doc => {
                    documents.push({ ...doc.data(), id: doc.id })
                });
                setDocs(documents);
            });


        return () => unsub();
        // unsubscribe from the collection when we dont use it
    }, [collection])

    return { docs }
}

export default useFirestore;