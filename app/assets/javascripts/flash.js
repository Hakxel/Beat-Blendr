const timeoutFlashes = () => {
  let flash = document.querySelector(".notice, .alert")
  if(flash){
    setTimeout(() => {
      flash.remove()
    }, 3000);
  }
}

document.addEventListener("turbolinks:load", timeoutFlashes);
