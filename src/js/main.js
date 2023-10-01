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



    let numDiagram = document.querySelectorAll('.centered-text'),
        nameDiagram = document.querySelectorAll('.skills__name'),
        itemDiagram = document.querySelectorAll('.skills__item'),
        durationDiagram = 1500,
        ctxElements = document.querySelectorAll(`.myChart`);


    let proc = [
        { name: 'Adobe Photoshop', value: 70 },
        { name: 'Adobe Illustrator', value: 70 },
        { name: 'Webflow', value: 55 },
        { name: 'Figma', value: 85 },
        { name: 'Canva', value: 80 },
        { name: 'Gimp', value: 90 }
    ];

    function showDiagram() {
        itemDiagram.forEach((element, i) => {
            if (isElementInViewport(element) && !element.classList.contains('processed')) {
                let diagramName = proc[i].name;
                let diagramNum = proc[i].value;

                nameDiagram[i].innerHTML = `${diagramName}`;
                numDiagram[i].innerHTML = 0;

                if (ctxElements[i]) {
                    createDiagram(diagramNum, i, ctxElements[i]);
                }
                element.classList.add('processed');
            // } else if (element.classList.contains('processed') && !isElementInViewport(element)) {
            //     element.classList.remove('processed');
            // }
            }
        });
    }

    function createDiagram(num, i, elem) {
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

            animNumber(arr, num, i);
        }
        
    }

    function animNumber(arr, num, i) {
        anime({
            targets: numDiagram[i],
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
    window.addEventListener('scroll', showDiagram);

    showDiagram();




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




    const sliderItems = document.querySelectorAll(".slider__item"),
          arrLeft = document.querySelectorAll('.arr_left'),
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

    let works = document.querySelectorAll('.works__advertising img');

    works.forEach(work => {
        work.addEventListener('mouseenter', function() {
            anime({
                targets: work,
                duration: 200,
                easing: 'easeInOutQuad',
                width: ['100%', 'calc(100% + 6px)'],
                height: ['100%', 'calc(100% + 6px)']
            }).play()
        });
    
        // Додаємо обробник події для виходу курсора
        work.addEventListener('mouseleave', function() {
            anime({
                targets: work,
                duration: 200,
                easing: 'easeInOutQuad',
                width: ['calc(100% + 6px)', '100%'],
                height: ['calc(100% + 6px)', '100%']
            }).play()
        });
    })


    let mokaps = document.querySelectorAll('.works__mokap');
    let animationMokap = Array.from({ length: mokaps.length }, () => false);


    function animateMokap(mokapNum, curr) {
        return function() {
            if (!animationMokap[mokapNum] && isElementInViewport(mokaps[mokapNum])) {
                animationMokap[mokapNum] = true; // Встановлюємо флаг, що анімація вже була відтворена
    
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

})