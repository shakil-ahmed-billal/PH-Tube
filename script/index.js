// extarnal function
const time = (time) =>{
  const newTime = parseInt(time / 3600) ;
  const newSecond = parseInt(time % 3600)
  const minute = parseInt(newSecond / 60);
  const perSecund = newSecond % 60 ; 
  return `${newTime}hr ${minute}mi ${perSecund}sec `
}
function activeBtns(){
  const button = document.getElementsByClassName('cat-button')
  for(const btn of button){
    console.log(btn);
    btn.classList.remove('active')
  }
}
// extarnal function
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
const category_video = (id) => {
  console.log(id);
  fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
  .then((res)=> res.json())
  .then((data)=> {

    // all button are class remove function
    activeBtns()
    // only get id add class function
    const activeBtn = document.getElementById(`btn-${id}`) 
    activeBtn.classList.add('active')

    // pass display card section.
    videos(data.category)
  })
}

const showDetails = async(id) => {
  const url = `https://openapi.programming-hero.com/api/phero-tube/video/${id}`
  const res = await fetch(url)
  const data = await res.json()
  showVideosDetails(data.video)
  
}
const showVideosDetails = (videos) =>{
  console.log(videos);
  const modal = document.getElementById('customModal')
  modal.innerHTML =`
  <div id="modal-box" class="modal-box">
    <h3 class="text-lg font-bold">Hello!</h3>
    <p class="py-4">Press ESC key or click the button below to close</p>
    <div class="modal-action">
      <form method="dialog">
        <!-- if there is a button in form, it will close the modal -->
        <button class="btn">Close</button>
      </form>
    </div>
  </div>`
  modal.showModal()

}
// API Get section end ..................................




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
// display videos section....
const videos = (video) => {
  const videoCard = inputEl("videosSection");
  videoCard.innerHTML = "";
  if(video.length == 0){
    videoCard.innerHTML=`
    <h1>No more conteint</h1>`
  }
  else{

    // videos element card section
    video.forEach((vid) => {
      const div = document.createElement('div');
      div.innerHTML =`
         <div class="card card-compact bg-base-100 shadow-xl">
              <figure class = "h-[200px] relative">
                 <img class="h-full w-full object-cover" src=${vid.thumbnail}/>
                 ${vid.others.posted_date == 0? "": `<h1 class=" absolute bg-gray-800 text-white rounded-3xl px-2 right-2 bottom-2" >${time(vid.others.posted_date)}</h1>`}
              </figure>
           <div class="l card flex flex-row p-3">
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
                <div class="">
                  <button onclick="showDetails('${vid.video_id}')" class="btn bg-red-500 text-white">Details</button>
                </div>
           </div>
         </div>`
          ;
  
      videoCard.appendChild(div);
    });
  }


};
// category button section
const displayCategories = (categories) => {
  const buttonSection = inputEl("categories");
  categories.forEach((items) => {
    const button = document.createElement("button");
    button.innerHTML = `
        <button id="btn-${items.category_id}" onclick="category_video(${items.category_id})" class="btn cat-button" >${items.category}</button>
        `;

    buttonSection.appendChild(button);
  });
};
usersVideos();
categories();
