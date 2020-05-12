import React from 'react';
import { render } from 'react-dom';
import App from './app.js';


const Main = () => {
    return (
        <>
            <App />
        </>
    )
}

render(<Main />, document.getElementById('root'));