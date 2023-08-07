export function addMenuArrow() {
    let arrow = document.querySelectorAll(".arrow")
    for (let i = 0; i < arrow.length; i++) {
        let thisLink = arrow[i].previousElementSibling
        thisLink.classList.add("parent")
    }
}