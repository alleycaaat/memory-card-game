/* eslint-disable react/prop-types */
const StartBtn = ({ details, setDetails, countCards }) => {
    const { count, category, difficulty } = details;
    const start = () => {
        //** veryify all necessary information is in state
        setDetails({ ...details, display: '' });
        switch (true) {
            case count === 0:
                setDetails({
                    ...details,
                    display: 'Please choose a card amount',
                });
                break;
            case (category === undefined || category === ''):
                setDetails({
                    ...details,
                    display: 'Please select a category'
                });
                break;
            case (difficulty === undefined || difficulty === ''):
                setDetails({
                    ...details,
                    display: 'Please select a difficulty level',
                });
                break;
            default:
                //**start deck building process
                countCards();
                break;
        }
    };

    return (
        <button className='option' onClick={start}>Start</button>
    );
};

export default StartBtn;