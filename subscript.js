//API request
const api = '/data.json';

function makeRequest() {
    return new Promise((resolve, reject) => {
        let apiRequest = new XMLHttpRequest();
        apiRequest.open('GET', api);
        apiRequest.send();
        apiRequest.onreadystatechange = () => {
            if (apiRequest.readyState === 4) {
                if (apiRequest.status === 200) {
                    resolve(JSON.parse(apiRequest.response));
                } else {
                    console.log('Oooops, something went wrong');
                }
            }
        }
    }
    );
}

async function requestData() {
    const response = await makeRequest();
    const photographers = response.photographers;
    const pictures = response.media;

    const location = String(window.location.href).split('=')[1];

    const mainContainer = document.querySelector('main');
    const phoInfo = document.getElementById('photographer-info');
    const phoWork = document.getElementById('photographer-work');
    const likesButtons = document.getElementsByClassName('likes-button');

    const name = document.createElement('h1');
    const details = document.createElement('div');
    const localization = document.createElement('div');
    const phrase = document.createElement('div');
    const tagList = document.createElement('ul');
    const contactMe = document.createElement('button');
    const phoImage = document.createElement('img');
    const info = document.createElement('div');
    const likes = document.createElement('div');
    const rate = document.createElement('div');

    

    phoInfo.appendChild(name);
    phoInfo.appendChild(details);
    details.appendChild(localization);
    details.appendChild(phrase);
    phoInfo.appendChild(tagList);
    phoInfo.appendChild(contactMe);
    phoInfo.appendChild(phoImage);
    mainContainer.appendChild(info);
    info.appendChild(likes);
    info.appendChild(rate);

    

    for (let photographer of photographers) {
        if(location.includes(photographer.id)) {
            name.innerHTML = photographer.name;
            localization.innerHTML = photographer.city + ', ' + photographer.country;
            phrase.innerHTML = photographer.tagline;
            for (let tag of photographer.tags) {
                const tagItem = document.createElement('li');
                const tagLink = document.createElement('a');

                tagList.appendChild(tagItem);
                tagItem.appendChild(tagLink);

                tagLink.setAttribute('href', '#');
                tagLink.innerHTML = '#' + tag;
            }
            contactMe.innerHTML = 'Contact Me';
            contactMe.setAttribute('onclick', 'openForm( "  '+photographer.name+' " )');
            phoImage.setAttribute('src', '/photos/Photographers ID Photos/' + photographer.portrait);
            likes.setAttribute('id', 'total-likes');
            likes.innerHTML = '0';
            rate.innerHTML = photographer.price + '$ / Day';
            info.classList.add('info');
        }
    }
    details.classList.add('details');
    localization.classList.add('localization');
    phrase.classList.add('tagline');
    let totalLikes = 0;

    let filteredPictures = pictures.filter(item => location.includes(item.photographerId));
    let sortedPictures = filteredPictures.sort((a, b) => b.likes - a.likes);
    
    document.getElementById('order-by').addEventListener('input', ev => {
        let allPictures = document.querySelectorAll('.image-container');
        for (let i of allPictures) {
            i.remove()
        }
        let select = ev.target.value;
        sortedPictures = filteredPictures.sort((a, b) => {
            if (select == 'popularity') {
                return b.likes - a.likes;
            } else if (select == 'date') {              
                return new Date(a.date) - new Date(b.date);               
            } else if (select == 'title') {
                return (a.title > b.title) - (a.title < b.title)
            }
        });
        for (let picture of sortedPictures) {
            
                const imageContainer = document.createElement('div');
                const imageLink = document.createElement('a');
                const image = document.createElement('img');
                const video = document.createElement('video');
                const videoSource = document.createElement('source');
                const imageTitle = document.createElement('p');
                const imageLikes = document.createElement('p');
    
                phoWork.appendChild(imageContainer);
                imageContainer.appendChild(imageLink);
                if (picture.image) {
                    imageLink.appendChild(image);
                    image.setAttribute('alt', picture.title + ', closeup view');
                    image.setAttribute('src', '/photos/' + picture.photographerId + '/' + picture.image);
                } else {
                    imageLink.appendChild(video);
                    video.appendChild(videoSource);
                    video.setAttribute('title', picture.title + ', closeup view');
                    videoSource.setAttribute('src', '/photos/' + picture.photographerId + '/' + picture.video);
                }
                imageContainer.appendChild(imageTitle);
                imageContainer.appendChild(imageLikes);
                imageLink.setAttribute('onclick', 'openModal();currentSlide(' + sortedPictures.indexOf(picture) + ')');
                imageLink.classList.add('image-link');
                imageContainer.classList.add('image-container');
                
                imageTitle.innerHTML = picture.title;
                imageTitle.classList.add('title');
                imageLikes.innerHTML = picture.likes + ' ' + '<img class="likes-button" src="heart.svg">';
                imageLikes.classList.add('likes');
                imageLikes.setAttribute('aria-label', 'likes');
            
        }
        for (let likesButton of likesButtons) {
            likesButton.addEventListener('click', e => {
                parentElement = e.target.parentElement.innerHTML;
                currentNumber = parentElement.split(' ')[0];
                currentNumber = Number(currentNumber);
                newNumber = currentNumber + 1;
                parentElement = e.target.parentElement;
                parentElement.innerHTML = newNumber + '<img class="likes-button" src="heart.svg">';
                totalLikes = totalLikes + 1;
                likes.innerHTML = totalLikes
            })
        }
    })
    

    for (let picture of sortedPictures) {
        
            const imageContainer = document.createElement('div');
            const imageLink = document.createElement('a');
            const image = document.createElement('img');
            const video = document.createElement('video');
            const videoSource = document.createElement('source');
            const imageTitle = document.createElement('p');
            const imageLikes = document.createElement('p');


            phoWork.appendChild(imageContainer);
            imageContainer.appendChild(imageLink);
            if (picture.image) {
                imageLink.appendChild(image);
                image.setAttribute('alt', picture.title + ', closeup view');
                image.setAttribute('src', '/photos/' + picture.photographerId + '/' + picture.image);
            } else {
                imageLink.appendChild(video);
                video.appendChild(videoSource);
                video.setAttribute('title', picture.title + ', closeup view');
                videoSource.setAttribute('src', '/photos/' + picture.photographerId + '/' + picture.video);
            }
            imageContainer.appendChild(imageTitle);
            imageContainer.appendChild(imageLikes);
            imageLink.setAttribute('onclick', 'openModal();currentSlide(' + sortedPictures.indexOf(picture) + ')');
            imageLink.classList.add('image-link');
            imageContainer.classList.add('image-container');
            
            imageTitle.innerHTML = picture.title;
            imageTitle.classList.add('title');
            imageLikes.innerHTML = picture.likes + ' ' + '<img class="likes-button" src="heart.svg">';
            imageLikes.classList.add('likes');
            imageLikes.setAttribute('aria-label', 'likes');

            totalLikes = totalLikes + picture.likes;
            likes.innerHTML = totalLikes;
            
            
    }
    
    for (let likesButton of likesButtons) {
        likesButton.addEventListener('click', e => {
            parentElement = e.target.parentElement.innerHTML;
            currentNumber = parentElement.split(' ')[0];
            currentNumber = Number(currentNumber);
            newNumber = currentNumber + 1;
            parentElement = e.target.parentElement;
            parentElement.innerHTML = newNumber + '<img class="likes-button" src="heart.svg">';
            totalLikes = totalLikes + 1;
            likes.innerHTML = totalLikes
        })
    }
    

}
requestData()


