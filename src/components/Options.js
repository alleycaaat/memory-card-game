import '../style.css';

const Options = ({ deck }) => {
    return (
        <div role='group' className='top'>
            <button
                className='option'
                name='category'
                value='all_codes'
                onClick={deck}
            >
                Coding
            </button>
            <button
                className='option'
                name='category'
                value='all_colors'
                onClick={deck}
            >
                Colors
            </button>
            <button
                className='option'
                name='category'
                value='all_math'
                onClick={deck}
            >
                Math
            </button>
        </div>
    );
};

export default Options;
