Vue.component('cart', {
    props: ['cartItems', 'img', 'visibility'],
    template: `<div class="drop-cart" v-show="visibility">
    <div class="drop-cart_top">
    </div>
    <div class="drop-cart_bottom">
        <p v-if="!cartItems.length">Cart is empty</p>
        <cart-item 
        v-for="item of cartItems" 
        :key="item.id"
        :cart-item="item"
        :img="img"></cart-item>
        <h1 class="drop-cart_total" v-if="cartItems.length">TOTAL <span>$350</span></h1> <!--написать функцию amount и воткнуть сюда-->
        <a href="C:/Users/Nina/Documents/GitHub/shustrushka/JS_Advanced/Project/Checkout.html" class="checkout-button" v-if="cartItems.length">checkout</a>
        <a href="C:/Users/Nina/Documents/GitHub/shustrushka/JS_Advanced/Project/Cart.html" class="goToCart-button" v-if="cartItems.length">Go to cart</a>
    </div>
</div>` 
});

Vue.component('cart-item', {
    props: ['cartItem, img'],
    template: `<div class="drop-cart_item" >
    <img :src="img" :alt="cartItem.title" class="drop-cart_img">
        <div class="drop-cart_desc">
            <h3>{{cartItem.title}}</h3>
            <div class="drop-cart_rating">
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star-half-alt"></i>
            </div>
            <p class="drop-cart_price">{{cartItem.quantity}}<span> x </span>$ {{cartItem.price}}</p>
        </div>
    <a href="#" @click="$parent.$emit('remove', cartItem)"><i class="fas fa-times-circle fa-times-circle-miniCart"></i></a>
</div>`
})