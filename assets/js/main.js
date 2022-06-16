"use strict"

function filterProducts(category){
    if(category == 'all'){
        return (items)
    }else{
        let products = items.filter((product)=> {
            return (product.category == category)
        })
        return products
    }
}

function searchProducts(category){
    let section = document.getElementById('products')
    let array = filterProducts(category)
    section.innerHTML = ""
    array.forEach(product => {
        let html = `<article>`
            html += `<div class="card-image">`
            html += `<img src="${product.image}">`
            html += `</div>`
            html += `<div class="card-body">`
            html += `<h3>$${product.price} <small>| Stock: ${product.quantity}</small></h3>`
            html += `<h4>${product.name}</h4>`
            html += `</div>`
            html += `<button class="add" type="button" onclick="addToCart(${product.id}, 1)">+</button>`
            html += `</article>`
            section.insertAdjacentHTML('afterbegin', html)
    });
}

function checkCart(){
    if(localStorage.getItem('cart')){
        document.getElementById('empty-cart').classList.add('d-none')
        document.getElementById('empty-cart').classList.remove('d-block')
    }else{
        document.getElementById('empty-cart').classList.remove('d-none')
        document.getElementById('empty-cart').classList.add('d-block')
    }

    if(localStorage.getItem('cart')){
        if(parseInt(localStorage.getItem('cart').length) == 2){
            document.getElementById('empty-cart').classList.add('d-block')
            document.getElementById('empty-cart').classList.remove('d-none')
        }
    }
}

function quantityFilter(){
    let hoodies = 0
    let shirts = 0
    let sweatshirts = 0
    items.forEach(product => {
        if(product.category == 'hoodies'){
            hoodies++
        }else if(product.category == 'shirts'){
            shirts++
        }else if(product.category == 'sweatshirts'){
            sweatshirts++
        }
    });
    document.getElementById('quantity-hoodies').insertAdjacentHTML('afterbegin', `${hoodies} products`)
    document.getElementById('quantity-shirts').insertAdjacentHTML('afterbegin', `${shirts} products`)
    document.getElementById('quantity-swearshirts').insertAdjacentHTML('afterbegin', `${sweatshirts} products`)
}

function buttonsFilter(){
    document.getElementById("searchAll").onclick = function() {  
        searchProducts('all')
    };
    document.getElementById("searchHoodies").onclick = function() {  
        searchProducts('hoodies')
    };  
    document.getElementById("searchShirts").onclick = function() {  
        searchProducts('shirts')
    };  
    document.getElementById("searchSwearshirts").onclick = function() {  
        searchProducts('sweatshirts')
    };
    document.getElementById("button-checkout").onclick = function() {  
        localStorage.removeItem('cart');
        checkCart()
        document.getElementById('products-cart').innerHTML = ""
        document.getElementById('total-products').innerHTML = `0 items`
        document.getElementById('total').innerHTML = `$0.00`
    };
}

function showProductsCard(){
    let cart = JSON.parse(localStorage.getItem('cart'))
    let section = document.getElementById('products-cart')
    section.innerHTML = ""
    let total = 0
    let totalProducts = 0
    cart.forEach(product => {
        let subtotal = parseFloat(product.quantity) * parseFloat(product.price)
        let article = `<article class="article-cart">`
        totalProducts += product.quantity
        total += subtotal
        article += `<div class="article-cart-image">`
        article += `<img src="${product.image}" alt="product">`
        article += `</div>`
        article += `<div class="article-details-cart">`
        article += `<span>${product.name}</span>`
        article += `<span>Stock: ${product.stock} | $${product.price}</span>`
        article += `<span>Subtotal: $${subtotal}</span>`
        article += `<div class="btn-details-cart">`
        article += `<button type="button" onclick="addToCart(${product.id}, 0)">-</button>`
        article += `<span>${product.quantity} units</span>`
        article += `<button type="button" onclick="addToCart(${product.id}, 1)">+</button>`
        article += `</div>`
        article += `</div>`
        article += `<div>`
        article += `<i onclick="deleteProduct(${product.id})" class='bx bx-trash'></i>`
        article += `</div>`
        article += `</article>`
        section.insertAdjacentHTML('afterbegin', article)

        document.getElementById('total-products').innerHTML = `${totalProducts} items`
        document.getElementById('total').innerHTML = `$${total}`
    })
}

function deleteProduct(id){
    let cart = JSON.parse(localStorage.getItem('cart'))
    cart.forEach(function(product, index, object) {
        if(product.id == id){
          object.splice(index, 1);
        }
    });
    localStorage.setItem('cart', JSON.stringify(cart))
    checkCart()
    showProductsCard()
}

function addToCart(id, operation){
    if(localStorage.getItem('cart')){
        let find = 0
        let cart = JSON.parse(localStorage.getItem('cart'))
        cart.forEach(product => {
            if(product.id == id){
                find = 1
                if(operation == 1){
                    product.quantity += 1
                }else if(operation == 0){
                    product.quantity -= 1
                }
            }
        });
        if(find == 0){
            items.forEach(product => {
                if(product.id == id){
                    let addNewProduct = {
                        'id': id,
                        'quantity': 1,
                        'stock': product.quantity,
                        'name': product.name,
                        'price': product.price,
                        'image': product.image,
                        'category': product.category
                    }
                    cart.push(addNewProduct)
                }
            })
            localStorage.setItem('cart', JSON.stringify(cart));
        }else{
            localStorage.setItem('cart', JSON.stringify(cart))
        }
    }else{
        console.log('aquii')
        document.getElementById('empty-cart').classList.add('d-none')
        items.forEach(product => {
            if(product.id == id){
                let addNewProduct = [{
                    'id': id,
                    'quantity': 1,
                    'stock': product.quantity,
                    'name': product.name,
                    'price': product.price,
                    'image': product.image,
                    'category': product.category
                }]
                localStorage.setItem('cart', JSON.stringify(addNewProduct));
            }
        })
    }
    checkCart()
    showProductsCard()
}

(function(){
    searchProducts('all')
    quantityFilter()
    buttonsFilter()
    checkCart()
    showProductsCard()
})()