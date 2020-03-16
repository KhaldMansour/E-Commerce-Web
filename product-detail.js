const urlParams = new URLSearchParams(window.location.search);
var myParam = urlParams.get('id');

console.log(myParam);

const img = document.getElementById('img');
const desc = document.getElementById('desc');
const price = document.getElementById('price');
const name = document.getElementById('name');
const category = document.getElementById('categ');
const addBtn = document.getElementById('addToCart');


var db;
var db_v = 1;
var db_n ="cart";
var stote;
var index;

// var x = "kkk";

const xml = new XMLHttpRequest();


xml.open('GET', 'https://afternoon-falls-30227.herokuapp.com/api/v1/products/'+myParam);
xml.send();



xml.onload = () =>
{
    console.log('onload');
    console.log(xml.status);
    if(xml.status === 200)
    {
        console.log(typeof(xml.response));
        var json = JSON.parse(xml.response);
        console.log(json);
        console.log(xml.response);
    }

    if(xml.status !== 200)
    {
        console.log("bad request");
        
    }
    
    var pName =json.data.ProductId;
    var src = json.data.ProductPicUrl;
    var pDesc =json.data.Description;
    var pPrice = json.data.Price;
    var pCategory = json.data.Category;

    img.setAttribute("src" , src);
    name.innerHTML="Product Name: " +pName;
    desc.innerHTML = "Description: "+pDesc;
    price.innerHTML="Price: "+pPrice +" $";
    category.innerHTML=pCategory;


    
}

// console.log(pName);
openDB();
function openDB()
{
    var request = indexedDB.open(db_n , 1);
        request.onupgradeneeded = (e) =>
    {
        db = e.target.result;
        // alert ("upgraded");
        
        if (!db.objectStoreNames.contains(db_n))
        {
            cart_products = db.createObjectStore(db_n, { keyPath: 'id', autoIncrement: true });
        }
        
    }
    request.onsuccess = (e) =>
    {
        db = e.target.result;
        // alert("success");
        
    }
    request.onerror = (e) =>
    {
        alert("fail");
    }
};  



addBtn.addEventListener('click', (ev) => {
      
    console.log(db);
    if (db instanceof IDBDatabase) {

        const tx = db.transaction([db_n] , 'readwrite');
        const cart_products = tx.objectStore(db_n);
        
        cart_products.add({
            pId: myParam
        });
    }
});



