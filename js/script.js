const loadFunction = async(query=' ') =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts${query}`);
    // const url = `https://openapi.programming-hero.com/api/retro-forum${query}`;
    // console.log(url);
    const data = await res.json();
    // console.log(data)
    console.log(data.posts);
    displayFunction(data.posts);
}
const displayFunction = (posts) =>{
    // console.log(posts[0]);
    const allPostContainer = document.getElementById('all-post-container');
    allPostContainer.textContent = '';
    posts.forEach(post => {
        const newDiv = document.createElement('div');
        newDiv.classList = `bg-gray-200 rounded-2xl p-10 flex gap-x-4`;
        newDiv.innerHTML = `
            <div class="relative w-1/12">
                            <img class="rounded-2xl" src="${post.image}" alt="">
                            <span class="absolute top-0 right-0 w-5 h-5 bg-green-500 rounded-full border-2 border-white"></span>
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
                            <button class="btn ml-120 bg-gray-200">
                                <img src="images/inbox.png" alt="">
                            </button>
                            </div>
                        </div>
        `;
        allPostContainer.appendChild(newDiv);
    })
}
const handleSearch = () =>{
    const inputText = document.getElementById('input-text');;
    const inputValue = inputText.value;
    loadFunction(`?category=${inputValue}`);
    // console.log(`?category=${inputValue}`)
}

const loadLatestPost = async() =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/latest-posts`);
    const data = await res.json();
    displayLatestPost(data);
}
const displayLatestPost = (latestposts) => {
    // console.log(latestposts[0]);
    latestposts.forEach(post => {
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
                            <p class="text-xl">${post.author.posted_date}</p>
                        </div>
                        <h2 class="card-title font-bold text-2xl">${post.title}</h2>
                        <p>${post.description}</p>
                        <div class="flex gap-x-5">
                            <div class="w-8">
                                <img class="rounded-4xl" src="${post.profile_image}" alt="" srcset="">
                            </div>
                            <div>
                                <h1 class="font-bold">${post.author.name}</h1>
                                <p>${post.author.designation}</p>
                            </div>
                        </div>
                    </div>
        `;
        latestPostContainer.appendChild(newDiv);
    })
}

loadFunction('');
loadLatestPost();