/* eslint-disable react/prop-types */
import { OptionsBtn } from '../util/buttons';

const DeckCategory = ({ deckOptions, category }) => {
    return (
        <div className='selection-wrapper'>
            <h2>Category:</h2>
            <div role='group' className='top'>
                <OptionsBtn
                    onClick={deckOptions}
                    category={category}
                    value='programming'>
                    Coding
                </OptionsBtn>
                <OptionsBtn
                    onClick={deckOptions}
                    category={category}
                    value='colors'>
                    Colors
                </OptionsBtn>
                <OptionsBtn
                    onClick={deckOptions}
                    category={category}
                    value='math'>
                    Math
                </OptionsBtn>
            </div>
        </div>
    );
};

export default DeckCategory;