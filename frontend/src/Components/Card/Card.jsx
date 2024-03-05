import React from 'react'
import './card.css'

function Card(props) {

    const { shortenedTitle, rating, img, shortenOverview, shortFont } = props.item;
    const handleModal = props.handleModal;
    console.log(shortFont, shortenedTitle);

    return (
        <div className="card w-64 md:w-80 lg:w-96 h-72 md:h-96 bg-cover" style={{ backgroundImage: `url('${img}')` }}>
            <div className="card-content w-full h-72 lg:h-96">
                <section className='card-title w-full flex justify-between items-center mb-2 md:mb-8'>
                    <h2 className={`w-1/2 ${shortFont ? "text-base" : "text-md"}`}>{shortenedTitle}</h2>
                    <h4 className={`${shortFont ? "text-base" : "text-md"}`}>Rating: {rating}</h4>
                </section>
                <p className="card-body">
                    {shortenOverview}
                </p>
                <button
                    id='know-more-btn'
                    type='submit'
                    onClick={(e) => handleModal(e, props.item.ind)}
                >
                    Know More
                </button>
            </div>
        </div>
    )
}

export default Card