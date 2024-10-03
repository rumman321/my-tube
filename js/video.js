console.log("added");

//convert number into the hour minute second
const time=(time)=>{
    const hour=parseInt(time/3600)
    let remainingSecond=time%3600
    const minute=parseInt(remainingSecond/60)
    remainingSecond = parseInt(remainingSecond/60)
    
    return `${hour}h ${minute}min ${remainingSecond}sec`
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
const loadVideos = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then((res) => res.json())
    .then((data) => displayVideos(data.videos))
    .catch((error) => console.log(error));
};

// display videos
const displayVideos = (videos) => {
  const videocard = document.getElementById("videos");
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
                    
                    <p></p>
              <div>
              
            </div>
        `;
        
        videocard.append(card)
  });
};
//create displayCategories
const displayCategories = (categories) => {
  const categoryList = document.getElementById("categories");
  categories.forEach((element) => {
    console.log(element);

    //create a button
    const button = document.createElement("button");

    button.classList = "btn";
    button.innerText = element.category;
    //add btn categories
    categoryList.appendChild(button);
  });
};
loadCategories();
loadVideos();
