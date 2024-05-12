
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
      constructor(src, alt, title, discr, price, parentSelector, ...classes) { // inchqan uzenq class kavelacnenq
           this.src = src;  this.alt = alt;  this.title = title;
           this.discr = discr;  this.price = price; 
           this.classes = classes; 
           this.parent = document.querySelector(parentSelector)
           this.transfer = 27; // prisi konverti kursna
           this.changeToUAH();
        }

        changeToUAH() {
            this.price = this.price * this.transfer
        }

        render() {
            const element = document.createElement('div');
            if(this.classes.length == 0) {
                this.element = 'menu__item'; // ete morananq MenuCardi mej dnenq inq@ kavelacni
                element.classList.add(this.element);
            }else {
                this.classes.forEach(className => element.classList.add(className));
            }
            element.innerHTML = 
            `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.discr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
             `;
             this.parent.append(element)
        }
    }
    // const div = new MenuCard();
    // div.render()
    new MenuCard(
        "img/tabs/vegy.jpg",
        "vegy",
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
         9,
        '.menu .container',
         
    ).render(); // mi anqama ogtagorcvum vortev verevini pets silka chuni 

    new MenuCard(
        "img/tabs/elite.jpg",
        "elite",
        'Меню “Премиум”',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        16,
        '.menu .container',
        'menu__item',
        
    ).render();

    new MenuCard(
        "img/tabs/post.jpg", "elite", 'Меню "Постное"', 'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',23,'.menu .container','menu__item').render();



    // Forms
    console.log('adsasdasd')
    const forms = document.querySelectorAll('form');
    const message = {
        loading: 'img/spinner.svg',
        succses: 'spasiba skora svyazimsya',
        failure: 'chto to pashlo ne tak'
    }
    forms.forEach(item => {
        postData(item);
    })

    function postData(form) {
     form.addEventListener('submit', (e) => { // imputner@ submita arvum
            e.preventDefault();

            let statusMessage = document.createElement('img');// zagruski hamar div enq sarqum
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `display: block; margin: 0 auto;`
            form.insertAdjacentElement('afterend', statusMessage) //CSS-um karanq es klasov dzev tanq
          // // form.append(statusMessage);

     
            const formData = new FormData(form) // froma-neri hamara
             const object = {}; // JSON formati hamara arvum
            formData.forEach(function(value, key) {
                object[key] = value;
            })
            
            fetch('server.php', { 
                method: 'POST',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify(object)
            }).then(data => data.text())
            .then(data => { //ete sax normala apa - datanel en tvyalnerna vor@ serverin uxarkvela
                console.log(data);
                showThancsModal(message.succses);
                 // maqruma greluc u padverdit taluc heto
                setTimeout(() => {
                    statusMessage.remove();     
                },2000);
            }).catch(() => { // if i else-na nuyn
                showThancsModal(message.failure);
            }).finally(() => {
                form.reset(); // hlni chlni es kod@ @lneluya
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
        prevModalDialog.style.display = 'block';
        prevModalDialog.style.display = 'none';
        
        setTimeout(() => {
            thencsModal.remove();
            prevModalDialog.style.display = 'block';
            CloseModal();
        },4000)
   }
});


// class PrintUser{
//     constructor(name ,lastname ,age){
//     this.Name =name;
//     this.LastName =lastname;
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
//         new PrintUser(jsonData[i].name , jsonData[i].email , jsonData[i].phone).Render();
//     }
// }


// const newData = {
//     name: "hrcho",
//     Lastname: "Gyu"
// }

//     const response = await fetch(`${baseUrl}users` , newData);
//     console.log(await response.json());





























































































