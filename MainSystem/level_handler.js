function getLevelTarget(levelNumber, levelScene){
    let target = document.createElement("img")
    levelScene.append(target)
    target.id = "target"
    target.src = "Images/Target.png"

    switch (levelNumber){
        case 1:
            target.style.width = "500px"
            target.style.height = "500px"
            target.style.left = "750px"
            target.style.top = "150px"
            break
        case 2:
            target.style.width = "250px"
            target.style.height = "250px"
            target.style.left = "750px"
            target.style.top = "150px"
            break
        case 3:
            target.style.width = "150px"
            target.style.height = "150px"
            target.style.left = "950px"
            target.style.top = "150px"
            break
        case 4:
            target.style.width = "100px"
            target.style.height = "100px"
            target.style.left = "450px"
            target.style.top = "750px"
            break
        case 5:
            target.style.width = "90px"
            target.style.height = "90px"
            target.style.left = "450px"
            target.style.top = "150px"
            break
        case 6:
            target.style.width = "50px"
            target.style.height = "50px"
            target.style.left = "500px"
            target.style.top = "500px"
            break
        default:
            target.style.width = "15px"
            target.style.height = "15px"
            target.style.left = (250 + Math.floor(Math.random() * 750 + 1)).toString() + "px"
            target.style.top = (250 + Math.floor(Math.random() * 750 + 1)).toString() + "px"
            break
    }
    
    return target
}

function createDragableMessage(levelScene){
    let dragableMessage = document.createElement("img")
    levelScene.append(dragableMessage)
    dragableMessage.id = "dragable-message"
    dragableMessage.src = "Images/MsgTarget.png"
    dragableMessage.setAttribute("dragable", true)
    dragableMessage.style.left = "10px"
    dragableMessage.style.top = "250px"

    let messageText = document.createElement("p")
    levelScene.append(messageText)
    messageText.id = "dragable-message-text"
    messageText.innerText = "Move to red and white target"

    return [dragableMessage, messageText]
}

export function getNumberFromString(string, charsToRemoveAtEnd){
    let number = parseInt(string.slice(0, string.length - charsToRemoveAtEnd))
    
    if (!number) return 0
    return number
}

export function loadLevel(levelNumber){
    const levelScene = document.querySelector("#level-scene")
    const levelName = document.querySelector("#level-name")

    levelName.innerText = "Level " + levelNumber.toString()

    let target = getLevelTarget(levelNumber, levelScene)
    let dragableMessage = createDragableMessage(levelScene)

    return [target, dragableMessage]
}

export function syncMessageTextPosition(messageTarget, messageText){
    const computedTargetStyle = window.getComputedStyle(messageTarget)

    const targetTop = getNumberFromString(computedTargetStyle.top, 2)
    const targetLeft = getNumberFromString(computedTargetStyle.left, 2)
    
    messageText.style.top = (targetTop).toString() + "px"
    messageText.style.left = (targetLeft + 15).toString() + "px"
}

export function getDistanceToTarget(messageTarget, target){
    const computedMessageTargetStyle = window.getComputedStyle(messageTarget)
    const computedTargetStyle = window.getComputedStyle(target)

    let x0 = getNumberFromString(computedMessageTargetStyle.left, 2)
    let y0 = getNumberFromString(computedMessageTargetStyle.top, 2)
    const sx0 = getNumberFromString(computedMessageTargetStyle.width, 2)
    const sy0 = getNumberFromString(computedMessageTargetStyle.height, 2)

    x0 += sx0 / 2
    y0 += sy0 / 2

    let x1 = getNumberFromString(computedTargetStyle.left, 2)
    let y1 = getNumberFromString(computedTargetStyle.top, 2)
    const sx1 = getNumberFromString(computedTargetStyle.width, 2)
    const sy1 = getNumberFromString(computedTargetStyle.height, 2)

    x1 += sx1 / 2
    y1 += sy1 / 2

    let distance = Math.sqrt(Math.pow((x1 - x0), 2) + Math.pow((y1 - y0), 2))

    return distance
}

export function removeCurrentLevel(){
    let target = document.querySelector("#target")
    let dragableMessageTarget = document.querySelector("#dragable-message")
    let dragableMessageText = document.querySelector("#dragable-message-text")

    target.remove()
    dragableMessageTarget.remove()
    dragableMessageText.remove()
}