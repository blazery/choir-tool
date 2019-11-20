import { observer } from 'mobx-react';
import React from 'react';
import CardsMenu from './CardsMenu';
import GroupsMenu from './GroupsMenu';
import './Menu.css';

@observer
export default class Menu extends React.PureComponent {
    public render() {
        return (
            <div className="menu-container">
                <div className="menu-container__header"></div>
                <CardsMenu />
                <GroupsMenu />
            </div>
        );
    }
}
