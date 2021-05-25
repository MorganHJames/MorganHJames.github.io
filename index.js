// Brightness swap.
let darkBackground = getComputedStyle(document.documentElement).getPropertyValue("--dark-background-color");
let lightBackground = getComputedStyle(document.documentElement).getPropertyValue("--light-background-color");
let darkText = getComputedStyle(document.documentElement).getPropertyValue("--dark-text-color");
let lightText = getComputedStyle(document.documentElement).getPropertyValue("--light-text-color");
let darkTitleText = getComputedStyle(document.documentElement).getPropertyValue("--dark-title-text-color");
let lightTitleText = getComputedStyle(document.documentElement).getPropertyValue("--light-title-text-color");
let darkHover = getComputedStyle(document.documentElement).getPropertyValue("--dark-hover-text-color");
let lightHover = getComputedStyle(document.documentElement).getPropertyValue("--light-hover-text-color");
let darkAccent = getComputedStyle(document.documentElement).getPropertyValue("--dark-accent-color");
let lightAccent = getComputedStyle(document.documentElement).getPropertyValue("--light-accent-color");

function swapBrightness() {
  let icon = document.querySelector('#brightswap img');

  icon.onclick = () => {
    let color = getComputedStyle(document.documentElement).getPropertyValue("--current-background-color");
    if(color == lightBackground){
      icon.setAttribute("src","Resources/sun-empty.svg");
      document.documentElement.style.setProperty('--current-background-color', darkBackground);
      document.documentElement.style.setProperty('--current-text-color', darkText);
      document.documentElement.style.setProperty('--current-title-text-color', darkTitleText);
      document.documentElement.style.setProperty('--current-hover-text-color', darkHover);
      document.documentElement.style.setProperty('--current-accent-color', darkAccent);
      
      icon.onmouseover = () => {
        icon.setAttribute("src","Resources/sun-full.svg");
      }
      icon.onmouseout = () => {
        icon.setAttribute("src","Resources/sun-empty.svg");
      }
    } 
    else {
      icon.setAttribute("src","Resources/moon-empty.svg");
      document.documentElement.style.setProperty('--current-background-color', lightBackground);
      document.documentElement.style.setProperty('--current-text-color', lightText);
      document.documentElement.style.setProperty('--current-title-text-color', lightTitleText);
      document.documentElement.style.setProperty('--current-hover-text-color', lightHover);
      document.documentElement.style.setProperty('--current-accent-color', lightAccent);

      icon.onmouseover = () => {
          icon.setAttribute("src","Resources/moon-full.svg");
      }
      icon.onmouseout = () => {
          icon.setAttribute("src","Resources/moon-empty.svg");
      }
    }
  }
}
  
swapBrightness();