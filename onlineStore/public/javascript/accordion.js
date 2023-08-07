const accordionBtn = document.querySelectorAll('.accordion-btn');
const accordions = document.querySelectorAll('.accordion');
const plusSign = document.querySelectorAll('.accordion-btn span');

accordionBtn.forEach((btn,index)=>{
    btn.addEventListener('click', ()=>{
        accordions[index].classList.toggle('accordion-active');
        plusSign[index].classList.toggle('plus-rotate');
        
    })
})
