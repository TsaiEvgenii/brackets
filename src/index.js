module.exports = function check(str, bracketsConfig) {
    let bracketsMap = new Map();
    bracketsConfig.forEach(el => {
        bracketsMap.set(...el);
    });

    const openingBrackets = [...bracketsMap.keys()];
    const closingBrackets = [...bracketsMap.values()];

    let stack = [];
    for (let bracket of str) {
        let identical = false;
        if (closingBrackets.indexOf(bracket) > -1 && openingBrackets.indexOf(bracket) > -1) {
            identical = true;
        }

        if (closingBrackets.indexOf(bracket) > -1) {
            if (identical && stack.indexOf(bracket) === -1) {
                stack.push(bracket);
            } else {
                let matchingOpeningBracket = openingBrackets[closingBrackets.indexOf(bracket)];
                if (stack.length === 0 || (stack.pop() !== matchingOpeningBracket)) {
                    return false;
                }
            }
        } else {
            stack.push(bracket);
        }
    }

    return stack.length === 0;
};
