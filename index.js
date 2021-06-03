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
  
  icon.onmouseover = () => {
    icon.setAttribute("src","Resources/sun-full.svg");
  }
  icon.onmouseout = () => {
    icon.setAttribute("src","Resources/sun-empty.svg");
  }
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

// Display Section.
function displaySection(link,section) {
  let lnk = document.querySelector(`#${link}`);
  let sec = document.querySelector(`#${section}`);
  
  lnk.onclick = (event) => {
    
    for(elem of sec.parentElement.children){
      elem.style.display = "none";
    }
    sec.classList.remove("section");
    sec.style.display = "block";
    sec.style.animationName = "section";
    sec.style.animationDuration = "0.6s";
    sec.style.animationFillMode = "forwards";
    event.preventDefault() ;
    lnk.classList.add("active");
    
      
    let jiran = lnk.parentElement.children;
    for(j of jiran){
        j.classList.remove("active");
    }

    event.preventDefault(); 
    lnk.classList.add("active");
    stopAllYouTubeVideos();
    window.scrollTo(0, 0);
  };
}

function startSection(link,section) {
  var elem = document.getElementById(link);
  elem.onclick.apply(elem);
}

function stopAllYouTubeVideos() {
  var iframes = document.querySelectorAll('iframe');
  Array.prototype.forEach.call(iframes, iframe => {
    iframe.contentWindow.postMessage(JSON.stringify({ event: 'command', func: 'stopVideo' }), '*');
  });
}

swapBrightness();
stopAllYouTubeVideos();
displaySection("about-me","about-me-section");
displaySection("projects","projects-section");
displaySection("resume","resume-section");
displaySection("contact-me","contact-me-section");
displaySection("esd-project1","esd-project-section");
displaySection("esd-project2","esd-project-section");
displaySection("esd-project3","esd-project-section");
displaySection("cc-project1","cc-project-section");
displaySection("cc-project2","cc-project-section");
displaySection("cc-project3","cc-project-section");
displaySection("ust-project1","ust-project-section");
displaySection("ust-project2","ust-project-section");
displaySection("ust-project3","ust-project-section");
displaySection("ls-project1","ls-project-section");
displaySection("ls-project2","ls-project-section");
displaySection("ls-project3","ls-project-section");
displaySection("kr-project1","kr-project-section");
displaySection("kr-project2","kr-project-section");
displaySection("kr-project3","kr-project-section");
displaySection("atwu-project1","atwu-project-section");
displaySection("atwu-project2","atwu-project-section");
displaySection("atwu-project3","atwu-project-section");
displaySection("dtt-project1","dtt-project-section");
displaySection("dtt-project2","dtt-project-section");
displaySection("dtt-project3","dtt-project-section");
displaySection("mii-project1","mii-project-section");
displaySection("mii-project2","mii-project-section");
displaySection("mii-project3","mii-project-section");
displaySection("ysob-project1","ysob-project-section");
displaySection("ysob-project2","ysob-project-section");
displaySection("ysob-project3","ysob-project-section");
displaySection("ou-project1","ou-project-section");
displaySection("ou-project2","ou-project-section");
displaySection("ou-project3","ou-project-section");
startSection("projects","projects-section");