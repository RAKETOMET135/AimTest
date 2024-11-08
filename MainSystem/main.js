import {loadLevel, syncMessageTextPosition, getDistanceToTarget, getNumberFromString, removeCurrentLevel} from "./level_handler.js"

const submitAnswer = document.querySelector("#submit-move")
const accuracyText = document.querySelector("#accuracy")

let currentLevel = 1

let currentMessageTarget
let currentMessageText
let currentTarget

let offsetX = 0
let offsetY = 0
let isDrag = false

function runLevel(levelNumber){
    let levelObjects = loadLevel(levelNumber)

    let target = levelObjects[0]
    let dragableMessageTarget = levelObjects[1][0]
    let dragableMessageText = levelObjects[1][1]

    syncMessageTextPosition(dragableMessageTarget, dragableMessageText)

    currentMessageTarget = dragableMessageTarget
    currentMessageText = dragableMessageText
    currentTarget = target

    dragableMessageTarget.addEventListener("dragstart", (e) => {
        e.preventDefault()

        offsetX = e.clientX - dragableMessageTarget.getBoundingClientRect().left - dragableMessageTarget.width / 2
        offsetY = e.clientY - dragableMessageTarget.getBoundingClientRect().top - dragableMessageTarget.height / 2
    })

    dragableMessageTarget.addEventListener("mousedown", (e) => {
        isDrag = true

        dragableMessageTarget.style.cursor = "grabbing"
    })

    dragableMessageText.addEventListener("mousedown", (e) => {
        isDrag = true

        dragableMessageText.style.cursor = "grabbing"
    })
}

function mouseMove(e){
    if (!isDrag) return

    const newLeft = e.clientX - offsetX - 35/2;
    const newTop = e.clientY - offsetY - 35/2;

    currentMessageTarget.style.left = newLeft + "px";
    currentMessageTarget.style.top = newTop + "px";

    syncMessageTextPosition(currentMessageTarget, currentMessageText)
}

function mouseUp(e){
    if (!currentMessageTarget) return

    isDrag = false
    currentMessageTarget.style.cursor = "grab"
    currentMessageText.style.cursor = "grab"
}

function onAnswerSubmit(){
    let distance = getDistanceToTarget(currentMessageTarget, currentTarget)
    const computedTargetStyle = window.getComputedStyle(currentTarget)
    const computedMessageTargetStyle = window.getComputedStyle(currentMessageTarget)
    let maxAllowedDistance = getNumberFromString(computedTargetStyle.width, 2)
    maxAllowedDistance /= 2
    maxAllowedDistance += getNumberFromString(computedMessageTargetStyle.width, 2) / 2
    
    if (distance <= maxAllowedDistance){
        removeCurrentLevel()

        currentLevel++

        let accuracy = 100 - (1 / (maxAllowedDistance / 100) * distance)
        accuracy = Math.round(accuracy)

        accuracyText.innerText = "Accuracy: " + accuracy.toString() + "%"

        runLevel(currentLevel)
    }
    else{
        removeCurrentLevel()

        currentLevel = 1

        accuracyText.innerText = "Accuracy: 0%"

        runLevel(currentLevel)
    }
}

function main(){
    runLevel(1)

    document.addEventListener("mousemove", (e) => {
       mouseMove(e)
    })

    document.addEventListener("mouseup", (e) => {
        mouseUp(e)
    })

    submitAnswer.addEventListener("click", onAnswerSubmit)
}

main()