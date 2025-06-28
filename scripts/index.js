//? Load all news from the API and display them in the news container
const loadAllNews = async () => {
    try {
        const response = await fetch('https://openapi.programming-hero.com/api/retro-forum/posts');
        if (!response.ok) {
        throw new Error('Network response was not ok');
        }
        const newsData = await response.json();
        const allNews = newsData.posts;
        // console.log("🚀 ~ loadAllNews ~ allNews:", allNews)
        const newsContainer = document.getElementById('news-container');
        
        allNews.forEach((news) => {
        // console.log("🚀 ~ allNews.forEach ~ news:", news)
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
                      class="btn cursor-pointer bg-[#10B981] text-white rounded-full w-[28px] h-[28px]"
                    >
                      <i class="fa-solid fa-envelope-open-text"></i>
                    </button>
                  </div>
                </div>
            `;
            newsContainer.appendChild(newsElement);        
        });
    } catch (error) {
        console.error('Error fetching news:', error);
    }
}
//? Call the function to load news when the page loads
window.onload = () => {
    loadAllNews();
}
