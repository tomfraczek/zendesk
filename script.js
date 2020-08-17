document.addEventListener("DOMContentLoaded", function() {

    const hifi = document.querySelector("#hifiButton");
    const preList = document.querySelector("#preList").scrollHeight;
    const catWrapper = document.querySelector("#homepageCatWrapper");
    const hiFiDropdown = document.querySelector("#hiFiDrop");
    const hiFiDefault = hiFiDropdown.scrollHeight;
    const hifiButtonTitle = document.querySelector('#hifiButtonTitle');
    const submenu = document.querySelectorAll('.submenu');
    const submenuSmall = document.querySelectorAll('.submenu-small');
    let valueForSmall;
    let foo;

    console.log(preList)

    hifi.addEventListener('click', (e) => {
        e.preventDefault()
        console.log(hiFiDropdown.offsetHeight);
        if(hiFiDropdown.offsetHeight !== 0){
            hiFiDropdown.style.height = 0;
            hifiButtonTitle.classList.remove('hifi-button-active');
        } else {
            hiFiDropdown.style.height = hiFiDropdown.scrollHeight + "px";
            hifiButtonTitle.classList.add('hifi-button-active');
        }
    })

    for (let i = 0; i <= submenu.length; i++){
        if(submenu[i]){

            submenu[i].addEventListener('click', (e) => {
                e.preventDefault();
                for (let i = 0; i <= submenu.length; i++){
                    console.log()
                    if(submenu[i]){
                        submenu[i].nextElementSibling.style.height = 0;
                        submenu[i].firstElementChild.classList.remove('hifi-button-active');
                        hiFiDropdown.style.height = hiFiDefault + "px";
                    }
                }

                // submenu[i].nextElementSibling.style.height = 0;
                if(e.target.parentElement.nextElementSibling.offsetHeight !== 0){
                    e.target.parentElement.nextElementSibling.style.height = 0;
                    hiFiDropdown.style.height = hiFiDefault + "px";
                } else {
                    e.target.parentElement.nextElementSibling.style.height = e.target.parentElement.nextElementSibling.scrollHeight + "px";
                    hiFiDropdown.style.height = (e.target.parentElement.nextElementSibling.scrollHeight + hiFiDefault) + "px";
                    e.target.classList.add('hifi-button-active');
                    valueForSmall = e.target.parentElement.nextElementSibling.scrollHeight + hiFiDefault;
                }
            })
        }
    }

    for (let i = 0; i <= submenuSmall.length; i++){
        if(submenuSmall[i]){

            submenuSmall[i].addEventListener('click', (e) => {
                e.preventDefault();

                // console.log(document.querySelector('#preList').scrollHeight);
                for (let i = 0; i <= submenuSmall.length; i++){
                    if(submenuSmall[i]){
                        submenuSmall[i].nextElementSibling.style.height = 0;
                        submenuSmall[i].firstElementChild.classList.remove('hifi-button-active');
                        // hiFiDropdown.style.height = hiFiDefault + "px";
                    }
                }

                if(e.target.parentElement.nextElementSibling.offsetHeight !== 0){
                    console.log('1')
                    e.target.parentElement.nextElementSibling.style.height = 0;
                    console.log(e.target.parentElement.parentElement.parentElement)
                    e.target.parentElement.parentElement.parentElement.style.height = preList + 'px';
                    hiFiDropdown.style.height = valueForSmall + "px";
                } else {
                    for (let i = 0; i <= submenu.length; i++){

                        if(submenu[i]){
                            if (submenu[i].firstElementChild.classList.contains('hifi-button-active')){
                                console.log('2.1')
                                console.log(hiFiDefault)
                                console.log(preList)
                                // hiFiDropdown.style.height = (hiFiDefault + preList) + 'px';

                                document.querySelector('#preList').style.height = (preList + e.target.parentElement.nextElementSibling.scrollHeight) + 'px;'
                                hiFiDropdown.style.height = (e.target.parentElement.nextElementSibling.scrollHeight + hiFiDefault + submenu[i].nextElementSibling.scrollHeight) + "px";
                            }
                        }
                    }
                    console.log('tomm');
                    e.target.parentElement.parentElement.parentElement.style.height = (preList + e.target.parentElement.nextElementSibling.scrollHeight) + 'px';
                    e.target.parentElement.nextElementSibling.style.height = e.target.parentElement.nextElementSibling.scrollHeight + "px";
                    e.target.classList.add('hifi-button-active');

                }
            })
        }
    }``

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
