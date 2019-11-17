import { Color } from 'csstype';

export default interface INameCard {
    id: string;
    name: string;
    groups?: string[];
    offset?: { x: number; y: number };
}

export interface ICardGroups {
    id: string;
    name: string;
    color: Color;
}
