'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');
const btnsOpenModal = document.querySelectorAll('.show-modal');
console.log(btnsOpenModal);
console.log(btnCloseModal);

for(let i = 0; i< btnsOpenModal.length; i++)
    btnsOpenModal[i].addEventListener('click', function () {
        console.log('Button clicked');
        modal.classList.remove('hidden');
        overlay.classList.remove('hidden');
    })

//this takes care of closing modal by creating a function that does both take care of the modal and overlay.
const closeModal = function (){
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
}

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

    //one way to do it which is breaking it down in kiss terms.
//     btnCloseModal.addEventListener('click', function (){
//         console.log('closed button clicked');
//         modal.classList.add('hidden');
//         overlay.classList.add('hidden');
//     });
//
// overlay.addEventListener('click', function (){
//     modal.classList.add('hidden');
//     overlay.classList.add('hidden');
// })

document.addEventListener('keydown', function (e){
    if (e.key === 'Escape') {
        if (!modal.classList.contains('hidden')) {
            closeModal();
        }
    }
});
