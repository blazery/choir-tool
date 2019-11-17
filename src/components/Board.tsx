import { observer } from 'mobx-react';
import React from 'react';
import { DragElementWrapper, DropTarget, DropTargetConnector, DropTargetMonitor } from 'react-dnd';
import AppStore from '../stores/AppStore';
import { getClientRectOfRef } from '../utils/clientRectUtil';
import './Board.css';
import Card from './Card';

interface IProps {
    connect: DragElementWrapper<Board>;
}

@observer
export class Board extends React.PureComponent<IProps, {}> {
    public ref?: HTMLDivElement | null;

    public componentDidUpdate() {
        const boardSize = getClientRectOfRef(this.ref);
        if (boardSize) {
            AppStore.getStore().boardStore.boardSize = boardSize;
        }
    }

    public componentDidMount() {
        const boardSize = getClientRectOfRef(this.ref);
        if (boardSize) {
            AppStore.getStore().boardStore.boardSize = boardSize;
        }
    }

    public render() {
        const { connect } = this.props;
        const cardList = AppStore.getStore().cardStore.cardList;

        return connect(
            <div ref={(ref) => (this.ref = ref)} className="board-container">
                {cardList.map((c) => (
                    <Card key={c.id} id={c.id} />
                ))}
            </div>
        );
    }
}

const spec = {
    drop: (props: IProps, monitor: DropTargetMonitor, component: Board) => {
        if (monitor.didDrop()) {
            return;
        }

        const item = monitor.getItem();
        const location = monitor.getSourceClientOffset();
        const itemOffset = getClientRectOfRef(component.ref);
        if (!location || !item || !itemOffset) return false;

        const calcLocation = {
            x: location.x - itemOffset.x,
            y: location.y - itemOffset.y
        };
        const result = AppStore.getStore().cardStore.moveCard(item.id, calcLocation);

        return { result };
    }
};
function collect(connect: DropTargetConnector, monitor: DropTargetMonitor) {
    return {
        connect: connect.dropTarget()
    };
}

export default DropTarget('drag-source-card', spec, collect)(Board);
