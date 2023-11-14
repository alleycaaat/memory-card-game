/* eslint-disable react/prop-types */
import { CardAmountBtn } from '../util/buttons';

/* eslint-disable react/no-unknown-property */
const CardAmount = ({ deck, details }) => {

    return (
        <div className='selection-wrapper'>
            <h2>Card amount:</h2>
            <div role='group' className='top'>
                <CardAmountBtn
                    value='5'
                    onClick={deck}
                    details={details}
                    title='Few'
                />
                <CardAmountBtn
                    value='10'
                    onClick={deck}
                    details={details}
                    title='Moderate'
                />
                <CardAmountBtn
                    value='15'
                    onClick={deck}
                    details={details}
                    title='Lots'
                />
            </div>
        </div>
    );
};

export default CardAmount;