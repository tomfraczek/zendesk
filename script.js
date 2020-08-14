document.addEventListener("DOMContentLoaded", function() {

    const categoryButtons = document.querySelectorAll('.action');
    const submenu = document.querySelectorAll('.submenu');
    const innerList = document.querySelectorAll('.inner-list');
    const hifi = document.querySelector('#hifiButton');
    const hifioDrop = document.querySelector('#hiFiDrop');
    const show = document.querySelector('.show');
    const showSubmenu = document.querySelector('.show-submenu');
console.log(hifi)
    // for (let i = 0; i <= innerList.length; i++){
    //     innerList[i].addEventListener('click', (e) => {
    //         e.preventDefault();
    //         console.log(e.target);
    //         const list = e.target.parentElement.nextElementSibling;
    //         list.classList.toggle('show');
    //         // const list = e.target.parentElement.nextElementSibling;
    //         // list.classList.toggle('show');
    //     })
    // }

    hifi.addEventListener('click', (e) => {
        e.preventDefault()
        if(show) show.classList.remove('show');
        hifioDrop.classList.toggle('show');
    })

    for (let i = 0; i <= submenu.length; i++){
        submenu[i].addEventListener('click', (e) => {
            e.preventDefault();
            if(showSubmenu) showSubmenu.classList.remove('show');
            const list = e.target.parentElement.nextElementSibling;
            list.classList.toggle('show-submenu');
        })
    }

    // for (let i = 0; i <= categoryButtons.length; i++){
    //     categoryButtons[i].addEventListener('click', (e) => {
    //         e.preventDefault();
    //         const list = e.target.parentElement.nextElementSibling;
    //         list.classList.toggle('show');
    //         console.log(innerList);
    //         console.log(categoryButtons);
    //     })
    // }

    console.log('innerList');
    console.log(categoryButtons);


    //
    // document.querySelector("#hifi").addEventListener("click", (e) => {
    //     e.preventDefault();
    //     document.querySelector("#drop").classList.toggle("show");
    //     // e.target.parentElement.nextElementSibling.classList.toggle("show");
    //     // console.log(e.target.parentElement.nextElementSibling);
    // });


    function featuredArticles(data) {
        const articles = data;
        const articlesContainer = document.querySelector("#promotedArticlesList");

        for (let i = 0; i < articles.length; i++) {
            const sectionListElement = document.createElement("li");
            sectionListElement.setAttribute("class", "list-element--item");

            const sectionListElementSectionWrapper = document.createElement("div");
            sectionListElementSectionWrapper.setAttribute("class", "list-element--item__section-wrapper");

            const sectionListElementSectionCattegoryLink = document.createElement("a");
            sectionListElementSectionCattegoryLink.setAttribute("href",articles[i].section.section_url);
            const sectionListElementSectionCattegoryTitle = document.createTextNode(articles[i].section.section_name);
            sectionListElementSectionCattegoryLink.appendChild(sectionListElementSectionCattegoryTitle);

            const categoryListElementSectionCattegoryLink = document.createElement("a");
            categoryListElementSectionCattegoryLink.setAttribute("href",articles[i].category.category_url);
            const categoryListElementSectionCattegoryTitle = document.createTextNode(articles[i].category.category_name);
            categoryListElementSectionCattegoryLink.appendChild(categoryListElementSectionCattegoryTitle);

            const sectionListElementLink = document.createElement("a");
            sectionListElementLink.setAttribute("class", "recent-activity-item-link article-link");
            sectionListElement.appendChild(sectionListElementLink);
            sectionListElementLink.setAttribute("href", articles[i].html_url);
            const sectionName = document.createTextNode(articles[i].title);
            sectionListElementLink.appendChild(sectionName);

            sectionListElementSectionWrapper.appendChild(sectionListElementSectionCattegoryLink);
            sectionListElementSectionWrapper.appendChild(categoryListElementSectionCattegoryLink);
            sectionListElement.prepend(sectionListElementSectionWrapper);
            articlesContainer.appendChild(sectionListElement);
        }
    }

    function recentActivity(data){
        const articles = data;
        const articlesContainer = document.querySelector("#recentActivityList");

        for (let i = 0; i < articles.length; i++) {
            const sectionListElement = document.createElement("li");
            sectionListElement.setAttribute("class", "list-element--item");

            const sectionListElementSectionWrapper = document.createElement("div");
            sectionListElementSectionWrapper.setAttribute("class", "list-element--item__section-wrapper");

            const sectionListElementSectionCattegoryLink = document.createElement("a");
            sectionListElementSectionCattegoryLink.setAttribute("href",articles[i].section.section_url);
            const sectionListElementSectionCattegoryTitle = document.createTextNode(articles[i].section.section_name);
            sectionListElementSectionCattegoryLink.appendChild(sectionListElementSectionCattegoryTitle);

            const categoryListElementSectionCattegoryLink = document.createElement("a");
            categoryListElementSectionCattegoryLink.setAttribute("href",articles[i].category.category_url);
            const categoryListElementSectionCattegoryTitle = document.createTextNode(articles[i].category.category_name);
            categoryListElementSectionCattegoryLink.appendChild(categoryListElementSectionCattegoryTitle);

            const sectionListElementLink = document.createElement("a");
            sectionListElementLink.setAttribute("class", "recent-activity-item-link");
            sectionListElement.appendChild(sectionListElementLink);
            sectionListElementLink.setAttribute("href", articles[i].html_url);
            const sectionName = document.createTextNode(articles[i].title);
            sectionListElementLink.appendChild(sectionName);

            sectionListElementSectionWrapper.appendChild(sectionListElementSectionCattegoryLink);
            sectionListElementSectionWrapper.appendChild(categoryListElementSectionCattegoryLink);
            sectionListElement.prepend(sectionListElementSectionWrapper);
            articlesContainer.appendChild(sectionListElement);
        }
    }

    function showMorePager(e){
        e.preventDefault();
        let articlesContainer = e.target.id === 'morePromoted' ? document.querySelector('#promotedArticles') : document.querySelector('#recentActivity');
        let containerHeight = articlesContainer.clientHeight;
        articlesContainer.setAttribute('style', 'height:'+ (containerHeight + 445) +'px; overflow: hidden;');
    }

    function promotedArticlesPagination(){
        let promotedArticlesContainer = document.querySelector('#promotedArticles');
        let recentActivityContainer = document.querySelector('#recentActivity');
        let moreFeaturedButton = document.querySelector('#morePromoted');
        let moreRecentButton = document.querySelector('#moreRecent');

        if(promotedArticlesContainer.getElementsByTagName("li").length > 5){
            promotedArticlesContainer.setAttribute('style', 'height:445px; overflow: hidden;');
            moreFeaturedButton.classList.remove('hidden');
            moreFeaturedButton.addEventListener('click', showMorePager);
        }

        if(recentActivityContainer.getElementsByTagName("li").length > 5){
            recentActivityContainer.setAttribute('style', 'height:445px; overflow: hidden;');
            moreRecentButton.classList.remove('hidden');
            moreRecentButton.addEventListener('click', showMorePager);
        }
    }

    function showPromotedArticles(){
        const spinner = document.querySelector('#spinner');
        let articlesContainer = document.querySelector('#articlesContent');

        spinner.classList.add('hidden');
        articlesContainer.classList.remove('hidden');
        promotedArticlesPagination();
    }



    //STARTS HERE
    function getData() {
        fetch('https://tests-lgbq5pa-k7iiozsvfd2ao.eu-2.platformsh.site/en/api/v2/zendesk-articles')
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                featuredArticles(data.promotedArticles);
                recentActivity(data.allArticles);
                showPromotedArticles();
            });
    }


    getData();
});
