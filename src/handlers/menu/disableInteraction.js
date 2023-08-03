// in other folder later

export function onDisableInteraction() {
    const block = document.createElement("div")
    block.id = "blocking-block"
    document.body.appendChild(block)
}

export function offDisableInteraction() {
    const block = document.getElementById("blocking-block")
    block.remove()
}