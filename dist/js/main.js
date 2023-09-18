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
    // let rect = el.getBoundingClientRect();
    // const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    // const windowWidth = window.innerWidth || document.documentElement.clientWidth;

    // return (
    //   rect.bottom >= 0 &&
    //   rect.right >= 0 &&
    //   rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
    //   rect.left <= (window.innerWidth || document.documentElement.clientWidth)
    // );
    const rect = el.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;

    // Перевірка, чи нижня межа елемента рівна нижній межі вікна
    return rect.bottom <= windowHeight;
}



const proc = {
    '1': '80',
    '2': '20',
    '3': '100',
    '4': '60',
    '5': '75',
    '6': '80',
}
proc.forEach(diagram => {
    console.log(diagram)
});

proc.forEach(diagram => {
    let percentageInput = 80;
    let ctx = document.querySelectorAll('.myChart');
    ctx.forEach(el => {
        let myChart = new Chart(el.getContext('2d'), {
            type: 'doughnut',
            data: {
                datasets: [{
                    data: [percentageInput, 100 - percentageInput], 
                    backgroundColor: ['#E577A2', '#FFAFE9'],
                    hoverBackgroundColor: ['#E577A2', '#FFAFE9']
                }]
            },
            options: {
                cutoutPercentage: 0,
                responsive: true,
                maintainAspectRatio: false,
                legend: {
                    display: false 
                },
                tooltips: {
                    enabled: false 
                }
            }
        });
    });
})







let cat = document.querySelector(".about__cat"),
    animEducation = document.querySelector(".about__education"),
    animCerts = document.querySelector(".education__certs"),
    animColumn = document.querySelector(".education__column");



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
                { value: '0', duration: 1000, easing: 'easeInOutQuad' } // Зміна до 0 з анімацією
            ]
        }).play();
        anime({
            targets: animColumn,
            delay: 800,
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
window.addEventListener("scroll", animСertificates);