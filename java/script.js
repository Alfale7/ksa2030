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

// دالة تحميل التقرير كصورة
function downloadAsImage() {
    const container = document.querySelector('.container');
    if (!container) {
        alert('العنصر .container غير موجود!');
        return;
    }



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
textElement.style.lineHeight = window.getComputedStyle(input).lineHeight;
textElement.style.whiteSpace = 'pre-wrap'; // دعم النصوص متعددة الأسطر
textElement.textContent = input.value; // النص من الحقل
textElement.className = 'temp-element';
container.appendChild(textElement);
tempElements.push(textElement);



    // استخدام html2canvas لتحويل العنصر إلى صورة
    html2canvas(container, {
        scale: 3, // تحسين جودة الصورة
        useCORS: true,
        backgroundColor: '#ffffff', // تعيين خلفية بيضاء
    }).then(canvas => {
        const link = document.createElement('a');
        link.download = 'report.png'; // اسم الملف
        link.href = canvas.toDataURL('image/png'); // تحويل إلى صورة
        link.click();

        // إعادة الحقول إلى وضعها الطبيعي
        inputs.forEach(input => (input.style.visibility = 'visible'));
        tempElements.forEach(el => el.remove()); // إزالة العناصر المؤقتة
    }).catch(error => {
        console.error('خطأ أثناء إنشاء الصورة:', error);
        alert('حدث خطأ أثناء إنشاء الصورة. الرجاء المحاولة لاحقًا.');
    });
}