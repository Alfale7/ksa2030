
const shahidGrid = document.getElementById("shahid-grid");

// Function to remove a witness (shahid)
function removeShahid(id) {
    const shahid = document.getElementById(id);
    if (shahid) {
        shahid.remove();
        console.log(`Removed shahid: ${id}`);
    } else {
        console.error(`Shahid with ID ${id} not found`);
    }
}

// Function to add a new witness (shahid)
function addShahid() {
    const shahidGrid = document.getElementById("shahid-grid");
    if (!shahidGrid) {
        console.error("Element with ID 'shahid-grid' not found.");
        return;
    }
    const newId = `shahid${shahidGrid.children.length + 1}`;
    const newShahid = document.createElement("div");
    newShahid.className = "shahid";
    newShahid.id = newId;

    newShahid.innerHTML = `
        <input type="file" id="${newId}Input" accept="image/*" onchange="displayImage(event, '${newId}')">
        <img src="" alt="شاهد جديد">
        <button class="remove-btn" onclick="removeShahid('${newId}')">حذف</button>
    `;
    shahidGrid.appendChild(newShahid);
}

// Function to simulate file input click
function toggleFileInput(id) {
    const fileInput = document.getElementById(id);
    if (fileInput) {
        fileInput.click();
        console.log(`Opened file input for ID: ${id}`);
    } else {
        console.error(`File input with ID ${id} not found`);
    }
}

// Function to display uploaded image inside a shahid
function displayImage(event, id) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const img = document.querySelector(`#${id} img`);
            if (img) {
                img.src = e.target.result;
            } else {
                console.error(`Image element for ID ${id} not found`);
            }
        };
        reader.readAsDataURL(file);
    } else {
        console.error("No file selected.");
    }
}
function downloadAsImage() {
    const container = document.querySelector('.container');
    if (!container) {
        alert('Container not found!');
        return;
    }

    // 🟢 إخفاء جميع الأزرار بطريقة لا تؤثر على التصميم
    const buttons = document.querySelectorAll('.buttons-container, .download, .exit-buttons, button');
    buttons.forEach(button => button.style.visibility = 'hidden');

    // 🟢 إصلاح تمدد الشواهد عن طريق حفظ حجمها الأصلي
    const shahidElements = document.querySelectorAll('.shahid');
    const shahidSizes = [];
    
    shahidElements.forEach((shahid, index) => {
        shahidSizes[index] = {
            width: shahid.offsetWidth + "px",
            height: shahid.offsetHeight + "px"
        };
        shahid.style.width = shahidSizes[index].width;
        shahid.style.height = shahidSizes[index].height;
        shahid.style.overflow = 'hidden';
    });

    const inputs = container.querySelectorAll('input, textarea');
    const tempElements = [];

    inputs.forEach(input => {
        const rect = input.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        const computedStyle = window.getComputedStyle(input);

        const textElement = document.createElement('div');
        textElement.style.position = 'absolute';
        textElement.style.left = `${rect.left - containerRect.left}px`;
        textElement.style.top = `${rect.top - containerRect.top}px`;
        textElement.style.width = `${rect.width}px`;
        textElement.style.height = `${rect.height}px`;
        textElement.style.fontSize = computedStyle.fontSize;
        textElement.style.fontFamily = computedStyle.fontFamily;
        textElement.style.color = computedStyle.color;
        textElement.style.textAlign = 'right';
        textElement.style.direction = 'rtl';
        textElement.style.lineHeight = computedStyle.lineHeight;
        textElement.style.display = 'flex';
        textElement.style.alignItems = 'center';
        textElement.style.padding = '5px';
        textElement.style.whiteSpace = 'pre-wrap'; // منع التمدد غير الطبيعي
        textElement.style.overflow = 'hidden';
        textElement.textContent = input.value || input.placeholder;
        textElement.className = 'temp-element';

        container.appendChild(textElement);
        tempElements.push(textElement);

        input.style.visibility = 'hidden';
    });

    html2canvas(container, {
        scale: 3,
        useCORS: true,
        backgroundColor: '#ffffff'
    }).then(canvas => {
        const link = document.createElement('a');
        link.download = 'report.jpg';
        link.href = canvas.toDataURL('image/jpeg', 0.95);
        link.click();

        // 🟢 إعادة الأزرار بعد التحميل
        buttons.forEach(button => button.style.visibility = 'visible');

        // 🟢 إعادة حجم الشواهد إلى الوضع الطبيعي
        shahidElements.forEach((shahid, index) => {
            shahid.style.width = '';
            shahid.style.height = '';
            shahid.style.overflow = '';
        });

        inputs.forEach(input => (input.style.visibility = 'visible'));
        tempElements.forEach(el => el.remove());
    }).catch(error => {
        console.error('Error generating image:', error);
        buttons.forEach(button => button.style.visibility = 'visible');
    });
}


// 🟢 بيانات تسجيل الدخول (رقم الجوال وكلمة المرور)
const users = {
    "0504854223": "1234",
    "0506399549": "1234",
    "0551234567": "3344",
    "0530490887": "1234",
    "0531415531": "1234",
    "0558176875": "1234",
    "0559357091": "1234",
    "0503393365": "1234",
    "0536183076": "1234",
    "0504864020": "1234"
};

function login() {
    // جلب البيانات المدخلة والتأكد من إزالة المسافات الزائدة
    const phone = document.getElementById('phone').value.trim();
    const password = document.getElementById('password').value.trim();

    // التحقق من صحة رقم الجوال وكلمة المرور
    if (users[phone] && users[phone] === password) {
        // نجاح تسجيل الدخول
        window.location.href = "choose.html"; // توجيه إلى صفحة اختيار التصميم
    } else {
        // فشل تسجيل الدخول
        alert("❌ رقم الجوال أو كلمة المرور غير صحيحة!");
    }

    return false; // منع إعادة تحميل الصفحة
}