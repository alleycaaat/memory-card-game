/* eslint-disable react/prop-types */
const Card = ({ card, clicked }) => {
    const { name, value, flipped, match } = card;

    return (
        <button
            className={
                (flipped ? 'animate card' : 'card') +
                (match ? 'match' : '')
            }
            name={name}
            value={value}
            onClick={() => clicked(card)}
            disabled={match}
        >
            <img
                alt={`card with a ${ name } on it`}
                className='back'
                src={`https://ach-photos.netlify.app/memory-card-game/${ value }.svg`}
            />
        </button>
    );
};

export default Card;
