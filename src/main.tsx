import React from 'react';
import ReactDOM from 'react-dom/client';
import { TerminaltorApp } from './components/TerminaltorApp';
import './styles/normalize.css';
import './styles/variables.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <TerminaltorApp />
    </React.StrictMode>
);
