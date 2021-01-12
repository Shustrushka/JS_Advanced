Vue.component('products', {
    props: ['products', 'img'],
    template: `<div class="product__main__box">
    <product 
    v-for="el of products" 
    :key="el.id"
    :img="img"
    :product="el"></product>
</div>`
});

Vue.component('product', {
    props: ['product, img'],
    template: `<div class="product__main__items">
    <a href="C:/Users/Nina/Documents/GitHub/shustrushka/JS_Advanced/Project/singlepage.html" class="product__items__link">
        <img class="product_image" :src="img" :alt=product.title></a>
        <div class="product__content">
            <a href="#" class="product__name">{{product.title}}</a>
            <p class="product__price">{{product.price}}</p>
        </div>
        <a href="#" class="product__add" @click="$parent.$emit('add-product', product)">Add to Cart</a>
</div>`
})