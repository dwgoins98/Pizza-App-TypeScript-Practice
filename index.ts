/* Converted JS to TS to see difference. TypeScript can tell us preemptively of potential errors in code
const menu = [
    { name: "Meat Lovers", price: 15},
    { name: "Margherita", price: 10},
    { name: "Hawaiian", price: 12},
    { name: "Cheese", price: 10},
    { name: "Chicken Alfredo", price: 11}
] // end menu

let cashInRegister = 100
const orderQueue = []
let newOrderID = 1

function addNewPizza(pizzaObj) {

    menu.push( pizzaObj);
    
} // end function addNewPizza()

function placeOrder(pizzaName){

    const selectedPizza = menu.find(pizzaObj => pizzaObj.name === pizzaName)
    if (!selectedPizza){
        console.error(`${pizzaName} does not exist in current menu`)
        return
    }
   // console.log("Pizza selected: " + selectedPizza.name + "\nPizza price: " + selectedPizza.price)
    cashInRegister += selectedPizza.price;
    const newOrder = { ID: newOrderID++, pizza: selectedPizza, status: "ordered" }
    orderQueue.push(newOrder)
    return newOrder

} // end function placeOrder()

function completeOrder(searchID){

   let findOrder = orderQueue.find(order => order.ID === searchID)
   console.log("Order " + searchID + " is complete")
   return findOrder.status = "Completed"

}

try {
    placeOrder ("Cheese")
    placeOrder ("Meat Lovers")
    placeOrder ("Chicken Alfredo")
} catch (error) {
    console.log("Cannot place order")
} // end try catch

Checking that the orders were placed
 * // Extract pizza names from orderQueue
 * let pizzaNamesInQueue = orderQueue.map( order => order.pizza.name)
 * console.log("Pizza Orders: \n\t", pizzaNamesInQueue.join("\n\t") + "\n")
 * console.log("Cash in Register: " + cashInRegister)


try {
    let IdToComplete = 1
    completeOrder(IdToComplete++)
    completeOrder(IdToComplete)
} catch (error) {
    console.log("Cannot find order ID")
}

let pizzaNamesInQueue = orderQueue.map( order => order.pizza.name)
let pizzaStatusInQueue = orderQueue.map( order => order.status)
console.log("Pizza Orders: \n" + pizzaStatusInQueue.join(":\t") + "\n" + pizzaNamesInQueue.join("\t") + "\n")

*/

/*** Learning TypeScript */

const myName = "Daniel"
let numOfWheels: number = 4
let isStudent: boolean = false
let newOrderID: number = 1

/* TypeScript can inherently assign data type by what data is given */

/*** TypeScript Pizza App */


type MenuItem = {
    pizzaID: number
    name: string
    price: number
}

type UpdatedMenuItem = Partial<MenuItem>

type Order = {
    id: number
    item: MenuItem
    status: "Ordered" | "Completed"          // litteral union type
}

let nextPizzaID: number = 1000 

let menu: MenuItem[] = [
    {pizzaID: nextPizzaID++, name: "Cheese", price: 10},
    {pizzaID: nextPizzaID++, name: "Pepperoni", price: 12},
    {pizzaID: nextPizzaID++, name: "Veggie", price: 11},
    {pizzaID: nextPizzaID++, name: "Meat Lovers", price: 15},
    {pizzaID: nextPizzaID++, name: "Hawaiian", price: 13}
]  // end menu


let cashInRegister: number = 100
const orderQueue:Order[] = []

function addNewPizza(pizzaObj: Omit<MenuItem, "pizzaID">): MenuItem | unknown {     // Omit pizzaID because this isn't something the user should have to iclude when adding a pizza

    const newPizza: MenuItem = {
        pizzaID: nextPizzaID++,
        ...pizzaObj
    }
    if(!pizzaObj){
        console.error(`Cannot add pizza: ${pizzaObj}`)
        return
    }
    menu.push(newPizza)
    return newPizza
    
} // end function addNewPizza()

