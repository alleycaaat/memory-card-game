/* eslint-disable react/prop-types */
export const DifficultyButton = ({ details, value, onClick }) => {
    return (
        <button
            className={details.difficulty === value ? 'option selected' : 'option'}
            name='difficulty'
            value={value}
            onClick={onClick}>
            {value}
        </button>
    );
};

export const CardAmountBtn = ({ value, onClick, details, title }) => {
    return (
        <button
            value={value}
            name='count'
            className={details.count === value ? 'option selected' : 'option'}
            onClick={onClick}>
            {title}
        </button>
    );
};

export const OptionsBtn = ({ category, onClick, value, children }) => {
    return (
        <button
            className={category === value ? 'option selected' : 'option'}
            name='category'
            value={value}
            onClick={onClick}
        >
            {children}
        </button>
    );
};

export const ResetBtn = ({ onClick }) => {
    return (
        <button className='option' onClick={onClick}>Reset</button>
    );
};

export const RulesBtn = ({ onClick }) => {
    return (
        <button className='option' onClick={onClick}>
            Rules
        </button>
    );
};