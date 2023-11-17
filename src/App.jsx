import { useState, useEffect, useRef } from 'react';

//** import helpers
import { getCards } from './hooks/helpers';

//** import utilities
import { ResetBtn, RulesBtn } from './util/buttons';
import { Rules, Scoring } from './util/display';

//** import components
import DeckCategory from './components/DeckCategory';
import Difficulty from './components/Difficulty';
import CardAmount from './components/CardAmount';
import StartBtn from './components/StartBtn';
import Credit from './components/Credit';
import Card from './components/card';
import Loading from './loading';

function App() {
	const [orgCards, setOrgCards] = useState([]); //original starting card deck from server
	const [picked, setPicked] = useState([]); //holds picked cards
	const [dup, setDup] = useState([]); //duplicate deck to easier match comparison
	const [deck, setDeck] = useState([]); //deck to be used for play

	const [running, setRunning] = useState(false); //timer run status
	const [timer, setTimer] = useState(0);
	const [loading, setLoading] = useState(false);

	const [score, setScore] = useState(0);
	const [matches, setMatches] = useState(0);

	const tick = useRef(null);

	const initialState = {
		category: '',
		difficulty: '',
		count: 0,
		display: '',
		rulesstate: false
	};

	const [details, setDetails] = useState(initialState);
	const { category, count, display, rulesstate, difficulty } = details;

	//start things up when the category changes
	useEffect(() => {
		startUp();
	}, [category]);

	//** when a category is selected, get that deck and format the info into an array
	const startUp = () => {
		if (category === undefined) {
			return console.log('exit early');
		}

		if (category !== '') {
			setLoading(true);
			setOrgCards([])
		
			let cards = [];
			const promise = getCards(category);
			promise.then(
				function (res) {
					res.map((card) => {
						cards.push({
							name: card.customID,
							value: card.customID,
						});
					});
					setOrgCards(cards);
				}
			);
			setLoading(false);
		}
	};

	//** handles timer
	useEffect(() => {
		if (running) {
			tick.current = setInterval(() => {
				setTimer((timer) => timer + 1);
			}, 1000);
		}
		return () => clearInterval(tick.current); //clear on unmount
	});

	//** toggle visibility of rules
	const rules = () => {
		let currentState = rulesstate;
		setDetails({ ...details, rulesstate: !currentState });
	};

	//** when deck options get changed
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

	//** count out the card amount, send them to be shuffled
	const countCards = () => {
		let temp = [];
		let counted;
		temp = [...orgCards].sort(() => Math.random() - 0.5); //shuffle original array
		counted = temp.slice(0, count); //get correct amount of cards
		shuffleDeck(counted);
	};

	//** handles shuffling the deck
	const shuffleDeck = (shuffled) => {
		setLoading(true);
		let copy = [];
		let final = [];
		//if playing hard level, need to make the matching card
		if (difficulty === 'hard') {
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
		} else {
			//if playing easy, double the deck, shuffle
			let doubled = shuffled.concat(shuffled);
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
		}
		//set the deck to play with, then duplicate for comparison
		//end loading screen, start timer
		setDeck(final);
		setDup(final);
		setLoading(false);
		setRunning(true);
	};

	//** reset errything
	const reset = () => {
		setRunning(false);
		setDetails({ initialState });
		setMatches(0);
		setScore(0);
		setTimer(0);
		setDeck([]);
		setPicked([]);
		setOrgCards([])
	};

	//** handles game being won/over
	const gameOver = () => {
		if (matches === count - 1) {
			setRunning(false);
			setDetails({ display: 'You won!' });
		}
	};

	//** check if the cards match
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
			}, 50);

			setScore((score) => score + 1);
			setDeck(dup);
			setPicked([]);
		}
	};

	//** handles card selections
	const clicked = (card) => {
		const { name, index } = card;

		//** optimistically set flipped and match to true
		dup[index].flipped = true;
		dup[index].match = true;
		setDup(dup);

		picked.push({ name, index });
		setPicked(picked);

		if (picked.length === 2) {
			setTimeout(() => {
				check();
			}, 150);
		}
	};

	return (
		<div className='wrapper'>
			<h1>Memory Game</h1>

			<DeckCategory deckOptions={deckOptions} category={category} />
			<Difficulty details={details} deck={deckOptions} />
			<CardAmount details={details} deck={deckOptions} />

			<div className='miscbuttons'>
				<StartBtn
					details={details}
					setDetails={setDetails}
					setLoading={setLoading}
					countCards={countCards}
				/>
				<ResetBtn onClick={reset} />
				<RulesBtn onClick={rules} />
			</div>

			{rulesstate && <Rules />}
			{loading && <Loading />}

			<Scoring timer={timer} score={score} />

			<div className='display msg'>{display}</div>
			<div className='cardHolder'>
				{deck.map((card, i) => (
					<div key={i}>
						<Card
							card={card}
							clicked={clicked}
						/>
					</div>
				))}
			</div>
			<Credit />
		</div>
	);
}

export default App;
