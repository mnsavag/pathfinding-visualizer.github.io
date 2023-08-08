export function getGreatestMultiple(upperBound, divider) {
    return upperBound - upperBound % divider
}

export function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

export function getSelectorHeight(selector) {
    const tag = document.querySelector(selector)
    return getComputedStyle(tag).height.slice(0, -2)
}


export function getDOMElement(tag, id, className) {
    const DOM = document.createElement(tag)
    let idAttr = document.createAttribute("id")
    idAttr.value = id
    
    DOM.setAttributeNode(idAttr)
    DOM.className = className
    return DOM
}
