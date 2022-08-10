const CardDeck = ({ value, flipped, match, clicked, card }) => {
    return (
        <button
            className={
                (flipped ? 'animate card' : 'card') + (match ? 'match' : '')
            }
            value={value}
            onClick={() => clicked(card)}
            disabled={match}
            >
            <img
                alt={`text or an graphic of ${value}`}
                className='back'
                src={`https://achulslander.com/img/memory/${value}.svg`}
            />
        </button>
    );
};

export default CardDeck;
