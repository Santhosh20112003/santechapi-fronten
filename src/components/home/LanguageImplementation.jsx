import React, { useState, useEffect } from 'react';
import { backendlang, fontendlang } from '../common/links';

function LanguageImplementation() {
    const [end, setEnd] = useState("frontend");
    const [lang, setLang] = useState(fontendlang[0]);
    const [currentImage, setCurrentImage] = useState(lang.img);
    useEffect(() => {
        setCurrentImage(lang.img);
    }, [lang]);

    return (
        <section className="bg-gradient-to-bl from-violet-100 to-violet-200 text-gray-700 body-font">
            <div className="w-full mx-auto px-5 md:px-12 py-20">
                <div className="flex flex-col md:flex-row md:gap-8 items-center md:items-start">
                    <div className="flex flex-col w-full md:w-1/2 mb-10 md:px-5 md:mb-0">
                        {lang && (
                            <div className="p-6 border shadow-lg bg-gradient-to-tr from-violet-950 to-violet-800 text-white border-violet-300 rounded-lg transition duration-300 hover:shadow-2xl">
                                <div className="flex items-center justify-between mb-4 border-b-2 pb-4 border-white">
                                    <div className="flex gap-3 items-center ">
                                        <img src={currentImage} alt={lang.lang} className="h-5" />
                                        <h1 className="text-xl md:text-2xl font-bold">{lang.lang}</h1>
                                    </div>
                                    <span className="hidden text-sm font-semibold sm:flex px-2.5 py-1.5 bg-violet-100 text-violet-800 rounded-lg">
                                        Weather API
                                    </span>
                                </div>
                                <div className="text-sm p-2 rounded-md overflow-auto max-h-64">
                                    <div className="break-words" dangerouslySetInnerHTML={{ __html: lang.code }}></div>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="flex flex-col md:w-1/2 pt-3">
                        <h1 className="text-2xl md:text-3xl text-gray-900 mb-4 font-semibold">API Code Samples</h1>
                        <p className="text-base md:text-lg text-gray-600 mb-6">
                            Easily switch between front-end and back-end code samples and view code snippets for various technologies.
                        </p>
                        <div className="relative mb-6">
                            <select
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-violet-500 focus:border-violet-500 transition ease-in-out duration-300"
                                value={end}
                                onChange={(e) => {
                                    if (e.target.value === "frontend") {
                                        setLang(fontendlang[0]);
                                        setEnd(e.target.value);
                                    } else {
                                        setLang(backendlang[0]);
                                        setEnd(e.target.value);
                                    }
                                }}
                            >
                                <option value="frontend">Front End</option>
                                <option value="backend">Back End</option>
                            </select>
                        </div>


                        {end === "frontend" && (
                            <div className="grid grid-cols-2 gap-4">
                                {fontendlang.map((item) => (
                                    <button
                                        key={item.lang}
                                        className={`px-5 py-3 break-words font-semibold border rounded-lg transition duration-300 ease-in-out shadow-md focus:outline-none focus:ring-2 focus:ring-violet-500 ${lang.lang === item.lang
                                            ? 'bg-violet-700 text-white border-violet-500'
                                            : 'bg-white text-violet-600 hover:bg-violet-100'
                                            }`}
                                        onClick={() => setLang(item)}
                                    >
                                        {item.lang}
                                    </button>
                                ))}
                            </div>
                        )}

                        {end === "backend" && (
                            <div className="grid grid-cols-2 gap-4">
                                {backendlang.map((item) => (
                                    <button
                                        key={item.lang}
                                        className={`px-5 py-3 font-semibold border rounded-lg transition duration-300 ease-in-out shadow-md focus:outline-none focus:ring-2 focus:ring-violet-500 ${lang.lang === item.lang
                                            ? 'bg-violet-600 text-white'
                                            : 'bg-white text-violet-600 hover:bg-violet-100'
                                            }`}
                                        onClick={() => setLang(item)}
                                    >
                                        {item.lang}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default LanguageImplementation;
