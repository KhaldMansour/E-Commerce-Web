
var db;
var db_v = 1;
var db_n ="cart";
var stote;
var index;


const viewBtn = document.getElementById('view');
viewBtn.addEventListener('click', (ev) => {
    console.log(IDBDatabase);

    
    if (db instanceof IDBDatabase) {
        console.log("hi");

        const tx = db.transaction(db_n, 'readwrite');
        const cart_products = tx.objectStore(db_n);  
        
        // viewDiv.innerHTML="";

        cart_products.getAll().onsuccess = (ev)=>{
            console.log(ev.target.result);
            const result = ev.target.result;
            result.forEach(el => {
                console.log(el.title);
                 
            });
        }
        
        
    }
});
