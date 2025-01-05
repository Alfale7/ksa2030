
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

// Function to download the report as an image
function downloadAsImage() {
    const container = document.querySelector('.container');
    if (!container) {
        alert('Container not found!');
        return;
    }

    // Temporarily replace inputs with visible text for rendering
    const inputs = container.querySelectorAll('input, textarea');
    const tempElements = [];

    inputs.forEach(input => {
        const rect = input.getBoundingClientRect();
        const computedStyle = window.getComputedStyle(input);

        const textElement = document.createElement('div');
        textElement.style.position = 'absolute';
        textElement.style.left = `${rect.left - container.offsetLeft}px`;
        textElement.style.top = `${rect.top - container.offsetTop}px`;
        textElement.style.width = `${rect.width}px`;
        textElement.style.height = `${rect.height}px`;
        textElement.style.fontSize = computedStyle.fontSize;
        textElement.style.fontFamily = computedStyle.fontFamily;
        textElement.style.color = computedStyle.color;
        textElement.style.textAlign = computedStyle.textAlign;
        textElement.style.lineHeight = computedStyle.lineHeight;
        textElement.style.overflowWrap = 'break-word';
        textElement.style.whiteSpace = 'pre-wrap';
        textElement.textContent = input.value || input.placeholder;
        textElement.className = 'temp-element';
        container.appendChild(textElement);
        tempElements.push(textElement);

        input.style.visibility = 'hidden'; // Hide original input
    });

    // Render the container as an image
    html2canvas(container, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff'
    }).then(canvas => {
        const link = document.createElement('a');
        link.download = 'report.png';
        link.href = canvas.toDataURL('image/png');
        link.click();

        // Restore original inputs and remove temporary text elements
        inputs.forEach(input => (input.style.visibility = 'visible'));
        tempElements.forEach(el => el.remove());
    }).catch(error => {
        console.error('Error generating image:', error);
        alert('An error occurred while generating the image. Please try again.');
    });
}