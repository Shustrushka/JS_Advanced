const API_url = 'https://raw.githubusercontent.com/Shustrushka/static/master';

class List {
    constructor(url, container, list = classesList){
        this.container = container;
        this.list = list;
        this.url = url;
        this.goods = [];
        this.allProducts = [];
        this.filtered = [];
        this._init();
    }
    getJson(url){
        return fetch(url ? url : `${API_url+this.url}`)
                .then(result => result.json())
                .catch(error => console.log(error));
    }
    handleData(data){
        this.goods = [...data];
        this.render();
    }
    calcSum(){
        return this.allProducts.reduce((sum, good) => sum += good.price, 0);
    } 
    render(){
        const block = document.querySelector(this.container);
        for (let product of this.goods) {
            const productObj = new this.list[this.constructor.name](product);
            this.allProducts.push(productObj);
            block.insertAdjacentHTML('beforeend', productObj.render());
        }
    }
    filter(){

    }

    _init(){
        return false; 
    }
}

class Item {
    constructor(el, img = 'https://via.placeholder.com/263x280'){
        this.title = el.title;
        this.price = el.price;
        this.id = el.id;
        this.img = el.img;
    }
    render(){
        return `<div class="product__main__items" data-id="${this.id}">
        <a href="C:/Users/Nina/Documents/GitHub/shustrushka/JS_Advanced/Project/singlepage.html" class="product__items__link"><img class="product_image" src="${this.img}" alt=${this.title}></a>
            <div class="product__content">
                <a href="#" class="product__name" data-name="${this.title}">${this.title}</a>
                <p class="product__price" data-price="${this.price}">$${this.price}</p>
            </div>
        <a href="#" class="product__add" data-id="${this.id}">Add to Cart</a>
       </div>`
    }
}
class ProductItem extends Item {}

const classesList = {
    ProductList: ProductItem,
    Cart: CartItem
};

class Cart extends List {
    constructor(container = '.drop-cart_top', url = 'getBasket.json'){
        super(url, container);
        this.getJson()
        .then(data => {
            this.handleData(data);
        });
    }
    addProduct(element){
        this.getJson(`${API_url}/addToBasket.json`)
        .then(data => {
            if (data.result === 1) {
                let productId = +element.dataset['id'];
                let find = this.allProducts.find(product => product.id === productId);
                if (find) {
                    find.quantity++;
                    this._updateCart(find);
                }  else {
                    let product = {
                        id: productId, 
                        price: +element.dataset['price'],
                        title: element.dataset['name'],
                        quantity: 1,
                    }; 
                    this.goods = [product];
                    this.render();
                }
            } else {
                alert('error');
            } 
        })
        .catch(error => console.log(error));
    }
    removeProduct(element){
        this.getJson(`${API_url}`/deleteFromBasket.json)
        .then(data => {
            if (data.result === 1) {
                let productId = +element.dataset['id'];
                let find = this.allProducts.find(product => product.id === productId);
                if (find.quantity > 1) {
                    find.quantity--;
                    this._updateCart(find);
                } else {
                    this.allProducts.splice(this.allProducts.indexOf(find), 1);
                    document.querySelector(`.drop-cart_item[data-id="${productId}"]`).remove();
                }
            } else {
                alert('error');
            }
        })
    }
}

class ProductList {
    constructor(container = `.product__main__box`){
        this.container = container;
        this.goods = [];
        this.allProducts = [];
        this._getProducts()
            .then(data => {
                this.goods = [...data];
                this._render();
            });
    }
    _getProducts(){
        return fetch(`${API_url}/catalogData.json`)
            .then(result => result.json())
            .catch(error => console.log(error));
    }

    _render(){
        const block = document.querySelector(this.container);
        for (let product of this.goods){
            const productObject = new ProductItem(product);
            this.allProducts.push(productObject);
            block.insertAdjacentHTML('beforeend', productObject.render());
        }
    }
}

const list = new ProductList;



// class List { //глобальный общий класс со списком, который принимает в себя данные и как-то отображает
//     constructor(url, container){
//         this.container = container;
//         this.url = url;
//         this.data = [];
//         this.allProducts = [];
//         // this.filtered = [];
//         this._init();
//     }
//     _init(){
//         return false;
//     }
//     calcSum(){
//         return this.allProducts.reduce((accum, item) => accum + item.price, 0);
//     }
//     // filter(value){
//     //     const regexp = new RegExp(value, 'i');
//     //     this.filtered = this.allProducts.filter(el => regexp.test(el.title));
//     //     console.log(this.filtered);
//     //     this.allProducts.forEach(el => {
//     //         const block = document.querySelector(`.product__main__items[data-id="${el.id}"]`);
//     //         if(!this.filtered.includes(el)){
//     //             block.classList.add('invisible');
//     //         } else {
//     //             block.classList.remove('invisible');
//     //         }
//     //     })
//     // }
//     getJson(url){
//         return fetch(url ? url : `${API_url+this.url}`)
//         .then(result => result.json())
//         .catch(error => console.log(error));
//     }
//     handleData(data){
//         this.data = [...data];
//         this._render();
//     }
//     _render(){
//         const block = document.querySelector(this.container);
//         for (let el of this.data) {
//             const product = new lists[this.constructor.name](el); // GoodsItem = ProductItem
//             this.allProducts.push(product);
//             block.insertAdjacentHTML('beforeend', product._render());
//         }
//     }
//     getItem(id){
//         return this.allProducts.find(el => el.id === id);
//     }
// }

