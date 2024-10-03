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
/**
 * "status": true,
  "message": "successfully fetched all the videos",
  "videos": [
    {
      "category_id": "1001",
      "video_id": "aaaa",
      "thumbnail": "https://i.ibb.co/L1b6xSq/shape.jpg",
      "title": "Shape of You",
      "authors": [
        {
          "profile_picture": "https://i.ibb.co/D9wWRM6/olivia.jpg",
          "profile_name": "Olivia Mitchell",
          "verified": ""
        }
      ],
      "others": {
        "views": "100K",
        "posted_date": "16278"
      },
 */
const videos = (video) => {
  const videoCard = inputEl("videosSection");
  video.forEach((vid) => {
    const div = document.createElement('div');
    div.innerHTML =`
       <div class="card card-compact bg-base-100 shadow-xl">
            <figure class = "h-[200px]">
               <img class="object-cover" src=${vid.thumbnail}/>
            </figure>
         <div class="card-body flex flex-row">
              <div class="">
                <img class="w-10 h-10 rounded-full object-cover" src=${vid.authors[0].profile_picture} />
              </div>
              <div>
                <h1>${vid.title}</h1>
                <h1>${vid.authors[0].profile_name}</h1>
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
