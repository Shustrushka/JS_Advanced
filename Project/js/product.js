const API_img = 'https://github.com/Shustrushka/static';
const API_url = 'https://raw.githubusercontent.com/Shustrushka/static/master';
// const products = [
//     {id: 1, title: 'Mango  People  T-shirt', price: 100, img: '/raw/master/img/product_1.png'},
//     {id: 2, title: 'Mango  People  T-shirt', price: 50, img: '/raw/master/img/product_2.png'},
//     {id: 3, title: 'Mango  People  T-shirt', price: 15, img: '/raw/master/img/product_3.png'},
//     {id: 4, title: 'Mango  People  T-shirt', price: 5, img: '/raw/master/img/product_4.png'},
//     {id: 5, title: 'Mango  People  T-shirt', price: 20, img: '/raw/master/img/product_5.png'},
//     {id: 6, title: 'Mango  People  T-shirt', price: 35, img: '/raw/master/img/product_6.png'},
//     {id: 7, title: 'Mango  People  T-shirt', price: 45, img: '/raw/master/img/product_7.png'},
//     {id: 8, title: 'Mango  People  T-shirt', price: 10, img: '/raw/master/img/product_8.png'},
//     {id: 9, title: 'Mango  People  T-shirt', price: 300, img: '/raw/master/img/product_9.png'},
// ];

function makeGETRequest(url, callback) {
    var xhr;
  
    if (window.XMLHttpRequest) {
      xhr = new XMLHttpRequest();
    } else if (window.ActiveXObject) { 
      xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }
  
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        callback(xhr.responseText);
      }
    }
  
    xhr.open('GET', url, true);
    xhr.send();
    console.log(xhr.readyState);
  }

class GoodsItem {
    constructor(el){
        this.title = el.title;
        this.id = el.id;
        this.img = el.img;
        this.price = el.price;
    }
    _render(){
        return `
            <div class="product__main__items">
                <a href="#" class="product__items__link"><img class="product_image" src="${this.img}" alt=${this.title}></a>
                    <div class="product__content">
                        <a href="#" class="product__name">${this.title}</a>
                        <p class="product__price">$${this.price}</p>
                    </div>
                <a href="#" class="product__add">Add to Cart</a>
            </div>
        `
    }
}

class GoodsList {
    constructor(container='.product__main__box'){
        this.container = container;
        this.goods = [];
        this.allGoods = [];
        this.init();
    }
    init(){
        this._fetchGoods();
        this._render();
        // this._fetchGoods(this._render());
    }
    _fetchGoods(){
        makeGETRequest(`${API_url}/CatalogData.json`, (goods) => {
            this.goods = JSON.parse(goods);
            console.log(this.goods);
        }) 
    }
    _render(){
        const block = document.querySelector(this.container);
        for (let el of this.goods) {
            const GoodItem = new GoodsItem(el);
            this.allGoods.push(GoodItem);
            block.insertAdjacentHTML('beforeend', GoodItem._render());
        }
    }
}

const list = new GoodsList();

// const renderProductItem = (title='', price, img = 'https://via.placeholder.com/250x300') => {
//     return `
//             <div class="product__main__items">
//                 <a href="#" class="product__items__link"><img class="product_image" src="${img}" alt=${title}></a>
//                     <div class="product__content">
//                         <a href="#" class="product__name">Mango  People  T-shirt</a>
//                         <p class="product__price">$${price}</p>
//                     </div>
//                 <a href="#" class="product__add">Add to Cart</a>
//             </div>
//     `
// };
// const renderProductList = list => {
//     document.querySelector('.product__main__box').innerHTML = list.map(({ title, price, img }) => renderProductItem(title, price, img)).join('');
// };
// renderProductList(products);