export interface IField {
    key: string;
    value: string;
}


export const isEmptyField = <T extends any>(obj: T): boolean => {
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            const val = obj[key];
            if (!val.length) {
                return true;
            }
        }
    }

    return false;
}