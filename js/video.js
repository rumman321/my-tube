
console.log('added')
//fetch load & show categories on html

//create loadCategories
const loadCategories=()=>{
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
    .then(res=>res.json())
    .then(data=>displayCategories(data.categories))
    .catch(error=>console.log(error))
}
//create displayCategories
const displayCategories=(categories)=>{
    const categoryList=document.getElementById('categories')
    categories.forEach(element => {
        console.log(element)

        //create a button
        const button=document.createElement('button')

        button.classList='btn'
        button.innerText=element.category
        //add btn categories
        categoryList.appendChild(button)
    });
}
loadCategories()