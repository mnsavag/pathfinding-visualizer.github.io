export function createDOMWithId(tag, id) {
    const domElem = document.createElement(tag)
    let idAttr = document.createAttribute("id")
    idAttr.value = id
    domElem.setAttributeNode(idAttr)
    return domElem
}

export function getGreatestMultiple(upperBound, divider) {
    return upperBound - upperBound % divider
}
