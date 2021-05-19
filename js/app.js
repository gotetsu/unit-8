let employees = [];
let totalEmployees;
const urlAPI = `https://randomuser.me/api/?results=12&inc=name,picture,email,location,phone,dob&noinfo&nat=US`;
const sectionA = document.querySelector('#section-a');
const modalMain = document.querySelector('.modal-main')
const overlay = document.querySelector('.overlay');
const previousBtn = document.querySelector('#btnPrevious');
const nextBtn = document.querySelector('#btnNext');


fetch(urlAPI)
    .then(res => res.json())
    .then(res => res.results)
    .then(displayEmployees)
    .catch(err => console.log(err))


function displayEmployees(employeeData) {

    employees = employeeData;

    // store total employees 
    totalEmployees = employees.length;


    // store the employee HTML as we create it 
    let employeeHTML = '';

    //loop through each employee and create HTML markup
    employees.forEach((employee, index) => {
        let name = employee.name;
        let email = employee.email;
        let city = employee.location.city;
        let picture = employee.picture; 

        employeeHTML += `
            <div class="card" data-index="${index}">
                <img class="employee-photo" src="${picture.large}" alt="${name.first}'s picture">
                <div class="card-content">
                    <h3 class="employee-name">${name.first} ${name.last}</h3>
                    <p class="employee-email">${email}</p>
                    <p class="employee-city">${city}</p>
                </div>
            </div>
        `
    });

    sectionA.innerHTML = employeeHTML;
}


function displayModal (index) {

    let {name, dob, phone, email, location: {city, street, state, postcode}, picture} = employees[index];

    let date = new Date(dob.date);

    const modalHTML = `
            <div id="modal-content">
                <img class="employee-photo-modal" src="${picture.large}" alt="${name.first}'s photos">
                <h3>${name.first} ${name.last}</h3>
                <p>${email}</p>
                <p>${city}</p>
            </div>
            <div id="modal-content-2">
                <p>${phone}</p>
                <p>${street.number} ${street.name}, ${state} ${postcode}</p>
                <p>Birthday: ${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}</p>
            </div>
    `;

    overlay.classList.remove('hidden');
    modalMain.innerHTML = modalHTML ;
}


let currentIndex;

sectionA.addEventListener('click', e => {

    const card = e.target.closest('.card');
    let index = card.getAttribute('data-index');

    currentIndex = index;

    if (e.target !== sectionA) {
        displayModal(index);
    }

    const modalClose = document.querySelector('.close-btn');
    modalClose.addEventListener('click', () => {
        overlay.classList.add('hidden');

    })
})


previousBtn.addEventListener('click', () => {

    if ( currentIndex > 0) {
        currentIndex-- 
        displayModal(currentIndex)
    } else {
        currentIndex = totalEmployees-1
        displayModal(currentIndex)
    }
})


nextBtn.addEventListener('click', () => {

    if ( currentIndex < totalEmployees-1) {
        currentIndex++
        displayModal(currentIndex)
    } else {
        currentIndex = 0;
        displayModal(currentIndex)
    }
})


const myInput = document.querySelector('#myInput');

myInput.addEventListener('keyup', () => {

    let filterValue = myInput.value.toUpperCase();

    function nameFilter (filterValue) {
        const cards = document.querySelectorAll('.card'); 
    
        for (let i = 0; i < cards.length; i++) {
            const name = cards[i].childNodes[3].childNodes[1].textContent.toUpperCase();
    
            if (name.includes(filterValue)) {
                cards[i].style.display = '';
            } else {
                cards[i].style.display = 'none'
            }
        }
    }

    nameFilter(filterValue);
})