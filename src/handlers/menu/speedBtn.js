let tempSpeed
const pathSpeed = 50
const speed = {
    SLOW: 25,
    MEDIUM: 20,
    FAST: 15
}

export function getTempSpeed() {
    return tempSpeed
}

export function getPathSpeed() {
    return pathSpeed
}

export function registerSpeedBtns() {
    const speedData = [ { id: "speed-slow", speed: speed.SLOW}, 
                { id: "speed-medium", speed: speed.MEDIUM},
                { id: "speed-fast", speed: speed.FAST}    
            ]

    speedData.forEach(element => {
        const btn = document.getElementById(element.id)
        btn.addEventListener("click", () => {
            tempSpeed = element.speed
        })       
    });
}
