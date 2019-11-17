import { observer } from 'mobx-react';
import React, { FormEvent } from 'react';
import INameCard from '../interfaces/ICard';
import AppStore from '../stores/AppStore';

interface IProps {
    card: INameCard;
}

@observer
export default class CardMenuItem extends React.PureComponent<IProps> {
    private onChange = (ev: FormEvent<HTMLInputElement>) => {
        const cardInStore = AppStore.getStore().cardStore.cardsById[this.props.card.id];
        if (cardInStore) {
            cardInStore.name = ev.currentTarget.value;
        }
    }

    private onGroupChange = (ev: FormEvent<HTMLSelectElement>) => {
        const cardInStore = AppStore.getStore().cardStore.cardsById[this.props.card.id];
        if (cardInStore) {
            cardInStore.groups = [ev.currentTarget.value];
        }
    }

    private deleteCard = () => {
        AppStore.getStore().cardStore.removeCard(this.props.card.id);
    }

    public render() {
        const { card } = this.props;
        const store = AppStore.getStore();
        const groups = store.cardStore.getCardGroups(card);
        const mainGroup = groups && groups.length && groups[0];
        const allGroups = store.cardStore.groupList;
        return (
            <div className="menu__card--content">
                <input value={card.name} onChange={this.onChange} />
                <select onChange={this.onGroupChange} value={mainGroup && mainGroup.id}>
                    <option key={'unknown'}>no group</option>
                    {allGroups.map((g) => (
                        <option key={g.id} value={g.id}>
                            {g.name}
                        </option>
                    ))}
                </select>
                <button onClick={this.deleteCard}>DEL</button>
            </div>
        );
    }
}
