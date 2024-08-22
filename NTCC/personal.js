const photoInput = document.getElementById('photoInput');
const addImage = document.getElementById('addButton');
const container = document.getElementById('imageContainer');

// Function to handle errors during image selection
function handleImageError(message) {
  alert(message);
}

// Load images from localStorage when the page is loaded
document.addEventListener('DOMContentLoaded', function() {
  const storedImages = JSON.parse(localStorage.getItem('images')) || [];
  storedImages.forEach(addImageToContainer);
});

// Event listener for the "Add Image" button
addImage.addEventListener('click', function() {
  photoInput.click();
});

// Event listener for file input change (image selection)
photoInput.addEventListener('change', function(event) {
  const files = event.target.files;

  // Process all uploaded files
  for (const file of files) {
    if (!file.type.match('image/.*')) {
      handleImageError('Please select an image file.');
      continue; // Skip to the next file if not an image
    }

    const reader = new FileReader();

    reader.onload = function(event) {
      const imageData = event.target.result;
      const imageObject = {
        id: Date.now(), // Unique identifier
        data: imageData
      };
      addImageToContainer(imageObject);
      saveImageToLocalStorage(imageObject);
    };

    reader.readAsDataURL(file);
  }
});

// Function to add an image to the container
function addImageToContainer(imageObject) {
  const list = document.createElement('ul');
  list.classList.add('list');

  const photolist = document.createElement('li');
  photolist.classList.add('photolist');
  photolist.style.listStyle = 'none';
  photolist.style.position = 'relative'; // Ensure photolist is relative

  const img = document.createElement('img');
  img.classList.add('img');
  img.src = imageObject.data;
  img.style.width = "250px";
  img.style.height = "250px";

  const deleteicon = document.createElement('img');
  deleteicon.classList.add('delete');
  deleteicon.style.width = '30px';
  deleteicon.style.height = '30px';
  deleteicon.src = 'dustbin.png'; // Replace with your delete icon path
  deleteicon.style.position = 'absolute';
  deleteicon.style.top = "10px";
  deleteicon.style.right = "10px"; // Ensure delete icon is at the top right

  deleteicon.addEventListener('click', function() {
    container.removeChild(list);
    removeImageFromLocalStorage(imageObject.id);
  });

  photolist.appendChild(img);
  photolist.appendChild(deleteicon);
  list.appendChild(photolist);
  container.appendChild(list);
}

// Function to save an image object to localStorage
function saveImageToLocalStorage(imageObject) {
  const storedImages = JSON.parse(localStorage.getItem('images')) || [];
  storedImages.push(imageObject);
  localStorage.setItem('images', JSON.stringify(storedImages));
}

// Function to remove an image object from localStorage (optional)
function removeImageFromLocalStorage(imageId) {
  let storedImages = JSON.parse(localStorage.getItem('images')) || [];
  storedImages = storedImages.filter(image => image.id !== imageId);
  localStorage.setItem('images', JSON.stringify(storedImages));
}
