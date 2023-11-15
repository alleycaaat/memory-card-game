import { DifficultyButton } from '../util/buttons';

/* eslint-disable react/prop-types */
const Difficulty = ({ details, deck }) => {

    return (
        <div className='selection-wrapper'>
            <h2>Difficulty level:</h2>
            <div role='group' className='top'>
                <DifficultyButton
                    details={details}
                    value='normal'
                    onClick={deck}
                />
                <DifficultyButton
                    details={details}
                    value='hard'
                    onClick={deck}
                />
            </div>
        </div>
    );
};

export default Difficulty;