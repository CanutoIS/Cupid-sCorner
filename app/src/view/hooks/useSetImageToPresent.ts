import { context } from "../../ui"
import { useState, useEffect } from "react"

export default function UseSetImageToPresent() {
    const [imageNumber, setImageNumber] = useState<number | null>(null)

    useEffect(() => {
        if(context.imageNumber) 
            setImageNumber(parseInt(context.imageNumber))
        else {
            context.imageNumber = '1'
            setImageNumber(1)
        }

        const interval = setInterval(() => {
            if(parseInt(context.imageNumber) >= 6) {
                context.imageNumber = '1'
                setImageNumber(1)
            } else {
                const currentNumber = parseInt(context.imageNumber)

                context.imageNumber = (currentNumber + 1) + ''

                setImageNumber(currentNumber + 1)
            }
        }, 10000)
        
        return () => clearInterval(interval)
    }, [])

    return imageNumber
}