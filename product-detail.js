const urlParams = new URLSearchParams(window.location.search);
const myParam = urlParams.get('id');

const img = document.getElementById('img');
const desc = document.getElementById('desc');
const price = document.getElementById('price');
const name = document.getElementById('name');
const category = document.getElementById('categ');

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



