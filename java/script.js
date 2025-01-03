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

    // التحقق من أن الحقول ليست فارغة
    if (!phone || !password) {
        error.textContent = "يرجى تعبئة جميع الحقول.";
        error.classList.add('show');
        setTimeout(() => error.classList.remove('show'), 3000);
        return;
    }

    // التحقق من بيانات تسجيل الدخول
    if (users[phone] && users[phone] === password) {
        // إذا كانت البيانات صحيحة
        localStorage.setItem('isLoggedIn', true);
        localStorage.setItem('userName', phone);
        window.location.href = 'choose_report.html'; // التوجيه إلى الصفحة التالية
    } else {
        // إذا كانت البيانات خاطئة
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
    // السماح بالنقر لتحميل الصور
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
    const container = document.querySelector('.container'); // العنصر المراد تحميله
    if (!container) {
        alert('العنصر .container غير موجود في الصفحة!');
        return;
    }

    // إعداد الحقول لتحسين النصوص وجعلها تظهر بوضوح
    const inputs = container.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.style.textAlign = 'right'; // ضبط المحاذاة لليمين
        input.style.direction = 'rtl'; // ضبط اتجاه النص
        input.style.fontFamily = 'Arial, sans-serif'; // تحسين نوع الخط
        input.style.fontSize = '16px'; // تحسين حجم الخط
        input.style.fontWeight = 'normal'; // جعل الخط واضحاً وغير عريض
        input.style.color = '#000'; // تحسين لون النص
        input.style.backgroundColor = 'transparent'; // إزالة لون الخلفية
        input.style.border = 'none'; // إزالة الحدود
        input.style.boxShadow = 'none'; // إزالة الظلال
    });

    // إخفاء الأزرار قبل التحميل
    const buttons = document.querySelector('.buttons');
    const actionButtons = document.querySelector('.action-buttons');
    if (buttons) buttons.style.display = 'none';
    if (actionButtons) actionButtons.style.display = 'none';

    // تحميل التقرير باستخدام html2canvas
    html2canvas(container, {
        scale: 2, // لتحسين جودة الصورة
        useCORS: true, // لتفادي مشاكل الصور الخارجية
        backgroundColor: '#ffffff' // خلفية بيضاء للصورة
    }).then((canvas) => {
        const link = document.createElement('a');
        link.download = 'report.png'; // اسم الملف عند التنزيل
        link.href = canvas.toDataURL('image/png'); // تحويل الصورة إلى صيغة PNG
        link.click();

        // إعادة إعداد الحقول إلى الوضع الطبيعي بعد التحميل
        inputs.forEach(input => {
            input.style.textAlign = ''; // إعادة المحاذاة الافتراضية
            input.style.direction = ''; // إعادة الاتجاه الافتراضي
            input.style.fontFamily = ''; // إعادة الخط الافتراضي
            input.style.fontSize = ''; // إعادة حجم الخط الافتراضي
            input.style.fontWeight = ''; // إعادة سماكة الخط الافتراضية
            input.style.color = ''; // إعادة لون النص الافتراضي
            input.style.backgroundColor = ''; // إعادة لون الخلفية الافتراضي
            input.style.border = ''; // إعادة الحدود الافتراضية
            input.style.boxShadow = ''; // إعادة الظلال الافتراضية
        });

        // إعادة إظهار الأزرار بعد التحميل
        if (buttons) buttons.style.display = 'block';
        if (actionButtons) actionButtons.style.display = 'flex';
    }).catch((error) => {
        console.error('حدث خطأ أثناء تحميل التقرير:', error);
        alert('حدث خطأ أثناء تحميل التقرير. الرجاء المحاولة لاحقًا.');
    });
}