
document.getElementById("orderForm").addEventListener("submit", function (event) {
    event.preventDefault(); // منع إعادة تحميل الصفحة عند الإرسال
  
    // جلب القيم المدخلة
    const fullName = document.getElementById("fullName").value.trim();
    const password = document.getElementById("password").value;
    const dob = document.getElementById("dob").value.trim();
    const phone = document.getElementById("phone").value.trim();
  
    // التحقق من المدخلات باستخدام Regex
    let isValid = true;
  
    // التحقق من Full Name (بدون مسافات)
    if (/\s/.test(fullName) || fullName === "") {
      alert("Full Name must not contain spaces and cannot be empty.");
      isValid = false;
    }
  
    // التحقق من Password (8 أحرف على الأقل، 1 حرف كبير، 1 رقم، 1 رمز خاص)
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      alert("Password must be at least 8 characters long, contain 1 uppercase letter, 1 number, and 1 special character.");
      isValid = false;
    }
  
    // التحقق من تاريخ الميلاد (YYYY-MM-DD)
    const dobRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dobRegex.test(dob)) {
      alert("Date of Birth must be in the format YYYY-MM-DD.");
      isValid = false;
    }
  
    // التحقق من رقم الهاتف (يبدأ بـ 07 ويحتوي على 10 أرقام)
    const phoneRegex = /^07\d{8}$/;
    if (!phoneRegex.test(phone)) {
      alert("Phone number must start with 07 and contain exactly 10 digits.");
      isValid = false;
    }
  
    // جلب مربعات الاختيار (Order Types)
    const orderTypes = [];
    const checkboxes = document.querySelectorAll('input[name="orderType"]:checked');
    checkboxes.forEach((checkbox) => {
      orderTypes.push(checkbox.value);
    });
  
    // التحقق من وجود خيار واحد على الأقل
    if (orderTypes.length === 0) {
      alert("Please select at least one Order Type.");
      isValid = false;
    }
  
    // جلب خيار الطلب (Order Option)
    const orderOption = document.querySelector('input[name="orderOption"]:checked')?.value;
    if (!orderOption) {
      alert("Please select an Order Option.");
      isValid = false;
    }
  
    // جلب الصورة
    const imageInput = document.getElementById("image");
    let imageUrl = "./assets/default-avatar.png"; // صورة افتراضية
    if (imageInput.files && imageInput.files[0]) {
      const reader = new FileReader();
      reader.onload = function (e) {
        imageUrl = e.target.result;
        if (isValid) saveCustomer(); // حفظ العميل بعد نجاح التحقق
      };
      reader.readAsDataURL(imageInput.files[0]);
    } else {
      if (isValid) saveCustomer(); // حفظ العميل بدون صورة مرفوعة إذا كان التحقق ناجحًا
    }
  
    // حفظ العميل في Local Storage
    function saveCustomer() {
      const customer = {
        fullName,
        password,
        dob,
        phone,
        orderTypes,
        orderOption,
        imageUrl,
      };
  
      const orders = JSON.parse(localStorage.getItem("orders")) || [];
      orders.push(customer);
      localStorage.setItem("orders", JSON.stringify(orders));
  
      alert("Customer saved successfully!");
      renderCustomers();
      document.getElementById("orderForm").reset(); // إعادة تعيين النموذج
    }
  });
  
  // عرض العملاء في الصفحة
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
              <p><strong>Order Type:</strong> ${customer.orderTypes.join(", ")}</p>
              <p><strong>Order Option:</strong> ${customer.orderOption}</p>
              <p><strong>Phone:</strong> ${customer.phone}</p>
          </div>
      `;
  
      cardsContainer.appendChild(card);
    });
  }
  
  // عرض العملاء عند تحميل الصفحة
  document.addEventListener("DOMContentLoaded", renderCustomers);