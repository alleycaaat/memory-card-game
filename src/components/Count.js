import '../style.css';

const Count = ({ deck }) => {
    return (
        <>
        <div role='group' className='top'>
            <button className='option' name='count' value={5} onClick={deck}>
                Few
            </button>
            <button className='option' name='count' value={10} onClick={deck}>
                Morderate
            </button>
            <button className='option' name='count' value={15} onClick={deck}>
                Lots
            </button>
        </div>
        </>
    );
};

export default Count;
