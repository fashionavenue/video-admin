import React from 'react'
import { useState } from "react";
// import {
//     ref,
//     uploadBytes,
//     getDownloadURL,
// } from "firebase/storage";
// import { v4 } from "uuid";
import { app, database, storage, uploadFiles } from '../Utils/Firebase';
import { collection } from 'firebase/firestore';
import instance from '../Utils/axios';
import { getDatabase, ref, set } from "firebase/database";

function FileUpload() {
    const db = getDatabase(app);
    const [imageUpload, setImageUpload] = useState(null);
    const [loading, setLoading] = useState(false)
    console.log(imageUpload)
    const [imageUrls, setImageUrls] = useState([]);

    const collection1 = collection(database, "demo")

    const uploadFile = async () => {
        try {
            setLoading(true);
            if (imageUpload == null) return;
            const url = await uploadFiles(imageUpload);
            // const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
            // const snapshot = await uploadBytes(imageRef, imageUpload);
            // console.log("snapshot========------", snapshot)
            // const url = await getDownloadURL(snapshot.ref);
            // console.log("url=======--------=======", url);
            // const res = await addDoc(collection(database, "demo"), { url: url });
            set(ref(db, `users`), {
                url: url, type: imageUpload?.type
            });
            setLoading(false)
            // const res = await instance.post('/images.json', { url: url, type: imageUpload?.type })
            // console.log("resssssss=======------------------", res);
        } catch (error) {
            setLoading(false);
            console.log({ error })
        }
    };

    return (
        <div style={{ height: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <input
                type="file"
                onChange={(event) => {
                    setImageUpload(event.target.files[0]);
                }}
            />
            <button onClick={uploadFile}> Upload Image</button>
            {loading && <div>File Uploading....</div>}
            {imageUrls.map((url) => {
                return <img src={url} />;
            })}
        </div>
    )
}

export default FileUpload