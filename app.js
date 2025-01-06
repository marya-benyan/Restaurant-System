document.getElementById("orderForm").addEventListener("submit", function (event) {
    event.preventDefault();
  
    const fullName = document.getElementById("fullName").value;
    const password = document.getElementById("password").value;
    const dob = document.getElementById("dob").value;
    const gender = document.querySelector('input[name="gender"]:checked')?.value;
    const phone = document.getElementById("phone").value;
  
    const orderTypes = Array.from(
      document.querySelectorAll('input[name="orderType"]:checked')
    ).map((checkbox) => checkbox.value);
  
    const orderOption = document.querySelector('input[name="orderOption"]:checked')?.value;
  
    // الصورة الافتراضية
    const imageUrl = "./assets/default-avatar.png";
  
    const customer = {
      fullName,
      password,
      dob,
      gender: gender || "Not Specified",
      phone,
      orderTypes,
      orderOption: orderOption || "Not Specified",
      imageUrl,
    };
  
    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    orders.push(customer);
    localStorage.setItem("orders", JSON.stringify(orders));
  
    renderCustomers();
    this.reset();
  });
  
  function renderCustomers() {
    const cardsContainer = document.getElementById("cardsContainer");
    cardsContainer.innerHTML = ""; // تنظيف الكروت السابقة
  
    const customers = JSON.parse(localStorage.getItem("orders")) || [];
  
    customers.forEach((customer) => {
      const card = document.createElement("div");
      card.classList.add("card");
  
      card.innerHTML = `
        <img src="${customer.imageUrl}" alt="Customer Image" class="card-img">
        <div class="card-content">
          <h3>${customer.fullName}</h3>
          <p><strong>Date of Birth:</strong> ${customer.dob}</p>
          <p><strong>Gender:</strong> ${customer.gender}</p>
          <p><strong>Order Type:</strong> ${customer.orderTypes.join(", ")}</p>
          <p><strong>Order Option:</strong> ${customer.orderOption}</p>
          <p><strong>Phone:</strong> ${customer.phone}</p>
        </div>
      `;
  
      cardsContainer.appendChild(card);
    });
  }
  
  // عند تحميل الصفحة، عرض العملاء المحفوظين
  document.addEventListener("DOMContentLoaded", renderCustomers);
  