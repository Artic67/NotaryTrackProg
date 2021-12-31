import { drawDiagram } from "./diagram.js"

let modalButton = document.querySelector('.modal-launch');
if(modalButton) {
    modalButton.addEventListener('click', () => {
        let model = document.querySelector('.modal');
        model.classList.add('is-active');
    })
}


let modalCross = document.querySelector('.close-modal');
if (modalCross) {
    modalCross.addEventListener('click', () => {
        let model = document.querySelector('.modal');
        model.classList.remove('is-active');
    })
}

let lb = document.querySelector('.cd-loading-bar');
let ab = document.querySelector('.actions-block');

function changePage(url, bool) {
    let lb = document.querySelector('.cd-loading-bar');
    let ab = document.querySelector('.actions-block');

    ab.classList.toggle('page-is-changing');
    lb.classList.toggle('page-is-changing');

    setTimeout(() => loadNewContent(url, bool), 1000);
    setTimeout(() => {if(lb) lb.classList.toggle('nonedisplay');}, 2000);
    
    
}

async function loadNewContent(url, bool) {
    var newSectionName = 'cd-'+url.replace('.html', '');

    window.section = document.createElement('div');
    //let cdlb = document.createElement('div');
    //cdlb.classList.add('cd-loading-bar');
    //cdlb.classList.add('page-is-changing');
    section.classList.add(newSectionName);
    section.innerHTML = await fetchHtmlAsText(url);

    //body.append(cdlb);

    document.querySelector('main').innerHTML = section.querySelector('main').innerHTML;
    //ocument.querySelector('main').append(section.querySelector('main'));
    console.log('aq');

    drawDiagram();
}

window.onload = function(){
    document.querySelector('.right-arrow').addEventListener('click', function(event){
        event.preventDefault();
        //detect which page has been selected
        var newPage = document.querySelector('.right-arrow').getAttribute('href');
        //if the page is not animating - trigger animation
        changePage(newPage, true);
     });
}

async function fetchHtmlAsText(url) {
    return await (await fetch(url)).text();
}