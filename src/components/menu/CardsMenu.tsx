import { observer } from 'mobx-react';
import React from 'react';
import AppStore from '../../stores/AppStore';
import CardMenuItem from './CardMenuItem';

interface IState {
    newCardName: string;
    selectedGroup: string;
}

@observer
export default class CardsMenu extends React.PureComponent<{}, IState> {
    public state = {
        newCardName: '',
        selectedGroup: ''
    };
    private addCard = () => {
        AppStore.getStore().cardStore.addCard(this.state.newCardName, this.state.selectedGroup);
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

    private onGroupChange = (ev: React.FormEvent<HTMLSelectElement>) => {
        this.setState({ selectedGroup: ev.currentTarget.value });
    }

    public render() {
        const list = AppStore.getStore().cardStore.cardList;
        const allGroups = AppStore.getStore().cardStore.groupList;
        const mainGroup = AppStore.getStore().cardStore.cardGroupsById[this.state.selectedGroup];
        const selectStyle = !!mainGroup
            ? {
                  background: mainGroup.color
              }
            : {};
        return (
            <div className="menu__cards">
                <div className="menu__header">
                    <div className="menu__header__inner">
                        <span>Cards:</span>
                    </div>
                </div>
                <div className="menu__content">
                    {list.map((c) => (
                        <CardMenuItem key={c.id} card={c} />
                    ))}
                </div>
                <div className="menu__controls">
                    <div className="input-container">
                        <input
                            placeholder="card name"
                            onChange={this.onChange}
                            onKeyDown={this.handleNameEnter}
                            value={this.state.newCardName}
                        />
                        <select
                            style={selectStyle}
                            onChange={this.onGroupChange}
                            value={mainGroup && mainGroup.id}
                        >
                            <option key={'unknown'}>no group</option>
                            {allGroups.map((g) => (
                                <option style={{ background: g.color }} key={g.id} value={g.id}>
                                    {g.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="menu__controls__button-container">
                        <button onClick={this.addCard}>
                            <span className="fas fa-plus" />
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}
