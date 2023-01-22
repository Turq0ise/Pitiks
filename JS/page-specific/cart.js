let getCartItemsContainer = document.getElementById("cart-items")
let getCartSoloPackage = JSON.parse(localStorage.getItem("CartSoloPackage"));
let getCartGroupPackage = JSON.parse(localStorage.getItem("CartGroupPackage"));
let getCartSectionPackage = JSON.parse(localStorage.getItem("CartSectionPackage"));
let getCartAdditionalPhoto = JSON.parse(localStorage.getItem("CartAdditionalPhoto"));
let cartItemArray = [getCartSoloPackage, getCartGroupPackage, getCartSectionPackage, getCartAdditionalPhoto];
let cartTotalPrice = 0;

for(let i = 0; i < cartItemArray.length; i++) {
    if(cartItemArray[i] !== null) {
        getCartItemsContainer.innerHTML += `
            <div class="card">
                <div class="info">
                    <h2>${cartItemArray[i].service}</h2>
                    <p id="price-${cartItemArray[i].id}" data-price="${cartItemArray[i].price}"></p>
                </div>
    
                <hr>
    
                <div class="buttons">
                    <div class="count-buttons">
                        <button onclick="decrementAmount('${cartItemArray[i].id}')">-</button>
                        <p id="amount-${cartItemArray[i].id}" data-amount="${cartItemArray[i].amount}"></p>
                        <button onclick="incrementAmount('${cartItemArray[i].id}')">+</button>
                    </div>
                </div>
    
                <div class="additional-options">
                    <!-- <input type="checkbox" name="" id=""> -->
                    <button onclick="removeCartItem(this, '${cartItemArray[i].localStorage}', ${cartItemArray[i].price})"><i class="fa-solid fa-trash-can"></i></button>
                </div>
            </div>
        `
        cartTotalPrice += cartItemArray[i].price
    }
}

document.getElementById("total-price").attributes["data-total-price"].nodeValue = cartTotalPrice;

let getSoloAmount = document.getElementById("amount-solo");
let getGroupAmount = document.getElementById("amount-group");
let getSectionAmount = document.getElementById("amount-section");
let getAdditionalAmount = document.getElementById("amount-additional");

let getSoloPrice = document.getElementById("price-solo");
let getGroupPrice = document.getElementById("price-group");
let getSectionPrice = document.getElementById("price-section");
let getAdditionalPrice = document.getElementById("price-additional");

let getCheckoutEmailInput = document.getElementById("email-container");
getCheckoutEmailInput.children[1].addEventListener("focus", elem => {
    elem.target.style.outline = "none";
    elem.target.previousElementSibling.style.top = "-0.8rem";
})
getCheckoutEmailInput.children[1].addEventListener("blur", elem => {
    if(!elem.target.value) {
        return elem.target.previousElementSibling.style.top = "";
    };
})

function removeCartItem(elem, storage, price) {
    elem.parentNode.parentNode.remove();
    localStorage.removeItem(storage);
    updateCartNum();
    cartTotalPrice -= price;
    document.getElementById("total-price").attributes["data-total-price"].nodeValue = cartTotalPrice;
}

function incrementAmount(id) {
    if(id == "solo") {
        getSoloAmount.attributes["data-amount"].nodeValue++;
        getSoloPrice.attributes["data-price"].nodeValue = priceObj.solo * getSoloAmount.attributes["data-amount"].nodeValue;
        cartTotalPrice += priceObj.solo;

        let previousData = JSON.parse(localStorage.getItem("CartSoloPackage"));
        localStorage.setItem("CartSoloPackage", JSON.stringify({
            service: previousData.service,
            amount: parseInt(previousData.amount) + 1,
            price: parseInt(priceObj.solo) + parseInt(previousData.price),
            localStorage: previousData.localStorage,
            id: previousData.id
        }))
    } else if(id == "group") {
        getGroupAmount.attributes["data-amount"].nodeValue++;
        getGroupPrice.attributes["data-price"].nodeValue = priceObj.group * getGroupAmount.attributes["data-amount"].nodeValue;
        cartTotalPrice += priceObj.group;

        let previousData = JSON.parse(localStorage.getItem("CartGroupPackage"));
        localStorage.setItem("CartGroupPackage", JSON.stringify({
            service: previousData.service,
            amount: parseInt(previousData.amount) + 1,
            price: parseInt(priceObj.group) + parseInt(previousData.price),
            localStorage: previousData.localStorage,
            id: previousData.id
        }))
    } else if(id == "section") {
        getSectionAmount.attributes["data-amount"].nodeValue++;
        getSectionPrice.attributes["data-price"].nodeValue = priceObj.section * getSectionAmount.attributes["data-amount"].nodeValue;
        cartTotalPrice += priceObj.section;

        let previousData = JSON.parse(localStorage.getItem("CartSectionPackage"));
        localStorage.setItem("CartSectionPackage", JSON.stringify({
            service: previousData.service,
            amount: parseInt(previousData.amount) + 1,
            price: parseInt(priceObj.section) + parseInt(previousData.price),
            localStorage: previousData.localStorage,
            id: previousData.id
        }))
    } else if(id == "additional") {
        getAdditionalAmount.attributes["data-amount"].nodeValue++;
        getAdditionalPrice.attributes["data-price"].nodeValue = priceObj.additional * getAdditionalAmount.attributes["data-amount"].nodeValue;
        cartTotalPrice += priceObj.additional;

        let previousData = JSON.parse(localStorage.getItem("CartAdditionalPhoto"));
        localStorage.setItem("CartAdditionalPhoto", JSON.stringify({
            service: previousData.service,
            amount: parseInt(previousData.amount) + 1,
            price: parseInt(priceObj.additional) + parseInt(previousData.price),
            localStorage: previousData.localStorage,
            id: previousData.id
        }))
    } else {
        return
    }
    document.getElementById("total-price").attributes["data-total-price"].nodeValue = cartTotalPrice;
}

