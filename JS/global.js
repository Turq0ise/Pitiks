let getFormItems = document.getElementsByClassName("form-item");
for(let i = 0; i < getFormItems.length; i++) {
    let loopItem = getFormItems.item(i);
    loopItem.children.item(1).addEventListener("focus", elem => {
        elem.target.style.outline = "none";
        elem.target.previousElementSibling.style.top = "-0.8rem";
    });
    loopItem.children.item(1).addEventListener("blur", elem => {
        if(!elem.target.value) {
            return elem.target.previousElementSibling.style.top = "";
        };
    });
};

try {
    let getContactForm = document.getElementById("contact-form");
    getContactForm.addEventListener("submit", e => {
        e.preventDefault();
        const form = e.target;
        let data = new FormData(form);
        
        fetch(form.action, {
            method: "POST",
            body: data
        }).then(
            formSuccess(e)
        );
    });
    function formSuccess(e) {
        let elem = e.target;
        for(let i = 0; i < elem.length; i++) {
            elem[i].value = "";
        }
        alert("Success");
    }
} catch (err) {
    console.log(err)
}

let cartNum = document.querySelector("i[data-cart]");
function updateCartNum() {
    let getCartSoloPackage = JSON.parse(localStorage.getItem("CartSoloPackage"));
    let getCartGroupPackage = JSON.parse(localStorage.getItem("CartGroupPackage"));
    let getCartSectionPackage = JSON.parse(localStorage.getItem("CartSectionPackage"));
    let getCartAdditionalPhoto = JSON.parse(localStorage.getItem("CartAdditionalPhoto"));
    let cartItemArray = [getCartSoloPackage, getCartGroupPackage, getCartSectionPackage, getCartAdditionalPhoto];
    let cartItemSum = 0;
    for(let i = 0; i < cartItemArray.length; i++){
        if(cartItemArray[i] == null) {
            cartItemSum += 0;
        } else {
            cartItemSum += parseInt(cartItemArray[i].amount);
        }
    }

    if(cartItemSum > 0) {
        cartNum.attributes["data-cart"].nodeValue = cartItemSum;
        cartNum.style.setProperty("--after", "red");
    } else {
        cartNum.attributes["data-cart"].nodeValue = "";
        cartNum.style.setProperty("--after", "transparent");
    }
}

window.addEventListener("load", () => {
    updateCartNum();
})

let priceObj = {
    solo: 35.00,
    group: 70.00,
    section: 105.00,
    additional: 10.00
}