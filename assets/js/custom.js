// Define Const Values 
const imageFileInput 		= document.getElementById("imageFile");
const imageURLInput 		= document.getElementById("imageURL");
const hoverImageFileInput 	= document.getElementById("hoverImageFile");
const hoverImageURLInput 	= document.getElementById("hoverImageURL");
const altTitleInput 		= document.getElementById("altTitle");
const linkURLInput 			= document.getElementById("linkURL");
const imagePreview 			= document.getElementById("imagePreview");
const imageWidth 			= document.getElementById("imageWidth");
const imageWidthInput 		= document.getElementById("imageWidthInput");
const imageHeight 			= document.getElementById("imageHeight");	
const imageHeightInput 		= document.getElementById("imageHeightInput");
const generateHTMLButton  	= document.getElementById("generateCodeButton");
const generateImagePreview  = document.getElementById("generateImagePreview");
const generatedHTMLTextarea = document.getElementById("generatedHTML");

// Image Preview Method
function updateImagePreview() {
    const imageSrc = imageURLInput.value;
    const hoverImageSrc = hoverImageURLInput.value;
    const altTitle = altTitleInput.value;
    let width = imageWidth.value;
    let height = imageHeight.value;
    width = parseInt(width);
    height = parseInt(height);

    if (imageFileInput.files.length > 0) {
        // If an image file is selected, use its URL
        const file = imageFileInput.files[0];
        const imageURL = URL.createObjectURL(file);
        imagePreview.src = imageURL;
    } else {
        // Otherwise, use the URL from the text input
        imagePreview.src = imageSrc;
    }

    if (hoverImageFileInput.files.length > 0) {
        // If a hover image file is selected, use its URL
        const hoverFile = hoverImageFileInput.files[0];
        const hoverImageURL = URL.createObjectURL(hoverFile);
        imagePreview.onmouseover = () => {
            imagePreview.src = hoverImageURL;
        };
        imagePreview.onmouseout = () => {
            imagePreview.src = imageSrc;
        };
    } else {
        // Otherwise, use the URL from the text input
        imagePreview.onmouseover = () => {
            imagePreview.src = hoverImageSrc;
        };
        imagePreview.onmouseout = () => {
            imagePreview.src = imageSrc;
        };
    }

    imagePreview.alt = altTitle;
    imagePreview.style.width = `${width}px`;
    imagePreview.style.height = `${height}px`;
    imageWidth.value = width;
    imageHeight.value = height;
}

// Load Image Preview Method 
updateImagePreview();
// Generate Values
imageURLInput.addEventListener("input", updateImagePreview);
hoverImageURLInput.addEventListener("input", updateImagePreview);
altTitleInput.addEventListener("input", updateImagePreview);
imageWidth.addEventListener("input", updateImagePreview);
imageHeight.addEventListener("input", updateImagePreview);
linkURLInput.addEventListener("input", updateImagePreview);

// On Image URL Change
imageFileInput.addEventListener("change", () => {
    const file = imageFileInput.files[0];
    if (file) {
        const imageURL = URL.createObjectURL(file);
        imageURLInput.value = imageURL; 
    }
});

// On Hover Image URL Change
hoverImageFileInput.addEventListener("change", () => {
    const file = hoverImageFileInput.files[0];
    if (file) {
        const hoverImageURL = URL.createObjectURL(file);
        hoverImageURLInput.value = hoverImageURL;
        // updateImagePreview();
    }
});

// IMAGE DIMENSION OPTIONS START 
// On Width Change By Range
imageWidth.addEventListener("input", () => { 
    updateTextInputValue(imageWidth, imageWidthInput);
    updateImagePreview();
});
// On Width Change By Text
imageWidthInput.addEventListener("input", () => {
    const width = parseInt(imageWidthInput.value);
    if (!isNaN(width) && width >= 10 && width <= 500) {
    imageWidth.value = width;
    updateImagePreview();
    }
});
// On Height Change By Range
imageHeight.addEventListener("input", () => {
    updateTextInputValue(imageHeight, imageHeightInput);
    updateImagePreview();
});
// On Height Change By Text
imageHeightInput.addEventListener("input", () => {
    const height = parseInt(imageHeightInput.value);
    if (!isNaN(height) && height >= 10 && height <= 500) {
        imageHeight.value = height;
        updateImagePreview();
    }
});
// Function to update the text input value based on the range input
function updateTextInputValue(rangeInput, textInput) {
    const value = rangeInput.value;
    textInput.value = value;
}
// IMAGE DIMENSION OPTIONS END 

// GENERATE PREVIEW START
// Click On Insert Image Button
generateImagePreview.addEventListener("click", () => {
    updateImagePreview(); 
});
// GENERATE PREVIEW END

// GENERATE CODE START
// Click On Generate Code Button
generateHTMLButton.addEventListener("click", () => {
    updateImagePreview();
    const imageSrc 		= imageURLInput.value;
    const hoverImageSrc = hoverImageURLInput.value;
    const altTitle 		= altTitleInput.value;
    const linkURL 		= linkURLInput.value;
    const width 		= imageWidth.value;
    const height 		= imageHeight.value;
    let htmlCode = '';
    if (linkURL) {
        htmlCode = `<a href="${linkURL}" target="_blank">
            <img src="${imageSrc}" alt="${altTitle}" width="${width}" height="${height}"
                onmouseover="this.src='${hoverImageSrc}';" onmouseout="this.src='${imageSrc}';">
        </a>`;
    } else {
        htmlCode = `<img src="${imageSrc}" alt="${altTitle}" width="${width}" height="${height}"
            onmouseover="this.src='${hoverImageSrc}';" onmouseout="this.src='${imageSrc}';">`;
    }
    generatedHTMLTextarea.value = htmlCode;
});
// GENERATE CODE END