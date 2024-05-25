const { default: axios } = require("axios");

// nkarner ev nkaragrutyun
window.addEventListener('DOMContentLoaded', () =>{ //html @ amboxjutyamb velucuma nor ancnum araj bayc nkarner@ chi spasum vor nerbernven
    const tabs = document.querySelectorAll('.tabheader__item'),
          tabscontent = document.querySelectorAll('.tabcontent'),
          tabsParent = document.querySelector('.tabheader__items')

function ClearTabContent() {
    tabs.forEach(event => {
        event.classList.remove('tabheader__item_active');
    });
    tabscontent.forEach(event => {
        event.style.display = 'none';
    })
}
function CreatTabContent(i = 0) {
    tabs[i].classList.add('tabheader__item_active');
    tabscontent[i].style.display = 'block';
}
ClearTabContent();
CreatTabContent();

tabsParent.addEventListener('click', (event) => {
    tabs.forEach((item, i) => {
        if(event.target == item) {
            ClearTabContent();
            CreatTabContent(i);
        }
    })
    })


         // Timer
const deadLine = '2024-05-23';
function getTimeRemaining(endtime) {

    let days, hours, minutes, seconds;
    const t = Date.parse(endtime) - Date.parse(new Date()); // pars@ veracuma milisecundneri
    if(t <= 0) {
        days = 0;  hours = 0;  minutes = 0;  seconds = 0;
    }else {
       
        days = Math.floor(t / (1000 * 60 * 60 * 24)), // stanumenq or : floor kloracnuma motik tvin
        hours = Math.floor((t / (1000 * 60 * 60) % 24)), // jam@ stanalu hamar
        minutes = Math.floor(t / (1000 / 60) % 60),
        seconds = Math.floor(t / 1000 % 60);
    }
    return {'total': t, 'days': days, 'hours': hours, 'minutes': minutes, 'seconds': seconds};
}

function getZero(num){
    if (num >= 0 && num < 10) { 
        return '0' + num;
    } else {
        return num;
    }
}
function setClock(selector, endtime) {
    const timer = document.querySelector(selector),
    days = timer.querySelector('#days'),
    hours = timer.querySelector('#hours'),
    minutes = timer.querySelector('#minutes'),
    seconds = timer.querySelector('#seconds'),
    timeInterval = setInterval(updateClock, 1000);
    updateClock();
    
    function updateClock() {
        const t = getTimeRemaining(endtime);
        days.innerHTML = getZero(t.days);
        hours.innerHTML = getZero(t.hours);
        minutes.innerHTML = getZero(t.minutes);
        seconds.innerHTML = getZero(t.seconds);

        if (t.total <= 0) {
            clearInterval(timeInterval);
        }
    }
}
setClock('.timer', deadLine);


// modal
const btndataModal = document.querySelectorAll('[data-modal]'), //karanq klasic araj html um anun tanq u ogtagorcenq
      modal = document.querySelector('.modal'); //esi globalnienq grum vor inchqan tenc ixs ka sexmenq paki
  ////// modalClose = documenq.querySelector('data-close')
for(let i = 0; i < btndataModal.length; i++) {
btndataModal[i].addEventListener('click', openModal)
}


function openModal() {
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // erp modal aknon bacvuma ej@ scrol chi linum
    clearInterval(modalTimerId) // ete hajaxord@ mtela el petq chi vor inq@ noric baci
    window.removeEventListener('scroll', showModalByScrol);
} 

function CloseModal() {
  modal.style.display = 'none';
  document.body.style.overflow = '';// '' mej inch petqa kdni vor scrol@ het ga
}
////// modalCloseBtn.addEventListener('click', CloseModal);
 
modal.addEventListener('click', (e) => {
    if(e.target === modal || e.target.getAttribute('data-close') == '') { // vor durc@ sexmes kori modalnoy aknon:  ????
      //// es getAtribut@ veraberuma saxin vorde data-closi x tesav pakeluya
        CloseModal()
    }
})
document.addEventListener('keydown', (e) => { // esi nshanakuma vor knopka petqa sexmel nor lini funkcian
    if(e.code === 'Escape' && modal.classList.contains(modal.style.display = 'none')) { // knopki anunnaa: erkrodov stuguma vor funkcian ashxati menak modl oknok bacac vaxt
        CloseModal(); // ?????????
        
    }
})
const modalTimerId = setTimeout(openModal, 600000);

function showModalByScrol() {
    if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
        openModal();
         window.removeEventListener('scroll', showModalByScrol);
    }
}
window.addEventListener('scroll', showModalByScrol); 


// ogtagorcum enq klassner 

class MenuCard {
  constructor(src, alt, title, discr, price, parentSelector) { // inchqan uzenq class kavelacnenq
       this.src = src;  this.alt = alt;  this.title = title;
       this.discr = discr;  this.price = price; 
       
       this.parent = document.querySelector(parentSelector)
       this.transfer = 27; // prisi konverti kursna
       this.changeToUAH();
    }

    changeToUAH() {
        this.price = this.price * this.transfer
    }

    render() {
        const element = document.createElement('div');
        // if(this.classes.length == 0) {
        //     this.element = 'menu__item'; // ete morananq MenuCardi mej dnenq inq@ kavelacni
        //     element.classList.add(this.element);
        // }else {
        //     this.classes.forEach(className => element.classList.add(className));
        // }
        element.innerHTML = 
        `<div class="menu__item">
            <img src=${this.src} alt=${this.alt}>
            <h3 class="menu__item-subtitle">${this.title}</h3>
            <div class="menu__item-descr">${this.discr}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
                <div class="menu__item-cost">Цена:</div>
                <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
            </div>
            </div>
         `;
         this.parent.append(element)
    }
}
axios.get('http://localhost:3000/menu')
.then(data => {
    data.data.forEach(({img, altimg, title, discr, price}) => {
    new MenuCard(img, altimg, title, discr, price, '.menu .container').render();
    });
})
// fechov chanenq axiosov anenq senc klni
// const getResorce = async (url) => { //asincxron chi spasum mek@ myusin sinxron vor hertova
//     const res = await fetch(url) ; //minchev returnin hasnel@ mi qani varkyan tevuma dra hamar ete chgrenq undefind kta
//         if(!res.ok) { // fetch@ sxal@ chi chuc ta dra hamar petqa grenq dzerov
//            throw new Error(`chi exce ${url}, status:${res.status}`) // throw qci es ashibkaen ete paynan@ jishta
//         }
    
//     return await res.json();
//}
// getResorce('http://localhost:3000/menu')// json serveri jampena db n eli
// .then(data => {
//     data.forEach(({img, altimg, title, discr, price}) => {
//         new MenuCard(img, altimg, title, discr, price, '.menu .container').render();
//     });
// }); 


// Forms
console.log('ada')
const forms = document.querySelectorAll('form');
const message = {
    loading: 'img/spinner.svg',
    succses: 'spasiba skora svyazimsya',
    failure: 'chto to pashlo ne tak'
}
forms.forEach(item => {
    bindpostData(item);
})

// const postData = async (url, data) => {
//     const res = await fetch(url, {
//         method: "POST",  
//         headers: {"content-type": "application/json"},
//         body: data
//     })
//     return await res.json();
// }

function bindpostData(form) {
 form.addEventListener('submit', (e) => { // imputner@ submita arvum
        e.preventDefault();

        let statusMessage = document.createElement('img');// zagruski hamar div enq sarqum
        statusMessage.src = message.loading;
        statusMessage.style.cssText = `display: block; margin: 0 auto;`
        form.insertAdjacentElement('afterend', statusMessage) 
      // // form.append(statusMessage);

        const formData = new FormData(form) // froma-neri hamara
        const json = JSON.stringify(Object.fromEntries(formData.entries())) // vercumenq formDatan masivi masivneri mej heto het sarqum obj u sarqum json
        
        axios.post('http://localhost:3000/requests', json)
        .then(data => { 
            console.log(data.data); // datan obshi tvyalnerna tali  datai meji datana petq
            showThancsModal(message.succses);
            setTimeout(() => {
                statusMessage.remove();     
            },2000);
        }).catch(() => { // if i else-na nuyn
            showThancsModal(message.failure);
        }).finally(() => {
            form.reset(); // hlni chlni es kod@ @lneluya . reset maqruma taracq@
        })
    })
 }
function showThancsModal(massege) {
    const prevModalDialog = document.querySelector('.modal__dialog');
    prevModalDialog.style.display = 'block';
    openModal();

    const thencsModal = document.createElement('div');
    thencsModal.classList.add('modal__dialog');
    thencsModal.innerHTML = `
    <div class = "modal__content">
    <div class="modal__close" data-close>x</div>
    <div class="modal__title">${massege}</div>
    </div>`;

    document.querySelector('.modal').append(thencsModal);
    prevModalDialog.style.display = 'none';
    
    setTimeout(() => {
        thencsModal.remove();
        prevModalDialog.style.display = 'block';
        CloseModal();
    },4000)
}
    axios('http://localhost:3000/menu') // db.jsoni fili masivna 
        .then(res => console.log(res.data))
    
});


