const nav=document.getElementById('nav')
const res=document.getElementById('res')
const listStory=document.getElementById('story')
let list=[]
if(localStorage.getItem('story')!==null){
    list=JSON.parse(localStorage.getItem('story'))
}
const calc=(arr)=>{
    let res=Number(arr[0])
    for (let i = 1; i < arr.length; i+=2) {
        const num=Number(arr[i+1]);
        switch (arr[i]) {
            case '+':
                res+=num;
                break;
            case '-':
                res-=num;
                break;
            case '*':
                res*=num;
                break;
            case '/':
                res/=num;
                break;
        
            default:
                break;
        }
    }
    return res
}
const func=(str)=>{
    // const str='2+5+22/11+6/1*3+1'
    return calc(str.split(/(\+|\-)/).map((item)=>{
        if(item.includes('*')||item.includes('/')){
            return calc(item.split(/(\*|\/)/))
        }
        return item
    }))
}

const crtEL=(text)=>{
    const li=document.createElement('li')
    li.innerText=text;
    listStory.append(li)
}
const add=(str1,str2)=>{
    const signs='+-*/'
    return signs.includes(str2) && signs.includes(str1[str1.length-1])    ?   str1.slice(0,str1.length-1)+str2   : str1+str2
}
list.map(item=>{
    crtEL(item)
})
nav.addEventListener('click',event=>{
    res.innerText=res.innerText.includes('=')  ?  '' :res.innerText
    switch (event.target.innerText) {
        case '=':
            if(res.innerText===''){
                break;
            }
            res.innerText+='='+func(res.innerText)
            list.push(res.innerText)
            crtEL(list[list.length-1])
            localStorage.removeItem('story')
            localStorage.setItem('story',JSON.stringify(list))
            break;
        case 'C':
            res.innerText=''
            break;
        case 'CE':
            res.innerText=''
            listStory.innerText=''
            list=[]
            localStorage.removeItem('story')

            break;
        case '⌫':
            res.innerText=res.innerText.slice(0,res.innerText.length-1)
            break;
        default:
            res.innerText=add(res.innerText,event.target.innerText)
            break;
    }
})