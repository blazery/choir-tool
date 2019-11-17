import { observer } from 'mobx-react';
import React from 'react';
import AppStore from '../stores/AppStore';
import './App.css';

@observer
class App extends React.PureComponent {
    public render() {
        const value = AppStore.getStore().value;
        return (
            <div className="App">
                <p>{value}</p>
                <button
                    onClick={() => {
                        AppStore.getStore().incrementValue();
                    }}
                />
            </div>
        );
    }
}

export default App;
