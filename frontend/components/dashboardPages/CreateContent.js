import { ContentTitle } from "../../pages/dashboard"
import { useContext, useState } from "react";

import { create as ipfsHttpClient } from 'ipfs-http-client'
import { Web3AuthContext } from "../../web3auth/Web3AuthContext";
import { Image} from 'next';
const ipfs = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0')

import * as marketplaceJson from '../../../backend/hardhat/contracts/ConcertMarketPlace.json';
const concertMarketplaceAddress = '0xd106E4e5Fc3c64d2FABEd9Bcce12ABbBfE1E798A';

import { ethers } from "ethers";

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

    // get web3auth context
    const web3AuthProvider = useContext(Web3AuthContext);

    // form states
    const [name, setName] = useState()
    const [price, setPrice] = useState()
    const [imageUri, setImageUri] = useState()
    const [quantity, setQuantity] = useState()
    const [maxMintAmount, setMaxMintAmount] = useState()
    const [description, setDescription] = useState()

    const onSubmit = async (e) => {
        // prevents form from submitting early
        e.preventDefault();

        // Upload to ipfs (the url)
        uploadFile().then(async (uri) => {
            if (web3AuthProvider.web3 && uri) {
                const payableAmount = web3AuthProvider.web3.utils.toWei('1', "ether")
                const marketplaceContract = new web3AuthProvider.web3.eth.Contract(marketplaceJson.abi, concertMarketplaceAddress)
                const transaction = await marketplaceContract.methods.createEventObject(name, description, quantity, price, maxMintAmount, uri).send({from: web3AuthProvider.address, value: payableAmount});
                console.log(transaction)
            }
        })
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
        try {
            const added = await ipfs.add(image)
            const uri = `https://ipfs.infura.io/ipfs/${added.path}`
            return uri;
            //setImageUri(added.path)
            //setImagePreview(uri)
        } catch (err) {
            console.log('Error uploading the file : ', err)
        }
    }

    return (
        <div className="w-full bg-accentD rounded-2xl p-4">
            <form className="flex flex-col space-y-4" onSubmit={e => onSubmit(e)}>
                <input type="file" onChange={(e) => createPreview(e)} />
                <div className="flex">
                    <ImagePreview imgSrc={imagePreview} />
                    <div className="flex flex-col space-y-4 grow pl-4">
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
                            onChange={(e) => setPrice(e.target.value.replace(/\D/, ''))}
                            className="form-text-field"
                        />
                        <input
                            name="quantity"
                            type="text"
                            placeholder="quantity"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value.replace(/\D/, ''))}
                            className="form-text-field"
                        />
                        <input
                            name="maxmint"
                            type="text"
                            placeholder="maxmint"
                            value={maxMintAmount}
                            onChange={(e) => setMaxMintAmount(e.target.value.replace(/\D/, ''))}
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
                    </div>
                </div>
            </form>
        </div>
    )
}

function ImagePreview({ imgSrc }) {
    return (
        <div className="flex w-1/4 aspect-square rounded-xl border-2 border-highlightD overflow-clip">
            <Image src={imgSrc} className="object-cover min-w-full min-h-full" alt=''/>
        </div>
    )
}