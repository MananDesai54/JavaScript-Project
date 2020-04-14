var ul = document.getElementById('list')
var li



var addButton = document.getElementById('add')
addButton.addEventListener('click' , addItem)
var removeButton = document.getElementById('remove')
removeButton.addEventListener('click' , removeItem)
var removeAllButton = document.querySelector('#removeAll')
removeAllButton.addEventListener('click',removeAll)

function addItem() {
        console.log('Add button clicked')
//     const val = document.getElementById('input').value
//     li = document.createElement('ul')
//     var value1 = document.createTextNode(val)
//     li.appendChild(value1)
//     document.querySelector('#list').appendChild(li)
    var input = document.querySelector('#input')
    var item = input.value
    ul = document.getElementById('list')
    var textNode = document.createTextNode(item)
    var myP = document.createElement('p')
    if(item === ''){
        //var inp = document.getElementById('input')
        myP.textContent = '*Enter some Text Please'
        document.querySelector('#input').insertAdjacentElement('afterend',myP)
        myP.style.color = 'red'
        if (myP.textContent !== null){
            setTimeout(() => {
                myP.style.display = 'none'
            },4000)
        }
    }else{
        li = document.createElement('li')
        //li.setAttribute('class' , 'mycheck')
        var chk = document.createElement('input')
        chk.type = 'checkbox'
        chk.setAttribute('id','check')
        var label = document.createElement('label')
        label.appendChild(textNode)
        li.appendChild(chk)
        li.appendChild(label)
        ul.insertBefore(li,ul.childNodes[0])
        // ul.appendChild(label)
        // li.appendChild(chk)
        // label.appendChild(textNode)
        // li.appendChild(label)
        // ul.insertBefore(li,ul.childNodes[0])
        input.value=''
         setTimeout(()=>{
             li.setAttribute('class' , 'mycheck')
        },100)
    }
}


function removeItem() {
    console.log('remove button clicked')
    li=ul.children
    for (let index = 0; index < li.length; index++) {
        while(li[index] && li[index].children[0].checked){
            ul.removeChild(li[index])
        }
    }
}


function removeAll() {
    console.log('removeAll pressed')
    //li = ul.children
    ul.remove()
    /*for (let index = 0; index < li.length; index++) {
        /*while(li[index]){
            ul.removeChild(li[index])
        }
    }*/
}

