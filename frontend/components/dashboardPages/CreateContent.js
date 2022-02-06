import { ContentTitle } from "../../pages/dashboard"
import { useState } from "react";

import { create as ipfsHttpClient } from 'ipfs-http-client'
const ipfs = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0')

export default function CreateContent() {

    const [fileUrl, setFileUrl] = useState("");

    return (
        <div className="flex flex-col space-y-4 h-full">
            <ContentTitle title={"Create Event"} />
            <CreateEventForm />
        </div>
    )
}

function CreateEventForm() {

    const [name, setName] = useState()
    const [price, setPrice] = useState()
    const [imageUri, setImageUri] = useState()
    const [quantity, setQuantity] = useState()
    const [description, setDescription] = useState()

    const onSubmit = async (e) => {
        // prevents form from submitting early
        e.preventDefault();

        // Upload to ipfs (the url)
        await uploadFile()
    }

    const [image, setImage] = useState({})
    const [imagePreview, setImagePreview] = useState('')

    const createPreview = (e) => {
        if (e.target.value !== '') {
            setImage(e.target.files[0])
            const src = URL.createObjectURL(e.target.files[0])
            setImagePreview(src)
        } else {
            setImagePreview('')
        }
    }

    const uploadFile = async (e) => {
        setLoading(true)

        try {
            const added = await ipfs.add(image)
            const uri = `https://ipfs.infura.io/ipfs/${added.path}`
            setImageUri(added.path)
            setImagePreview(uri)
        } catch (err) {
            console.log('Error uploading the file : ', err)
        }
        setLoading(false)
    }

    return (
        <div className="w-full bg-accentD rounded-2xl p-4">
            <form className="flex flex-col space-y-4" onSubmit={e => onSubmit(e)}>
                <input type="file" onChange={(e) => createPreview(e)} />
                <ImagePreview imgSrc={imagePreview}/>
                <input
                    name="name"
                    type="text"
                    placeholder="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-text-field"
                />
                <input
                    name="price"
                    type="text"
                    placeholder="price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value.replace(/\D/,''))}
                    className="form-text-field"
                />
                <input
                    name="quantity"
                    type="text"
                    placeholder="quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value.replace(/\D/,''))}
                    className="form-text-field"
                />
                <input
                    name="description"
                    type="text"
                    placeholder="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="form-text-field"
                />
                <button type="submit" fill={true} className="flex w-1/3 h-16 text-lg bg-accent rounded-xl items-center justify-center font-extrabold glow-white-xxs mt-8" >
                            Publish Event
                </button>
            </form>
        </div>
    )
}

function ImagePreview({ imgSrc }) {
    return (
        <div className="w-64 h-64 rounded-xl border-2 border-highlightD overflow-clip">
            <img src={imgSrc} className="object-cover min-w-full min-h-full"/>
        </div>
    )
}