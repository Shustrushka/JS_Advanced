const API = 'https://raw.githubusercontent.com/Shustrushka/static/master';

const app = new Vue({
    el: '#app',
    data: {
        userSearch: '',
        showCart: false,
        cartUrl: '/getBasket.json',
        imgCart: 'https://via.placeholder.com/72x85',
        imgCatalog: 'https://github.com/Shustrushka/static/raw/master/img/product_1.png',
        cartItems: [],
        catalogUrl: '/catalogData.json',
        products: [],
        filtered: []
    },
    methods: {
        getJson(url){
                     return fetch(url)
                             .then(result => result.json())
                             .catch(error => console.log(error));
        },
        addProduct(product){
            this.getJson(`${API}/addToBasket.json`)
                .then(data => {
                    if(data.result){
                        let find = this.cartItems.find(el => el.id === product.id);
                        if(find){
                            find.quantity++;
                        } else {
                            let prod = Object.assign({quantity: 1}, product);
                            this.cartItems.push(prod);
                        }
                    }
                })
        },
        remove(product){
            this.getJson(`${API}/deleteFromBasket.json`)
                .then(data => {
                    if(data.result){
                        if(product.quantity > 1){
                            product.quantity--;
                        } else {
                            this.cartItems.splice(this.cartItems.indexOf(product), 1);
                        }
                    }
                })
        },
        filter(){
            let regexp = new RegExp(this.userSearch, 'i');
            this.filtered = this.products.filter(el => regexp.test(el.title));
        }
    },
    mounted() {
        this.getJson(`${API+this.cartUrl}`)
            .then(data => {
                for (let el of data.contents) {
                    this.cartItems.push(el);
                }
            });
        this.getJson(`${API+this.catalogUrl}`)
            .then(data => {
                for (let el of data) {
                    this.products.push(el);
                    this.filtered.push(el);
                }
            });
    }
});
// class List {
//     constructor(url, container, list = classesList){
//         this.container = container;
//         this.list = list;
//         this.url = url;
//         this.goods = [];
//         this.allProducts = [];
//         this.filtered = [];
//         this._init();
//     }
//     getJson(url){
//         return fetch(url ? url : `${API_url+this.url}`)
//                 .then(result => result.json())
//                 .catch(error => console.log(error));
//     }
//     handleData(data){
//         this.goods = [...data];
//         this.render();
//     }
//     calcSum(){
//         return this.allProducts.reduce((sum, good) => sum += good.price, 0);
//     } 
//     render(){
//         const block = document.querySelector(this.container);
//         for (let product of this.goods) {
//             const productObj = new this.list[this.constructor.name](product);
//             this.allProducts.push(productObj);
//             block.insertAdjacentHTML('beforeend', productObj.render());
//         }
//     }
//     filter(){

//     }

//     _init(){
//         return false; 
//     }
// }

// class Item {
//     constructor(el, img = 'https://via.placeholder.com/263x280'){
//         this.title = el.title;
//         this.price = el.price;
//         this.id = el.id;
//         this.img = el.img;
//     }
//     render(){
//         return `<div class="product__main__items" data-id="${this.id}">
//         <a href="C:/Users/Nina/Documents/GitHub/shustrushka/JS_Advanced/Project/singlepage.html" class="product__items__link"><img class="product_image" src="${this.img}" alt=${this.title}></a>
//             <div class="product__content">
//                 <a href="#" class="product__name" data-name="${this.title}">${this.title}</a>
//                 <p class="product__price" data-price="${this.price}">$${this.price}</p>
//             </div>
//         <a href="#" class="product__add" data-id="${this.id}">Add to Cart</a>
//        </div>`
//     }
// }
// class ProductItem extends Item {}

// const classesList = {
//     ProductList: ProductItem,
//     Cart: CartItem
// };

// class Cart extends List {
//     constructor(container = '.drop-cart_top', url = 'getBasket.json'){
//         super(url, container);
//         this.getJson()
//         .then(data => {
//             this.handleData(data);
//         });
//     }
//     addProduct(element){
//         this.getJson(`${API_url}/addToBasket.json`)
//         .then(data => {
//             if (data.result === 1) {
//                 let productId = +element.dataset['id'];
//                 let find = this.allProducts.find(product => product.id === productId);
//                 if (find) {
//                     find.quantity++;
//                     this._updateCart(find);
//                 }  else {
//                     let product = {
//                         id: productId, 
//                         price: +element.dataset['price'],
//                         title: element.dataset['name'],
//                         quantity: 1,
//                     }; 
//                     this.goods = [product];
//                     this.render();
//                 }
//             } else {
//                 alert('error');
//             } 
//         })
//         .catch(error => console.log(error));
//     }
//     removeProduct(element){
//         this.getJson(`${API_url}`/deleteFromBasket.json)
//         .then(data => {
//             if (data.result === 1) {
//                 let productId = +element.dataset['id'];
//                 let find = this.allProducts.find(product => product.id === productId);
//                 if (find.quantity > 1) {
//                     find.quantity--;
//                     this._updateCart(find);
//                 } else {
//                     this.allProducts.splice(this.allProducts.indexOf(find), 1);
//                     document.querySelector(`.drop-cart_item[data-id="${productId}"]`).remove();
//                 }
//             } else {
//                 alert('error');
//             }
//         })
//     }
// }

// class ProductList {
//     constructor(container = `.product__main__box`){
//         this.container = container;
//         this.goods = [];
//         this.allProducts = [];
//         this._getProducts()
//             .then(data => {
//                 this.goods = [...data];
//                 this._render();
//             });
//     }
//     _getProducts(){
//         return fetch(`${API_url}/catalogData.json`)
//             .then(result => result.json())
//             .catch(error => console.log(error));
//     }

//     _render(){
//         const block = document.querySelector(this.container);
//         for (let product of this.goods){
//             const productObject = new ProductItem(product);
//             this.allProducts.push(productObject);
//             block.insertAdjacentHTML('beforeend', productObject.render());
//         }
//     }
// }

// const list = new ProductList;
