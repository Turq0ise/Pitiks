let getSoloAmount = document.getElementById("amount-solo");
let getGroupAmount = document.getElementById("amount-group");
let getSectionAmount = document.getElementById("amount-section");
let getAdditionalAmount = document.getElementById("amount-additional");

let getSoloPrice = document.getElementById("price-solo");
let getGroupPrice = document.getElementById("price-group");
let getSectionPrice = document.getElementById("price-section");
let getAdditionalPrice = document.getElementById("price-additional");

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

function addToCart(id) {
    if(id == "solo") {
        if(localStorage.getItem("CartSoloPackage") === null) {
            localStorage.setItem("CartSoloPackage", JSON.stringify({
                service: "Solo Package",
                amount: parseInt(getSoloAmount.attributes["data-amount"].nodeValue),
                price: parseInt(getSoloPrice.attributes["data-price"].nodeValue),
                localStorage: "CartSoloPackage",
                id: "solo"
            }))
        } else {
            let previousData = JSON.parse(localStorage.getItem("CartSoloPackage"));
            localStorage.setItem("CartSoloPackage", JSON.stringify({
                service: previousData.service,
                amount: parseInt(getSoloAmount.attributes["data-amount"].nodeValue) + parseInt(previousData.amount),
                price: parseInt(getSoloPrice.attributes["data-price"].nodeValue) + parseInt(previousData.price),
                localStorage: previousData.localStorage,
                id: previousData.id
            }))
        }
    } else if(id == "group") {
        if(localStorage.getItem("CartGroupPackage") === null){
            localStorage.setItem("CartGroupPackage", JSON.stringify({
                service: "Group Package",
                amount: parseInt(getGroupAmount.attributes["data-amount"].nodeValue),
                price: parseInt(getGroupPrice.attributes["data-price"].nodeValue),
                localStorage: "CartGroupPackage",
                id: "group"
            }))
        } else {
            let previousData = JSON.parse(localStorage.getItem("CartGroupPackage"));
            localStorage.setItem("CartGroupPackage", JSON.stringify({
                service: previousData.service,
                amount: parseInt(getGroupAmount.attributes["data-amount"].nodeValue) + parseInt(previousData.amount),
                price: parseInt(getGroupPrice.attributes["data-price"].nodeValue) + parseInt(previousData.price),
                localStorage: previousData.localStorage,
                id: previousData.id
            }))
        }
    } else if(id == "section") {
        if(localStorage.getItem("CartSectionPackage") === null){
            localStorage.setItem("CartSectionPackage", JSON.stringify({
                service: "Section Package",
                amount: parseInt(getSectionAmount.attributes["data-amount"].nodeValue),
                price: parseInt(getSectionPrice.attributes["data-price"].nodeValue),
                localStorage: "CartSectionPackage",
                id: "group"
            }))
        } else {
            let previousData = JSON.parse(localStorage.getItem("CartSectionPackage"));
            localStorage.setItem("CartSectionPackage", JSON.stringify({
                service: previousData.service,
                amount: parseInt(getSectionAmount.attributes["data-amount"].nodeValue) + parseInt(previousData.amount),
                price: parseInt(getSectionPrice.attributes["data-price"].nodeValue) + parseInt(previousData.price),
                localStorage: previousData.localStorage,
                id: previousData.id
            }))
        }
    } else if(id == "additional") {
        if(localStorage.getItem("CartAdditionalPhoto") === null){
            localStorage.setItem("CartAdditionalPhoto", JSON.stringify({
                service: "Additional Photo",
                amount: parseInt(getAdditionalAmount.attributes["data-amount"].nodeValue),
                price: parseInt(getAdditionalPrice.attributes["data-price"].nodeValue),
                localStorage: "CartAdditionalPhoto",
                id: "additional"
            }))
        } else {
            let previousData = JSON.parse(localStorage.getItem("CartAdditionalPhoto"));
            localStorage.setItem("CartAdditionalPhoto", JSON.stringify({
                service: previousData.service,
                amount: parseInt(getAdditionalAmount.attributes["data-amount"].nodeValue) + parseInt(previousData.amount),
                price: parseInt(getAdditionalPrice.attributes["data-price"].nodeValue) + parseInt(previousData.price),
                localStorage: previousData.localStorage,
                id: previousData.id
            }))
        }
    }
    updateCartNum();
}