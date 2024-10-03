// API Get section start ..................................
const categories = async () => {
  const url = "https://openapi.programming-hero.com/api/phero-tube/categories";
  const res = await fetch(url);
  const data = await res.json();
  displayCategories(data.categories);
};
const usersVideos = async () => {
  const url = "https://openapi.programming-hero.com/api/phero-tube/videos";
  const res = await fetch(url);
  const data = await res.json();
  videos(data.videos);
};
// API Get section end ..................................

// extarnal function
const time = (time) =>{
  const newTime = parseInt(time / 3600) ;
  const newSecond = parseInt(time % 3600)
  const minute = parseInt(newSecond / 60);
  const perSecund = newSecond % 60 ; 
  return `${newTime}hr${minute}mi${perSecund}sec `
}
// category_id: "1001",
//   video_id: "aaad",
//   thumbnail: "https://i.ibb.co/f9FBQwz/smells.jpg",
//   title: "Smells Like Teen Spirit",
//   authors: [
//     {
//       profile_picture: "https://i.ibb.co/k4tkc42/oliviar-harris.jpg",
//       profile_name: "Oliver Harris",
//       verified: true,
//     },
//   ],
//   others: {
//     views: "5.4K",
//     posted_date: "1672656000",
//   },
const videos = (video) => {
  const videoCard = inputEl("videosSection");
  video.forEach((vid) => {
    const div = document.createElement('div');
    div.innerHTML =`
       <div class="card card-compact bg-base-100 shadow-xl">
            <figure class = "h-[200px] relative">
               <img class="h-full w-full object-cover" src=${vid.thumbnail}/>
               <h1 class=" absolute bg-gray-800 text-white rounded-3xl px-2 right-2 bottom-2" >${time(vid.others.posted_date)}</h1>
            </figure>
         <div class="card flex flex-row p-3">
              <div class="">
                <img class="w-10 h-10 rounded-full object-cover" src=${vid.authors[0].profile_picture} />
              </div>
              <div class="ml-2">
                <h1 class="text-lg">${vid.title}</h1>
                <div class="flex font-bold">
                   <h1 class=''>${vid.authors[0].profile_name}</h1>
                   ${vid.authors[0].verified == true? `<img class="w-5 h-5 ml-2" src='https://img.icons8.com/?size=48&id=D9RtvkuOe31p&format=png'/>` :"" }
                </div>
              </div>
         </div>
       </div>`
        ;

    videoCard.appendChild(div);
  });
};

const displayCategories = (categories) => {
  const buttonSection = inputEl("categories");
  categories.forEach((items) => {
    const button = document.createElement("button");
    button.innerHTML = `
        <button class="btn" >${items.category}</button>
        `;

    buttonSection.appendChild(button);
  });
};

usersVideos();
categories();