//Slider
const sliderPrev = document.querySelector(".offer__slider-prev"),
      sliderNext = document.querySelector(".offer__slider-next"),
      total = document.querySelector('#total'),
      current = document.querySelector('#current'),
      slides = document.querySelectorAll(".offer__slide"),
      slider = document.querySelector(".offer__slider")
      sliderWrapper = document.querySelector('.offer__slider-wrapper'),
      slideField = document.querySelector('.offer__slider-inner'),
      slidewidth = window.getComputedStyle(sliderWrapper).width;
  
let i = 1;
let offset = 0;
if(slides.length < 10) {
            total.textContent = `0${slides.length}`
            current.textContent = `0${i}`
    }else{
           total.textContent = slides.length;
           current.textContent = i;
         }

slideField.style.width = 100 * slides.length + '%'; // mecacnumenq erkarutyun@ vor tertenq hertov
slideField.style.display = 'flex';
slideField.style.transition = '0.5s all';
sliderWrapper.style.overflow = 'hidden'

slides.forEach(slide => {
    slide.style.width = slidewidth
})  //inchi hamara ????

slider.style.position = 'relative';
const indicators = document.createElement('ol'),
      dost = [];
indicators.classList.add('carousel-indicators')
indicators.style.cssText = `position: absolute;right: 0;bottom: 0;left: 0;z-index: 15;display: flex;justify-content: center;margin-right: 15%;margin-left: 15%;list-style: none;`
slider.append(indicators)

