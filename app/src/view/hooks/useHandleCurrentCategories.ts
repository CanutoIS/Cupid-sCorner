import { useEffect, useState } from "react"
import { categories } from "../utils"

export default function useHandleCurrentCategories() {
    const [stateCategories, setStateCategories] = useState<number>(1)
    const [currentCategories, setCurrentCategories] = useState<string[]>([])

    useEffect(() => {
        // const handleSetCurrentCategories = () => {
        const start = (stateCategories - 1) * 4

        const end = start + 4

        setCurrentCategories(categories.slice(start, end))
    }, [stateCategories])

    const handleChangeCategories = (side: "left" | "right") => {
        let newCategory: number

        if (side === "left") {
            newCategory = stateCategories !== 1 ? stateCategories - 1 : 3
        } else {
            newCategory = stateCategories !== 3 ? stateCategories + 1 : 1
        }

        setStateCategories(() => newCategory)
    }

    return { currentCategories, stateCategories, handleChangeCategories }
}
