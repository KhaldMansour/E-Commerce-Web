const xml = new XMLHttpRequest();
const append = document.getElementById('append');
const next = document.getElementById('next');

// console.log(append);

startPage();

// xml.onreadystatechange = function()
// {
//     if(this.readyState == 4 && this.status == 200)

//      {
//         let res = JSON.parse(this.response);
//         for(let i = 0; i < res.total_pages; ++i)
//         {
//             next.addEventListener('click', function (ev)
//              {
//                 startPage(i + 1);
//             });
//         };
//     };
// };

function startPage()
{
    xml.open('GET', 'https://afternoon-falls-30227.herokuapp.com/api/v1/products/?page=3');
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
    
    
        }

    }   



}

