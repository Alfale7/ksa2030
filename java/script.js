
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
    if (!shahidGrid) {
        console.error("Shahid grid not found.");
        return;
    }
    const newId = `shahid${shahidGrid.children.length + 1}`;
    const newShahid = document.createElement("div");
    newShahid.className = "shahid";
    newShahid.id = newId;

    newShahid.innerHTML = `
        <input type="file" id="${newId}Input" accept="image/*" onchange="displayImage(event, '${newId}')">
        <img src="" alt="New Shahid">
        <button class="remove-btn" onclick="removeShahid('${newId}')">Delete</button>
    `;
    newShahid.setAttribute("onclick", `toggleFileInput('${newId}Input')`);
    shahidGrid.appendChild(newShahid);

    console.log(`Added new shahid with ID: ${newId}`);
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
                console.log(`Displayed image for ID: ${id}`);
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

    // Collect all input and textarea elements and convert them to visible text
    const inputs = container.querySelectorAll('input, textarea');
    const tempElements = [];

    inputs.forEach(input => {
        const rect = input.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        const style = window.getComputedStyle(input);

        const textElement = document.createElement('div');
        textElement.style.position = 'absolute';
        textElement.style.left = `${rect.left - containerRect.left}px`;
        textElement.style.top = `${rect.top - containerRect.top}px`;
        textElement.style.width = `${rect.width}px`;
        textElement.style.height = `${rect.height}px`;
        textElement.style.fontSize = style.fontSize;
        textElement.style.fontFamily = style.fontFamily;
        textElement.style.color = style.color;
        textElement.style.textAlign = style.textAlign;
        textElement.style.lineHeight = style.lineHeight;
        textElement.style.padding = style.padding;
        textElement.style.boxSizing = 'border-box';
        textElement.style.display = 'flex';
        textElement.style.alignItems = 'center';
        textElement.style.justifyContent = 'center';
        textElement.textContent = input.value || input.placeholder;
        textElement.className = 'temp-element';

        // Background and border adjustments to mimic the input fields
        textElement.style.backgroundColor = 'white';
        textElement.style.border = '1px solid #46b39d';

        container.appendChild(textElement);
        tempElements.push(textElement);

        input.style.visibility = 'hidden';
    });

    // Render container to canvas
    html2canvas(container, {
        scale: 3,
        useCORS: true,
        backgroundColor: '#ffffff'
    }).then(canvas => {
        const link = document.createElement('a');
        link.download = 'report.png';
        link.href = canvas.toDataURL('image/png');
        link.click();

        // Restore inputs and remove temporary text elements
        inputs.forEach(input => (input.style.visibility = 'visible'));
        tempElements.forEach(el => el.remove());
    }).catch(error => {
        console.error('Error generating image:', error);
        alert('An error occurred while generating the image. Please try again.');
    });
}
// بيانات المستخدمين (رقم الجوال وكلمة المرور)
const users = {
    "0504854223": "1122", // رقم الجوال وكلمة المرور
    "0506399549": "1234",
    "0551234567": "3344"
};

// دالة تسجيل الدخول
function login() {
    // جلب قيم الحقول
    const phone = document.getElementById('phone').value.trim();
    const password = document.getElementById('password').value.trim();
    const errorElement = document.getElementById('error');

    // التحقق من تعبئة الحقول
    if (!phone || !password) {
        showError("يرجى تعبئة جميع الحقول.", errorElement);
        return;
    }

    // التحقق من صحة البيانات
    if (users[phone] && users[phone] === password) {
        // حفظ بيانات الدخول في Local Storage
        localStorage.setItem('isLoggedIn', true);
        localStorage.setItem('userPhone', phone);
        
        // الانتقال إلى صفحة أخرى (اختر اسم الصفحة)
        window.location.href = 'choose_report.html';
    } else {
        showError("رقم الجوال أو كلمة المرور غير صحيحة.", errorElement);
    }
}

// دالة عرض رسالة الخطأ
function showError(message, element) {
    element.textContent = message;
    element.classList.add('show');

    // إخفاء الرسالة بعد 3 ثوانٍ
    setTimeout(() => element.classList.remove('show'), 3000);
}