for(let i = 0; i < slides.length; i++) {
    const dot = document.createElement('li')
    dot.setAttribute('data-slide-to', i + 1) 
    dot.style.cssText = `box-sizing: content-box;flex: 0 1 auto;width: 30px;height: 6px;margin-right: 3px;margin-left: 3px;cursor: pointer; background-color: #fff;background-clip: padding-box;border-top: 10px solid transparent;border-bottom: 10px solid transparent; opacity: .5;transition: opacity .6s ease;`
   
    if(i == 0) {
        dot.style.opacity = 1;
    }
    indicators.append(dot)
    dost.push(dot);
}

function nolikOpaciti() {
    if(slides.length < 10) {
        current.textContent =`0${i}`;
    }else {
        current.textContent = i
    }
    dost.forEach(dot => dot.style.opacity = '.5');
    dost[i - 1].style.opacity = 1;
}

sliderNext.addEventListener('click', () => {
    if(offset == parseInt(slidewidth) * (slides.length - 1)) { // es tarberak@ aveli heshtaslidewidth @ 650px a stroka sarquma tiv
        offset = 0;
    }else{
        offset +=  parseInt(slidewidth);
    }
    slideField.style.transform = `translateX(-${offset}px)`

    if(i == slides.length) {
        i = 1
    }else {
        i++;
    }
    nolikOpaciti();
})

sliderPrev.addEventListener('click', () => {
    if( offset == 0) {
        offset = +slidewidth.slice(0, slidewidth.length - 2) * (slides.length - 1) 
    }else{
        offset -=  +slidewidth.slice(0, slidewidth.length - 2);
    }
    slideField.style.transform = `translateX(-${offset}px)`

    if(i == 1) {
        i = slides.length
    }else {
        i--;
    }
    nolikOpaciti();
});
    dost.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');
            i = slideTo;
            offset = parseInt(slidewidth) * (slideTo - 1);
            slideField.style.transform = `translateX(-${offset}px)`;
            
            nolikOpaciti();
        });
    });


































      

// class PrintUser{
//     constructor(name ,lastname ,age){
//     this.Name =name;
//     this.LastName = lastname;
//     this.age = age;
//     this.parent = document.querySelector(".ArmanClass");
//     }

//     Render(){
//       const div = document.createElement("div");
//       div.innerHTML = `<div class="testArman"><p>${this.Name}</p><p>${this.LastName}</p><p>${this.age}</p></div>`;
//      this.parent.append(div);
//     }
// }

// async function GetUserAndPrintToHTML(){
// const response = await fetch("https://jsonplaceholder.typicode.com/users");
// const jsonData = await response.json();

// for(let i = 0; i < jsonData.length ; i++)
//     {
//        new PrintUser(jsonData[i].name , jsonData[i].email , jsonData[i].phone).Render();
//     }
    
// }
// console.log(GetUserAndPrintToHTML())

















































