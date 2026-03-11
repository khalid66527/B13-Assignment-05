document.getElementById('btn-login')
    .addEventListener('click', function(){
        const userInput = document.getElementById('user-input')
        const uservalue =userInput.value;
        console.log(uservalue);
        if(uservalue != "admin"){
            alert('invalite username');
            
        }
        
        const userPass = document.getElementById('user-pass');
        const userPassValue = userPass.value;
        console.log(userPassValue);
        if(userPassValue != "admin123"){
            alert('invalite password')
        }
        

        if(uservalue=== "admin" && userPassValue === "admin123"){
            alert('login Success');
            window.location.assign("../homepage.html")
        }
        return;
        

        
    })