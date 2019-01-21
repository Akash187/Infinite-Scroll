//setting up initial variable
let total_images = {};
let end_index = 25;
let start_index = 0;

//making initial request to fetch images, store it in total_images and show first 25 images
fetch("https://jsonplaceholder.typicode.com/photos")
.then((resp) => resp.json()) // Transform the data into json
.then(function(result) {
    document.getElementById("loader").style.display = "none";
    total_images = result;
    for (let index = start_index; index < end_index; index++) {
        const element = total_images[index];
        document.getElementById('cards').innerHTML += `
            <div class="card" onClick="showModel(this)" id=${element.id}>
                <img class="image" src="${element.thumbnailUrl}" id=${element.id} alt="random_image">
                <div class="title">${element.title}</div>
            </div>
        `;
    }
    start_index += 25;
    end_index += 25;
})
.catch(e => console.log(e));


window.onscroll = () => {
    
    if(end_index > total_images.length - 1){
            end_index = total_images.length - 1;
        }

    let wrap = document.getElementById('cards');
    let contentHeight = wrap.offsetHeight;
    let yOffset = window.pageYOffset; 
    let y = yOffset + window.innerHeight;
    if (y >= contentHeight && end_index < total_images.length) {
        for (let index = start_index; index < end_index; index++) {
            const element = total_images[index];
            document.getElementById('cards').innerHTML += `
                <div class="card" onClick="showModel(this)" id=${element.id}>
                    <img class="image" src="${element.thumbnailUrl}" id=${element.id} alt="random_image">
                    <div class="title">${element.title}</div>
                </div>
            `;
        }
        start_index += 25;
        end_index += 25;

    }
    
}

// Get the modal
let modal = document.getElementById('myModal');

// Get the image and insert it inside the modal - use its "alt" text as a caption
let modalImg = document.getElementById("img01");
let captionText = document.getElementById("caption");

//x will be this
function showModel(x){
    console.log(x);
    modal.style.display = "block";
    modalImg.src = total_images[+x.id - 1].url;
    captionText.innerHTML = total_images[+x.id - 1].title;
} 

// Get the <span> element that closes the modal
let span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() { 
modal.style.display = "none";
}