function openModal() {
    document.getElementById("myModal").style.display = "block";
  }
  

  function closeModal() {
    document.getElementById("myModal").style.display = "none";
    const slide = document.querySelector('.slide');
    const slideCaption = document.querySelector('.slideCaption');
    const prev = document.querySelector('.prev');
    const next = document.querySelector('.next');
    slide.remove();
    slideCaption.remove();
    prev.remove();
    next.remove();
  }

  function currentSlide(n) {
      const slides = document.querySelectorAll('.image-container');
      const modalContent = document.querySelector('.modal-content');
      modalContent.setAttribute('aria-label', 'image closeup view');
      modalContent.setAttribute('aria-modal', 'true');
      
      const slide = document.createElement('div');
      slide.classList.add('slide');
      const slideImage = document.createElement('img');
      const slideVideo = document.createElement('video');
      const slideVideoSource = document.createElement('source');
      const caption = document.createElement('div');
      const prev = document.createElement('a');
      const next = document.createElement('a');
      
      modalContent.appendChild(slide);
      modalContent.appendChild(caption);
      modalContent.appendChild(prev);
      modalContent.appendChild(next);

      let slideSource = slides[n].children[0].children[0].src;

      if (slideSource) {
        slide.appendChild(slideImage);
        
        slideImage.setAttribute('src', slideSource);
        slideImage.setAttribute('alt',slides[n].children[1].innerHTML)
    } else {
        slide.appendChild(slideVideo);
        slideVideo.appendChild(slideVideoSource);
        let source = slides[n].children[0].children[0].children[0].src;
        slideVideoSource.setAttribute('src', source);
        slideVideo.setAttribute('controls', 'controls');
    }

      caption.innerHTML = slides[n].children[1].innerHTML;
      caption.classList.add('slideCaption');
      prev.classList.add('prev');
      next.classList.add('next');
      prev.outerHTML = `<a aria-label='previous image' class="prev" onclick="prevSlide(${n})">&#10094;</a>`;
      next.outerHTML = `<a aria-label='next imag' class="next" onclick="nextSlide(${n})">&#10095;</a>`;
  }

  function prevSlide(n) {
    closeModal();
    openModal();
    if (n > 0) {
        currentSlide(n - 1)
    } else {
        currentSlide(n)
    }
    
  }

  function nextSlide(n) {
    closeModal();
    openModal();
    const totalSlides = document.querySelectorAll('.image-container');
    if (n < totalSlides.length - 1) {
        currentSlide(n + 1)
    } else {
        currentSlide(n)
    }
  }

  function closeMessage() {
      document.querySelector('.form-background').style.display = 'none';
  }

  function openForm(photographer) {
    document.querySelector('.form-background').style.display = 'block';
    const header = document.getElementById('message-header');
    header.innerHTML = 'Contact Me' + '<br>' + photographer;
  }

  function submitForm() {
    firstName = document.getElementById('first-name').value;
    lastName = document.getElementById('last-name').value;
    email = document.getElementById('email').value;
    console.log(`${firstName}, ${lastName}, ${email}`)
  }