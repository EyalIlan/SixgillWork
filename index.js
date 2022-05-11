const axios = require('axios')// cals to the api
const { performance } = require('perf_hooks');

let myObj = []


const RandomNamesHandler =  async  () =>{
    for (let i = 0; i < 50; i++) { // call 100 times to the website
        let  source = axios.CancelToken.source();
        axios.get('https://www.fakenamegenerator.com/',{
            cancelToken:source.token
        })
        .then(res =>{
                myObj.push(res.data)
        })
        .catch(e =>{
        })
        setTimeout(()=>{
            source.cancel() // cancel the request that can waste a long time
        },3000)
}
}

const NamesHandler = (arr) =>{
    let NamesObj = {};
    arr = arr.slice(0,100) // could enter more then 100 names because of the async calls 
    arr.forEach(p =>{
        let name = p.substring(p.search('<h3>')+4,p.search('</h3>')).split(' ') // getting the name from the website string    
        name.forEach(k =>{
        if (k.length > 2) { // remove all B. A. J. and such...
            if(NamesObj[k] === undefined){ // assign it to the object
                NamesObj[k] = 1                     
            }else{
                NamesObj[k]++
            }       
         }
        })
    })
    let biggestName = {}
    for(let i=0;i<10;i++){
        let maxName = {
            value:0,
            name:''
        };
        for(let name in NamesObj){
           if(NamesObj[name] > maxName.value){
             maxName.value =  NamesObj[name]
             maxName.name  =  name
           }
        }
        biggestName[maxName.name] =  maxName.value // assign to the 10 most found names
        NamesObj[maxName.name]  = -1 // zero the max so it wont found again       
    }
    let  endTime = performance.now()
    console.log(biggestName);
    console.log('Time '+ (endTime - startTime));
}

let counter = 0
let NamesArr = []

const RequsetLoops = async () =>{
   
      let timeObj = setInterval(()=>{ // if some of the calls getting error insted of names i want to call again until i have 100 names
             RandomNamesHandler()
             console.log(myObj.length);
             if (myObj.length>=100) {
                let arr = myObj
                NamesHandler(arr)
                clearInterval(timeObj) // cancel the setInterval
             }
        },500)
    
    }

let startTime = performance.now()
RequsetLoops()
     



 
 