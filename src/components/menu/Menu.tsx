import { observer } from 'mobx-react';
import React from 'react';
import CardsMenu from './CardsMenu';
import GroupsMenu from './GroupsMenu';
import './Menu.css';
import MenuTab from './MenuTab';
import MenuTabButton from './MenuTabButton';
import SettingsMenu from './SettingsMenu';

enum Tabs {
    CARDS = 'CARDS',
    SETTINGS = 'SETTINGS'
}

@observer
export default class Menu extends React.PureComponent {
    public state = {
        activeTab: Tabs.CARDS
    };

    private setActiveTab = (tab: Tabs) => {
        this.setState({ activeTab: tab });
    }

    public render() {
        const { activeTab } = this.state;
        return (
            <div className="menu-container">
                <div className="menu-container__header">
                    <MenuTabButton
                        text={'Info'}
                        active={activeTab === Tabs.CARDS}
                        onClick={() => this.setActiveTab(Tabs.CARDS)}
                    />
                    <MenuTabButton
                        text={'Settings'}
                        active={activeTab === Tabs.SETTINGS}
                        onClick={() => this.setActiveTab(Tabs.SETTINGS)}
                    />
                </div>
                <MenuTab active={activeTab === Tabs.CARDS}>
                    <CardsMenu />
                    <GroupsMenu />
                </MenuTab>
                <MenuTab active={activeTab === Tabs.SETTINGS}>
                    <SettingsMenu />
                </MenuTab>
            </div>
        );
    }
}
