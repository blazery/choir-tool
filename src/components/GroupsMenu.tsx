import { observer } from 'mobx-react';
import React from 'react';
import AppStore from '../stores/AppStore';
import GroupMenuItem from './GroupMenuItem';

interface IState {
    newCardName: string;
}

@observer
export default class GroupsMenu extends React.PureComponent<{}, IState> {
    public state = {
        newCardName: ''
    };
    private addCard = () => {
        AppStore.getStore().cardStore.addGroup(this.state.newCardName);
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
        const list = AppStore.getStore().cardStore.groupList;
        return (
            <div className="menu__groups">
                <div className="menu__groups--header">Groups:</div>
                {list.map((c) => (
                    <GroupMenuItem key={c.id} group={c} />
                ))}
                <input
                    placeholder="group name"
                    onChange={this.onChange}
                    onKeyDown={this.handleNameEnter}
                    value={this.state.newCardName}
                />
                <button onClick={this.addCard}>Add</button>
            </div>
        );
    }
}
