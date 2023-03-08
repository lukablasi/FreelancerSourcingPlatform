// API request
const api = './data.json';

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
                    reject('Oooops, something went wrong');
                }
            }
        }
    }
    );
}

//request data - photographers
async function requestPhotographers() {
    const container = document.querySelector('.portrait-container');
    const response = await makeRequest();
    const phoData = response.photographers;
    
    for (let pho of phoData) {
        
        const portrait = document.createElement('div');
        const link = document.createElement('a');
        const picture = document.createElement('img');
        const name = document.createElement('h2');
        const skip = document.createElement('div');
        const location = document.createElement('p');
        const phrase = document.createElement('p');
        const rate = document.createElement('p');
        const tagList = document.createElement('ul');
        

        container.appendChild(portrait);
        portrait.appendChild(link);
        link.appendChild(picture);
        link.appendChild(name);
        link.appendChild(skip);
        portrait.appendChild(location);
        portrait.appendChild(phrase);
        portrait.appendChild(rate);
        portrait.appendChild(tagList);

        portrait.classList.add('portrait');
        link.setAttribute('href', 'photographer.html' + '?id=' + pho.id);
        link.setAttribute('alt', '');
        link.setAttribute('aria-label', pho.name);
        link.setAttribute('tabindex', phoData.indexOf(pho) + 1);
        picture.setAttribute('src', '/photos/Photographers ID Photos/' + pho.portrait);
        name.innerHTML = pho.name;
        skip.classList.add('skip');
        location.innerHTML = pho.city + ', ' + pho.country;
        location.classList.add('pho-local');
        phrase.innerHTML = pho.tagline;
        phrase.classList.add('pho-phrase');
        rate.innerHTML = '$' + pho.price + '/day';
        rate.classList.add('pho-rate');
        tagList.classList.add('pho-tags');
        for (let tag of pho.tags) {
            portrait.classList.add(tag + '-tag');
            const tagItem = document.createElement('li');
            tagList.appendChild(tagItem);
            tagItem.innerHTML = '#' + tag;
            tagItem.setAttribute('aria-label', 'tag ' + tag);
        }
    }
}
requestPhotographers()


//filter

const categoryTitle = document.querySelectorAll('.category-title');
const allCategoryPosts = document.getElementsByClassName('portrait');

for(let i = 0; i < categoryTitle.length; i++){
    categoryTitle[i].addEventListener('click', filterPosts.bind(this, categoryTitle[i]));
}

function filterPosts(item){
    changeActivePosition(item);
    for(let i = 0; i < allCategoryPosts.length; i++){
        if(allCategoryPosts[i].classList.contains(item.attributes.id.value)){
            allCategoryPosts[i].style.display = "block";
        } else {
            allCategoryPosts[i].style.display = "none";
        }
    }
}

function changeActivePosition(activeItem){
    for(let i = 0; i < categoryTitle.length; i++){
        categoryTitle[i].classList.remove('active');
    }
    activeItem.classList.add('active');
}
