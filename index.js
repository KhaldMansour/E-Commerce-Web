const xml = new XMLHttpRequest();
const append = document.getElementById('append');
const next = document.getElementById('next');
const prev = document.getElementById('prev');
const pagination = document.getElementById('pageNo');


var pageN = 1;


// console.log(append);

startPage(pageN);



function startPage(pageN)
{
    xml.open('GET', 'https://afternoon-falls-30227.herokuapp.com/api/v1/products/?page='+ pageN);
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
        
        for (let i=0 ; i<json.data.length ; i++)
            
        {
        
        var name = json.data[i].Name ; 
        var src = json.data[i].ProductPicUrl ; 
        var price = json.data[i].Price;

        

        var imgElement = document.createElement("img");
        imgElement.setAttribute("src" , src);
        imgElement.setAttribute("href" , `product-detail.html?${json.data[i].ProductId}` );


    
     
            var div3 = document.createElement("div");
            div3.setAttribute("class" ,"block1-wrapbtn w-size2" );

            var div2 = document.createElement("div");
            div3.setAttribute("class" ,"block1 hov-img-zoom pos-relative m-b-30" );

            var div1 = document.createElement("div");
            div1.setAttribute("class" ,"col-sm-10 col-md-8 col-lg-4 m-l-r-auto" );




             var link = document.createElement("a");
             link.setAttribute ("class" , "flex-c-m size2 m-text2 bg3 hov1 trans-0-4");
             link.setAttribute("href" , "product-detail.html?id="+json.data[i].ProductId );
             link.innerHTML = name;

             div3.appendChild(link);


             div2.appendChild(imgElement);
             div2.appendChild(div3);

             div1.appendChild(div2);

             append.appendChild(div1);

            //  var addCartBtn = document.createElement("a");
            //  addCartBtn.setAttribute ("class" , "flex-c-m size2 m-text2 bg3 hov1 trans-0-4");
            //  addCartBtn.setAttribute("href" , `cart.html/?${json.data[i].ProductId}` );
            //  addCartBtn.innerHTML= "ADD TO CART";
            //  div3.appendChild(addCartBtn);
    
    
        }

    }   



}


pagination.innerHTML = pageN ;



next.addEventListener('click', (e) =>{

    append.innerHTML="";
    pageN++;
    startPage(pageN);
    pagination.innerHTML = pageN ;

    console.log(pageN);

});



// if(pageN==1){
//     prev.style.visibility="hidden";
// }
// else{
//     prev.style.visibility="visible";
// }


        prev.addEventListener('click', (e) =>{
          
            append.innerHTML="";
            pageN--;
            startPage(pageN);
            pagination.innerHTML = pageN ;

            
            
        
        });


        



