import { observer } from 'mobx-react';
import React, { FormEvent } from 'react';
import INameCard, { ICardGroups } from '../interfaces/ICard';
import AppStore from '../stores/AppStore';

interface IProps {
    group: ICardGroups;
}

@observer
export default class GroupMenuItem extends React.PureComponent<IProps> {
    private onChange = (ev: FormEvent<HTMLInputElement>) => {
        const groupInStore = AppStore.getStore().cardStore.cardGroupsById[this.props.group.id];
        if (groupInStore) {
            groupInStore.name = ev.currentTarget.value;
        }
    }

    private onGroupColorChange = (ev: FormEvent<HTMLInputElement>) => {
        const groupInStore = AppStore.getStore().cardStore.cardGroupsById[this.props.group.id];
        if (groupInStore) {
            groupInStore.color = ev.currentTarget.value;
        }
    }

    private deleteCard = () => {
        AppStore.getStore().cardStore.removeGroup(this.props.group.id);
    }

    public render() {
        const { group } = this.props;
        const store = AppStore.getStore();
        return (
            <div className="menu__card--content">
                <input value={group.name} onChange={this.onChange} />
                <input type="color" value={group.color} onChange={this.onGroupColorChange} />
                <button onClick={this.deleteCard}>DEL</button>
            </div>
        );
    }
}
