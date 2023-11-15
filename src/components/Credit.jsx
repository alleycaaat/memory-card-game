const Credit = () => {
    return (
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
                    href='https://github.com/alleycaaat/memory-game'
                    target='_blank'
                    rel='noreferrer noopener'
                >
                    View this project on GitHub
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
                All icons are from{' '}
                <a
                    target='_blank'
                    href='https://icons8.com'
                    rel='noreferrer'
                >
                    Icons8
                </a>
            </p>
        </div>
    );
};

export default Credit;
