import React from 'react';
import ScrollLoading from './components/scrollLoading.js';
import MoreLoading from './components/moreLoading.js';

const App = () => {
    return (
        <div className='app'>
            <ScrollLoading />
            <MoreLoading />
        </div>
    )
}

export default App;