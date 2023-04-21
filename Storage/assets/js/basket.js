let productList = JSON.parse(localStorage.getItem('products'))

function GetProducts() {
    let items = JSON.parse(localStorage.getItem('products'));
    let alertbox = document.querySelector('.alert');

    if(items.length === 0) {
        alertbox.classList.remove('d-none')
        document.querySelector('table').classList.add('d-none')
    }
    else{
        alertbox.classList.add('d-none')
        document.querySelector('table').classList.remove('d-none')
        
        let x = '';
        items.forEach(item => {
        x += `
        <tr>
            <th scope="row">${item.Id}</th>
            <td>
                <img src=${item.Image}>
            </td>
            <td>${item.Title}</td>
            <td>
                <input type="number" min="1" value=${item.Count}>
            </td>
            <td>${(item.Price) * (item.Count)} AZN</td>
            <td>
                <button class="btn btn-danger">Delete</button>
            </td>
        </tr>
        `
    })
    document.querySelector('tbody').innerHTML = x;
    }

     DeleteItem();
    
}

GetProducts();

function DeleteItem() {
    let productList = JSON.parse(localStorage.getItem('products'))


    let deleteElement = document.querySelectorAll('button')


    for (let dltElement of deleteElement) {
        dltElement.addEventListener('click', function () {
            let dataId = this.parentElement.parentElement.getAttribute('data-id');
            let existPr = productList.find(item => item.id === dataId);
            let index = productList.indexOf(existProd);
            productList.splice(index, 1)
            localStorage.setItem('products', JSON.stringify(productList));



            if (existProd.Count >= 0) {
                this.parentElement.parentElement.remove();
            }


            if (productList.length === 0) {
                document.querySelector('table').classList.add('d-none')
                document.querySelector('.message').classList.remove('d-none')
            }
            else {
                document.querySelector('table').classList.remove('d-none')
                document.querySelector('.message').classList.add('d-none')
            }

            document.querySelector('#count').innerHTML=productList.length


        })
    }
    ShowCountProduct()
}


function ShowCountProduct() {
    let product_list = JSON.parse(localStorage.getItem('products'));
    document.querySelector('#count').innerHTML = product_list.length;
}

ShowCountProduct()

function handleCountChange(id, newCount) {
    let productList = JSON.parse(localStorage.getItem('products'));
    if (newCount >= 0) {
        productList.forEach(item => {
            if (item.Id === id) {
                item.Count = newCount;
            }
        });
        localStorage.setItem('products', JSON.stringify(productList));
    }
    else{
        alert("Minimum 0")
    }
    DeleteItem();
    ShowProduct();
    
}

