export const typeOnuMapping = {
    'F670L': 'F670L',
    'F6600P': 'F6600P',
    'F6600': 'F6600',
    'F680': 'F680',
    'F601': 'F601',
    'F612': 'F612',
    'F2801S': 'F2801S'
};

export const typeBridgeZte = ['F601', 'F612', 'F2801S'];
export const typePppoeZte = ['F680', 'F6600P', 'F670L', 'F6600'];

export const cleanUpModelName = (model: string) => {
    const keys = Object.keys(typeOnuMapping);
    let matchModelOnu = false;

    for(const key of keys){
        if(model.includes(key)){
            model = key;
            matchModelOnu = true;
            break;
        }
    }

    !matchModelOnu ? model = 'F601' : model;

    return model;
}