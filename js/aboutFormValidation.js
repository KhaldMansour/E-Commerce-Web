const form = document.querySelector(".leave-comment");
const nameError = document.querySelector(".wrong-name");
const emailError = document.querySelector(".wrong-email");
const subjectError = document.querySelector(".wrong-subject");
const messageError = document.querySelector(".wrong-message");
const messageSent = document.querySelector(".message-sent");

const emailRegex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/
const nameRegex = /^[A-Za-z]{3,50}$/;

var name, email, subject, message;

function validateForm(){

    let valid = true;
    
    nameError.style.display="none";
    emailError.style.display="none";
    subjectError.style.display="none";
    messageError.style.display="none";

    name =  form.name.value;
    email = form.email.value;
    subject = form.subject.value;
    message = form.message.value; 

    if(name ==="" || !name.match(nameRegex)){
        nameError.style.display="block";
        valid = false;
        
    }
    if(email==="" || !email.match(emailRegex)){
        emailError.style.display="block";
        valid = false;
    }
    
    if(subject===""){
        subjectError.style.display="block";
        valid = false;
    }

    if(message===""){
        messageError.style.display="block";
        valid = false;
    }

    return valid
}

form.addEventListener( 'submit', (e)=>{
    
    e.preventDefault();

    messageSent.style.display="none";
    let isValidateForm = validateForm();
    if(isValidateForm){
        console.log("vaild");

        messageData= {
            userName : name,
            userEmail : email,
            messageSubject : subject,
            messageContent : message
        }
        
        // messageJSON = JSON.stringify(messageData);
        // console.log(messageJSON);
        // form.reset();
        messageSent.style.display="block";
        
        fetch('https://afternoon-falls-30227.herokuapp.com/api/v1/contact_us', {
            method: 'POST',
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify({
                name: name,
                email: email,
                subject: subject,
                message:message,
            })}).then(function (response) {
            return response.json();
        }).then(function (result) {
            // console.log(text);
            console.log(result);
            
        }).then(function (result){
            location.reload();
        }).catch(function (error) {
            console.log(error);
        });
    }

}); 