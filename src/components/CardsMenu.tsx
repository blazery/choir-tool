import { observer } from 'mobx-react';
import React from 'react';
import AppStore from '../stores/AppStore';
import CardMenuItem from './CardMenuItem';

interface IState {
    newCardName: string;
}

@observer
export default class CardsMenu extends React.PureComponent<{}, IState> {
    public state = {
        newCardName: ''
    };
    private addCard = () => {
        AppStore.getStore().cardStore.addCard(this.state.newCardName);
        this.setState({ newCardName: '' });
    }

    private onChange = (ev: React.FormEvent<HTMLInputElement>) => {
        this.setState({ newCardName: ev.currentTarget.value });
    }
    private handleNameEnter = (ev: React.KeyboardEvent) => {
        if (ev.nativeEvent.key === 'Enter') {
            this.addCard();
        }
    }

    public render() {
        const list = AppStore.getStore().cardStore.cardList;
        return (
            <div className="menu__cards">
                <div className="menu__cards--header">Cards:</div>
                {list.map((c) => (
                    <CardMenuItem key={c.id} card={c} />
                ))}
                <input
                    placeholder="card name"
                    onChange={this.onChange}
                    onKeyDown={this.handleNameEnter}
                    value={this.state.newCardName}
                />
                <button onClick={this.addCard}>Add</button>
            </div>
        );
    }
}
