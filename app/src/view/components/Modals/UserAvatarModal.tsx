import { ModalContainer, Form, Input, Button } from "../../library";
import { ChangeEvent, FormEvent, useState } from 'react'
import { handleSelectedImages } from "../../utils"
import { useAppContext, useHandleErrors } from "../../hooks";
import { UpdateUserAvatar } from "../../../logic";

type UpdateAvatarFormEvent = FormEvent<HTMLFormElement> & {
    target: {
        URLImage: { value: string }
        password: { value: string }
    }
}

interface UserAvatarModalProp {
    handleToggleUpdateAvatarModal: () => void
}

export default function UserAvatarModal({ handleToggleUpdateAvatarModal }: UserAvatarModalProp):JSX.Element {
    const handleErrors = useHandleErrors()
    const { alert, setLastUpdate, freeze, unfreeze } = useAppContext()

    const [selectedImage, setSelectedImage] = useState<string>('')

    const handleSelectedImage = async (e: ChangeEvent<HTMLInputElement>) => {
        handleErrors(async () => {
            const image = await handleSelectedImages(e)

            if(image) setSelectedImage(image[0])
        })
    }

    const handlUpdateAvatar = (e: UpdateAvatarFormEvent) => {
        e.preventDefault()
        
        const URLImage = e.target.URLImage.value
        const password = e.target.password.value

        if(!selectedImage && !URLImage) {
            alert && alert('No image has been selected or entered')

            return
        }

        if(selectedImage && URLImage) {
            alert && alert('Two images have been selected')

            return
        }

        const avatarImage = selectedImage || URLImage

        handleErrors(async () => {
            freeze && freeze()

            await UpdateUserAvatar(avatarImage, password)

            handleToggleUpdateAvatarModal()

            setLastUpdate && setLastUpdate(Date.now())

            unfreeze && unfreeze()
        })
    }

    return (
        <ModalContainer className="absolute top-0 left-0 bg-black bg-opacity-25" onClick={event => {
            if(event.target === document.querySelector('.ModalContainer'))
                handleToggleUpdateAvatarModal()
        }}>
            <Form className="w-[500px] h-fit p-10 bg-white flex flex-col items-center gap-4" onSubmit={handlUpdateAvatar}>
                <p className="text-2xl">Select an image or enter an url</p>
                <div className="flex flex-col items-center gap-2">
                    <Input type="file" name="fileImage" onChange={handleSelectedImage}/>
                    {selectedImage
                        ?
                        <img src={selectedImage} alt="Selected Image" className="h-40 w-fit"/>
                        :
                        <div className="w-72 h-48 border border-black flex justify-center items-center">Image</div>
                    }
                </div>
                <Input className="w-72 border border-black" name="URLImage" placeholder="URL Avatar"/>
                <Input className="w-72 border border-black" name="password" type="password" placeholder="Password"/>
                <div className="w-72 flex justify-evenly gap-4 mt-4">
                    <Button className="w-36">Update</Button>
                    <Button className="w-36" type="button" onClick={handleToggleUpdateAvatarModal}>Cancel</Button>
                </div>
            </Form>
        </ModalContainer>
    )
}