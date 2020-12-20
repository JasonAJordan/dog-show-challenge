// document.addEventListener('DOMContentLoaded', () => {

// })

// DOCUMENT ELEMENTS and etc //
let edit = null;
const table = document.querySelector("#table-body")
const dogEditForm = document.querySelector("#dog-form")


// console.log(table)

// EVENT FUNCTIONS //

function editDog(event){
    console.log(event.target)

    if(event.target.matches('#edit-dog')){
        console.log(event.target.dataset.id)
        edit = event.target.dataset.id

        getOneDog(edit);
    }

}




// RENDER FUNCTIONS // 

function renderDog(dogObj){

    table.innerHTML += `
        <thead class='blue'>
        <tr class='padding'>
        <th class='padding center'>${dogObj.name}</th>
        <th class='padding center'>${dogObj.breed}</th>
        <th class='padding center'>${dogObj.sex}</th>
        <th class='padding center'>
            <button id="edit-dog" data-id ="${dogObj.id}">Edit Dog</button>
        </th>
        </tr>
        </thead>
        `
    // let editDogBtn = table.querySelector('#edit-dog')
    // editDogBtn.dataset.id = dogObj.id
    //console.log(editDogBtn)
    //table.addEventListener("click", editDog)

    table.addEventListener("click", editDog)
    // table.addEventListener
    //console.log(editDog)
    
}

function fillEditForm(singleDogObj){
    dogEditForm.innerHTML = `
    <input type="text" name="name" placeholder="dog's name" value="${singleDogObj.name}" />
    <input type="text" name="breed" placeholder="dog's breed" value="${singleDogObj.breed}" />
    <input type="text" name="sex" placeholder="dog's sex" value="${singleDogObj.sex}" />
    <input type="submit" value="Submit" />`

    dogEditForm.addEventListener("submit", event => {
        event.preventDefault()
        // console.log("sadf")
        //console.log(event.target.name.value)

        let formData = {
            name: event.target.name.value,
            breed: event.target.breed.value,
            sex: event.target.sex.value
        }

        id = singleDogObj.id 
        console.log(id)
        console.log(formData)

        fetch(`http://localhost:3000/dogs/${singleDogObj.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Accept: "application/json"
              },
            body: JSON.stringify({
                name: event.target.name.value,
                breed: event.target.breed.value,
                sex: event.target.sex.value
                })
            })
            .then(response => response.json())
            // .then(dog => console.log(dog))
            // .then(console.log("asdf"))
            .then(getDogs)
    })

}


// FETCH FUNCTIONS //

function getDogs(){
    fetch('http://localhost:3000/dogs')
        .then(response => response.json())
        //.then(data => console.log(data));
        .then(dogs => dogs.forEach( dogObj =>{
            renderDog(dogObj)
        }))
}

function getOneDog(id){
    return fetch(`http://localhost:3000/dogs/${id}`)
        .then(response => response.json())
        .then(singleDogObj => fillEditForm(singleDogObj) )
}

// function makeDogEdit(id){ //not used
    
//     fetch(`http://localhost:3000/dogs/${id}`, {
//         method: 'PATCH',
//         header: {
//             'Content-Type': 'application/json',
//             Accept: "application/json"
//           },
//           body: JSON.stringify(formData)
//         })
        
//         .then(response => response.json())
//         // .then(console.log("asdf"))
//         .then(getDogs)
// }

// INITIAL FUNCTIONS // 

getDogs()