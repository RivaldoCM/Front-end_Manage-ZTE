import { IOnus } from "../interfaces/IOnus";

export const setCorrectOltValues = (onu: IOnus, array: any[]) => {
    if (onu.whichOltIndex >= 0 && onu.whichOltIndex < array.length) {
        const valueInIndex = array[onu.whichOltIndex];
        return valueInIndex;
    } else {
        return undefined;
    }
}