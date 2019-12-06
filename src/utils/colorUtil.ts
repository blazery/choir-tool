const MAX_HEX_SIZE = 256;

export const createRandomColor = () => {
    let endResult = '#';

    for (let i = 0; i < 3; i++) {
        const colorPart = Math.round(Math.random() * MAX_HEX_SIZE);
        const colorPartString = colorPart.toString(16);
        endResult += colorPartString;
    }
    return endResult;
};
