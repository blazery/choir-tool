import { action, observable } from 'mobx';
import INameCard, { ICardGroups } from '../interfaces/ICard';
import AppStore from './AppStore';
import { byID } from './CardStore';

export interface ISaveFileFormat {
    cardsById: byID<INameCard>;
    cardOrder: string[];
    cardGroupsById: byID<ICardGroups>;
    groupOrder: string[];
}

export default class IOStore {
    private appstore: AppStore;

    private validateFileUpload(info: any): info is ISaveFileFormat {
        if (!info) return false;
        if (!info.cardsById) return false;
        if (!info.cardOrder) return false;
        if (!info.cardGroupsById) return false;
        if (!info.groupOrder) return false;

        return true;
    }
    public constructor(appstore: AppStore) {
        this.appstore = appstore;
    }

    @action
    public uploadFile(file: File) {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const result = reader.result;
                if (result && typeof result === 'string') {
                    const newCardState = JSON.parse(result);
                    if (this.validateFileUpload(newCardState)) {
                        const { cardStore, boardStore } = this.appstore;
                        cardStore.cardsById = newCardState.cardsById;
                        cardStore.cardOrder = newCardState.cardOrder;
                        cardStore.cardGroupsById = newCardState.cardGroupsById;
                        cardStore.groupOrder = newCardState.groupOrder;
                        boardStore.setViewerOffset({
                            x: 0,
                            y: 0
                        });
                    }
                }
            } catch (e) {}
        };
        reader.onerror = (e) => {
            console.log(e);
        };

        reader.readAsText(file);
    }

    @action
    public saveBoard() {
        const { cardsById, cardOrder, cardGroupsById, groupOrder } = this.appstore.cardStore;
        const cardState = {
            cardsById,
            cardOrder,
            cardGroupsById,
            groupOrder
        };
        const blob = JSON.stringify(cardState);
        // It is necessary to create a new blob object with mime-type explicitly set
        // otherwise only Chrome works like it should
        const newBlob = new Blob([blob], { type: 'application/json' });
        const fileName = 'Koor-layout.json';

        // IE doesn't allow using a blob object directly as link href
        // instead it is necessary to use msSaveOrOpenBlob
        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
            window.navigator.msSaveOrOpenBlob(newBlob, fileName);
            return;
        }

        // For other browsers:
        // Create a link pointing to the ObjectURL containing the blob.
        const data = window.URL.createObjectURL(newBlob);
        const link = document.createElement('a');
        link.href = data;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        link.remove();
        setTimeout(() => window.URL.revokeObjectURL(data), 100);
    }
}
