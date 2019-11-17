import React from 'react';
import Board from './Board';
import './WorkArea.css';

export default class WorkArea extends React.PureComponent {
    public render() {
        return (
            <div className="work-area-container">
                <Board />
            </div>
        );
    }
}
