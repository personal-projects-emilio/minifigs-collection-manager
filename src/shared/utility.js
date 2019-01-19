export const updateObject = (oldObject, updatedProperties) => ({
    ...oldObject,
    ...updatedProperties
});

export const checkValidity = (value, rules) => {
    let isValid = true;
    const trimValue = value.trim();
    if (!rules) {
        return true;
    }
    
    if (rules.required) {
        isValid = trimValue !== '' && isValid;
    }

    if (rules.isARef) {
        const pattern = /sw[0-9]{3,4}[abcds]?$/;
        let unique = true;
        if (rules.ref !== value || rules.ref === null) {
            unique = rules.isARef.indexOf(trimValue) === -1;
        }
        isValid = pattern.test(trimValue) && isValid && unique;
    }

    return isValid;
}

export const updateNumbers = (minifigs) => {
    const totalNumber = Object.keys(minifigs).length;
    let numberOwned = 0;
    for (const i in minifigs) {
        if (minifigs[i].possessed) {numberOwned++}
    }
    const percentageOwned = Math.round(numberOwned/totalNumber*10000)/100;
    return {totalNumber: totalNumber, numberOwned: numberOwned, percentageOwned: percentageOwned}
}

export const getTagsAndCharacNames = (minifigs) => {
    let tags = [];
    let characNames = [];
    for (const i in minifigs) {
        const minifigTags = minifigs[i].tags;
        if (minifigTags) {
            for(let i in minifigTags){
                // If the tag is unique we had it to the array
                if(tags.map(tag => tag.name).indexOf(minifigTags[i]) === -1){
                    tags.push({name: minifigTags[i], amount: 1});
                } else { // Or else we increment the amount of the existing tag
                    const tagI = tags.map(tag => tag.name).indexOf(minifigTags[i])
                    tags[tagI].amount++;
                }
            }
        }
        const characName = minifigs[i].characterName;
        if(characName){
            let index = characNames.map(charac => charac.name).indexOf(characName);
            if(index === -1){
                characNames.push({name: characName, amount: 1});
            } else {
                characNames[index].amount++;
            }
        }  
    }
    tags.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
    characNames.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
    return {tags: tags, characNames: characNames};
}