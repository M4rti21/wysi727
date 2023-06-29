import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter} from "react-router-dom"
import 'bootstrap/dist/js/bootstrap.min';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'react-tooltip/dist/react-tooltip.css'
import {Tooltip as ReactTooltip} from "react-tooltip";
import {ParallaxProvider} from "react-scroll-parallax";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <BrowserRouter>
        <ParallaxProvider>
            <ReactTooltip id="reactTooltip" style={{zIndex: 100}}/>
            <App/>
        </ParallaxProvider>
    </BrowserRouter>
);