import React, { useEffect, useState } from 'react'
import './cards.css'
import Card from '../Card/Card'
import { useNavigate } from 'react-router-dom'
import { FaSearch } from "react-icons/fa";
import { LuShieldClose } from "react-icons/lu";
import { motion } from 'framer-motion'

const objs = [
    {
        title: "Title 1",
        overview: "Overview 1 is of great importance as we dive deeper into it.",
        img: "https://media.contentapi.ea.com/content/dam/eacom/images/2020/09/ea-featured-image-ea-desktop-beta.jpg.adapt.crop191x100.1200w.jpg",
        rating: "5.0",
        id: 0,
    },
    {
        title: "Title 2",
        overview: "Overview 2 is of great importance as we dive deeper into it.",
        img: "https://media.contentapi.ea.com/content/dam/eacom/images/2020/09/ea-featured-image-ea-desktop-beta.jpg.adapt.crop191x100.1200w.jpg",
        rating: "4.0",
        id: 1,
    },
    {
        title: "Title 3",
        overview: "Overview 3 is of great importance as we dive deeper into it.",
        img: "https://media.contentapi.ea.com/content/dam/eacom/images/2020/09/ea-featured-image-ea-desktop-beta.jpg.adapt.crop191x100.1200w.jpg",
        rating: "5.0",
        id: 2,
    },
    {
        title: "Title 4",
        overview: "Overview 4 is of great importance as we dive deeper into it.",
        img: "https://media.contentapi.ea.com/content/dam/eacom/images/2020/09/ea-featured-image-ea-desktop-beta.jpg.adapt.crop191x100.1200w.jpg",
        rating: "2.0",
        id: 3,
    },
    {
        title: "Title 3",
        overview: "Overview 3 is of great importance as we dive deeper into it.",
        img: "https://media.contentapi.ea.com/content/dam/eacom/images/2020/09/ea-featured-image-ea-desktop-beta.jpg.adapt.crop191x100.1200w.jpg",
        rating: "5.0",
        id: 4,
    },
    {
        title: "Title 4",
        overview: "Overview 4 is of great importance as we dive deeper into it.",
        img: "https://media.contentapi.ea.com/content/dam/eacom/images/2020/09/ea-featured-image-ea-desktop-beta.jpg.adapt.crop191x100.1200w.jpg",
        rating: "2.0",
        id: 5,
    },
]

function Cards() {

    const navigate = useNavigate()

    const [openModal, setOpenModal] = useState(false);
    const [modalDetails, setModalDetails] = useState({})
    const [title, setTitle] = useState('Inception')
    const [movies, setMovies] = useState([{}, {}])

    // Api Call

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const req = await fetch('/api', {
                    method: 'POST',
                    headers: {
                        'Content-Type': "application/json"
                    },
                    body: JSON.stringify({
                        title: title
                    })
                })
                const data = await req.json()

                // The details i am fetching is non interable so we make use of Object Class.
                let temp = []
                Object.values(data).forEach((item, index) => {

                    // Shortened Overview and Title  for Card View
                    const shortenOverview = item.Overview.substring(0, 120) + '...'
                    const shortenedTitle = item.Title.split(':')[0]
                    const obj = {
                        title: item.Title,
                        overview: item.Overview,
                        rating: item.Vote_Average,
                        img: item.Poster_Url,
                        ind: index,
                        shortenOverview,
                        shortenedTitle
                    }
                    temp.push(obj)
                });
                setMovies(temp);
            }
            catch (error) {
                console.log(error);
            }
        }
        return () => fetchDetails();

    }, [title])

    const handleModal = (e, ind) => {
        setOpenModal(true)
        e.stopPropagation()
        const detail = movies.filter(movie => movie.ind === ind)[0]
        setModalDetails({
            title: detail.title,
            overview: detail.overview,
            rating: detail.rating,
        })
    }

    const handleCloseModal = (e) => {
        setOpenModal(false)
        e.stopPropagation()
    }

    const handleGoBack = (e) => {
        e.preventDefault()
        navigate("/")
    }

    const handleSearch = (e) => {
        const searchText = document.querySelector('#search')
        console.log("I am here, ", searchText.value, searchText);
        setTitle(searchText.value)
        searchText.value = ''
    }

    return (
        <>
            {openModal &&
                <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.7 }}
                >
                    <aside
                        className='w-screen h-screen bg-transparent flex justify-center items-center absolute p-10 z-10 overflow-hidden'
                        onClick={handleCloseModal}
                    >
                        <div
                            className='max-w-2xl min-w-lg h-auto flex flex-col gap-6 p-10 relative'
                            id='modal'
                            onClick={(e) => e.stopPropagation()}
                        >
                            <LuShieldClose
                                className='absolute -top-2 -right-2 cursor-pointer z-40'
                                color='white'
                                fontSize={"1.6rem"}
                                onClick={handleCloseModal}
                            />
                            <section className='flex justify-between'>
                                <h1 className='text-3xl'>{modalDetails.title}</h1>
                                <h4 className='text-xl'>Rating: {modalDetails.rating}</h4>
                            </section>
                            <p>{modalDetails.overview}</p>
                        </div>
                    </aside>
                </motion.div>
            }
            < div id='container' className={`min-w-screen ${openModal ? "opacity-25" : "opacity-100"} min-h-screen flex flex-col gap-4`} >
                <section id='search-section' className='p-8 w-full flex justify-around'>
                    <div id='search-button' className='w-1/2 relative'>
                        <input
                            type="text"
                            id="search"
                            name='search'
                            placeholder='Search movies'
                            className='px-3 py-2 rounded-lg bg-transparent opacity-85 shadow-glow-1 w-full '
                        />
                        <FaSearch
                            className='absolute right-3 top-3 cursor-pointer text-gray-400'
                            onClick={handleSearch}
                        />

                    </div >
                    <button
                        id='go-back-btn'
                        onClick={handleGoBack}
                    >
                        Go Back
                    </button>
                </section >
                <main id='cards' className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 place-items-center p-6'>
                    {movies.map((item, ind) => (
                        <motion.div
                            key={ind}
                            initial={{ rotateY: -180, opacity: 0 }}
                            animate={{ rotateY: 0, opacity: 1 }}
                            transition={{ delay: ind * 0.5 + 0.6 }}
                        >
                            <Card
                                item={item}
                                handleModal={handleModal}
                            />
                        </motion.div>
                    )
                    )}
                </main>
            </div >
        </>

    );

}


export default Cards
