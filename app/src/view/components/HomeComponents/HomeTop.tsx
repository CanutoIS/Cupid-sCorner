// import { useState, useEffect } from "react";
import { useAppContext, useSetImageToPresent } from "../../hooks";
import { useHandleCurrentCategories } from "../../hooks";
import { context } from "../../../ui";

export default function HomeTop(): JSX.Element {
    const imageNumber = useSetImageToPresent();
    const { currentCategories, stateCategories, handleChangeCategories } = useHandleCurrentCategories()
    const { navigate } = useAppContext()

    const handleOpenCategoryPage = (category: string) => {
        context.category = category

        navigate && navigate('/show-products')
    }

    return (
        <section
            className={`w-screen max-w-full h-full bg-[url(/presentation-images/home-image-${imageNumber}.jpg)] bg-cover bg-center flex flex-col items-center justify-around mb-2 gap-6 md:gap-24`}
        >
            <img
                src="/images/CupidsCornerLogo.png"
                alt="Cupido's Corner logo"
                className="rounded-full h-52 mt-2"
            />
            <ul className="flex gap-2 w-full justify-around items-center mb-2">
                <div
                    className="h-28 w-8 flex justify-end items-center bg-gray-400 bg-opacity-50 hover:bg-gray-300 hover:bg-opacity-50 rounded cursor-pointer"
                    onClick={() => handleChangeCategories("left")}
                >
                    <span className="material-symbols-outlined notranslate">
                        arrow_back_ios
                    </span>
                </div>
                <div className="w-fit md:w-[90%] flex flex-wrap md:flex-row md:justify-evenly justify-center">
                    {currentCategories.map((category, index) => {
                        const firstCategory =
                            stateCategories === 1
                                ? 0
                                : stateCategories === 2
                                ? 4
                                : 8;
                        const categoryIndex = firstCategory + index;

                        return (
                            <li
                                key={category}
                                className="w-5/12 md:w-1/5 flex flex-col h-20 justify-end cursor-pointer md:h-48 m-2"
                                onClick={() => handleOpenCategoryPage(category)}
                            >
                                <div className={`category w-full h-44 rounded bg-[url(/category-images/category-${categoryIndex}.jpg)] bg-cover bg-center border-2 border-white flex justify-center items-center relative `}>
                                    <p className="text-white lg:text-2xl text-center font-bold w-fit mx-2">
                                        {category}
                                    </p>
                                </div>
                            </li>
                        )
                    })}
                </div>
                <div
                    className="h-28 w-8 flex justify-center items-center bg-gray-400 bg-opacity-50 hover:bg-gray-300 hover:bg-opacity-50 rounded cursor-pointer"
                    onClick={() => handleChangeCategories("right")}
                >
                    <span className="material-symbols-outlined notranslate">
                        arrow_forward_ios
                    </span>
                </div>
            </ul>
        </section>
    );
}
