    // first we will fetch html element using query selector and stored in a variable
    // inside bracket we will use dot for class,hash for ID 

    //here fetching the class using queryselector
const resultDiv=document.querySelector(".result");
const wordEle=document.querySelector("#word");
const phonetics=document.querySelector(".phonetics");
// no dot in audio for selecting that perticular tag
const audio=document.querySelector("audio");
const wordMeaning=document.querySelector(".word-definition");
// api link  to fetch the words meaning
const url="https://api.dictionaryapi.dev/api/v2/entries/en/";


// handle func displays the word type by user
const handle= async (e)=>{
    if(e.keyCode==13){
        const word=e.target.value;
        // make a request to api
        const result= await fetch(url + word);

        resultDiv.style.display="block";
        const data=await result.json();

// since we are writing await so we have to put async   
if(result.ok){


        document.querySelectorAll(".wordmeaning")[0].style.removeProperty("display");
        document.querySelectorAll(".wordmeaning")[1].style.removeProperty("display");
        phonetics.style.removeProperty("display");
        audio.style.removeProperty("display");

        wordEle.innerText=data[0].word;
        phonetics.innerText=data[0].phonetics[0].text;
        // now source for audio tag
        audio.src=data[0].phonetics[0].audio;
        wordMeaning.innerText=data[0].meanings[0].definitions[0].definition;
        //SYNONYMS//
        const synonymsArray=data[0].meanings[0].definitions[0].synonyms;
        let synonymsData="";
        if(synonymsArray.length){
        for(let i=0;i<synonymsArray.length;i++){
            synonymsData += `<p class="pills" >${synonymsArray[i]}</p>`
        }
    }

    else{
         synonymsData=`<p class="pills">No Synonyms Available</p>`;
    }
        document.querySelector(".synonyms").innerHTML=synonymsData;
    }

    // if the user given word is wrong
    else {
        audio.style.display="none";
        wordEle.innerText=data.title;
        document.querySelectorAll(".wordmeaning")[0].style.display="none;"
        document.querySelectorAll(".wordmeaning")[1].style.display="none;"
        phonetics.style.display="none";
        wordMeaning.innerText=data.message;
        document.querySelector(".synonyms").style.display="none";

    }

    }
}

