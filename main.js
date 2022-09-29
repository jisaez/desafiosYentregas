const menuOptions = [
    {
        'id':1,
        'menuName': 'Pizza',
        'img': 'img/pizza.jpeg',
        'description': 'Una pizza grande a elección. Una bebida a elección (refresco, limonada, cerveza o copa de vino). Postre o café',
        'price': 300,
        'quant': 0,
        'alt': 'Foto de una pizza '
    },
    {
        'id':2,
        'menuName': 'Pasta',
        'img': 'img/pasta.jpeg',
        'description': 'Un plato de pasta a elección. Una bebida a elección (refresco, limonada, cerveza o copa de vino). Postre o café',
        'price': 450,
        'quant': 0,
        'alt': 'Foto de un plato de pasta'
    },
    {
        'id':3,
        'menuName': 'Parrilla',
        'img': 'img/parrilla.jpg',
        'description': 'Un corte de carne a elección. Una bebida a elección (refresco, limonada, cerveza o copa de vino). Postre o café',
        'price': 600,
        'quant': 0,
        'alt': 'Foto de un corte de carne cocinado al estilo argentino'
    },
    {
        'id':4,
        'menuName': 'A la carta',
        'img': 'img/ilustracionmenu.svg',
        'description': 'Elegirás tu comida y tu bebida en el restaurante. El importe de la reserva se descontará del total de la cuenta',
        'price': 100,
        'quant': 0,
        'alt': 'ilustración de la palabra menú'
    }
]

//      LOCAL STORAGE    //

document.addEventListener('DOMContentLoaded', () =>{
    
    renderMenuOptions()
    printModal(reserve),
    printTotals(reserve),
    // printCounter(),
    console.log(reserve)
});

const saveReserveStorage = (reserve) => {
    localStorage.setItem('reserves', JSON.stringify(reserve));
};

let reserve = JSON.parse(localStorage.getItem('reserves')) || [];
console.log(reserve)

//=============   RENDERS

function renderMenuOptions (){

    const menus = document.getElementById('menus');

    menuOptions.forEach((m) => {
        let menu = document.createElement('div')
        menu.classList.add('col-12');
        menu.classList.add('col-lg-4');
        menu.classList.add('col-md-6');
        menu.classList.add('mb-5');
        menu.classList.add('d-flex');
        menu.classList.add('justify-content-center');

        menu.innerHTML = `
        <div class="card text-dark" style="width: 20rem;">
            <img class="card-img-top h-50" src="${m.img}" alt="${m.alt}">
            <div class="card-body">
                <h5 class="card-title">${m.menuName}</h5>
                <p class="card-text">${m.description}</p>
                <p>${m.price}</p>

                <div id=divCounter class= "d-flex flex-row align-items-center text-center justify-content-center">
                    <button id="remove${m.id}" class="btn btn-danger rounded-4"> - </button>
                    <h6 class="text-center m-4" id="quant${m.id}"> - </h6>
                    <button id="add${m.id}"class="btn btn-info rounded-4"> + </button>
                    
                </div>
                
            </div>
        </div>
        `
        menus.appendChild(menu);
        
        let quant = document.getElementById(`quant${m.id}`);
        printCounter(m.id, quant);

        document.getElementById(`remove${m.id}`).addEventListener('click', ()=>{
            removeMenuFromReserve(m.id);
            printCounter(m.id, quant);    
        });

        document.getElementById(`add${m.id}`).addEventListener('click',()=>{
            addMenuToReserve(m.id); 
            printCounter(m.id, quant);
        });

        document.getElementById('btnReset').addEventListener('click', () => {
            resetReserve(m.id);
            printCounter(m.id, quant);
        });

    });   

};

// AGREGAR AL CARRITO //
function addMenuToReserve(id){  
    let menu = menuOptions.find(menu => menu.id === id);
    let menuInReserve = reserve.find(menu => menu.id === id);
    if(menuInReserve){
        menu.quant ++
    }else {        
        menu.quant = 1;
        reserve.push(menu)
        
    };

    printModal(reserve)
    printTotals(reserve)
    saveReserveStorage(reserve);
    console.log(reserve)
};
// finAGREGAR AL CARRITO //

//    SACAR DEL CARRITO  //
function removeMenuFromReserve(id){
    // let menu = menuOptions.find(menu => menu.id === id);
    let menuInReserve = reserve.find(menuInReserve => menuInReserve.id === id);
    if(!menuInReserve){
        alert('este menu no esta en la reserva')
    } else if(menuInReserve.quant === 0){
        let i= reserve.indexOf(menuInReserve);
        reserve.splice(i,1);
    } else{
        menuInReserve.quant --;
    };

    printModal(reserve)
    printTotals(reserve)
    saveReserveStorage(reserve);
    console.log(reserve)
};
//   finSACAR DEL CARRITO // 

function resetReserve(){
    reserve.splice(0, (reserve.length));
    printModal(reserve)
    printTotals(reserve)
    console.log(reserve)
    saveReserveStorage(reserve)
};



//====== PRINTS =================
function printCounter(id, quant){
    let menu = menuOptions.find(menu => menu.id === id);
    let menuInReserve = reserve.find(menuInReserve => menuInReserve.id === id);
    if(!menuInReserve){
        quant.innerText = 0;
    }else {        
        quant.innerText = menu.quant;
    };
};



function printModal(reserve){
    let modalReserve = document.getElementById('modalBody');
    modalReserve.innerHTML = '';

    reserve.forEach((m) => {
            let modalText = document.createElement('div');
            modalText.classList.add('text-start');
            modalText.innerHTML = `<p>${m.quant} menu ${m.menuName}</p>`;

            if (`${m.quant}` > 0 ){
            modalBody.appendChild(modalText);
            };
        });
};

function printTotals(reserve){
    const totalQ = reserve.reduce((acc, m) => acc + m.quant, 0);
    const totalReserve = reserve.reduce((acc, m) => acc + (m.price * m.quant), 0);

    let modalTotals = document.getElementById('modalTotals');
    modalTotals.innerHTML = '';

    let modalTotal = document.createElement('div');
    modalTotal.classList.add('text-start');
    modalTotal.innerHTML = `<p>Comensales: ${totalQ}</p>
                            <p>Total a pagar: MXN ${totalReserve}</p>`;

    modalTotals.appendChild(modalTotal);
};

