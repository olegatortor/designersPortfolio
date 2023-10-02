document.addEventListener('DOMContentLoaded', function() {
    

    const hamburger = document.querySelector('.hamburger'),
      menu = document.querySelector('.menu'),
      close = document.querySelector('.close');

    hamburger.addEventListener('click' , () => {
        menu.classList.add('active');
    });
    close.addEventListener('click' , () => {
        menu.classList.remove('active');
    });

    function isElementInViewport(el) {
        let rect = el.getBoundingClientRect();
        return (
        rect.bottom >= 0 &&
        rect.right >= 0 &&
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.left <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }



    let blueRect = document.querySelector('.photo__blue'),
        pinkRect = document.querySelector('.photo__pink'),
        blueAnimation = null,
        pinkAnimation = null;


    function animRect(rect, curr, animation) {
        let isAnimating = false;
    
        const handleScroll = function() {
            if (isElementInViewport(rect) && !isAnimating) {
                isAnimating = true;
                if (!animation) {
                    animation = anime({
                        targets: rect,
                        keyframes: [
                            { translateX: curr },
                            { translateY: curr },
                            { translateX: 0 },
                            { translateY: 0 }
                        ],
                        duration: 1300,
                        easing: 'easeInOutSine',
                        loop: true,
                        complete: function() {
                            isAnimating = false;
                        }
                    });
                }
                animation.play();
            } else if (!isElementInViewport(rect) && animation) {
                animation.pause();
                isAnimating = false;
            }
        };

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('load', handleScroll);
    
        return handleScroll;
    }
    
    blueAnimation = animRect(blueRect, '10%', blueAnimation);
    pinkAnimation = animRect(pinkRect, '-10%', pinkAnimation);



    let durationDiagram = 1500;

    function createClassDiagram() {
        class Diagram{
            constructor (name, value, parentSelector) {
                this.name = name;
                this.value = value;
                this.parent = document.querySelector(parentSelector);
            }
    
            render() {
                const element = document.createElement('div');
                element.classList.add('skills__item');
    
                element.innerHTML = `
                    <div class="skills__name">${this.name}</div>
                    <div class="skills__diagram">
                        <canvas class="myChart"></canvas>
                        <span class="centered-text">${this.value}</span>
                    </div>
                `;
                this.parent.append(element);
            }
        }


        fetch('../data/bd-skills.json')
            .then(response => response.json()) 
            .then(data => {
                data.skills.forEach(({ name, value }, i) => {
                    new Diagram(name, value, '.skills__container').render();
                });
                let itemDiagram = document.querySelectorAll('.skills__item'),
                    ctxElements = document.querySelectorAll(`.myChart`),
                    numDiagram = document.querySelectorAll('.centered-text');
                // console.log(itemDiagram, ctxElements, numDiagram, nameDiagram);
                window.addEventListener('scroll', showDiagram(itemDiagram, ctxElements, numDiagram));
                showDiagram(itemDiagram, ctxElements, numDiagram);
            })
            .catch(error => {
                console.error('Помилка завантаження файлу JSON:', error);
            });
    }
    createClassDiagram()

    function showDiagram(itemDiagram, ctxElements, num) {
        return function() {
            itemDiagram.forEach((element, i) => {
                if (isElementInViewport(element) && !element.classList.contains('processed')) {
                    let numValue = num[i].textContent;
                    num[i].innerHTML = '0';
                    if (ctxElements[i]) {
                        createDiagram(numValue, i, ctxElements[i], num);
                    }
                    element.classList.add('processed');
                // } else if (element.classList.contains('processed') && !isElementInViewport(element)) {
                //     element.classList.remove('processed');
                // }
                }
            });
        }
    }

    function createDiagram(num, i, elem, numParent) {
        if (elem) {
            let arr = new Chart(elem.getContext('2d'), {
                type: 'doughnut',
                data: {
                    datasets: [{
                        data: [0, 100],
                        backgroundColor: ['#E577A2', '#FFAFE9'],
                        hoverBackgroundColor: ['#E577A2', '#FFAFE9'],
                        borderWidth: 0
                    }]
                },
                options: {
                    cutoutPercentage: 0,
                    responsive: true,
                    maintainAspectRatio: false,
                    legend: {
                        display: false
                    },
                    animation: {
                        duration: durationDiagram,
                    },
                    tooltips: {
                        enabled: false
                    }
                }
            });

            animNumber(arr, num, i, numParent);
        }
        
    }

    function animNumber(arr, num, i, numParent) {
        anime({
            targets: numParent[i],
            innerHTML: `${num}%`,
            round: 1,
            duration: durationDiagram,
            easing: 'linear',
            update: function() {
                arr.data.datasets[0].data = [num, 100 - num];
                arr.update();
            }
        })
    }


    let cat = document.querySelector(".about__cat"),
        catAnimation = null,
        animEducation = document.querySelector(".about__education"),
        animCerts = document.querySelector(".education__certs"),
        animColumn = document.querySelector(".education__column"),
        animExperience = document.querySelector(".list__column_right");



    function startCatAnimation() {
        if (isElementInViewport(cat)) {
            if (!catAnimation) {
                catAnimation = anime({
                    targets: cat,
                    translateY: ['-30px', '30px'],
                    duration: 1000,
                    easing: 'easeInOutQuad',
                    direction: 'alternate',
                    loop: true
                });
            } else if (catAnimation.paused) {
                catAnimation.play();
            }
        } else {
            if (catAnimation && !catAnimation.paused) {
                catAnimation.pause();
            }
        }
    }
    window.addEventListener('load', startCatAnimation);
    window.addEventListener('scroll', startCatAnimation);
    window.addEventListener('resize', startCatAnimation);

    function animСertificates() {
        if(isElementInViewport(animEducation)) {
            anime({
                targets: animCerts,
                translateX: [
                    { value: '-80%', duration: 0 }, // Початкове значення (без анімації)
                    { value: '0', duration: 900, easing: 'easeInOutQuad' } // Зміна до 0 з анімацією
                ]
            }).play();
            anime({
                targets: animColumn,
                delay: 700,
                // duration: 1000,
                translateX: [
                    { value: '-80%', duration: 0 }, // Початкове значення (без анімації)
                    { value: '0', duration: 300, easing: 'easeInOutQuad' } // Зміна до 0 з анімацією
                ],
                opacity: '1'
            }).play();
            window.removeEventListener("scroll", animСertificates);
        }
    }

    function handleScroll() {
        if(isElementInViewport(animExperience)) {
            anime({
                targets: animExperience,
                translateX: [
                    { value: '100%', duration: 0 }, // Початкове значення (без анімації)
                    { value: '-1%', duration: 900, easing: 'easeInOutQuad' } // Зміна до 0 з анімацією
                ]
            }).play();
            window.removeEventListener("scroll", handleScroll);
        }
    }

    window.addEventListener("scroll", animСertificates);
    window.addEventListener("scroll", handleScroll);

    function addPhoto() {
        class Photo {
            constructor (alt, url, parentSelector, value, classElem) {
                this.alt = alt;
                this.url = url;
                this.parent = document.querySelector(parentSelector);
                this.value = value;
                this.class =  classElem;
            }
            
            render() {
                let element;

                if (this.value == 'mokap') {
                    element = document.createElement('img');
                    element.classList.add(`${this.class}`);
                    element.src = `img/${this.url}`;
                    element.alt = `Мокап ${this.alt}`;
                } else {
                    element = document.createElement('div');
                    element.classList.add(`${this.class}`);
                    element.innerHTML = `
                        <img src="img/${this.url}" alt="${this.alt}">
                    `;
                }
                
                this.parent.append(element);
            }
        }
        
    
        fetch('../data/bd-image.json')
            .then(response => response.json()) 
            .then(data => {
                data.slider.forEach(({ alt, url }) => {
                    new Photo(alt, url, '.slider__container', '', 'slider__item').render();
                });
                let sliderItems = document.querySelectorAll(".slider__item");
                initializeSlider(sliderItems);


                data.mokaps.forEach(({ url }, i) => {
                    new Photo(i+1, url, '.mokaps__wrapper', 'mokap', 'works__mokap').render();
                });
                let mokaps = document.querySelectorAll('.works__mokap');
                let animationMokap = Array.from({ length: mokaps.length }, () => false);
                initializeMokap(mokaps, animationMokap);


                data.ads.forEach(({alt, url }, i) => {
                    new Photo(alt, url, '.advertising__container', '', 'works__advertising').render();
                });
                let works = document.querySelectorAll('.works__advertising img');
                initializeAds(works);

            })
            .catch(error => {
                console.error('Помилка завантаження файлу JSON:', error);
            });
    }
    addPhoto();

    function initializeSlider(sliderItems) {
        let arrLeft = document.querySelectorAll('.arr_left'),
            arrRight = document.querySelectorAll('.arr_right'),
            sliderWrapper = document.querySelector('.slider__wrapper'),
            sliderContainer = document.querySelector('.slider__container'),
            sliderWidth = window.getComputedStyle(sliderWrapper).width;
          
        let offset = 0;
        
        sliderContainer.style.width = 100 * sliderItems.length + '%';

        sliderItems.forEach(el => {
            el.style.width = sliderWidth;
        });

        function slider(n) {
            const width = +sliderWidth.slice(0, sliderWidth.length - 2); 
            
            switch (n) {
                case '+':
                    offset += width;
                    if (offset > width * (sliderItems.length - 1)) {
                        offset = 0;
                    }
                    break;
                case '-':
                    offset -= width;
                    if (offset < 0) {
                        offset = width * (sliderItems.length - 1);
                    }
                    break;
        }

        sliderContainer.style.transform = `translateX(-${offset}px)`;
        }

        function changeSlide(arr, curr) {
            arr.forEach(i => {
                i.addEventListener('click', () => slider(curr));
            })
        }

        changeSlide(arrLeft, '-');
        changeSlide(arrRight, '+');
    }

    function initializeMokap(mokaps, animationMokap) {
        function animateMokap(mokapNum, curr) {
            return function() {
                if (!animationMokap[mokapNum] && isElementInViewport(mokaps[mokapNum])) {
                    animationMokap[mokapNum] = true; 
        
                    anime({
                        targets: mokaps[mokapNum],
                        duration: 800,
                        easing: 'easeInOutQuad',
                        translateX: [`${curr}`, '0']
                    }).play();
                }
            };
        }
    
        mokaps.forEach((item, i) => {
            let translateMokap;
    
            switch(i % 2 == 0) {
                case true:
                    translateMokap = -100;
                    break;
                case false:
                    translateMokap = 100;
                    break;
            }
    
            window.addEventListener('scroll', animateMokap(i, translateMokap));
        })
    }

    function initializeAds(works) {
        works.forEach(work => {
            work.addEventListener('mouseenter', function() {
                anime({
                    targets: work,
                    duration: 200,
                    easing: 'easeInOutQuad',
                    width: ['100%', '102%'],
                    height: ['100%', '102%']
                }).play()
            });
        
            // Додаємо обробник події для виходу курсора
            work.addEventListener('mouseleave', function() {
                anime({
                    targets: work,
                    duration: 200,
                    easing: 'easeInOutQuad',
                    width: ['102%', '100%'],
                    height: ['102%', '100%']
                }).play()
            });
        })
    }


    let model = document.querySelector('.works__text'),
        modelWrapper = document.querySelector('.model__wrapper'),
        modelInner = document.querySelector('.model__inner');

    function modelScroll() {
        if(isElementInViewport(modelWrapper)) {
            anime({
                targets: modelInner,
                delay: 500,
                translateY: ['-100%', '0'],
                duration: 600,
                easing: 'easeInOutQuad'
            }).play();
            anime({
                targets: model,
                delay: 700,
                duration: 1500,
                translateX: ['100%', '0']
            }).play();
            window.removeEventListener("scroll", modelScroll);
        }
    }

    window.addEventListener("scroll", modelScroll);


    let icons = document.querySelectorAll('.icon');
    icons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            anime({
                targets: icon,
                translateY: '-15px'
            }).play()
        });
        
        // Додаємо обробник події для виходу курсора
        icon.addEventListener('mouseleave', function() {
            anime({
                targets: icon,
                translateY: '0'
            }).play()
        });
    })

    function createList() {
        class List {
            constructor (text, parentSelector, side, sideText) {
                this.text = text;
                this.parent = document.querySelector(parentSelector);
                this.side = side;
                this.sideText = sideText;
            }
    
            render() {
                const element = document.createElement('li');
                element.classList.add('list__li');
    
                element.innerHTML = `
                    <div class="list__item list__before ${this.side}">
                        <div class="list__text ${this.sideText}">${this.text}</div>
                    </div>
                `;
                this.parent.append(element);
            }
        }
    
        fetch('../data/bd-text.json')
            .then(response => response.json()) 
            .then(data => {
                data.education.forEach(({ text }) => {
                    new List(text, '.list__ul-edu', '', '').render();
                });
                data.experience.forEach(({ text }) => {
                     new List(text, '.list__ul-exp', 'list__before_right', 'list__text_right').render();
                });
            })
            .catch(error => {
                console.error('Помилка завантаження файлу JSON:', error);
            });
    }
    createList()

    
})