let orderList = []
const menu = [
    { id:'0001', name: "Tarta de jamón y queso", type: "principal", price:100, promo:"1" },
	{ id:'0002', name: "Ensalada caprese" , type: "principal", price:100, promo:"2" },
	{ id:'0003', name: "Milanesa" , type: "principal", price:100, promo:"3" },
	{ id:'0004', name: "Ensalada mixta", type: "guarnicion", price:100, promo:"1" },
	{ id:'0005', name: "Papas fritas", type: "guarnicion", price:100, promo:"2" },
	{ id:'0006', name: "Puré de zapallo", type: "guarnicion", price:100, promo:"3" },
	{ id:'0007', name: "Flan con crema", type: "postre", price:100, promo:"1" },
	{ id:'0008', name: "Queso y dulce", type: "postre", price:100, promo:"2" },
    { id:'0009', name: "Mousse de chocolate", type: "postre", price:100, promo:"3" },
    { id:'0010', name: "Coca Cola", type: "bebida", price:100, promo:"1" },
    { id:'0011', name: "Fanta", type: "bebida", price:100, promo:"2" },
    { id:'0012', name: "Fanta Light", type: "bebida", price:100, promo:"3" }
]

element = {
    id:'0013',
    name:'Paso de los Toros',
    type:'Bebida',
    price:50,
    promo:'1'
}

//1. identificar tipos de platos
//1.a. extraigo tipos de platos
const allTypes = menu.map(e =>e.type) //o también puedo poner menu.map (({type})=>type)
//1.b. filtro para que los tipos de platos no se repitan
const plateTypes =allTypes.filter((e,i)=> allTypes.indexOf(e) === i)

//2. genero selecs por cada tipo de plato
const createSelects =(list, container) => {
    list.forEach(e=> {
        let select = document.createElement("select")
        select.id=e //le da como id el valor del tipo de plato
        container.appendChild(select)
    })
}

//3. una función para poblar los selects
const fillSelects =list => {
    list.forEach(e=> {
        let select = document.getElementById (e.type) //por como asigné los id, seguro que hay un select cuyo id coincide con mi plato, y es ahí donde quiero poner mi option
        if (!select.childElementCount) {
            let placeholder = {name: `seleccione ${e.type}` , id:""}
            select.appendChild(createOption(placeholder))
        }
        select.appendChild(createOption(e))
    })
}

//funcion de crear una opción
const createOption = elem => {
    let option=document.createElement ("option")
    option.innerText=elem.name
    option.value =elem.id
    return option
}


//4. una función que ponga en cada select una opción vacía como placeholder. esta no se usó
const emptyOption = list => {
    list.forEach (e=>{
        let select = document.getElementById(e)
        let option = document.createElement("option")
        option.innerText=`Seleccione ${e}`
        select.appendChild(option)
    })
}


let createButton=function(classBtn, index, btnFunction){
    btn=document.createElement('button')
    btn.classList.add(classBtn)
    btn.innerText=classBtn
    btn.id=index
    btn.onclick=function(){btnFunction(this)}
    return btn
}

let done = function (btn) {
    // orderList.splice (btn.id,1)
    orderList[btn.id].toPrepare=!orderList[btn.id].toPrepare
    // orderList.forEach(order=>{
    //     if (order.id===id)
    // acá que la busque por índice y que le cambie el estado})

    printOrders()
}

const printOrders=() => {
    let container =document.getElementById("orders")
    container.innerHTML=""

    orderList.forEach ((order,index) => {
        // acá pasar el if: que lo haga si está activa la orden
        let orderUl= document.createElement("ul")
        orderUl.appendChild(createButton('done', index,done))
        order.plateSelection.forEach(plate=>{
            let plateLi=document.createElement("li")
            plateLi.innerText=plate.name
            orderUl.appendChild(plateLi)
        })
        let priceLi =document.createElement("li")
        priceLi.innerText =totalPrice(order)
        orderUl.appendChild(priceLi)
        order.toPrepare?container.appendChild(orderUl):null
    })
}

// const totalPrice =order=> {
//     let total = 0
//     order.forEach(plate=>total+=plate.price)
//     return total
// }
// atención pues acá puede hacerse de otra manera con list.reduce. (ver a continuación)

// const totalPrice =order=>order.map((e=>e.price)).reduce((a,b)=>a+b)// ver esto para el array de precios

//ahora si todos coinciden con lapromo, hay un descuente 
const totalPrice= order=> {
    let price=order.plateSelection.map((e=>e.price)).reduce((a,b)=>a+b)
    let promo=order.plateSelection.map(e=>e.promo).reduce((a,b)=>a===b? a:undefined)
    switch (promo) {
        case "1":
        return price*.8
        break
        case "2":
        return price*.75
        break
        case "3":
        return price*.85
        break
        default:
            return price
    }
    return price
}


//inicialización del programa
const initialize = () => {
    let mainDiv = document.getElementById("selects")
    createSelects (plateTypes, mainDiv)
    // emptyOption(plateTypes)
    fillSelects(menu)
    printOrders()
}

//Quiero confirmar el menú
const createOrder =() => {
    let order ={plateSelection:[], toPrepare:true, id:""}
    plateTypes.forEach (e=> {
        let select =document.getElementById(e)
        let plate = menu.find(e=>e.id===select.value)
        console.log(plate)
        order.plateSelection.push(plate)
        select.value=""
    })
    order.id=`order00${orderList.length}`
    orderList.push(order)
    printOrders()
}