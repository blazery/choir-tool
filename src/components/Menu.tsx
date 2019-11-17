import { observer } from 'mobx-react';
import React from 'react';
import AppStore from '../stores/AppStore';
import CardsMenu from './CardsMenu';
import GroupsMenu from './GroupsMenu';
import './Menu.css';

@observer
export default class Menu extends React.PureComponent {
    public render() {
        const value = AppStore.getStore().value;
        return (
            <div className="menu-container">
                <CardsMenu />
                <GroupsMenu />
            </div>
        );
    }
}
