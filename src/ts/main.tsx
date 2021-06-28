import React, { Component, createElement } from 'react';
import ReactDOM from 'react-dom';
import { Canvas } from './Canvas';

class MainDiv extends Component<{}, {}> {
    render() {
        return (
            <div>
                <Canvas />
            </div>
        );
    }
}

const domContainer = document.querySelector('#reactDom');
ReactDOM.render(createElement(MainDiv), domContainer);
