import { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Terminal } from './components/Terminal';

function App() {
    const [count, setCount] = useState(0);

    return (
        <div className="App">
            <Terminal />
        </div>
    );
}

export default App;
