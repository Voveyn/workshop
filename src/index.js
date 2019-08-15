// checkbox

function toggleCheckbox(){
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
}

toggleCheckbox();
//end checkbox


// cart

function toggleCart(){
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
    });
}
toggleCart();

// end cart 


// add and remove stuff to cart 

function addCart(){
    const cards = document.querySelectorAll('.goods .card');
    const cartWrapper = document.querySelector('.cart-wrapper');
    const cartEmpty = document.getElementById('cart-empty');
    const countCards = document.querySelector('.counter');
    
    
    cards.forEach((card) => {
        const btn = card.querySelector('button');
    
        btn.addEventListener('click', () => {
            
            //cartEmpty.remove();
            const cardClone = card.cloneNode(true);
            cartWrapper.appendChild(cardClone);
            showData();
    
            const removeBtn = cardClone.querySelector('.btn');
            removeBtn.textContent = 'Удалить из корзины';
    
            removeBtn.addEventListener('click',() => {
                cardClone.remove();
                showData();
            })
        })
    });
    
    function showData(){
        const cardsPrice = cartWrapper.querySelectorAll('.card-price');
        const cardsInCart = cartWrapper.querySelectorAll('.card');
        const cardTotal = document.querySelector('.cart-total span');
    
        countCards.textContent = cardsInCart.length;
        
        let sum = 0;
        cardsPrice.forEach((item)=>{
            let price = parseFloat(item.textContent);
            sum += price;    
        });
        cardTotal.textContent = sum;
    
        if(cardsInCart.length !== 0){
            cartEmpty.remove();
        }else{
            cartWrapper.appendChild(cartEmpty);
        }
    
    }
}
addCart();
// end  add and remove stuff to cart


// filter sale

function actionPage(){

    let cards = document.querySelectorAll('.goods .card');
    const discountCheckbox = document.getElementById('discount-checkbox');
    const goods = document.querySelector('.goods');
    const min = document.getElementById('min');
    const max = document.getElementById('max');
    const search = document.querySelector('.search-wrapper_input');
    const searchBtn = document.querySelector('.search-btn');

    let filteredCards = []
    let filtered = false;

    function makeSaleFilter(cards){

        discountCheckbox.addEventListener('click',() => {
            filtered = true;
            cards.forEach(function(item){
                if(discountCheckbox.checked){
                    if(!item.querySelector('.card-sale')){
                        item.parentNode.remove();
                        filteredCards.push(item);
                        
                        //item.parentNode.style.display = 'none';
                        
                    }
                }else{
                    goods.appendChild(item.parentNode)
                    //item.parentNode.style.display = '';
                }
            
            });

    
        });
    }

        min.addEventListener('change', filterPrice);
        max.addEventListener('change', filterPrice);

        function filterPrice(cards){
            filtered = true;
            cards.forEach((card)=>{
                const cardPrice = card.querySelector('.card-price');
                const price = parseFloat(cardPrice.textContent);

                if((min.value && price < min.value) || (max.value && price > max.value)){
                    card.parentNode.remove();
                    filteredCards.push(item);
                    
                    // card.parentNode.style.display = 'none';
                } else{
                    goods.appendChild(card.parentNode)
                    //card.parentNode.style.display = '';
                }
            })

        }

    

    if(filtered){
        filterPrice(filteredCards);
        makeSaleFilter(filteredCards);
    }else{
        filterPrice(cards);
        makeSaleFilter(cards);
    }


    searchBtn.addEventListener('click', () => {
        const searchText = new RegExp(search.value.trim(), 'i');
        cards.forEach((card)=>{
            const title = card.querySelector('.card-title');
            if(!searchText.test(title.textContent)){
                card.parentNode.style.display = 'none';
            } else {
                card.parentNode.style.display = '';
            }
        });
        search.value='';
    });
    
}
actionPage();

// end filter sale