function placeOrder(pizzaName: string): Order | unknown {

    const selectedPizza = menu.find(pizzaObj => pizzaObj.name === pizzaName)
    if (!selectedPizza){
        console.error(`${pizzaName} does not exist in current menu`)
        return
    }
   // console.log("Pizza selected: " + selectedPizza.name + "\nPizza price: " + selectedPizza.price)
    cashInRegister += selectedPizza.price;
    const newOrder: Order = { 
        id: newOrderID++,
        item: selectedPizza,
        status: "Ordered" }
    orderQueue.push(newOrder)
    return newOrder

} // end function placeOrder()

function completeOrder(searchID:number) : "Completed" | undefined {

    if(!searchID){
        console.error(`Order ID: ${[searchID]} cannot be found`)
        return
    } // make sure the ID is there before we move on

    let findOrder: Order = orderQueue.find(order => order.id === searchID)! // non-null assertion operator to make sure this value is not undefined
    
    if(findOrder){
    console.log("Order " + searchID + " is complete")
    return findOrder.status = "Completed"
    } else { // if findOrder returns null, it'll throw an error
        console.error(`Order number ${searchID} cannot be found`)
    }
    
 } // end function completeOrder()


export function getPizzaDetail(identifier: string | number): MenuItem | unknown {
    
    if(!identifier){
        console.error(`Cannot find item with identifier: ${identifier}`)
        return
    }
    if( typeof identifier === "number"){
        return menu.find(item => item.pizzaID === identifier)!
    } else if ( typeof identifier === "string"){
        return menu.find(item => item.name.toLowerCase === identifier.toLowerCase)!
    } else {
        throw new TypeError("Parameter `identifier` must be either 'string' or 'number'");
    }
    
} // end function getPizzaDetail()


 /** TypeScript Try-Catch blocks to test functions */

 try {
    placeOrder ("Cheese")
    placeOrder ("Meat Lovers")
    /*placeOrder ("Chicken Alfredo")
    placeOrder ( "BBQ")*/ // Checked if it would throw the error - it did!
} catch (error) {
    console.error("Cannot place order")
} // end try catch

// Keep track of pizzaIDs, increment them by 1 with ever new Pizza addition

try {
    addNewPizza({name: "BBQ", price: 14})
 } catch (error) {
    console.error("Cannot add new pizza")
 } // end try catch


try {
    completeOrder(1)
    completeOrder(2)
    // completeOrder(3) // Checked if it would throw the error - it did!
} catch (error) {
   console.error("Cannot search for Order ID")
} // end try catch

try {
    console.log(getPizzaDetail(1000))
    console.log(getPizzaDetail("BBQ"))
} catch (error) {
    console.error("Cannot get pizza detail with a given identifier")
}




// Checking that the orders were placed
// Extract pizza names from orderQueue



let pizzaNamesInQueue = orderQueue.map( order => order.item)
// console.log("Pizza Orders: \n\t", pizzaNamesInQueue.join("\n\t") + "\n")
// console.log("Cash in Register: " + cashInRegister)
/*
let pizzaNamesInQueue = orderQueue.map( order => order.name)
let pizzaStatusInQueue = orderQueue.map( order => order.status)
console.log("Pizza Orders: \n" + pizzaStatusInQueue.join(":\t") + "\n" + pizzaNamesInQueue.join("\t") + "\n")
*/

console.log("Menu: ", menu)




/** Generics */

function addToArray<Type> (array: Type[], item: Type): Type[] {
    array.push(item)
    return array
}

addToArray<MenuItem>(menu, {pizzaID: nextPizzaID++, name: "Ultimate", price: 12})
addToArray<Order>(orderQueue, {id: newOrderID++, item: menu[2], status: "Ordered"}) // added the type Order in <> to allow for union types

console.log(menu)
console.log(orderQueue)

/**
 * 
 * What I learned about TypeScript through this app
 * 1. Basic, literal, and custom Types
 * 2. Optional Properties (properties in a Type that is followed with a ?)
 * 3. Unions (combining multiple different Types into different Types)
 * 4. Type Narrowing (Narrowing down which of the Union types we are using)
 * 5. Utility Types(properties in a type that are limited to options seperated by a |)
 * 6. Generics (adding additional flexibility inside the code using <>)
 * 
 */