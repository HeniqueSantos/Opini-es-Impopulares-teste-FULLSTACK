let opiniaoID;
let novoValorJoia;
let novoValorDisJoia;
let sec = 1;
let votado = false

const likeButton = document.getElementById("like");
const dislikeButton = document.getElementById("dislike");
const opiniaoP = document.querySelector(".opiniao-text p");
const TimerH3 = document.querySelector(".timer");

OpiniaoNova();

likeButton.addEventListener('click', function() {
        if (votado){
            console.warn('você já votou');
            return;
        }
        fetch("/like", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id: opiniaoID
        })
    })
    novoValorJoia += 1
    this.innerHTML = '✔️' + ' : ' + novoValorJoia;
    document.getElementById("dislike").innerText = "👎 : " + novoValorDisJoia;
    votado = true;
    

    let timer = setInterval(function(){
        TimerH3.innerText = sec;
        console.log(sec);
        sec += 1;
    },1000);

    setTimeout(function(){
        OpiniaoNova();
        clearInterval(timer);
    },3999);

    
});


dislikeButton.addEventListener('click',function() {
    
        if (votado){
            console.warn('você já votou');
            return;
        }

        fetch("/dislike",{
            method:'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: opiniaoID
            })
        });
        novoValorDisJoia += 1
        this.innerHTML = '✔️' + ' : ' + novoValorDisJoia ;
        document.getElementById("like").innerText =  "👍 : " + novoValorJoia;
        votado = true; 

        let timer = setInterval(function(){
        TimerH3.innerText = sec;
        console.log(sec);
        sec += 1;
        },1000);

         setTimeout(function(){
            OpiniaoNova();
            clearInterval(timer);
        },3999);
        
});


function OpiniaoNova(){
    fetch("/opiniao")
    .then(res => res.json())
    .then(dados => {
    opiniaoID = dados.id;
    novoValorJoia = dados.joia;
    novoValorDisJoia = dados.disjoia;

    opiniaoP.innerText = dados.opiniao;
    document.getElementById("like").innerText =  "👍";
    document.getElementById("dislike").innerText = "👎";

    sec = 1;
    TimerH3.innerText = "";
    votado = false;
    });
};