let racesLink = document.querySelector('#races-link');
let classesLink = document.querySelector('#classes-link');
let talentsLink = document.querySelector('#talents-link');
let realmStatusLink = document.querySelector('#realmStatus-link');
let battleOfAzerothLink = document.querySelector('#battleOfAzeroth-link');
let indexStartLink = document.querySelector('#indexStart-link');

let linkArray = [racesLink, classesLink, talentsLink, realmStatusLink, battleOfAzerothLink, indexStartLink];

linkArray.forEach((eachLink) => {
    eachLink.addEventListener('click', (e) => {
        switch (eachLink) {
            case racesLink:
                fetchPage(eachLink, 'races.html');
                break;

            case classesLink:
                fetchPage(eachLink, 'classes.html');
                break;

            case talentsLink:
                fetchPage(eachLink, 'talents.html');
                break;

            case realmStatusLink:
                fetchPage(eachLink, 'realmStatus.html');
                break;

            case battleOfAzerothLink:
                fetchPage(eachLink, 'battleOfAzeroth.html');
                break;
                
            case indexStartLink:
                fetchPage(eachLink, 'indexStart.html');
                break;
        }
    })
})

function fetchPage(link, page) {
    let baseURL = `${window.location.protocol}//${window.location.hostname}`;

    if (window.location.port) {
        baseURL += `:${window.location.port}`;
    }

    fetch(`${baseURL}/${page}`)
        .then(function (response) {
            return response.text()
        })
        .then(function (html) {
            let doc = new DOMParser().parseFromString(html, "text/html");

            anime({
                targets: '.column-wrapper',
                translateX: 700,
                opacity: 0,
                easing: 'easeInExpo',
                duration: 700,
                complete: (anim) => {
                    document.querySelector('.column-wrapper').remove();
                }
            })

           let bodyAll = document.querySelector('body');
           let newContent = doc.querySelector('.new-content');
           let headerNav = doc.querySelector('.gallery-nav');
            setTimeout(function () {
                bodyAll.insertBefore(newContent, headerNav);

                anime({
                    targets: '.new-content',
                    translateX: [-600, 0],
                    delay: (el, i) => 100 * i,
                    opacity: [0, 1],
                    easing: 'easeOutExpo',
                })
            }, 800);
        })
}
