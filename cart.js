const append = document.getElementById('append');
const viewBtn = document.getElementById('view');

var db;
var db_v = 1;
var db_n ="cart";
var stote;
var index;






openDB();
function openDB()
{
    var request = indexedDB.open(db_n , 1);
    request.onsuccess = (e) =>
    {
        db = e.target.result;
          // alert("success");
        
    }
};

function submit()
{
    viewBtn.click();
    alert("hi")
};

viewBtn.addEventListener('click', (ev) => {
    console.log(db);

    

    if (db instanceof IDBDatabase) {
        const tx = db.transaction(db_n, 'readwrite');
        const cart_products = tx.objectStore(db_n);  
        
        // viewDiv.innerHTML="";

        cart_products.getAll().onsuccess = (ev)=>{
            console.log(ev.target.result);
            const result = ev.target.result;
            result.forEach(el => {

                const xml = new XMLHttpRequest();


                    xml.open('GET', 'https://afternoon-falls-30227.herokuapp.com/api/v1/products/'+el.pId);
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

                        var tr = document.createElement('tr');
                        tr.setAttribute('class' , 'table-row')

                tr.innerHTML = 
                `	
                <td class="column-1">
                <div class="cart-img-product b-rad-4 o-f-hidden">
                    <img src=${src}>
                </div>
            </td>
            <td class="column-2">${pName}</td>
            <td class="column-3">${pPrice}</td>
            <td class="column-4">
                <div class="flex-w bo5 of-hidden w-size17">
                    <button class="btn-num-product-down color1 flex-c-m size7 bg8 eff2">
                        <i class="fs-12 fa fa-minus" aria-hidden="true"></i>
                    </button>

                    <input class="size8 m-text18 t-center num-product" type="number" name="num-product1" value="1">

                    <button class="btn-num-product-up color1 flex-c-m size7 bg8 eff2">
                        <i class="fs-12 fa fa-plus" aria-hidden="true"></i>
                    </button>
                </div>
            </td>
            <td class="column-5">${pPrice}</td>
            
            `
            function appendAfter(el, referenceNode) {
                referenceNode.parentNode.insertBefore(el, referenceNode.nextSibling);
            };
            appendAfter(tr ,append);
                    }
               
            });
        }
        
        
    }
});
