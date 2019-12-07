import { observer } from 'mobx-react'
import React from 'react'
import AppStore from '../../stores/AppStore'
import GroupMenuItem from './GroupMenuItem'

interface IState {
    newCardName: string
    color: string
}

@observer
export default class GroupsMenu extends React.PureComponent<{}, IState> {
    private static DEFAULT_COLOR = '#000000'

    public state = {
        newCardName: '',
        color: GroupsMenu.DEFAULT_COLOR
    }

    private addCard = () => {
        const color = this.state.color
        AppStore.getStore().cardStore.addGroup(
            this.state.newCardName,
            color === GroupsMenu.DEFAULT_COLOR ? undefined : color
        )
        this.setState({ newCardName: '', color: GroupsMenu.DEFAULT_COLOR })
    }

    private onChange = (ev: React.FormEvent<HTMLInputElement>) => {
        this.setState({ newCardName: ev.currentTarget.value })
    }

    private handleNameEnter = (ev: React.KeyboardEvent) => {
        if (ev.nativeEvent.key === 'Enter') {
            this.addCard()
        }
    }
    private onGroupColorChange = (ev: React.FormEvent<HTMLInputElement>) => {
        this.setState({ color: ev.currentTarget.value })
    }

    public render() {
        const list = AppStore.getStore().cardStore.groupList
        return (
            <div className="menu__groups">
                <div className="menu__header">
                    <div className="menu__header__inner">
                        <span>Groups:</span>
                    </div>
                </div>
                <div className="menu__content">
                    {list.map(c => (
                        <GroupMenuItem key={c.id} group={c} />
                    ))}
                </div>
                <div className="menu__controls">
                    <div className="input-container">
                        <input
                            type="text"
                            placeholder="group name"
                            onChange={this.onChange}
                            onKeyDown={this.handleNameEnter}
                            value={this.state.newCardName}
                        />
                        <input
                            type="color"
                            value={this.state.color}
                            onChange={this.onGroupColorChange}
                        />
                    </div>
                    <div className="menu__controls__button-container">
                        <button onClick={this.addCard}>
                            <span className="fas fa-plus" />
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}
