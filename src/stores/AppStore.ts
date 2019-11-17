import { observable } from 'mobx'

let instance: AppStore

export default class AppStore {
    public static getStore() {
        return instance
    }

    public static initStore() {
        instance = new AppStore()
    }

    @observable
    public value = 1

    public incrementValue(v = 1) {
        this.value += v
    }
}
