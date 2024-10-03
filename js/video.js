

//convert number into the hour minute second
const time=(time)=>{
    const hour=parseInt(time/3600)
    let remainingSecond=time%3600
    const minute=parseInt(remainingSecond/60)
    remainingSecond = parseInt(remainingSecond/60)
    
    return `${hour}h ${minute}min ${remainingSecond}sec`
}

//remove active class on btn
const revomeActiveClass=()=>{
    const buttons=document.getElementsByClassName('category-btn')
    
    for (let item of buttons) {
        item.classList.remove('active')
    }
}

// load video description
const videoDescrip=async (videoID)=>{
    console.log(videoID)
    const url=`https://openapi.programming-hero.com/api/phero-tube/video/${videoID}`
    const res=await fetch(url)
    const data = await res.json()
    displaydescrip(data.video)
}

const displaydescrip=(video)=>{
    const details=document.getElementById('modal-content')
    console.log(video)
    details.innerHTML = `
    <img src=${video.thumbnail}/>
    <p>${video.description}</p>
    `

    document.getElementById('customModal').showModal()
}
//fetch load & show categories on html

//create loadCategories
const loadCategories = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories))
    .catch((error) => console.log(error));
};
//create loadVideoCategories
const loadVideos = (searchText='') => {
  fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`)
    .then((res) => res.json())
    .then((data) => displayVideos(data.videos))
    .catch((error) => console.log(error));
};

// display videos
const displayVideos = (videos) => {
  const videocard = document.getElementById("videos");
  videocard.innerHTML=""

  if(videos.length==0){
    videocard.classList.remove('grid')
    videocard.innerHTML=`
    <div class="min-h-[200px] flex flex-col gap-5 justify-center items-center">

    <img src="./assets/Icon.png"/>
    <h1 class="font-bold text-xl text-black text-center">Oops!! Sorry, There is no <br> content here</h1>
    </div>
    `
    return 
  }
  else{
    videocard.classList.add('grid')
  }
  videos.forEach((video) => {
    console.log(video);
    const card = document.createElement("div");
    card.classList='card card-compact '

    card.innerHTML = `
            <figure class='h-[200px] relative'>
             <img
               src=${video.thumbnail}
               class="h-full w-full object-cover"
               alt="Shoes" />
                ${
                    video.others.posted_date?.length==0 ?"":`<span class="absolute text-xs text-white right-2 bottom-2 bg-black rounded-sm px-3"> ${time(video.others.posted_date)} </span>`
                }
               
            </figure>
            <div class="px-0 py-2 flex gap-2">
             <div>
                    <img
                    class='h-10 w-10 rounded-full object-cover'
                     src=${video.authors[0].profile_picture}
                    />
                    
              </div>
              <div>
                    <h2 class="font-bold">${video.title}</h2>

                    <div class="flex gap-2">
                    <p class="text-gray-400">${video.authors[0].profile_name}</p>
                     ${video.authors[0].verified === true ? ' <img  class="w-4 " src=" https://img.icons8.com/?size=40&id=41816&format=png"  />' :""}
                    </div>
                    
                    <p><button onclick="videoDescrip('${video.video_id}')" class="btn btn-xs btn-error">Details</button></p>
              </div>
              
            </div>
        `;
        
        videocard.append(card)
  });
};



// loadcategories video by id
const loadCategoriesVideo=(id)=>{
    //alert(id)

    //fetch for categories id
    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then((res) => res.json())
    .then((data) =>{
        
        revomeActiveClass()
        const activeBtn=document.getElementById(`btn-${id}`)
        activeBtn.classList.add('active')
        displayVideos(data.category)
    })
    .catch((error) => console.log(error));
}
//create displayCategories
const displayCategories = (categories) => {
  const categoryList = document.getElementById("categories");
  categories.forEach((element) => {
    console.log(element);

    //create a button
    const buttoncontainer = document.createElement("div");

    buttoncontainer.innerHTML=`
    <button id="btn-${element.category_id}" onclick="loadCategoriesVideo(${element.category_id})" class="btn category-btn">${element.category}</button>
    `
    //add btn categories
    categoryList.appendChild(buttoncontainer);
  });
};

document.getElementById('search-input').addEventListener('keyup', function(event){
    loadVideos(event.target.value)
})
loadCategories();
loadVideos();
