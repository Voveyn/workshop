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

// end  add and remove stuff to cart


// filter sale

function actionPage(){

    const cards = document.querySelectorAll('.goods .card');
    const discountCheckbox = document.getElementById('discount-checkbox');
    const goods = document.querySelector('.goods');
    const min = document.getElementById('min');
    const max = document.getElementById('max');
    const search = document.querySelector('.search-wrapper_input');
    const searchBtn = document.querySelector('.search-btn');

    discountCheckbox.addEventListener('click', filter);
    min.addEventListener('change', filter);
    max.addEventListener('change', filter);

    function filter(){
        cards.forEach((card)=>{
            const cardPrice = card.querySelector('.card-price');
            const price = parseFloat(cardPrice.textContent);
            const discount = card.querySelector('.card-sale');

            if((min.value && price < min.value) || (max.value && price > max.value)){
                card.parentNode.remove();
                // card.parentNode.style.display = 'none';
            } else if (discountCheckbox.checked && !discount){
                card.parentNode.remove();
                //card.parentNode.style.display = '';
            } else{
                goods.appendChild(card.parentNode);
                //card.parentNode.style.display = '';
            } 
        })
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


// end filter sale

// get data from server

function getData(){
const goodsWrapper = document.querySelector('.goods');

    return fetch('../db/db.json').then((response)=>{
        if(response.ok){
            return response.json();
        }else{
            throw new Error('Data were not get, error: ' + response.status)
        }
    }).then((data)=>{
        return data;
    })
    .catch((err)=>{
        console.warn(err);
        goodsWrapper.innerHTML = '<div style="color: red; font-size:30px">Oops, something wrong!</div>'
    });
    
}

function renderCards(data){
    const goodsWrapper = document.querySelector('.goods');
    data.goods.forEach((good)=>{
        const card = document.createElement('div');
        card.className = 'col-12 col-md-6 col-lg-4 col-xl-3';
        card.innerHTML = `                            
                                <div class="card" data-category="${good.category}">
                                    ${good.sale? '<div class="card-sale">🔥Hot Sale🔥</div>':''}
									
									<div class="card-img-wrapper">
										<span class="card-img-top"
											style="background-image: url('${good.img}')"></span>
									</div>
									<div class="card-body justify-content-between">
										<div class="card-price" style="${good.sale?'color:red;':''}">${good.price} ₽</div>
										<h5 class="card-title">${good.title}</h5>
										<button class="btn btn-primary">В корзину</button>
									</div>
								</div>
        `;
        goodsWrapper.appendChild(card);
    })
}

function renderCatalog(){
    const cards = document.querySelectorAll('.goods .card');
    const categories = new Set();
    const catalogList = document.querySelector('.catalog-list');
    const catalogBtn = document.querySelector('.catalog-button');
    const catalogWrapper = document.querySelector('.catalog');

    cards.forEach((card)=>{
        categories.add(card.dataset.category);
    });
    categories.forEach((item)=>{
        const li = document.createElement('li');
        li.textContent = item;
        catalogList.appendChild(li);
    });

    catalogBtn.addEventListener('click', (event)=>{
        if(catalogWrapper.style.display){
            catalogWrapper.style.display = '';
        }else{
            catalogWrapper.style.display = 'block';
        }

        if(event.target.tagName === "LI"){
            cards.forEach((card)=>{
                if(card.dataset.category === event.target.textContent){
                    card.parentNode.style.display = '';
                } else{
                    card.parentNode.style.display = 'none';
                }
            })
        }
    });
}


getData().then((data)=>{
    renderCards(data);
    renderCatalog();
    toggleCheckbox();
    toggleCart();
    addCart();
    actionPage();
});


// end get data from server