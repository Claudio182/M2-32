var traverseDomAndCollectElements = function (
    matchFunc, 
    startEl = document.body) {
    // input ->  FUNCION machiadora
    let resultSet = [];

    if (matchFunc(startEl)) resultSet.push(startEl);
    
    for (const child of startEl.children) {
        let result = traverseDomAndCollectElements(matchFunc, child);
        resultSet = [...resultSet, ...result];
    }

    return resultSet;
};

// Detecta y devuelve el tipo de selector
// devuelve uno de estos tipos: id, class, tag.class, tag


var selectorTypeMatcher = function (selector) {
    // input    #idEjem  .classEjem    {tagEjem}.classEjem   {tagEjem}
    if (selector[0] === '#') return 'id'
    if (selector[0] === '.') return 'class'
    if (selector.includes('.')) return 'tag.class'
    return 'tag'
    // output  string con los tipos de electores  'id'  'class' 'tag.class'  'tag'
};

// NOTA SOBRE LA FUNCIÓN MATCH
// recuerda, la función matchFunction devuelta toma un elemento como un
// parametro y devuelve true/false dependiendo si el elemento
// matchea el selector.

var matchFunctionMaker = function (selector) {
    // input   #idEjem  .classEjem    {tagEjem}.classEjem   {tagEjem}
    const selectorType = selectorTypeMatcher(selector);  
    // output  tipos de electores  'id'  'class' 'tag.class'  'tag'
    var matchFunction;                        //  input ->  elemento del DOM /  output ->   true / false

    if (selectorType === "id") {
        matchFunction = function (element) {
            return  selector === `#${element.id}`
        }
    } else if (selectorType === "class") {
        matchFunction = function (element) {
            for (let i = 0; i < element.classList.length; i++) {
            if (selector === `.${element.classList[i]}`) return true;
        }
        return false;
        };

    } else if (selectorType === "tag.class") {
        // selector -> div.card
        matchFunction = (element) => {
        const [tag, clase] = selector.split('.')
        
        return (
            matchFunctionMaker(tag)(element) && matchFunctionMaker(`.${clase}`)(element)
        )
        }
    } else if (selectorType === "tag") {
        matchFunction = (element) => selector.toUpperCase() === element.tagName
    }
    return matchFunction;

    //output   una FUNCION     matchFunction()
};

const $ = function (selector) {
    let elements;
    const selectorMatchFunc = matchFunctionMaker(selector);  // input   #idEjem  .classEjem    {tagEjem}.classEjem   {tagEjem}
    //output ->  Funcion macheadora
    elements = traverseDomAndCollectElements(selectorMatchFunc);
    return elements;
};
