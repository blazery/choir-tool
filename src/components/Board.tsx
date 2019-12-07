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
    private isDragging = false;
    public ref?: HTMLDivElement | null;

    private updateSizeInStore = () => {
        const boardSize = getClientRectOfRef(this.ref);
        if (boardSize) {
            AppStore.getStore().boardStore.boardSize = boardSize;
        }
    }

    private pointerDownHandler = (e: PointerEvent) => {
        e.preventDefault();
        if (this.ref && e.button === 0) {
            this.isDragging = true;
            this.ref.addEventListener('pointerup', this.pointerUpHandler);
            this.ref.addEventListener('pointermove', this.pointerMoveHandler);
        }
    }

    private pointerUpHandler = (e: PointerEvent) => {
        this.isDragging = false;

        if (this.ref) {
            this.ref.removeEventListener('pointerup', this.pointerUpHandler);
            this.ref.removeEventListener('pointermove', this.pointerMoveHandler);
        }
    }

    private pointerMoveHandler = (e: PointerEvent) => {
        if (this.isDragging) {
            const bs = AppStore.getStore().boardStore;
            const { viewerOffset } = bs;
            const newViewerOffset = viewerOffset
                ? { x: viewerOffset.x + e.movementX, y: viewerOffset.y + e.movementY }
                : { x: 0, y: 0 };
            bs.setViewerOffset(newViewerOffset);
        }
    }

    public componentDidUpdate() {
        this.updateSizeInStore();
    }

    public componentDidMount() {
        this.updateSizeInStore();
        window.addEventListener('resize', this.updateSizeInStore);
        if (this.ref) {
            this.ref.addEventListener('pointerdown', this.pointerDownHandler);
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

        const viewerOffset = AppStore.getStore().boardStore.viewerOffset;
        const calcLocation = {
            x: location.x - itemOffset.x - viewerOffset.x,
            y: location.y - itemOffset.y - viewerOffset.y
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
