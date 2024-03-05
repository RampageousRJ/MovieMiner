import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import './home.css'
import svg from '../../../src/assets/movie_miner_logo2.svg'
import { useNavigate } from 'react-router-dom'


function Home() {

    const finalTitle = 'Miner'
    const [visibleTitle, setVisibleTitle] = useState('')

    useEffect(() => {
        let currIndex = 0;
        let expanding = true;
        let speed = 300;
        const expandContract = setInterval(() => {
            if (expanding) {
                currIndex++
                setVisibleTitle(finalTitle.slice(0, currIndex))
                if (currIndex === finalTitle.length) {
                    expanding = false;
                    speed = 300;
                }
            }
            else {
                currIndex--;
                setVisibleTitle(finalTitle.slice(0, currIndex - 1))
                if (currIndex === 0) {
                    expanding = true;
                    setVisibleTitle('M')
                    speed = 0.001;
                }
            }
        }, speed)
        return () => clearInterval(expandContract);
    }, [])

    const navigate = useNavigate()

    const handleClick = (e) => {
        e.preventDefault()
        navigate("/movies")
    }

    return (
        < div className='flex gap-10 flex-col-reverse lg:flex-row lg:justify-around min-h-screen 
        justify-center items-center text-center'>
            <section id='home-main' className='flex flex-col gap-4 justify-center max-w-screen-md px-3 '>
                <article id='home-content' className='flex flex-col gap-8'>
                    <h1 className='text-5xl md:text-7xl text-center tracking-wider ' id='main-title'><span className='text-special'>Movie</span>{visibleTitle}</h1>
                    <motion.div
                        initial={{ opacity: 0, x: -100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1.5 }}
                    >
                        <p className='text-sm md:text-xl'>Movie rut blues got you down?  MovieMiner is your cinematic compass!  Tell us a movie you enjoyed, and we'll use genre, actors, and other clues to suggest similar films. No personalization, just pure movie connections to spark your next viewing adventure. Discover hidden gems, revisit old favorites, and keep your film exploration exciting!</p>
                    </motion.div>
                </article>
                <div className='btn-container'>
                    <button
                        id='home-btn'
                        onClick={handleClick}>
                        Get Started
                    </button>
                </div>
            </section>
            <section className=' ' id='home-svg'>
                <img src={svg} alt="svg" className='w-64 lg:w-96 h-64 lg:h-96 bg-cover bg-center' />
            </section>
        </div>
    )
}

export default Home