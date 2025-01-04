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

    // التحقق من تعبئة الحقول
    if (!phone || !password) {
        showError("يرجى تعبئة جميع الحقول.");
        return;
    }

    // التحقق من صحة بيانات تسجيل الدخول
    if (users[phone] && users[phone] === password) {
        localStorage.setItem('isLoggedIn', true);
        localStorage.setItem('userName', phone);
        window.location.href = 'choose_report.html'; // الانتقال إلى صفحة اختيار التقارير
    } else {
        showError("رقم الجوال أو كلمة المرور غير صحيحة.");
    }
}

// دالة عرض رسالة الخطأ
function showError(message) {
    const error = document.getElementById('error');
    error.textContent = message;
    error.classList.add('show');

    // إخفاء الرسالة بعد 3 ثوانٍ
    setTimeout(() => error.classList.remove('show'), 3000);
}

// دالة فتح أو إغلاق القائمة الجانبية
function toggleMenu() {
    const menu = document.getElementById('sideMenu');
    menu.classList.toggle('open');
}

// دالة إزالة شاهد
function removeShahid(id) {
    const shahid = document.getElementById(id);
    if (shahid) shahid.remove();
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
    if (fileInput) fileInput.click();
}

// دالة عرض الصورة داخل الحاوية
function displayImage(event, id) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const img = document.querySelector(`#${id} img`);
            if (img) img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
}

function downloadAsImage() {
    const container = document.querySelector('.container'); // العنصر الذي يحتوي على التقرير
    if (!container) {
        alert('العنصر .container غير موجود!');
        return;
    }

    // تحويل النصوص في الحقول إلى نصوص مرئية
    const inputs = container.querySelectorAll('input, textarea');
    const tempElements = [];

    inputs.forEach(input => {
        const textElement = document.createElement('div');
        textElement.style.position = 'absolute';
        textElement.style.left = `${input.offsetLeft}px`;
        textElement.style.top = `${input.offsetTop}px`;
        textElement.style.width = `${input.offsetWidth}px`;
        textElement.style.height = `${input.offsetHeight}px`;
        textElement.style.fontSize = window.getComputedStyle(input).fontSize;
        textElement.style.fontFamily = 'Tahoma, Arial, sans-serif'; // خط يدعم اللغة العربية
        textElement.style.color = '#000';
        textElement.style.textAlign = 'right'; // لضبط المحاذاة
        textElement.style.direction = 'rtl'; // لضبط الاتجاه
        textElement.style.lineHeight = '1.5'; // تحسين تباعد الأسطر
        textElement.style.overflowWrap = 'break-word'; // السماح بتقسيم النص
        textElement.style.whiteSpace = 'pre-wrap'; // دعم النصوص متعددة الأسطر
        textElement.textContent = input.value; // إضافة النص من الحقول
        textElement.className = 'temp-element';
        container.appendChild(textElement);
        tempElements.push(textElement);

        input.style.visibility = 'hidden'; // إخفاء الحقول الأصلية
    });

    // تحويل التقرير إلى صورة باستخدام html2canvas
    html2canvas(container, {
        scale: 3, // تحسين جودة الصورة
        useCORS: true,
        backgroundColor: '#ffffff' // تعيين خلفية بيضاء
    }).then(canvas => {
        const link = document.createElement('a');
        link.download = 'report.png'; // اسم الملف الذي سيتم تحميله
        link.href = canvas.toDataURL('image/png'); // تحويل الصورة إلى صيغة PNG
        link.click();

        // إعادة النصوص والحقول إلى وضعها الطبيعي
        inputs.forEach(input => (input.style.visibility = 'visible'));
        tempElements.forEach(el => el.remove()); // إزالة العناصر المؤقتة
    }).catch(error => {
        console.error('خطأ أثناء إنشاء الصورة:', error);
        alert('حدث خطأ أثناء إنشاء الصورة. الرجاء المحاولة لاحقًا.');
    });
}