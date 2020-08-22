const goods = [
  { title: 'Shirt', price: 150 },
  { title: 'Socks', price: 50 },
  { title: 'Jacket', price: 350 },
  { title: 'Shoes', price: 250 },
];

const renderGoodsItem = (title, price, img = 'https://via.placeholder.com/150') => {
  return `<div class="goods-item"><img src="${img}" alt="img"><h3>${title}</h3><p>${price}</p></div>`;
};

const renderGoodsList = (list) => document.querySelector('.goods-list').innerHTML = list.map(item => renderGoodsItem(item.title, item.price)).join('');

renderGoodsList(goods);