const xhr = new XMLHttpRequest();

window.indexedDB = window.indexedDB || 
                   window.mozIndexedDB || 
                   window.webkitIndexedDB ||
                   window.msIndexedDB;

if (!window.indexedDB){
    alert('not supported');
}

let request = window.indexedDB.open("cartDB",1),
    db,             //databse
    tx,             //transaction
    store,          //finds the structure for the data             
    index;          //if i want to access something else other than the id

request.onupgradeneeded = (e)=>{
    let db = request.result,
    store = db.createObjectStore("CartStore",{keyPath: "prodID"}),
    // store = db.createObjectStore("CartStore",{autoIncrement: true});
    index = store.createIndex("prodName","prodName",{unique: false});
};

request.onerror = (e)=>{
    console.log("There was an error: "+ e.target.errorCode);
};

request.onsuccess = (e)=>{
    db = request.result;
    tx = db.transaction("CartStore","readwrite");
    store = tx.objectStore("CartStore");
    index = store.index("prodName");

    db.onerror = (e)=>{
        console.log("ERROR" + e.target.errorCode);
    }

    let addToCartBtn = document.getElementById('addToCart');

    addToCartBtn.addEventListener('click',(ev)=>{
        
    })

    /*to insert data*/

    // store.put({prodID: 1,
    //            prodName: "laptop", 
    //            pic: true, 
    //            price: 520$});

    // store.put({prodID: 2,
    //            prodName: "iphone", 
    //            pic: true, 
    //            price: 700$});

    /*to retrieve data*/

    // let q1 = store.get(1);                      //retrieving data by store
    // let qs = index.get("iphone");               //retrieving data by index

    // q1.onsuccess = function(){
    //     console.log(q1.result);
    //     console.log(q1.result.prodName);
    // };

    // qs.onsuccess = function(){
    //     console.log(qs.result.prodName);
    // };

    tx.oncomplete = ()=>{
        db.close();
    };

};

