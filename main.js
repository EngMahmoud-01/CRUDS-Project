let title=document.getElementById('title');
let taxes=document.getElementById('taxes');
let price=document.getElementById('price');
let ads=document.getElementById('ads');
let discount=document.getElementById('discount');
let total=document.getElementById("total");
let count=document.getElementById('count');
let category=document.getElementById('category');
let submit=document.getElementById('create');
let mood="create";
let tmp;
let moodSearch='Title';

function getTotal(){
    if(price.value != ''){
        let result=(+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML=result;
        total.style.background='#040';
    }else{
        total.innerHTML='';
        total.style.background="#a00d02";
    }
}
let dataPro;
if(localStorage.product != null){
    dataPro=JSON.parse(localStorage.product);
}else{
    dataPro=[];
}

submit.onclick =function(){
let newPro={
    title:title.value.toLowerCase(),
    taxes:taxes.value,
    price:price.value,
    ads:ads.value,
    discount:discount.value,
    total:total.innerHTML,
    count:count.value,
    category:category.value.toLowerCase(),
}
if(title.value !='' 
    && price.value != '' 
    && category.value!= ''
    && count.value > 0 
    && count.value <100
){
    if(mood==="create"){
            if(newPro.count>1){
        for(let i=0;i<newPro.count;i++){
            dataPro.push(newPro);
        }
    }else{
        dataPro.push(newPro);
    }
    }else{
        dataPro[tmp]=newPro;
        mood="creat";
        count.style.display="block";
        submit.innerHTML="Create";
    }
        clearData();
}



    localStorage.setItem('product', JSON.stringify(dataPro));


showData();
}



function clearData(){
title.value='';
ads.value='';
discount.value='';
taxes.value='';
price.value='';
count.value='';
category.value='';
total.innerHTML='';
}

function showData(){
    getTotal();
        let table='';
        for(let i=0;i< dataPro.length ; i++){
            table +=
            `
            <tr>
                <td>${i}</td>
                <td>${dataPro[i].title}</td>
                <td>${dataPro[i].price}</td>
                <td>${dataPro[i].taxes}</td>
                <td>${dataPro[i].ads}</td>
                <td>${dataPro[i].discount}</td>
                <td>${dataPro[i].total}</td>
                <td>${dataPro[i].category}</td>
                <td><button id="update" onclick="updateItem(${i})">Update</button></td>
                <td><button id="delete" onclick="deleteItem(${i})">Delete</button></td>
                </tr>
            `
        }
        
        let tabelbody=document.getElementById('tablebody');
        tabelbody.innerHTML=table;
        if(dataPro.length>0){
            let btndeleteAll=document.getElementById("deleteAll");
            btndeleteAll.innerHTML=`
            <button id="btndeleteAll" onclick=deleteAll()>Delete All (${dataPro.length})</button>
            `
        }else{
            btndeleteAll.innerHTML='';
            
        }
}
    showData();

    function deleteItem(i){
        dataPro.splice(i,1);
        localStorage.product=JSON.stringify(dataPro);
        showData();
    }
    function deleteAll(){
        dataPro.splice(0);
        localStorage.clear();
        showData();
    }

    function updateItem(i){
        title.value=dataPro[i].title;
        price.value=dataPro[i].price;
        taxes.value=dataPro[i].taxes;
        ads.value=dataPro[i].ads;
        discount.value=dataPro[i].discount;
        category.value=dataPro[i].category;
        getTotal();
        count.style.display="none";
        submit.innerHTML="Update";
        mood="update";
        tmp=i;
        window.scroll({
        left:0,
        top:0,
        behavior:"smooth"
    });
    }

    function getSearchMood(id){
        let searh=document.getElementById("search");
        if(id=='searchtitle'){
            moodSearch='Title';
        }else{
            moodSearch='Category';
        }
        searh.placeholder="Search By "+moodSearch;
        searh.focus();
        searh.value='';
        showData();
    }

    function searchData(val){
        let table='';
            for(let i=0;i< dataPro.length ; i++){
            if(moodSearch=="Title"){
            if(dataPro[i].title.includes(val.toLowerCase())){
            table +=
            `
            <tr>
                <td>${i}</td>
                <td>${dataPro[i].title}</td>
                <td>${dataPro[i].price}</td>
                <td>${dataPro[i].taxes}</td>
                <td>${dataPro[i].ads}</td>
                <td>${dataPro[i].discount}</td>
                <td>${dataPro[i].total}</td>
                <td>${dataPro[i].category}</td>
                <td><button id="update" onclick="updateItem(${i})">Update</button></td>
                <td><button id="delete" onclick="deleteItem(${i})">Delete</button></td>
            </tr>
            `
        }
    }else{
        if(dataPro[i].category.includes(val.toLowerCase())){
            table +=
            `
            <tr>
                <td>${i}</td>
                <td>${dataPro[i].title}</td>
                <td>${dataPro[i].price}</td>
                <td>${dataPro[i].taxes}</td>
                <td>${dataPro[i].ads}</td>
                <td>${dataPro[i].discount}</td>
                <td>${dataPro[i].total}</td>
                <td>${dataPro[i].category}</td>
                <td><button id="update" onclick="updateItem(${i})">Update</button></td>
                <td><button id="delete" onclick="deleteItem(${i})">Delete</button></td>
            </tr>
            `
        }
}

}
let tabelbody=document.getElementById('tablebody');
        tabelbody.innerHTML=table;
}