import { useState, useEffect, useRef } from 'react';
import api from './api';
import CardDeck from './components/CardDeck';
import './style.css';
import Loading from './components/loading';
import Difficulty from './components/Difficulty';
import Options from './components/Options';
import Count from './components/Count';
import Rules from './components/Rules';

function App() {
    const [orgCards, setOrgCards] = useState([]); //original starting card deck from server
    const [picked, setPicked] = useState([]); //holds picked cards
    const [dup, setDup] = useState([]); //duplicate deck to easier match comparison
    const [deck, setDeck] = useState([]); //deck to be used for play

    const [running, setRunning] = useState(false); //timer run status
    const [timer, setTimer] = useState(0);
    const [loading, setLoading] = useState(false);

    const [score, setScore] = useState(0)
    const [matches, setMatches] = useState(0)

    const initialState = {
        category: '',
        isDiff: false,
        count: 0,
        display: '',
        rulesstate: false
    };
    const [details, setDetails] = useState(initialState);
    const { category, isDiff, count, display, rulesstate } = details;

    const tick = useRef(null);

    //handles the timer
    useEffect(() => {
        if (running) {
            tick.current = setInterval(() => {
                setTimer((timer) => timer + 1);
            }, 1000);
        }
        return () => clearInterval(tick.current); //clear on unmount
    });

    //fires when category is changed
    useEffect(() => {
        //eliminate api call error by exiting
        if (category === undefined) {
            return console.log('exit early')
        }
        if (category !== '') {
        let carddeck = [];
        let running = true;
        setLoading(true);
        //api call to get card deck based on the category
        const getDeck = async () => {
            await api
                .cards(category)
                .then((cards) => {
                    //map over the data and push it to an array with proper formatting
                    cards.map((card, i) => {
                        carddeck.push({
                            name: card.data.name,
                            value: card.data.value,
                            index: i,
                        });
                        return carddeck;
                    });
                    //end loading screen once api call and mapping is complete
                    setLoading(false);
                    if (running) {
                        setOrgCards(carddeck);
                    }
                })
                .catch((e) => {
                    console.log('API error ', e);
                });
        };
        //call the function
        getDeck();
        return () => (running = false);
    }
    }, [category]);

    //toggle visibility of rules
    const rules = () => {
        let currentState = rulesstate
        setDetails({...details, rulesstate: !currentState})
    }
    //handles game options
    const deckOptions = (e) => {
        //if there's an error message, remove it
        setDetails({ ...details, display: '' });
        //if a game is in play, stop it
        if (running) {
            reset();
            clearInterval(tick.current);
        }
        const { name, value } = e.target;
        setDetails((prevState) => ({ ...prevState, [name]: value }));
    };

    //handles counting out card amount
    const countCards = () => {
        let temp = [];
        let counted;
        temp = [...orgCards].sort(() => Math.random() - 0.5); //shuffle original array
        counted = temp.slice(0, count); //get correct amount of cards
        shuffleDeck(counted);
    };

    //handles shuffling the deck
    const shuffleDeck = (shuffled) => {
        let copy = [];
        let final = [];
        //if playing difficult, need to get the match card
        if (isDiff==='true') {
            shuffled.map((card) => {
                copy.push({
                    name: card.name,
                    value: card.value.concat('2'),
                });
                return copy;
            });
            //double the cards, shuffle, return
            let doubled = copy.concat(shuffled);
            doubled.sort(() => Math.random() - 0.5);
            doubled.map((card, i) => {
                final.push({
                    name: card.name,
                    value: card.value,
                    flipped: false,
                    match: false,
                    index: i,
                });
                return final;
            });
        }else{
            //if playing easy, double the deck, shuffle
            let doubled = shuffled.concat(shuffled);
            doubled.sort(() => Math.random() - 0.5);
            doubled.map((card, i) => {
                final.push({
                    name: card.name,
                    value: card.name,
                    index: i,
                    flipped: false,
                    match: false,
                });
                return final;
            });
        }
        //set the deck to play with, then duplicate for comparison
        //end loading screen, start timer
        setDeck(final);
        setDup(final);
        setLoading(false);
        setRunning(true);
    };
    //handles reset button
    const reset = () => {
        setRunning(false);
        setScore(0)
        setMatches(0)
        setDetails({ initialState });
        setTimer(0);
        setDeck([]);
        setPicked([]);
    };

    //handles start button
    const start = () => {
        //veryify all necessary information is in state
        setDetails({...details, display: ''})
        if (count === 0) {
            return setDetails({
                ...details,
                display: 'Please choose a card amount',
            });
        }
        if (category === undefined) {
            return setDetails({
                ...details,
                display: 'Please select a category'
            });
        }
        if (isDiff === undefined) {
            return setDetails({
                ...details,
                display: 'Please select a difficulty level',
            });
        }
        //set loading screen, start deck building process
        setLoading(true);
        countCards();        
    };

    //handles winning game
    const gameOver = () => {
        if (matches === count - 1) {
            setRunning(false);
            setDetails({display: 'You won!' })
        }
    };

    //checks cards for match, responds accordingly
    const check = () => {
        let match = picked[0].name === picked[1].name;
        if (match) {
            setDeck(dup);
            setPicked([]);
            setMatches((matches) => matches + 1);
            gameOver();
        } else {
            setTimeout(() => {
                dup[picked[0].index].flipped = false;
                dup[picked[1].index].flipped = false;
                dup[picked[0].index].match = false;
                dup[picked[1].index].match = false;
            }, 650);
            
            setScore((score) => score + 1);
            setDeck(dup);
            setPicked([]);
        }
    };

    //handles card selection
    const clicked = (card) => {
        let index = card.index;
        let name = card.name;

        if (picked.length === 2) {
            setTimeout(() => {
                check();
            }, 750);
        }
        //optimistically set flipped and match to true
        dup[index].flipped = true;
        dup[index].match = true;
        setDup(dup);

        picked.push({ name, index });
        setPicked(picked);
        if (picked.length === 2) {
            setTimeout(() => {
                check();
            }, 750);
        }
    };

    return (
        <div className='wrapper'>
            <div className='heading'>
                <h1>Memory Game</h1>
            </div>
            {!running && (
                <>
                    <h2>Category:</h2>
                    <Options deck={deckOptions} />
                    <h2>Difficulty level:</h2>
                    <Difficulty deck={deckOptions} />
                    <h2>Card amount:</h2>
                    <Count deck={deckOptions} />
                </>
            )}
            <div className='miscbuttons'>
                <button className='option' onClick={start}>
                    Start
                </button>
                <button className='option' onClick={reset}>
                    Reset
                </button>
                <button className='option' onClick={rules}>
                    Rules
                </button>
            </div>
            <div className='bottom'>
                <div className='display'>
                    {timer}
                    {timer === 1 ? ' second' : ' seconds'}
                </div>
                <div className='display'>
                    {score}
                    {score === 1 ? ' incorrect guess' : ' incorrect guesses'}
                </div>
            </div>
            <div className='display msg'>{display}</div>
            {loading && <Loading />}
            {rulesstate && <Rules />}
            <div className='cardHolder'>
                {deck.map((card, i) => (
                    <div key={i}>
                        <CardDeck
                            index={card.index}
                            card={card}
                            flipped={card.flipped}
                            match={card.match}
                            value={card.value}
                            clicked={clicked}
                        ></CardDeck>
                    </div>
                ))}
            </div>
            <div className='credit'>
                <p>
                    Created by{' '}
                    <a
                        href='https://achulslander.com/'
                        target='_blank'
                        rel='noreferrer'
                    >
                        AC Hulslander
                    </a>
                </p>
                <p>
                    <a
                        href='https://github.com/alleycaaat/memory-card-game'
                        target='_blank'
                        rel='noreferrer'
                    >
                        See this web-app on GitHub
                    </a>
                </p>
                <p>
                    <a
                        href='https://codepen.io/alleycaaat/pens/public'
                        target='_blank'
                        rel='noreferrer'
                    >
                        See my pens
                    </a>
                </p>
                <p className='smol'>
                    All isons are from{' '}
                    <a
                        target='_blank'
                        href='https://icons8.com'
                        rel='noreferrer'
                    >
                        Icons8
                    </a>
                </p>
            </div>
        </div>
    );
}

export default App;
