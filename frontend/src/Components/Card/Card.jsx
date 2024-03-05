import React from 'react'
import './card.css'

function Card(props) {

    const { shortenedTitle, rating, img, shortenOverview } = props.item;
    const handleModal = props.handleModal;

    return (
        <div className="card w-64 md:w-80 lg:w-96 h-72 md:h-96 bg-cover" style={{ backgroundImage: `url('${img}')` }}>
            <div className="card-content w-full">
                <section className='card-title w-full flex justify-between items-center'>
                    <h2 className=''>{shortenedTitle}</h2>
                    <h4>Rating: {rating}</h4>
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