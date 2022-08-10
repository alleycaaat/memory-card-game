import '../style.css';

const Difficulty = ({ deck }) => {
    return (
        <div role='group' className='top'>
            <button
                className='option'
                name='isDiff'
                value='false'
                onClick={deck}
            >
                Normal
            </button>
            <button
                className='option'
                name='isDiff'
                value='true'
                onClick={deck}
            >
                Challenging
            </button>
        </div>
    );
};

export default Difficulty;
