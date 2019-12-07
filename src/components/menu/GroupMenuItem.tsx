import { observer } from 'mobx-react'
import React, { FormEvent } from 'react'
import { ICardGroups } from '../../interfaces/ICard'
import AppStore from '../../stores/AppStore'

interface IProps {
    group: ICardGroups
}

@observer
export default class GroupMenuItem extends React.PureComponent<IProps> {
    private onChange = (ev: FormEvent<HTMLInputElement>) => {
        const groupInStore = AppStore.getStore().cardStore.cardGroupsById[this.props.group.id]
        if (groupInStore) {
            groupInStore.name = ev.currentTarget.value
        }
    }

    private onGroupColorChange = (ev: FormEvent<HTMLInputElement>) => {
        const groupInStore = AppStore.getStore().cardStore.cardGroupsById[this.props.group.id]
        if (groupInStore) {
            groupInStore.color = ev.currentTarget.value
        }
    }

    private deleteCard = () => {
        AppStore.getStore().cardStore.removeGroup(this.props.group.id)
    }

    public render() {
        const { group } = this.props
        return (
            <div className="menu__card--content">
                <div className="input-container">
                    <input type="text" value={group.name} onChange={this.onChange} />
                    <input type="color" value={group.color} onChange={this.onGroupColorChange} />
                </div>
                <div className="menu__card--content__button-container">
                    <button onClick={this.deleteCard}>
                        <span className="fas fa-trash-alt" />
                    </button>
                </div>
            </div>
        )
    }
}
