import React from 'react';
import ReactDOM  from 'react-dom/client';
import Header from './components/header';
import Footer from './components/footer';
import Vision from './components/vision';
import {LeftRight,} from './components/background';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <div>
        <Header/>
        <Vision />
        <LeftRight/>
        <Footer/>
    </div>
)
