// checkbox

let checkbox = document.querySelectorAll('.filter-check_checkbox');

checkbox.forEach((item) => {
    item.addEventListener('change', function(){
        if(this.checked){
            this.nextElementSibling.classList.add('checked');
        }else{
            this.nextElementSibling.classList.remove('checked');
        }
    })
});

//for(let i = 0; i < checkbox.length; i++){
//    checkbox[i].addEventListener('change', function(){
//        if(this.checked){
//            this.nextElementSibling.classList.add('checked');
//        }else{
//            this.nextElementSibling.classList.remove('checked');
//        }
//    });
//}

//end checkbox


// cart

const btnCart = document.getElementById('cart');
const modalCart = document.querySelector('.cart');
const btnClose = document.querySelector('.cart-close');

btnCart.addEventListener('click', ()=>{
    modalCart.style.display = 'flex';
    //modalCart.style.cssText = 'display: flex; background-color: green;' // несколько цсс свойств
    document.body.style.overflow = 'hidden';
});

btnClose.addEventListener('click', ()=>{
    modalCart.style.display = '';
    document.body.style.overflow = '';
})

// end cart 


// add and remove stuff to cart 

const cards = document.querySelectorAll('.goods .card');
const cartWrapper = document.querySelector('.cart-wrapper');

const cartEmpty = document.getElementById('cart-empty');

const countCards = document.querySelector('.counter')

cards.forEach((card) => {
    const btn = card.querySelector('button');

    btn.addEventListener('click', () => {
        

        cartEmpty.remove();
        const cardClone = card.cloneNode(true);
        cartWrapper.appendChild(cardClone);
        showData();
    })
});

function showData(){
    const cardsInCart = cartWrapper.querySelectorAll('.card');
    console.log(cardsInCart.length);
    countCards.textContent = cardsInCart.length;
}

// end  add and remove stuff to cart