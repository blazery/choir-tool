import { Color } from 'csstype';
import { ICoord } from './ICoord';

export default interface INameCard {
    id: string;
    name: string;
    groups?: string[];
    offset?: ICoord;
}

export interface ICardGroups {
    id: string;
    name: string;
    color: Color;
}
