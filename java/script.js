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
    const container = document.querySelector('.container'); // العنصر المراد تحميله
    if (!container) {
        alert('العنصر .container غير موجود');
        return;
    }

    // إعداد النصوص داخل الحقول لعرضها بشكل صحيح أثناء التحميل
    const inputs = container.querySelectorAll('input, textarea');
    const tempElements = [];

    inputs.forEach(input => {
        if (input.tagName === 'TEXTAREA' || input.tagName === 'INPUT') {
            const div = document.createElement('div');
            div.style.position = 'absolute';
            div.style.left = `${input.offsetLeft}px`;
            div.style.top = `${input.offsetTop}px`;
            div.style.width = `${input.offsetWidth}px`;
            div.style.fontSize = window.getComputedStyle(input).fontSize;
            div.style.fontFamily = window.getComputedStyle(input).fontFamily;
            div.style.lineHeight = window.getComputedStyle(input).lineHeight;
            div.style.textAlign = 'right'; // محاذاة النص لليمين
            div.style.color = '#000'; // لون النص
            div.style.backgroundColor = 'transparent'; // إزالة لون الخلفية
            div.style.padding = '5px';
            div.style.boxSizing = 'border-box';
            div.textContent = input.value.trim().replace(/\n/g, ' '); // إزالة القوائم واستبدال النصوص بخط واحد
            div.className = 'temp-element'; // علامة لمعرفة العناصر المؤقتة
            container.appendChild(div);
            tempElements.push(div);

            // إخفاء الحقول الأصلية أثناء التحويل
            input.style.visibility = 'hidden';
        }
    });

    // تحويل التقرير إلى صورة
    html2canvas(container, {
        scale: 3, // تحسين الدقة
        useCORS: true, // السماح للصور الخارجية
        backgroundColor: '#ffffff', // خلفية بيضاء للصورة
    }).then(canvas => {
        const link = document.createElement('a');
        link.download = 'report.png'; // اسم الملف عند التحميل
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