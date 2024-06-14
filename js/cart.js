// Display cart items
let cartItemsDiv = document.getElementById("cartItems");

function updateCartDisplay() {
  // Retrieve cart from localStorage
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let tbody = document.getElementById("cartItems");
  let newTr = document.createElement("tr"); //new table row
  if (cart.length == 0) {
    let tdempty = document.createElement("td");
    tdempty.colSpan = "6";
    tdempty.textContent = "Empty Cart";
    newTr.append(tdempty);
    tbody.appendChild(newTr);
  } else {
    cart.forEach((item, index) => {
      newTr = document.createElement("tr");
      let tdImg = document.createElement("td"); //new table data for image

      tdImg.classList.add("product-thumbnail");
      let img = document.createElement("img");
      img.classList.add("img-fluid");
      img.src = item.image;
      img.alt = item.product_name;
      tdImg.appendChild(img);
      newTr.appendChild(tdImg);

      let tdProductName = document.createElement("td"); //new table data for product name
      tdProductName.classList.add("product-name");
      let h2 = document.createElement("H2");
      h2.classList.add("h5");
      h2.classList.add("text-black");
      h2.innerText = item.product_name;
      tdProductName.appendChild(h2);
      newTr.appendChild(tdProductName);

      let tdProductPrice = document.createElement("td"); //new table data for product price
      tdProductPrice.textContent = item.product_price;
      newTr.appendChild(tdProductPrice);

      let tdQuantity = document.createElement("td"); //new table data for product quantity
      tdQuantity.textContent = item.quantity;
      newTr.appendChild(tdQuantity);

      let tdTotal = document.createElement("td"); //new table data for product total
      tdTotal.textContent = item.total;
      newTr.appendChild(tdTotal);

      let tdRemove = document.createElement("td"); //new table data for remove item
      let btnremove = document.createElement("button");
      btnremove.classList.add("btn");
      btnremove.classList.add("btn-primary");
      btnremove.classList.add("height-auto");
      btnremove.classList.add("btn-sm");
      btnremove.setAttribute("title", "Remove Item");
      btnremove.textContent = "X";
      btnremove.addEventListener("click", () => {
        removeCartItem(index);
      });

      tdRemove.appendChild(btnremove);

      newTr.appendChild(tdRemove);

      tbody.appendChild(newTr);
    });
  }

  // Using reduce to compute the sum of 'total' values in the cart array
  let totalSum = cart.reduce((accumulator, currentItem) => {
    return accumulator + currentItem.total;
  }, 0);
 
  let totalbills = document.getElementById("totalbills");
  totalbills.textContent = "P" + totalSum.toFixed(2);
}

// Function to remove an item from the cart
function removeCartItem(index) {
  if (confirm("Remove item?")) {
    // Remove the item from the cart array
    cart.splice(index, 1);

    // Update the localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    // Update the cart display
    updateCartDisplay();
  }
}

// Initial cart display update
updateCartDisplay();
