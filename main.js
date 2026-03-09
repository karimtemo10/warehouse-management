let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let category = document.getElementById('category');
let count = document.getElementById('count');
let submit = document.getElementById('submit');

let mood = 'create'
let temp;

// get total
function getTotal(){
    if(price.value != ''){
        let rustle = (+price.value + +taxes.value) - +discount.value;
        total.innerHTML= rustle;
        total.style.background = '#0d9b01';
    }else{
        total.innerHTML= '';
        total.style.background = '#f00';
    }
}

// create a new product

let dataPro;
if(localStorage.product != null){
    dataPro = JSON.parse(localStorage.product);
}else{
    dataPro = [];
}
submit.onclick = function createProduct(){    
        let newPro = {
            title:title.value.toLowerCase(),
            price: price.value,
            taxes: taxes.value,
            discount: discount.value,
            total: total.innerHTML,
            count: count.value,
            category: category.value.toLowerCase(),
        }
        if(title.value != '' && price.value != '' && category.value != '' ){

            if(mood === 'create'){
                if(newPro.count > 1){
                    for(let i = 0; i < newPro.count; i++){
                        dataPro.push(newPro);
                    }
                }else{
                        dataPro.push(newPro);
                    }
            }else{
                dataPro[temp] = newPro;
                mood = 'create';
                count.style.display = 'block';
                submit.innerHTML = 'Create';
                
            }

            clearData();
        }
        


        
        localStorage.setItem('product', JSON.stringify(dataPro));
        showData()
       
}

// clear all data in inputs after click in create button

function clearData(){
    title.value = '';
    price.value = '';
    taxes.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
    total.style.background = '#f00'
}

function showData(){
    let table = '';
    for(let i = 0; i < dataPro.length; i++){
        table += `<tr>
                    <td>${i+1}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].count}</td>
                    <td>${dataPro[i].category}</td>
                    <td><button onclick="updateDta(${i})" class="btnUpdate">Update</button></td>
                    <td><button onclick="deleteData(${i})" class="btnDelete">Delete</button></td>
                </tr>
      `
    }
    document.getElementById('tbody').innerHTML = table;
    // create a button for delete all data 
    let delAll = document.getElementById('delAll');
    if(dataPro.length > 0){
        delAll.innerHTML = `<button onclick = "delAllData()" class="btnDelete">Delete ALL</button>`;
    }else{
          delAll.innerHTML = '';
    }
}
showData();

//  delete just one item from dataPro when click on delete button

function deleteData(i){
    dataPro.splice(i, 1);
    localStorage.product = JSON.stringify(dataPro);
    showData();
}

// delete all data from dataPro when click on delete all button 

function delAllData(){
    dataPro.splice(0);
    localStorage.clear();
    showData();
}

// updata data

function updateDta(i){
    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    taxes.value = dataPro[i].taxes;
    discount.value = dataPro[i].discount;
    category.value = dataPro[i].category;
    count.style.display = 'none';
    getTotal();
    submit.innerHTML = 'Update';
    mood = 'Update';
    temp = i;
}


// Search by title and category
let searchMood = 'title';
function getSearchMood(id){
    let search = document.getElementById('search');
    if(id == 'searchByTitle'){
        searchMood = 'title';
    }else{
        searchMood = 'category';
    }
    search.placeholder = 'Search By ' + searchMood;
    search.focus();
}

function searchData(value){
    let table = '';
    for(let i = 0; i <dataPro.length; i++){
       if(searchMood === 'title'){
            if(dataPro[i].title.includes(value.toLowerCase())){
                table += `<tr>
                    <td>${i+1}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].count}</td>
                    <td>${dataPro[i].category}</td>
                    <td><button onclick="updateDta(${i})" class="btnUpdate">Update</button></td>
                    <td><button onclick="deleteData(${i})" class="btnDelete">Delete</button></td>
                 </tr>
                `
            }
        }else{
            if(dataPro[i].category.includes(value.toLowerCase())){
                table += `<tr>
                    <td>${i+1}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].count}</td>
                    <td>${dataPro[i].category}</td>
                    <td><button onclick="updateDta(${i})" class="btnUpdate">Update</button></td>
                    <td><button onclick="deleteData(${i})" class="btnDelete">Delete</button></td>
                 </tr>
                `
            }
        } 
    }
    document.getElementById('tbody').innerHTML = table;
}