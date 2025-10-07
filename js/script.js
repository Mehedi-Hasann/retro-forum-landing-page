const loadFunction = async(query='') =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts${query}`);
    // const url = `https://openapi.programming-hero.com/api/retro-forum${query}`;
    // console.log(url);
    const data = await res.json();
    displayFunction(data.posts);
}
const displayFunction = (posts) =>{
    // console.log(posts[0]);
    const allPostContainer = document.getElementById('all-post-container');
    allPostContainer.textContent = '';
    posts.forEach(post => {
        let color = 'bg-green-500';
        if(!post.isActive){
            color = 'bg-red-500';
        }
        const newDiv = document.createElement('div');
        newDiv.classList = `post-card overflow-hidden bg-gray-200 rounded-2xl p-10 flex gap-x-4`;
        newDiv.innerHTML = `
                        <div class="relative w-1/12">
                            <img class="rounded-2xl" src="${post.image}" alt="">
                            <span class="absolute top-0 right-0 w-5 h-5 ${color} rounded-full border-2 border-white"></span>
                        </div>

                        <!-- text content -->
                        <div class="flex flex-col gap-y-4">
                            <p>#${post.category}  Author : ${post.author.name}</p>
                            <h1 class="font-bold text-2xl">${post.title}</h1>
                            <p>${post.description}</p>
                            <hr>
                            <div class="flex">
                            <ul class="flex gap-x-15">
                                <li class="flex gap-x-2 items-center">
                                <img src="images/message-regular-full.svg" alt=""><p>${post.comment_count
}</p>
                                </li>
                                <li class="flex gap-x-2 items-center">
                                <img src="images/eye-regular-full.svg" alt=""><p>${post.view_count}</p>
                                </li>
                                <li class="flex gap-x-1 items-center">
                                <img src="images/clock-regular-full.svg" alt="">
                                <p class="flex gap-x-1"><span>${post.posted_time}</span> min</p>
                                </li>
                            </ul>
                            <button onclick="handleMarkRead(this,'${post.title.replace(/'/g,"\\'")}}','${post.view_count}')" class="selected-post btn ml-120 bg-gray-200">
                                <img src="images/inbox.png" alt="">
                            </button>
                            </div>
                        </div>
        `;
        allPostContainer.appendChild(newDiv);
        // console.log(newDiv)
    })
}
const handleSearch = () =>{
    const inputText = document.getElementById('input-text');;
    const inputValue = inputText.value;
    loadFunction(`?category=${inputValue}`);
    // console.log(`?category=${inputValue}`)
}
let count = 0;
const handleMarkRead = (btn,id,view) =>{
    count++;

    const newDiv = document.createElement('div');
    newDiv.classList = `flex justify-around gap-x-2 bg-white p-2 rounded-2xl items-center`;
    newDiv.innerHTML = `
        <p id="post-title" class="w-4/6">${id}</p>
                        <p id="post-view" class="w-5"><img src="images/eye-regular-full.svg" alt=""></p>
                        <p>${view}</p>
    `;
    const postContainer = document.getElementById('post-container');
    postContainer.appendChild(newDiv);
    
    const postCountText = document.getElementById('post-count');
    postCountText.innerText = count;

    const parentCard = btn.closest('.post-card');
    parentCard.classList.remove('bg-gray-200');
  parentCard.classList.add('bg-blue-200', 'border-2', 'border-[#797DFC]');
    

}

const loadLatestPost = async() =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/latest-posts`);
    const data = await res.json();
    displayLatestPost(data);
}
const displayLatestPost = (latestposts) => {
    // console.log(latestposts[0]);
    latestposts.forEach(post => {
        let date = post.author.posted_date;
        let designation = post.author.designation
        if(!date){
            date = 'No publish date';
        }
        if(!designation){
            designation = 'Unknown';
        }
        const latestPostContainer = document.getElementById('latest-post-container');
        const newDiv = document.createElement('div');
        newDiv.classList = `card bg-base-100 shadow-sm p-5`;
        newDiv.innerHTML = `
            <figure>
                        <img src="${post.cover_image}" alt="">
                    </figure>
                    <div class="card-body">
                        <div class="flex gap-x-3 items-center">
                            <i class="fa-regular fa-calendar text-3xl"></i>
                            <p class="text-xl">${date}</p>
                        </div>
                        <h2 class="card-title font-bold text-2xl">${post.title}</h2>
                        <p>${post.description}</p>
                        <div class="flex gap-x-5">
                            <div class="w-8">
                                <img class="rounded-4xl" src="${post.profile_image}" alt="" srcset="">
                            </div>
                            <div>
                                <h1 class="font-bold">${post.author.name}</h1>
                                <p>${designation}</p>
                            </div>
                        </div>
                    </div>
        `;
        latestPostContainer.appendChild(newDiv);
    })
}

loadFunction('');
// loadLatestPost();

