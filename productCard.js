const productList = [
  {
    product_name: "Classy Modern Smart watch",
    product_rating: 4,
    total_reviews: [
      {
        review: "Great product",
        rating: 5,
      },
      {
        review: "Good product",
        rating: 5,
      },
    ],
    main_price: 100,
    discount_price: 80,
    description:
      "I must explain to you how all this mistaken idea of denoun cing ple praising pain was born and I will give you a complete account of the system, and expound the actual teaching.",
    product_type: "Watch",
    product_model: "Forerunner 290XT",
    available_colors: [
      {
        color: "Blue",
        code: "#816BFF",
        img: "./assets/blue.png",
      },
      {
        color: "Sky",
        code: "#1FCEC9",
        img: "./assets/sky.png",
      },
      {
        color: "Cyan",
        code: "#4B97D3",
        img: "./assets/cyan.png",
      },
      {
        color: "Black",
        code: "#3B4747",
        img: "./assets/black.png",
      },
    ],
    available_sizes: [
      {
        size: "S",
        price: 80,
      },
      {
        size: "M",
        price: 69,
      },
      {
        size: "L",
        price: 89,
      },
      {
        size: "XL",
        price: 99,
      },
    ],
  },
];

document.addEventListener("DOMContentLoaded", () => {
  const product = productList[0];
  const thumbImage = document.getElementById("thumbImage");
  const productName = document.getElementById("productName");
  const productRating = document.getElementById("productRating");
  const mainPrice = document.getElementById("mainPrice");
  const finalPrice = document.getElementById("finalPrice");
  const productDescription = document.getElementById("productDescription");
  const productType = document.getElementById("productType");
  const productModel = document.getElementById("productModel");
  const colorOptions = document.getElementById("colorOptions");
  const sizeOptions = document.getElementById("sizeOptions");
  const checkoutCount = document.getElementById("checkoutCount");
  const checkoutButton = document.getElementById("checkoutButton");
  const modalData = document.getElementById("modalData");
  const totalItemCount = document.getElementById("totalItemCount");
  const totalQuantity = document.getElementById("totalQuantity");
  const totalPrice = document.getElementById("totalPrice");
  const dynamicModal = document.getElementById("dynamicModal");
  const continueShopping = document.getElementById("continueShopping");
  const checkout = document.getElementById("checkout");

  let selectedColor = product.available_colors[0];
  let selectedSize = product.available_sizes[0];
  let addedItems = [];
  let checkoutCountValue = 0;

  thumbImage.src = selectedColor.img;
  productName.textContent = product.product_name;
  productRating.textContent = `(${product.total_reviews.length} Reviews)`;
  mainPrice.textContent = `$${product.main_price}`;
  finalPrice.textContent = `$${selectedSize.price}`;
  productDescription.textContent = product.description;
  productType.textContent = product.product_type;
  productModel.textContent = product.product_model;

  product.available_colors.forEach((color, index) => {
    const label = document.createElement("label");
    label.className = "flex items-center cursor-pointer";
    const input = document.createElement("input");
    input.type = "radio";
    input.name = "color";
    input.className = "hidden";
    input.addEventListener("change", () => {
      thumbImage.src = color.img;
      finalPrice.style.color = color.code;
      selectedColor = color;

      // Remove highlight from all labels
      document.querySelectorAll("#colorOptions label").forEach(lbl => {
        lbl.classList.remove("border-[#6576FF]");
      });

      // Add highlight to the selected label
      label.classList.add("border-[#6576FF]");
    });
    const div = document.createElement("div");
    div.className = "w-6 h-6 rounded-full border-2 cursor-pointer";
    div.style.backgroundColor = color.code;
    label.appendChild(input);
    label.appendChild(div);
    colorOptions.appendChild(label);

    // Pre-check the first color
    if (index === 0) {
      input.checked = true;
      label.classList.add("border-[#6576FF]");
    }
  });

  product.available_sizes.forEach((size, index) => {
    const label = document.createElement("label");
    const input = document.createElement("input");
    input.type = "radio";
    input.name = "size";
    input.className = "hidden";

    // Event listener for size change
    input.addEventListener("change", () => {
      selectedSize = size;

      // Update final price
      finalPrice.textContent = `$${size.price}`;

      // Reset and highlight selected size
      document.querySelectorAll("#sizeOptions label").forEach(lbl => {
        lbl.classList.remove("border-[#6576FF]", "bg-[#F3F8FF]");
        lbl.classList.add("border-[#DBDFEA]");
      });
      label.classList.add("border-[#6576FF]", "bg-[#F3F8FF]");
      label.classList.remove("border-[#DBDFEA]");
    });

    // Create label elements
    label.className =
      "flex items-center gap-2 border rounded px-5 py-2 cursor-pointer border-[#DBDFEA]";
    const sizeText = document.createElement("p");
    sizeText.className = "font-bold text-base text-[#364A63]";
    sizeText.textContent = size.size;
    const priceText = document.createElement("p");
    priceText.className = "text-sm font-normal text-[#8091A7]";
    priceText.textContent = `$${size.price}`;

    // Append elements
    label.appendChild(input);
    label.appendChild(sizeText);
    label.appendChild(priceText);
    sizeOptions.appendChild(label);

    // Pre-check the first size
    if (selectedSize.size === size.size) {
      input.checked = true;
      label.classList.add("border-[#6576FF]", "bg-[#F3F8FF]");
    }
  });

  document.getElementById("increaseCount").addEventListener("click", () => {
    checkoutCountValue++;
    checkoutCount.value = checkoutCountValue;
  });

  document.getElementById("decreaseCount").addEventListener("click", () => {
    if (checkoutCountValue > 0) {
      checkoutCountValue--;
      checkoutCount.value = checkoutCountValue;
    }
  });

  document.getElementById("addToCart").addEventListener("click", () => {
    const checkoutCountNumber = parseInt(checkoutCount.value);
    if (checkoutCountNumber == 0) {
      showError("Checkout count must be greater than 0!");
    } else {
      showToaster("Item added to cart!");
    }
    if (checkoutCountValue > 0) {
      checkoutButton.style.opacity = 1;

      const newItem = {
        name: product.product_name,
        price: selectedSize.price,
        size: selectedSize.size,
        color: selectedColor.color,
        img: selectedColor.img,
        quantity: checkoutCountValue,
      };

      const existingItemIndex = addedItems.findIndex(
        item =>
          item.name === newItem.name &&
          item.size === newItem.size &&
          item.color === newItem.color
      );

      if (existingItemIndex > -1) {
        addedItems[existingItemIndex].quantity += checkoutCountValue;
      } else {
        addedItems.push(newItem);
      }

      checkoutCountValue = 0;
      checkoutCount.value = checkoutCountValue;

      // Update totalItemCount
      totalItemCount.textContent = addedItems.reduce(
        (acc, item) => acc + item.quantity,
        0
      );
    } else {
      document.getElementById("shakeCounter").classList.add("shake");

      setTimeout(() => {
        document.getElementById("shakeCounter").classList.remove("shake");
      }, 500);
    }
  });

  function showToaster(message) {
    const toaster = document.getElementById("toaster");
    toaster.textContent = message;
    toaster.classList.add("show");
    setTimeout(() => {
      toaster.classList.remove("show");
    }, 3000);
  }

  function showError(message) {
    const errorMessage = document.getElementById("errorMessage");
    errorMessage.textContent = message;
    errorMessage.classList.add("show");
    setTimeout(() => {
      errorMessage.classList.remove("show");
    }, 3000);
  }

  document.getElementById("checkoutButton").addEventListener("click", () => {
    dynamicModal.classList.remove("hidden");
    modalData.innerHTML = "";
    addedItems.forEach((item, index) => {
      const row = document.createElement("tr");
      row.className = "border-b border-[#DBDFEA]";
      row.innerHTML = `
        <td class="py-5 flex gap-3 items-center font-normal text-sm text-[#364A63]">
          <img src="${item.img}" alt="${item.name}" class="rounded-lg" width="50" height="50">
          ${item.name}
        </td>
        <td class="py-5 font-normal text-sm text-[#364A63]">${item.color}</td>
        <td class="py-5 font-normal text-sm text-[#364A63]">${item.size}</td>
        <td class="py-5 font-normal text-sm text-[#364A63]">${item.quantity}</td>
        <td class="py-5 font-normal text-sm text-[#364A63]">${item.price}</td>
      `;
      modalData.appendChild(row);
    });

    totalQuantity.textContent = addedItems.reduce(
      (acc, item) => acc + item.quantity,
      0
    );
    totalPrice.textContent = `$${addedItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    )}`;
  });

  continueShopping.addEventListener("click", () => {
    dynamicModal.classList.add("hidden");
  });

  checkout.addEventListener("click", () => {
    dynamicModal.classList.add("hidden");
  });
});
