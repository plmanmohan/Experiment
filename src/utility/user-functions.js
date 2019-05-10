/**
 * It merges both of the arrays and removes the duplicate elements
 * @param {*} oldUserList
 * @param {*} newUserList
 */
export function removeDuplicateUsers(oldUserList, newUserList) {
    if (newUserList.length === 0) {
        return oldUserList;
    }
    let newData = oldUserList.concat(newUserList);

    let uniqueList = [];
    let finalData = [];

    for (let i = 0; i < newData.length; i++) {
        let fullName = newData[i].first_name + newData[i].last_name;
        if (uniqueList.indexOf(fullName) === -1) {
            uniqueList.push(fullName);
            finalData.push(newData[i]);
        }
    }

    console.log("AfterMerge :: ", finalData);
    return finalData;
}

/**
 * It search for the particular element with the id and removes the element from the Object
 * @param {*Object} state
 * @param {*number} id
 */
export function removeUser(users, id) {
    return users.filter(user => (user.id !== id ? user : null));
}
