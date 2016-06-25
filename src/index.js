// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

var input = document.querySelector('input[type="file"]');
input.addEventListener('change', e => {
	console.log(e.target.files[0].path);
})
