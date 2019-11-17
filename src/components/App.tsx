import React from 'react';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import './App.css';
import Menu from './Menu';
import WorkArea from './WorkArea';

class App extends React.PureComponent {
    public render() {
        return (
            <DndProvider backend={HTML5Backend}>
                <div className="App">
                    <Menu />
                    <WorkArea />
                </div>{' '}
            </DndProvider>
        );
    }
}

export default App;
