const checkAreSameObject = (obejct1, object2) => {
    const obejct1Keys = Object.keys(obejct1)
    const object2Keys = Object.keys(object2)

    if(obejct1Keys.length === object2Keys.length) {
        const areSame = obejct1Keys.every(elm => obejct1[elm] === object2[elm])
        return areSame ? true : false
    } else {
        return false
    }
}

const useObject = (type) => {
    switch(type){
        case 'checkAreSameObject':
            return checkAreSameObject
    }
}

export default useObject