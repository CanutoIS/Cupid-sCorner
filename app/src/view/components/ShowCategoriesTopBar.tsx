import { useHandleCurrentCategories } from "../hooks"
import { context } from "../../ui"

interface ShowCategoriesTopBar {
    setCategory: (category: string) => void
}

export default function ShowCategoriesTopBar({ setCategory }: ShowCategoriesTopBar): JSX.Element {
    const { currentCategories, handleChangeCategories } = useHandleCurrentCategories()

    return (
        <div className="flex gap-2 w-3/4 justify-between items-center">
            <div
                className="w-8 flex justify-end items-center rounded bg-opacity-50 cursor-pointer select-none"
                onClick={() => handleChangeCategories("left")}
            >
                <span className="material-symbols-outlined notranslate">
                    arrow_back_ios
                </span>
            </div>

            <ul className="flex flex-wrap sm:flex-nowrap">
                {currentCategories.map(category => (
                    <li
                        key={category}
                        className="cursor-pointer border border-white p-2 hover:border-black active:bg-slate-200 text-center w-1/2 sm:w-fit flex justify-center items-center"
                        onClick={() => {
                            context.category = category
                            setCategory(context.category)
                        }}
                    >
                        {category}
                    </li>
                ))}
            </ul>

            <div
                className="w-8 flex justify-center items-center rounded bg-opacity-50 cursor-pointer select-none"
                onClick={() => handleChangeCategories("right")}
            >
                <span className="material-symbols-outlined notranslate">
                    arrow_forward_ios
                </span>
            </div>
        </div>
    )
}