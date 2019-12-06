import cuid from 'cuid';
import { computed, observable } from 'mobx';
import INameCard, { ICardGroups } from '../interfaces/ICard';
import { createRandomColor } from '../utils/colorUtil';

interface byID<T> {
    [id: string]: T | undefined;
}

export default class CardStore {
    @computed
    public get cardList(): INameCard[] {
        const list = this.cardOrder.map((id) => this.cardsById[id]);
        return list.filter((c) => (!!c ? true : false)) as INameCard[];
    }

    @computed
    public get groupList(): ICardGroups[] {
        const list = this.groupOrder.map((id) => this.cardGroupsById[id]);
        return list.filter((c) => (!!c ? true : false)) as ICardGroups[];
    }

    @observable
    public cardsById: byID<INameCard> = {};

    @observable
    public cardOrder: string[] = [];

    @observable
    public cardGroupsById: byID<ICardGroups> = {};

    @observable
    public groupOrder: string[] = [];

    public constructor() {
        const cards = [
            { id: 'test', name: 'Jasper', groups: ['bass'] },
            {
                id: 'test3',
                name: 'Heidi',
                offset: { x: 300, y: 500 },
                groups: ['lead']
            },
            { id: 'test4', name: 'Rofl' },
            {
                id: 'test5',
                name: 'le Boe',
                offset: { x: 300, y: 400 },
                groups: ['tanner']
            }
        ];

        const groups = [
            { id: 'bass', name: 'bass', color: '#82120a' },
            { id: 'lead', name: 'lead', color: '#4c0d80' },
            { id: 'tanner', name: 'tanner', color: '#156f99' }
        ];

        this.cardGroupsById = groups.reduce((acc: byID<ICardGroups>, c: ICardGroups) => {
            acc[c.id] = c;
            return acc;
        }, {});
        this.groupOrder = groups.map((c) => c.id);

        this.cardsById = cards.reduce((acc: byID<INameCard>, c: INameCard) => {
            acc[c.id] = c;
            return acc;
        }, {});
        this.cardOrder = cards.map((c) => c.id);
    }

    public moveCard(id: string, location?: { x: number; y: number }) {
        const card = this.cardsById[id];
        if (!card) return false;

        card.offset = location;
        return true;
    }

    public getCardGroups(card: INameCard) {
        const { groups } = card;
        return groups
            ? (groups.map((gid) => this.cardGroupsById[gid]).filter((g) => !!g) as ICardGroups[])
            : [];
    }

    public removeCard(id: string) {
        const exists = this.cardsById[id];
        if (!exists) return;

        delete this.cardsById[id];
        const newOrder = [...this.cardOrder];
        const index = newOrder.findIndex((i) => i === id);
        if (index !== -1) {
            newOrder.splice(index, 1);
        }
        this.cardOrder = newOrder;
    }
    public addCard(name: string, groupId?: string) {
        const id = cuid();
        const card = {
            id,
            name
        } as INameCard;

        const group = groupId && this.cardGroupsById[groupId];
        if (group) card.groups = [group.id];

        this.cardsById[id] = card;
        this.cardOrder.push(id);
    }
    public addGroup(name: string, color?: string) {
        const id = cuid();
        const card = {
            id,
            name,
            color: color || createRandomColor()
        };

        this.cardGroupsById[id] = card;
        this.groupOrder.push(id);
    }

    public removeGroup(id: string) {
        const exists = this.cardGroupsById[id];
        if (!exists) return;

        delete this.cardGroupsById[id];
        const newOrder = [...this.groupOrder];
        const index = newOrder.findIndex((i) => i === id);
        if (index !== -1) {
            newOrder.splice(index, 1);
        }
        this.groupOrder = newOrder;
    }
}