// class Item {
//     constructor(el/*  = { id: 'ID', title: 'NoName', img: 'https://via.placeholder.com/263x280', price: 'call' } */){
//         this.title = el.title;
//         this.id = el.id;
//         this.img = el.img;
//         this.price = el.price;
//     }
//     _render(){
//         return `
//             <div class="product__main__items" data-id="${this.id}">
//                 <a href="C:/Users/Nina/Documents/GitHub/shustrushka/JS_Advanced/Project/singlepage.html" class="product__items__link"><img class="product_image" src="${this.img}" alt=${this.title}></a>
//                     <div class="product__content">
//                         <a href="#" class="product__name">${this.title}</a>
//                         <p class="product__price">$${this.price}</p>
//                     </div>
//                 <a href="#" class="product__add" data-id="${this.id}">Add to Cart</a>
//             </div>
//         `
//     }
// }



// class Products extends List { // GoodsList = Products
//     constructor(cart, url='/CatalogData.json', container='.product__main__box'){
//         super(url, container);
//         this.cart = cart;
//         this.getJson()
//         .then(data => this.handleData(data));
//     }
//     _init(){
//         document.querySelector(this.container).addEventListener('click', event => {
//             if(event.target.classList.contains('product__add')){
//                 const id = +event.target.dataset['id'];
//                 cart.addProduct(this.getItem(id));
//             }   
//         });
//         // document.querySelector(`.search-form`).addEventListener('submit', e => {
//         //     e.preventDefault();
//         //     this.filter(document.querySelector(`.search-field`).value);
//         // })
//     }
// }
// class ProductItem extends Item {} 
// // class Cart extends List {
// //     constructor(url='/getBasket.json', container='drop-cart'){
// //         super(url, container);
// //         this.getJson()
// //         .then(data => this.handleData(data.contents));
// //     }
// //     // addProduct(product){
// //     //     this.getJson(`${API_url}/addToBasket.json`)
// //     //         .then((data) => {
// //     //             if(data.result){
// //     //                 let find = this.allProducts.find((el) => el.id === product.id);
// //     //                 if(find){
// //     //                     find.quantity++;
// //     //                     this._updateCart(find);
// //     //                 } else {
// //     //                     let prod = Object.assign({quantity:1}, product);
// //     //                     this.data = [prod];
// //     //                     this._render();
// //     //                 }
// //     //             } else {
// //     //                 console.log('error');
// //     //             }
// //     //         })
// //     // }
// //     removeProduct(product){
// //         this.getJson(`${API_url}/deleteFromBasket.json`)
// //             .then((data) => {
// //                 if(data.result){
// //                     if(product.quantity > 1){
// //                         product.quantity--;
// //                         this._updateCart(product);
// //                     } else {
// //                       this.allProducts.splice(this.allProducts.indexOf(product), 1);
// //                       document.querySelector(`.drop-cart_item[data-id=${product.id}]`).remove(); 
// //                     }
// //                 } else {
// //                     console.log('error');
// //                 }
// //             })
// //     }
// //     _init(){
// //         document.querySelector(this.container).addEventListener('click', event => {
// //             if(event.target.classList.contains('fa-times-circle')){
// //                 const id = +event.target.dataset['id'];
// //                 this.removeProduct(this.getItem(id));
// //             }   
// //         });
// //     }
// //     _updateCart(product){
// //         const block = document.querySelector(`.drop-cart_item[data-id=${product.id}]`);
// //         block.querySelector(`.drop-cart_price`).textContent = `${product.quantity}`;
// //         document.querySelector(`.drop-down-cart`).addEventListener('click', () => {
// //             document.querySelector(this.container).classList.toggle(`invisible`);
// //         })
// //     }
// // }
// // class CartItem extends Item {
// //     constructor(el){
// //         super(el);
// //         this.quantity = el.quantity;
// //     }
// //     render(){
// //         return `
// //         <div class="drop-cart_item" data-id="${this.id}">
// //             <img src="${this.img}" alt="img" class="drop-cart_img">
// //             <div class="drop-cart_desc">
// //                 <h3>${this.title}</h3>
// //                 <div class="drop-cart_rating">
// //                     <i class="fas fa-star"></i>
// //                     <i class="fas fa-star"></i>
// //                     <i class="fas fa-star"></i>
// //                     <i class="fas fa-star"></i>
// //                     <i class="fas fa-star-half-alt"></i>
// //                 </div>
// //                 <p class="drop-cart_price">${this.quantity}<span> x </span>${this.price}</p>
// //             </div>
// //             <a href="#"><i class="fas fa-times-circle fa-times-circle-miniCart" data-id="${this.id}"></i></a>
// //         </div>
// //         `
// //     }
// // }
// // const lists = {
// //     Cart: CartItem,
// //     Products: ProductItem
// // }
// // const cart = new Cart();
// const list = new Products();

// // const app = new Vue({
// //     el: '.search-field',
// //     data: {
// //         userSearch: '',
// //         filtered: []
// //     },
// //     filter(){
// //         let regExp = new RegExp(this.userSearch, 'i');
// //         this.filtered = this.products.filter(el => regexp.test(el.title));
// //     }
// // });