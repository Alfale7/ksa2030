// تخزين بيانات المستخدمين داخل كائن JavaScript
const users = {
    "0504854223": "1122",
    "0506399549": "1234",
    "0503026554": "1122",
    "0551234567": "3344",
    "0559876543": "5566"
};

// دالة تسجيل الدخول
function login() {
    const phone = document.getElementById('phone').value.trim();
    const password = document.getElementById('password').value.trim();
    const error = document.getElementById('error');

    if (!phone || !password) {
        error.textContent = "يرجى تعبئة جميع الحقول.";
        error.classList.add('show');
        setTimeout(() => error.classList.remove('show'), 3000);
        return;
    }

    if (users[phone] && users[phone] === password) {
        localStorage.setItem('isLoggedIn', true);
        localStorage.setItem('userName', phone);
        window.location.href = 'choose_report.html';
    } else {
        error.textContent = "رقم الجوال أو كلمة المرور غير صحيحة.";
        error.classList.add('show');
        setTimeout(() => error.classList.remove('show'), 3000);
    }
}

// دالة فتح أو إغلاق القائمة الجانبية
function toggleMenu() {
    const menu = document.getElementById('sideMenu');
    menu.classList.toggle('open');
}

// دالة إزالة شاهد
function removeShahid(id) {
    const shahid = document.getElementById(id);
    if (shahid) {
        shahid.remove();
    }
}

// دالة إضافة شاهد جديد
function addShahid() {
    const shahidGrid = document.getElementById("shahid-grid");
    const newId = `shahid${shahidGrid.children.length + 1}`;
    const newShahid = document.createElement("div");
    newShahid.className = "shahid";
    newShahid.id = newId;

    newShahid.innerHTML = `
        <input type="file" id="${newId}Input" accept="image/*" onchange="displayImage(event, '${newId}')">
        <img src="" alt="شاهد جديد">
        <button class="remove-btn" onclick="removeShahid('${newId}')">حذف</button>
    `;
    newShahid.setAttribute("onclick", `toggleFileInput('${newId}Input')`);

    shahidGrid.appendChild(newShahid);
}

// دالة فتح نافذة اختيار الملفات
function toggleFileInput(id) {
    const fileInput = document.getElementById(id);
    if (fileInput) {
        fileInput.click();
    }
}

// دالة عرض الصورة داخل الحاوية
function displayImage(event, id) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const img = document.querySelector(`#${id} img`);
            if (img) {
                img.src = e.target.result;
                img.parentElement.classList.add('active');
            }
        };
        reader.readAsDataURL(file);
    }
}

function downloadAsImage() {
    const container = document.querySelector('.container'); // العنصر الذي يحتوي التقرير
    if (!container) {
        alert('العنصر .container غير موجود!');
        return;
    }

    // نسخ النصوص من الحقول إلى عناصر نصية جديدة
    const inputs = container.querySelectorAll('input, textarea');
    const tempElements = [];

    inputs.forEach(input => {
        const textElement = document.createElement('div');
        textElement.style.position = 'absolute';
        textElement.style.left = `${input.offsetLeft}px`;
        textElement.style.top = `${input.offsetTop}px`;
        textElement.style.width = `${input.offsetWidth}px`;
        textElement.style.fontSize = window.getComputedStyle(input).fontSize;
        textElement.style.fontFamily = window.getComputedStyle(input).fontFamily;
        textElement.style.color = '#000';
        textElement.style.lineHeight = window.getComputedStyle(input).lineHeight;
        textElement.style.textAlign = 'right';
        textElement.style.whiteSpace = 'pre-wrap'; // للحفاظ على النصوص متعددة الأسطر
        textElement.textContent = input.value;
        textElement.className = 'temp-element';
        container.appendChild(textElement);
        tempElements.push(textElement);

        // إخفاء الحقول الأصلية
        input.style.visibility = 'hidden';
    });

    // تحويل التقرير إلى صورة
    html2canvas(container, {
        scale: 3, // تحسين الجودة
        useCORS: true, // لتجنب مشاكل الصور الخارجية
        backgroundColor: '#ffffff'
    }).then(canvas => {
        const link = document.createElement('a');
        link.download = 'report.png'; // اسم الملف المحمل
        link.href = canvas.toDataURL('image/png'); // تحويل الصورة إلى صيغة PNG
        link.click();

        // إزالة العناصر المؤقتة وإعادة الحقول لوضعها الطبيعي
        inputs.forEach(input => (input.style.visibility = 'visible'));
        tempElements.forEach(element => element.remove());
    }).catch(error => {
        console.error('حدث خطأ أثناء إنشاء الصورة:', error);
        alert('حدث خطأ أثناء إنشاء الصورة. الرجاء المحاولة لاحقًا.');
    });
}