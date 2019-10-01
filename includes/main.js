/* your javascript goes here */

$(document).ready(initiateApp);

var pictures = [
	'images/landscape-1.jpg',
	'images/landscape-10.jpg',
	'images/landscape-11.jpg',
	'images/landscape-13.jpg',
	'images/landscape-15.jpg',
	'images/landscape-17.jpg',
	'images/landscape-18.jpg',
	'images/landscape-19.jpg',
	'images/landscape-2.jpg',
	'images/landscape-3.jpg',
	'images/landscape-8.jpg',
	'images/landscape-9.jpg',
	'images/pexels-photo-132037.jpeg',
	'images/pretty.jpg',
];



function initiateApp(){
	if (window.localStorage.images){
		pictures = window.localStorage.getItem("images").split(",");
	}
	makeGallery(pictures);
	addModalCloseHandler();
/*advanced: add jquery sortable call here to make the gallery able to be sorted
//on change, rebuild the images array into the new order
*/
	$("#gallery").sortable( {'update': getSortedOrder } );
}
function getSortedOrder(){
	//write code here to capture new array order from DOM
	//get that new order and save into localStorage?
	var arrangedPictures = $("#gallery").children();

	for (var i=0; i < pictures.length; i++){
		var imgFilePath = "images/"+arrangedPictures[i].innerText;
		pictures[i] = imgFilePath;
	}
	window.localStorage.setItem("images", pictures.toString());
}

function makeGallery(imageArray){
	//use loops and jquery dom creation to make the html structure inside the #gallery section
		//create a loop to go through the images in the imageArray
		//create the elements needed for each picture, store the elements in variable
		//attach a click handler to the figure you create.  call the "displayImage" function.
		//append the element to the #gallery section
	for (var galleryIndex = 0; galleryIndex < imageArray.length; galleryIndex++){
		var captionText = imageArray[galleryIndex].substring(7, imageArray[galleryIndex].length);
		var imageCSS = "url(images/"+captionText+");";
		var thumbnail = $("<figure>").addClass("imageGallery col-xs-12 col-sm-6 col-md-4")
																 .attr("style", "background-image:"+imageCSS);
		var thumbnailCaption = $("<figcaption>").text(captionText);
		$(thumbnail).append(thumbnailCaption);
		$(thumbnail).click(displayImage);
		$("#gallery").append(thumbnail);
	}
}

function addModalCloseHandler(){
	//add a click handler to the img element in the image modal.  When the element is clicked, close the modal
	//for more info, check here: https://www.w3schools.com/bootstrap/bootstrap_ref_js_modal.asp
	$("#galleryModal img").click(function(){
		$("#galleryModal").modal('hide')
	});
}

function displayImage(){
	//find the url of the image by grabbing the background-image source, store it in a variable
	//grab the direct url of the image by getting rid of the other pieces you don't need

	//grab the name from the file url, ie the part without the path.  so "images/pexels-photo-132037.jpeg" would become
		// pexels-photo-132037
		//take a look at the lastIndexOf method

	var imageSourceURL = "images/"+this.innerText;
	var imageFileName = this.innerText.substring(0, this.innerText.lastIndexOf("."))

	//change the modal-title text to the name you found above
	$(".modal-title").text(imageFileName);
	//change the src of the image in the modal to the url of the image that was clicked on
	$(".modal-body > img").attr("src", imageSourceURL);
	//show the modal with JS.  Check for more info here:
	//https://www.w3schools.com/bootstrap/bootstrap_ref_js_modal.asp
	$("#galleryModal").modal();
}
