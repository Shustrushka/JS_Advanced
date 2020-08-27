const goods = [
  { title: 'Shirt', price: 150 },
  { title: 'Socks', price: 50 },
  { title: 'Jacket', price: 350 },
  { title: 'Shoes', price: 250 },
];

class GoodsItem {
  constructor(title = 'No title', price = "Call", img = 'https://placehold.it/150x150') {
    this.title = title;
    this.price = price;
    this.img = img;
  }
  render() {
    return `
      <div class="goods-item">
        <img src="${this.img}" alt="Some img">
        <h3>${this.title}</h3>
        <p>${this.price}</p>
      </div>
    `;
  }
    addToCart(){ // добавляет элемент в корзину. Возможно метод должен быть у GoodsList?
        
    }
}

class GoodsList {
  constructor() {
    this.goods = [];
  }
  fetchGoods() {
    // асинхронная логика, получение с бека
    this.goods = goods;
  }
  render() {
    let html = '';
    this.goods.forEach(({ title, price }) => {
      const goodItem = new GoodsItem(title, price);
      html += goodItem.render();
    });
    document.querySelector('.goods-list').innerHTML = html;
  }
    sumPrice() {
        let sum = 0;
        for (let el of this.goods) {
        sum += el.price; 
        } 
        console.log(sum);
  }
}

class CartItem {
    constructor(){ // по идее, должен наследоваться от GoodsItem, т.к. почти то же самое
        
    }
    
}

class Cart {
    constructor(){
        
    }
    get(){ //запрашивает данные с сервера о том, что лежит в корзине
        
    }
    showCart(){
        
    }
    removeFromCart(){
        
    }
    clearCart(){ // очистить всю корзину
        
    }
}

const list = new GoodsList();
list.fetchGoods();
list.render();
list.sumPrice();