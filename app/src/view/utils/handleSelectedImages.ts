// @ts-ignore
import { ImageCompressor } from 'image-compressor'
import { FormEvent } from 'react'

const handleCompressImage = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        
        reader.onload = () => {
            const imageCompressor = new ImageCompressor
        
            const compressorSettings = {
                toWidth : 600,
                toHeight : 600,
                mimeType : 'image/png',
                mode : 'strict',
                quality : 1
            }
        
            imageCompressor.run(reader.result, compressorSettings, (compressedSrc: string) => {
                resolve(compressedSrc)
            })
        }
    
        reader.onerror = () => reject(reader.error)
        reader.readAsDataURL(file)
    })
}

const handleSelectedImages = async (event: FormEvent<HTMLInputElement>) => {
    const inputElement = event.target as HTMLInputElement
    const selectedFiles = inputElement.files

    if (selectedFiles) {
        const fileArray = Array.from(selectedFiles)
        const promiseArray = fileArray.map(handleCompressImage)

        try {
            const imagesAsURL: string[] = await Promise.all(promiseArray)
            return imagesAsURL
            
        } catch (error) {
            console.error('Error al procesar las imágenes:', error)
        }
    }
}

export default handleSelectedImages