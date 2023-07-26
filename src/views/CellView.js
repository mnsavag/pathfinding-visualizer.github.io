export class CellView {
    static getCellDOM(tag, id, className) {
        const domElem = document.createElement(tag)
        let idAttr = document.createAttribute("id")
        idAttr.value = id
        domElem.setAttributeNode(idAttr)
        domElem.classList.add(className)
        return domElem
    }
}