function decrementAmount(id) {
    if(id == "solo") {
        if(getSoloAmount.attributes["data-amount"].nodeValue == 1) {
            return
        }

        getSoloAmount.attributes["data-amount"].nodeValue--;
        getSoloPrice.attributes["data-price"].nodeValue = priceObj.solo * getSoloAmount.attributes["data-amount"].nodeValue;
        cartTotalPrice -= priceObj.solo;

        let previousData = JSON.parse(localStorage.getItem("CartSoloPackage"));
        localStorage.setItem("CartSoloPackage", JSON.stringify({
            service: previousData.service,
            amount: parseInt(previousData.amount) - 1,
            price: parseInt(previousData.price) - parseInt(priceObj.solo),
            localStorage: previousData.localStorage,
            id: previousData.id
        }))
    } else if(id == "group") {
        if(getGroupAmount.attributes["data-amount"].nodeValue == 1) {
            return
        }

        getGroupAmount.attributes["data-amount"].nodeValue--;
        getGroupPrice.attributes["data-price"].nodeValue = priceObj.group * getGroupAmount.attributes["data-amount"].nodeValue;
        cartTotalPrice -= priceObj.group;

        let previousData = JSON.parse(localStorage.getItem("CartGroupPackage"));
        localStorage.setItem("CartGroupPackage", JSON.stringify({
            service: previousData.service,
            amount: parseInt(previousData.amount) - 1,
            price: parseInt(previousData.price) - parseInt(priceObj.group),
            localStorage: previousData.localStorage,
            id: previousData.id
        }))
    } else if(id == "section") {
        if(getSectionAmount.attributes["data-amount"].nodeValue == 1) {
            return
        }

        getSectionAmount.attributes["data-amount"].nodeValue--;
        getSectionPrice.attributes["data-price"].nodeValue = priceObj.section * getSectionAmount.attributes["data-amount"].nodeValue;
        cartTotalPrice -= priceObj.section;

        let previousData = JSON.parse(localStorage.getItem("CartSectionPackage"));
        localStorage.setItem("CartSectionPackage", JSON.stringify({
            service: previousData.service,
            amount: parseInt(previousData.amount) - 1,
            price: parseInt(previousData.price) - parseInt(priceObj.section),
            localStorage: previousData.localStorage,
            id: previousData.id
        }))
    } else if(id == "additional") {
        if(getAdditionalAmount.attributes["data-amount"].nodeValue == 1) {
            return
        }

        getAdditionalAmount.attributes["data-amount"].nodeValue--;
        getAdditionalPrice.attributes["data-price"].nodeValue = priceObj.additional * getAdditionalAmount.attributes["data-amount"].nodeValue;
        cartTotalPrice -= priceObj.additional;

        let previousData = JSON.parse(localStorage.getItem("CartAdditionalPhoto"));
        localStorage.setItem("CartAdditionalPhoto", JSON.stringify({
            service: previousData.service,
            amount: parseInt(previousData.amount) - 1,
            price: parseInt(previousData.price) - parseInt(priceObj.additional),
            localStorage: previousData.localStorage,
            id: previousData.id
        }))
    } else {
        return
    }
    document.getElementById("total-price").attributes["data-total-price"].nodeValue = cartTotalPrice;
}

document.getElementById("cart-options").addEventListener("submit", (e) => {
    e.preventDefault()
    localStorage.setItem("UserEmail", document.getElementById("checkout-email").value)
    location.href = "/PAGES/CHECKOUT"
})