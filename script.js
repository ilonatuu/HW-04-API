const buttonGetData = document.querySelector(".button-data-request")
const buttonFill = document.querySelector(".bi-arrow-down-left-circle-fill")
const buttonEmpty = document.querySelector(".bi-arrow-down-left-circle")

buttonGetData.addEventListener("click", () => {
    if (buttonFill.style.display === "none") {
        buttonFill.style.display = "inline"; 
        buttonEmpty.style.display = "none";
        buttonGetData.style.backgroundColor = "#93eb07"
    } else {
        buttonFill.style.display = "none";
        buttonEmpty.style.display = "inline";
        buttonGetData.style.backgroundColor = "#b1eb3d"
    }
});

// Задание 2
const buttonScreenSize = document.querySelector(".button-screen-size")

buttonScreenSize.addEventListener("click", () => {
    const screenWidth = window.screen.width
    const screenHeight = window.screen.height
    window.alert(`Your screen is ${screenWidth} px wide and ${screenHeight} px high`)
})
