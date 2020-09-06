const API_img = 'https://github.com/Shustrushka/static';
const API_url = 'https://raw.githubusercontent.com/Shustrushka/static/master';

class List { //глобальный общий класс со списком, который принимает в себя данные и как-то отображает
    constructor(url, container){
        this.container = container;
        this.url = url;
        this.data = [];
        this.allProducts = [];
        this.filtered = [];
        this._init();
    }
    _init(){
        return false;
    }
    calcSum(){
        return this.allProducts.reduce((accum, item) => accum + item.price, 0);
    }
    filter(value){
        const regexp = new RegExp(value, 'i');
        this.filtered = this.allProducts.filter(el => regexp.test(el.title));
        console.log(this.filtered);
        this.allProducts.forEach(el => {
            const block = document.querySelector(`.product__main__items[data-id="${el.id}"]`);
            if(!this.filtered.includes(el)){
                block.classList.add('invisible');
            } else {
                block.classList.remove('invisible');
            }
        })
    }
    getJson(url){
        return fetch(url ? url : `${API_url+this.url}`)
        .then(result => result.json())
        .catch(error => console.log(error));
    }
    handleData(data){
        this.data = [...data];
        this._render();
    }
    _render(){
        const block = document.querySelector(this.container);
        for (let el of this.data) {
            const product = new ProductItem(el); // GoodsItem = ProductItem
            this.allProducts.push(product);
            block.insertAdjacentHTML('beforeend', product._render());
        }
    }
    getItem(id){
        return this.allProducts.find(el => el.id === id);
    }
}
// function makeGETRequest(url) {
//     return new Promise((resolve, reject) => {
//         let xhr;
//         if (window.XMLHttpRequest) {
//           xhr = new XMLHttpRequest();
//         } else if (window.ActiveXObject) { 
//           xhr = new ActiveXObject("Microsoft.XMLHTTP");
//         }
//         xhr.onreadystatechange = () => {
//             if(xhr.readyState === 4)  {
//                 if(xhr.status !== 200) {
//                     reject('error');
//             } else {
//                 resolve(xhr.responseText);
//             }
//           }
//         }
//           xhr.open('GET', url, true);
//           xhr.send();
//     });
//   };
class Item {
    constructor(el = { id: 'ID', title: 'NoName', img: 'https://via.placeholder.com/263x280', price: 'call' }){
        this.title = el.title;
        this.id = el.id;
        this.img = el.img;
        this.price = el.price;
    }
    _render(){
        return `
            <div class="product__main__items" data-id="${this.id}">
                <a href="#" class="product__items__link"><img class="product_image" src="${this.img}" alt=${this.title}></a>
                    <div class="product__content">
                        <a href="#" class="product__name">${this.title}</a>
                        <p class="product__price">$${this.price}</p>
                    </div>
                <a href="#" class="product__add" data-id="${this.id}">Add to Cart</a>
            </div>
        `
    }
}
class ProductItem extends Item {}

class Products extends List { // GoodsList = Products
    constructor(cart, url='/CatalogData.json', container='.product__main__box'){
        super(url, container);
        this.cart = cart;
        this.getJson()
        .then(data => this.handleData(data));
    }
    _init(){
        document.querySelector(this.container).addEventListener('click', event => {
            if(event.target.classList.contains('product__add')){
                const id = +event.target.dataset[id];
                cart.addProduct(this.getItem(id));
            }
        })
        document.querySelector(`.search-form`).addEventListener('submit', e => {
            e.preventDefault();
            this.filter(document.querySelector(`.search-field`).value);
        })
    }
}
class Cart extends List {
    constructor(url='/getBasket.json', container='.cart-block'){
        super(url, container);
        this.getJson()
        .then(data => this.handleData(data.contents));
    }
    addProduct(product){
        this.getJson(`${API_url}/addToBasket.json`)
            .then((data) => {
                if(data.result){
                    let find = this.allProducts.find((el) => el.id === product.id);
                    if(find){
                        find.quantity++;
                        this._updateCart(find);
                    } else {
                        let prod = Object.assign({quantity:1}, product);
                        this.data = [prod];
                        this._render();
                    }
                } else {
                    console.log('error');
                }
            })
    }
    removeProduct(){

    }
    _updateCart(){

    }
}
class CartItem extends Item {
    constructor(el){
        super(el);
        this.quantity = el.quantity;
    }
    render(){
        return `
            <div class="cart-item" data-id="${this.id}>
                <img class="cart_image" src="${this.img}" alt=${this.title}>
                <p>${this.title}</p>
                <p>$${this.price}</p>
                <p>Количество: ${this.quantity}</p>
            </div>
        `
    }
}
// const cart = new Cart();
const list = new Products();
