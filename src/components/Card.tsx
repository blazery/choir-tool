import { observer } from 'mobx-react';
import React from 'react';
import {
    DragElementWrapper,
    DragSource,
    DragSourceConnector,
    DragSourceMonitor,
    DragSourceOptions
} from 'react-dnd';
import INameCard from '../interfaces/ICard';
import AppStore from '../stores/AppStore';
import { getClientRectOfRef } from '../utils/clientRectUtil';
import './Card.css';

interface IProps {
    id: string;
    connectDragSource: DragElementWrapper<DragSourceOptions>;
}

@observer
export class Card extends React.PureComponent<IProps, {}> {
    public ref?: HTMLDivElement | null;

    private onWindowResize = () => {
        if (this.checkRepositionNeeded()) this.resetCardPosition();
    }
    private resetCardPosition = () => {
        const store = AppStore.getStore();
        store.cardStore.moveCard(this.props.id, { x: 10, y: 10 });
    }
    private checkRepositionNeeded = () => {
        const cardSize = getClientRectOfRef(this.ref);
        const store = AppStore.getStore();
        const boardSize = store.boardStore.boardSize;
        if (cardSize && boardSize) {
            if (
                cardSize.x < boardSize.x ||
                cardSize.x + cardSize.width > boardSize.x + boardSize.width ||
                cardSize.y < boardSize.y ||
                cardSize.y + cardSize.height > boardSize.y + boardSize.height
            ) {
                return true;
            }
        }
        return false;
    }

    private getGroupStyle(card: INameCard) {
        const groups = AppStore.getStore().cardStore.getCardGroups(card);
        const group = groups && groups.length && groups[0];
        const style: React.CSSProperties = {
            backgroundColor: group ? group.color : '#fdfdfd'
        };
        return style;
    }

    public componentDidUpdate(props: IProps) {
        if (this.checkRepositionNeeded()) this.resetCardPosition();
    }

    public render() {
        const { id, connectDragSource } = this.props;
        const card = AppStore.getStore().cardStore.cardsById[id];

        if (!card) return null;

        let style: React.CSSProperties = this.getGroupStyle(card);
        if (card.offset) {
            style = {
                ...style,
                position: 'absolute' as 'absolute',
                top: card.offset.y + 'px',
                left: card.offset.x + 'px'
            };
        }

        return connectDragSource(
            <div className="card" ref={(ref) => (this.ref = ref)} style={style}>
                <div className="card__content">
                    <span className="card__content__name">{card.name}</span>
                </div>
            </div>
        );
    }
}

const cardSource = {
    beginDrag(props: IProps) {
        const item = { id: props.id };
        return item;
    },

    endDrag(props: IProps, monitor: DragSourceMonitor, component: Card) {
        if (!monitor.didDrop()) {
            return;
        }
    }
};

function collect(connect: DragSourceConnector, monitor: DragSourceMonitor) {
    return {
        connectDragSource: connect.dragSource()
    };
}

export default DragSource('drag-source-card', cardSource, collect)(Card);
