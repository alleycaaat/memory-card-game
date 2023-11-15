/* eslint-disable react/prop-types */
const StartBtn = ({ details, setDetails, setLoading, countCards }) => {
    const { count, category, difficulty } = details;

    const start = () => {
        //** veryify all necessary information is in state
        setDetails({ ...details, display: '' });
        if (count === 0) {
            return setDetails({
                ...details,
                display: 'Please choose a card amount',
            });
        }
        if (category === undefined || category === '') {
            return setDetails({
                ...details,
                display: 'Please select a category'
            });
        }
        if (difficulty === undefined || difficulty === '') {
            return setDetails({
                ...details,
                display: 'Please select a difficulty level',
            });
        }

        //**activate loading screen, start deck building process
        setLoading(true);
        countCards();
    };
    return (
        <button className='option' onClick={start}>Start</button>
    );
};

export default StartBtn;