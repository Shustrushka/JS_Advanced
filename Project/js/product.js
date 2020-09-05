const API_img = 'https://github.com/Shustrushka/static';
const API_url = 'https://raw.githubusercontent.com/Shustrushka/static/master';

function makeGETRequest(url) {
    return new Promise((resolve, reject) => {
        let xhr;
        if (window.XMLHttpRequest) {
          xhr = new XMLHttpRequest();
        } else if (window.ActiveXObject) { 
          xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xhr.onreadystatechange = () => {
            if(xhr.readyState === 4)  {
                if(xhr.status !== 200) {
                    reject('error');
            } else {
                resolve(xhr.responseText);
            }
          }
        }
          xhr.open('GET', url, true);
          xhr.send();
    });
  };

class GoodsItem {
    constructor(el = { id: 'ID', title: 'NoName', img: 'https://via.placeholder.com/263x280', price: 'call' }){
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
    }
    _fetchGoods(){
        makeGETRequest(`${API_url}/CatalogData.json`)
        .then(data => {
            this.goods = JSON.parse(data);
            console.log(this.goods);
            this._render();
        })
        .catch(err => {
            console.log(err);
        });
        // (goods) => {
        //     this.goods = JSON.parse(goods);
        //     console.log(this.goods);
        //     this._render();
        // }) 
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