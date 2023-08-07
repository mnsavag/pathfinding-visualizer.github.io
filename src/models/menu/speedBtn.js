const pathSpeed = 35
const speed = {
    SLOW: 25,
    MEDIUM: 20,
    FAST: 15,
    DEFAULT: 15
}
let tempSpeed = speed.DEFAULT

let speedBtnName = document.getElementById("speed-btn")
speedBtnName.innerHTML = "Speed: Fast"


export function getTempSpeed() {
    return tempSpeed
}

export function getPathSpeed() {
    return pathSpeed
}

export function registerSpeedBtns() {
    const speedData = [ { id: "speed-slow", name: "Speed: Slow", speed: speed.SLOW}, 
                { id: "speed-medium", name: "Speed: Medium", speed: speed.MEDIUM},
                { id: "speed-fast", name: "Speed: Fast", speed: speed.FAST}    
            ]

    speedData.forEach(element => {
        const btn = document.getElementById(element.id)
        btn.addEventListener("click", () => {
            speedBtnName.innerHTML = element.name
            tempSpeed = element.speed
        })       
    });
}
