import React, { Component, createElement } from 'react';
import ReactDOM from 'react-dom';
import { Canvas } from './Canvas';
import { GlobalInfo } from './Model/GlobalInfo/GlobalInfo';
import { forceGetInputString } from './MiscFuncs/getInputString';
import { HomeComponent } from './React/Home/Home';
import { loadName } from './MiscFuncs/LoadName';

class MainDiv extends Component<{}, {}> {
    render() {
        return <HomeComponent></HomeComponent>;
    }
}

loadName();

const domContainer = document.querySelector('#reactDom');
ReactDOM.render(createElement(MainDiv), domContainer);
