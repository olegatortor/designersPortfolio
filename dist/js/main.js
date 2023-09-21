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

    let element = document.getElementById('myElement');

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
            } else if (element.classList.contains('processed') && !isElementInViewport(element)) {
                element.classList.remove('processed');
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
        animEducation = document.querySelector(".about__education"),
        animCerts = document.querySelector(".education__certs"),
        animColumn = document.querySelector(".education__column"),
        animExperience = document.querySelector(".list__column_right");



    let shakeCat = anime({
        targets: cat,
        translateY: ['-30px', '30px'], // Зміщення вгору та вниз на 50px
        duration: 1000, // Тривалість анімації
        easing: 'easeInOutQuad',
        direction: 'alternate', // Змінює напрямок анімації на кожному циклі
        loop: true // Повторювати анімацію безкінечно
    });
    // Запускаємо анімацію
    shakeCat.play();

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

    function animExperiences() {
        if(isElementInViewport(animExperience)) {
            anime({
                targets: animExperience,
                translateX: [
                    { value: '80%', duration: 0 }, // Початкове значення (без анімації)
                    { value: '0', duration: 900, easing: 'easeInOutQuad' } // Зміна до 0 з анімацією
                ]
            }).play();
            window.removeEventListener("scroll", animExperiences);
        }
    }

    window.addEventListener("scroll", animСertificates);
    window.addEventListener("scroll", animExperiences);
})