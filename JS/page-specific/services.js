let getSoloAmount = document.getElementById("amount-solo");
let getGroupAmount = document.getElementById("amount-group");
let getSectionAmount = document.getElementById("amount-section");
let getAdditionalAmount = document.getElementById("amount-additional");

let getSoloPrice = document.getElementById("price-solo");
let getGroupPrice = document.getElementById("price-group");
let getSectionPrice = document.getElementById("price-section");
let getAdditionalPrice = document.getElementById("price-additional");

let priceObj = {
    solo: 35.00,
    group: 70.00,
    section: 105.00,
    additional: 10.00
}

getSoloPrice.attributes["data-price"].nodeValue = priceObj.solo;
getGroupPrice.attributes["data-price"].nodeValue = priceObj.group;
getSectionPrice.attributes["data-price"].nodeValue = priceObj.section;
getAdditionalPrice.attributes["data-price"].nodeValue = priceObj.additional;


function incrementAmount(id) {
    if(id == "solo") {
        getSoloAmount.attributes["data-amount"].nodeValue++;
        getSoloPrice.attributes["data-price"].nodeValue = priceObj.solo * getSoloAmount.attributes["data-amount"].nodeValue;
    } else if(id == "group") {
        getGroupAmount.attributes["data-amount"].nodeValue++;
        getGroupPrice.attributes["data-price"].nodeValue = priceObj.group * getGroupAmount.attributes["data-amount"].nodeValue;
    } else if(id == "section") {
        getSectionAmount.attributes["data-amount"].nodeValue++;
        getSectionPrice.attributes["data-price"].nodeValue = priceObj.section * getSectionAmount.attributes["data-amount"].nodeValue;
    } else if(id == "additional") {
        getAdditionalAmount.attributes["data-amount"].nodeValue++;
        getAdditionalPrice.attributes["data-price"].nodeValue = priceObj.additional * getAdditionalAmount.attributes["data-amount"].nodeValue;
    } else {
        return
    }
}

function decrementAmount(id) {
    if(id == "solo") {
        if(getSoloAmount.attributes["data-amount"].nodeValue == 1) {
            return
        }

        getSoloAmount.attributes["data-amount"].nodeValue--;
        getSoloPrice.attributes["data-price"].nodeValue = priceObj.solo * getSoloAmount.attributes["data-amount"].nodeValue;
    } else if(id == "group") {
        if(getGroupAmount.attributes["data-amount"].nodeValue == 1) {
            return
        }

        getGroupAmount.attributes["data-amount"].nodeValue--;
        getGroupPrice.attributes["data-price"].nodeValue = priceObj.group * getGroupAmount.attributes["data-amount"].nodeValue;
    } else if(id == "section") {
        if(getSectionAmount.attributes["data-amount"].nodeValue == 1) {
            return
        }

        getSectionAmount.attributes["data-amount"].nodeValue--;
        getSectionPrice.attributes["data-price"].nodeValue = priceObj.section * getSectionAmount.attributes["data-amount"].nodeValue;
    } else if(id == "additional") {
        if(getAdditionalAmount.attributes["data-amount"].nodeValue == 1) {
            return
        }

        getAdditionalAmount.attributes["data-amount"].nodeValue--;
        getAdditionalPrice.attributes["data-price"].nodeValue = priceObj.additional * getAdditionalAmount.attributes["data-amount"].nodeValue;
    } else {
        return
    }
}

let cartListObj = {
    // 0: {
    //     service: "Solo Package",
    //     amount: 1,
    //     price: 35
    // },
    // 1: {
    //     service: "Solo Package",
    //     amount: 1,
    //     price: 35
    // },  
}

if(localStorage.getItem("Cart List") == null) {
    localStorage.setItem("Cart List", JSON.stringify(cartListObj))
}

function addToCart(id) {

    if(id == "solo") {
        cartListObj[Object.keys(JSON.parse(localStorage.getItem("Cart List"))).length] = {
            service: "Solo Package",
            amount: getSoloAmount.attributes["data-amount"].nodeValue,
            price: getSoloPrice.attributes["data-price"].nodeValue
        }
    } else if(id == "group") {
        cartListObj[Object.keys(JSON.parse(localStorage.getItem("Cart List"))).length] = {
            service: "Group Package",
            amount: getGroupAmount.attributes["data-amount"].nodeValue,
            price: getGroupPrice.attributes["data-price"].nodeValue
        }
    } else if(id == "section") {
        cartListObj[Object.keys(JSON.parse(localStorage.getItem("Cart List"))).length] = {
            service: "Section Package",
            amount: getSectionAmount.attributes["data-amount"].nodeValue,
            price: getSectionPrice.attributes["data-price"].nodeValue
        }
    } else if(id == "additional") {
        cartListObj[Object.keys(JSON.parse(localStorage.getItem("Cart List"))).length] = {
            service: "Additional Photo",
            amount: getAdditionalAmount.attributes["data-amount"].nodeValue,
            price: getAdditionalPrice.attributes["data-price"].nodeValue
        }
    } else {
        return
    }

    localStorage.setItem("Cart List", JSON.stringify(cartListObj))
}