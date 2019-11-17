import { observable } from 'mobx';
import BoardStore from './BoardStore';
import CardStore from './CardStore';

let instance: AppStore;

export default class AppStore {
    public static getStore() {
        return instance;
    }

    public static initStore() {
        instance = new AppStore();
    }

    public cardStore = new CardStore();
    public boardStore = new BoardStore();

    @observable
    public value = 1;

    public incrementValue(v = 1) {
        this.value += v;
    }
}
