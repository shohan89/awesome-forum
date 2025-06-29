//? Load all news from the API and display them in the news container
const loadAllNews = async (catId) => {
    try {
        const response = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts?category=${catId}`);
        if (!response.ok) {
        throw new Error('Network response was not ok');
        }
        const newsData = await response.json();
        const allNews = newsData.posts;
        const newsContainer = document.getElementById('news-container');
        newsContainer.innerHTML = '';
        const errorContainer = document.getElementById('no-news-error');
        errorContainer.innerHTML = '';

        if(!allNews.length){
          const div = document.createElement('div');
          div.innerHTML = `
            <div role="alert" class="alert alert-error">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6 shrink-0 stroke-current"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>Ops! No News Found.</span>
              </div>
          `;
          errorContainer.appendChild(div);
        }
        else{
          allNews.forEach((news) => {
            const newsElement = document.createElement('div');
            newsElement.classList = `news-wrapper w-[772px] bg-purple-100 border-1 border-purple-600 rounded-xl p-5 flex justify-start gap-4 shadow-xl mb-4`;

            newsElement.innerHTML = `
                <!-- News Thumb -->
                <div class="news-thumb relative">
                  <img class='w-24 h-24 rounded-lg' src="${news.image}" alt="${news.title}" />
                  <img
                    class="absolute top-0 right-0"
                    src="${news.isActive ? '../assets/Status-Active.png' : '../assets/Status-Inactive.png'}"
                    alt=""
                  />
                </div>
                <!-- News Content -->
                <div class="content-wrapper">
                  <div class="news-header mb-3">
                    <ul class="flex gap-4">
                      <li>#${news.category}</li>
                      <li>Author: ${news.author.name}</li>
                    </ul>
                  </div>
                  <div class="news-content">
                    <h3 class="text-xl text-[#12132D] font-bold mb-3">
                      ${news.title}
                    </h3>
                    <p class="text-base text-[#12132D9F] mb-3">
                      ${news.description.length > 50 ? news.description.slice(0, 50) + ' ...' : news.description}
                    </p>
                  </div>
                  <hr
                    class="border-t-1 border-dashed border-[#12132D9F] mb-3"
                  />
                  <div class="news-footer flex justify-between">
                    <div class="icons">
                      <i class="fa-regular fa-message text-[#12132D9F]"></i>
                      <span class="text-[#12132D9F] mr-4">${news.comment_count}</span>
                      <i class="fa-regular fa-eye text-[#12132D9F]"></i>
                      <span class="text-[#12132D9F] mr-4">${news.view_count}</span>
                      <i class="fa-regular fa-clock text-[#12132D9F]"></i>
                      <span class="text-[#12132D9F] mr-4">${news.posted_time}</span>
                    </div>
                    <button
                      onclick="addTitleToSidebar('${news.title}', ${news.view_count})"
                      class="btn cursor-pointer bg-[#10B981] text-white rounded-full w-[28px] h-[28px]"
                    >
                      <i class="fa-solid fa-envelope-open-text"></i>
                    </button>
                  </div>
                </div>
            `;
            newsContainer.appendChild(newsElement);        
        });
        }
    } catch (error) {
        console.error('Error fetching news:', error);
    }
}

// Handle Search
const handleSearch = () => {
  const searchField = document.getElementById('search');
  const searchText = searchField.value;
  if( searchText ){
    loadAllNews(searchText);
  }
  else{
    alert('Please enter a valid category name.');
  }
}

//? add event handler to the button and after clicking the button the title will add on the sidebar
const sideBarContainer = document.getElementById('side-bar-container');
let markAsReadCount = 0;
const addTitleToSidebar = (title, viewCount) => {
    markAsReadCount++;
    const titleElement = document.createElement('div');
    titleElement.classList = 'side-bar-content bg-[#12132d17] p-5 rounded-xl shadow-lg';
    titleElement.innerHTML = `
        <div class="content-header flex justify-between mb-4">
                <h5 class="text-xl font-bold">Title</h5>
                <p>Mark as read (${markAsReadCount})</p>
              </div>
              <!-- News Content -->
              <div
                class="flex justify-between items-center bg-white p-4 rounded-lg mb-4"
              >
                <h5 class="text-base font-semibold">
                  ${title}
                </h5>
                <i class="fa-regular fa-eye pr-2"></i>
                <span>${viewCount}</span>
              </div>
            </div>
    `;
    sideBarContainer.appendChild(titleElement);
}

//? Load all posts and display to the ui
const loadAllPosts = async () => {
  try {
    const res = await fetch('https://openapi.programming-hero.com/api/retro-forum/latest-posts');
    if(!res.ok){
      throw new Error('Network response is not ok.');
    }
    const allPosts = await res.json();
    const blogContainer = document.getElementById('blog-card-container');
    allPosts.forEach(post=>{
      const postCardDiv = document.createElement('div');
      postCardDiv.classList = 'blog-wrapper w-[374px] border-2 border-[#12132d34] rounded-[24px] p-5';
      postCardDiv.innerHTML = `
        <img class='rounded-lg' src="${post.cover_image}" alt="${post.title}" />
            <div class="blog-content my-5">
              <i class="fa-regular fa-calendar"></i>
              <span>${post.author.posted_date ? post.author.posted_date : 'Unknown'}</span>
              <h4 class="text-lg font-extrabold my-3">
                ${post.title}
              </h4>
              <p class="text-base text-[#12132d9f]">
                ${post.description}
              </p>
            </div>
            <div class="blog-footer flex justify-start gap-5 items-center">
              <img class='w-10 h-10 rounded-full' src="${post.profile_image}" alt="" />
              <div class="author-details">
                <h4 class="text-base font-bold">${post.author.name}</h4>
                <p class="text-[14px] text-[#12132d9f]">${post.author.designation ? post.author.designation : 'Unknown'}</p>
              </div>
            </div>
      `;
      blogContainer.appendChild(postCardDiv);
    })
  } catch (error) {
    console.error('Error fetching news:', error);
  }
}


//? Call the function to load news when the page loads
window.onload = () => {
  loadAllNews('comedy');
  loadAllPosts();
}
