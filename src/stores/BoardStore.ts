import { action, observable } from 'mobx';
import { ICoord } from '../interfaces/ICoord';

export default class BoardStore {
    @observable
    private _viewOffset: ICoord = {x: 0, y: 0};
    @observable
    public boardSize?: DOMRect;

    public get viewerOffset() {
        return this._viewOffset;
    }

    @action
    public setViewerOffset(viewOffset: ICoord) {
        this._viewOffset = viewOffset;
    }
}
