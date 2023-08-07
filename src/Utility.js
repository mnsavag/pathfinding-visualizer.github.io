export function getGreatestMultiple(upperBound, divider) {
    return upperBound - upperBound % divider
}

export function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

export function getDOMElement(tag, id, className) { // createDOMElement где-то вообще вызывается?
    const domElem = document.createElement(tag)
    let idAttr = document.createAttribute("id")
    idAttr.value = id
    domElem.setAttributeNode(idAttr)
    domElem.className = className
    return domElem
}
