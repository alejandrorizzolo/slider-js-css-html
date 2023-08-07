function initSlider() {
    const container     = document.querySelector('body');
    const slider        = document.querySelector('.slider--imgs');
    let imageSelection  = document.querySelectorAll('.slider--img');
    const iconPrev      = document.querySelector('.slider--prev');
    const iconNext      = document.querySelector('.slider--next');
    const sliderWidth   = 70;
    const sliderTime    = 3500;
    let sliderAuto      = setInterval(() => { imageNext() }, sliderTime);
  
    slider.insertAdjacentElement('afterbegin', imageSelection[imageSelection.length - 1]);
    imageSelection = document.querySelectorAll('.slider--img');
    slider.scrollLeft = slider.scrollWidth / imageSelection.length;
    document.querySelector('.slider').style.width = `${Math.round(sliderWidth * container.clientWidth / 100)}px`;
  
    function imageNext() {
        slider.scroll({
            left: Math.round(slider.scrollWidth / imageSelection.length  * 2),
            behavior: 'smooth'
        });
    }
  
    function imagePrev() {
        slider.scroll({
            left: 0,
            behavior: 'smooth'
        });
    }
  
    iconNext.addEventListener('click', () => {
        clearInterval(sliderAuto);
        imageNext();
        sliderAuto = setInterval(() => { imageNext() }, sliderTime);
    })
  
    iconPrev.addEventListener('click', () => {
        clearInterval(sliderAuto);
        imagePrev();
        sliderAuto = setInterval(() => { imagePrev() }, sliderTime);
    })
  
    slider.addEventListener('scroll', () => {
  
        if(slider.scrollLeft > slider.scrollWidth / imageSelection.length * 2) {
            slider.scrollLeft = slider.scrollWidth / imageSelection.length * 2;
        }
  
        if(slider.scrollLeft < 0) {
            slider.scrollLeft = 0;
        }
  
        if(slider.scrollLeft != slider.scrollWidth / imageSelection.length) {
            clearInterval(sliderAuto);
        }
  
        if(slider.scrollLeft === slider.scrollWidth / imageSelection.length * 2) {
            slider.insertAdjacentElement('beforeend', imageSelection[0]);
            slider.scrollLeft = slider.scrollWidth / imageSelection.length;
            imageSelection = document.querySelectorAll('.slider--img');
            sliderAuto = setInterval(() => { imageNext() }, sliderTime);
        }
  
        if(slider.scrollLeft === 0) {
            slider.insertAdjacentElement('afterbegin', imageSelection[imageSelection.length - 1]);
            slider.scrollLeft = slider.scrollWidth / imageSelection.length;
            imageSelection = document.querySelectorAll('.slider--img');
            sliderAuto = setInterval(() => { imagePrev() }, sliderTime);
        }
  
    })

    window.addEventListener('resize', () => {
        clearInterval(sliderAuto);
        document.querySelector('.slider').style.width = `${Math.round(sliderWidth * container.clientWidth / 100)}px`;
        sliderAuto = setInterval(() => { imageNext() }, sliderTime);
    })
}

window.addEventListener('load', () => {
    initSlider();
});