const list = document.querySelector('ul');
const button = document.querySelector('button');
const input = document.querySelector('input');

button.onclick = () => {
    if(input.value === "") {
        alert('pls enter you task');
    }
    else {
        const element = document.createElement('li');
        element.textContent = input.value;
        input.value = "";
        const btn = document.createElement('button');
        btn.innerText = "delete";
        btn.classList.add('delete');
        element.appendChild(btn);
        list.appendChild(element);
    }
}

list.addEventListener('click' , function (event) {
    if(event.target.nodeName === 'BUTTON')
    {
        let listItem = event.target.parentElement;
        listItem.remove();
    }
});