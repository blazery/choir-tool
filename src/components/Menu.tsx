import { observer } from 'mobx-react';
import React from 'react';
import AppStore from '../stores/AppStore';
import './Menu.css';

@observer
export default class Menu extends React.PureComponent {
    public render() {
        const value = AppStore.getStore().value;
        return (
            <div className="menu-container">
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
