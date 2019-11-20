import { isTerminatorless } from '@babel/types';

export const createRandomColor = () => {
    let endResult = '#';

    for (let i = 0; i < 3; i++) {
        const colorPart = Math.round(Math.random() * 256);
        const colorPartString = colorPart.toString(16);
        endResult += colorPartString;
    }
    return endResult;
};
