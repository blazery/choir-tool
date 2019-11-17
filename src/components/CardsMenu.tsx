import { observer } from 'mobx-react'
import React from 'react'
import AppStore from '../stores/AppStore'
import './Menu.css'

@observer
export default class CardsMenu extends React.PureComponent {
    public render() {
        const list = AppStore.getStore().cardStore.cardList
        return <div className="menu__cards">{list.map(l => {})}</div>
    }
}
