import { observable } from 'mobx';

export default class BoardStore {
    @observable
    public boardSize?: DOMRect;
}
