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

// Display Section.
function displaySection(link,section) {
  let lnk = document.querySelector(`#${link}`);
  let sec = document.querySelector(`#${section}`);
  
  lnk.onclick = (event) => {
    const mq = window.matchMedia("(max-width: 500px)");
    if(mq.matches) {
        let goBackButton = document.querySelector("#go-back-button");
        goBackButton.style.display = "block";
        goBackButton.addEventListener("click",() => {
          sec.style.display = "none";       
          let menu = document.querySelector("#menu");
          menu.style.display = "flex";
          goBackButton.style.display = "none";
          lnk.classList.remove("active");
        });
        lnk.parentElement.style.display = "none"; 
        if (section == "projects-section") {
          let s = document.querySelector("#projects-wrapper");
          s.style.display = "flex";
          s.style.flexDirection = "column";
        }
        else if (section == "contact-me-section") {
          let linkWrapper = document.querySelector(`#${section} div`);
          linkWrapper.style.display = "flex";
          linkWrapper.style.flexDirection = "column";
        }
        sec.classList.remove("section");
        sec.style.display = "block";
        sec.style.animationName = "section-mobile";
        sec.style.animationDuration = "1.2s";
    } 
    else {
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
    }
      
    let jiran = lnk.parentElement.children;
    for(j of jiran){
        j.classList.remove("active");
    }

    event.preventDefault(); 
    lnk.classList.add("active");

    stopAllYouTubeVideos();
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
startSection("projects","projects-section");