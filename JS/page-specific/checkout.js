let getCheckoutItemsContainer = document.getElementById("checkout-items");
let getCheckoutDetailsContainer = document.getElementById("checkout-details");
let getCartSoloPackage = JSON.parse(localStorage.getItem("CartSoloPackage"));
let getCartGroupPackage = JSON.parse(localStorage.getItem("CartGroupPackage"));
let getCartSectionPackage = JSON.parse(localStorage.getItem("CartSectionPackage"));
let getCartAdditionalPhoto = JSON.parse(localStorage.getItem("CartAdditionalPhoto"));
let cartItemArray = [getCartSoloPackage, getCartGroupPackage, getCartSectionPackage, getCartAdditionalPhoto];
let checkoutTotalPrice = 0;

window.addEventListener("load", () => {
    for(let i = 0; i < cartItemArray.length; i++) {
        if(cartItemArray[i] !== null) {
            getCheckoutItemsContainer.innerHTML += `
                <div class="item">
                    <h2>${cartItemArray[i].service}</h2>
                    <hr>
                    <div class="details">
                        <p>${cartItemArray[i].amount}</p>
                        <p>₱${cartItemArray[i].price}.00</p>
                    </div>
                </div>
            `
            checkoutTotalPrice += cartItemArray[i].price;
        }
    }
    getCheckoutDetailsContainer.innerHTML = `
        <h2>Total: ₱${checkoutTotalPrice}.00</h2>
        <p>${localStorage.getItem("UserEmail")}</p>
        <button type="submit">Place Order</button>
    `
})

document.getElementById("checkout-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const form = e.target;
    let newData = new FormData(form);

    newData.append("entry.641130522", localStorage.getItem("UserEmail"));
    newData.append("entry.935902553", getCartSoloPackage !== null ? getCartSoloPackage.amount : 0);
    newData.append("entry.1779896845", getCartGroupPackage !== null ? getCartGroupPackage.amount : 0);
    newData.append("entry.1391935987", getCartSectionPackage !== null ? getCartSectionPackage.amount : 0);
    newData.append("entry.1939895930", getCartAdditionalPhoto !== null ? getCartAdditionalPhoto.amount : 0);


    fetch(form.action, {
        method: "POST",
        body: newData
    }).then(
        localStorage.clear(),
        window.location = "/",
        alert("Submitted")
    ) 
})