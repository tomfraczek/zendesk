document.addEventListener('DOMContentLoaded', function() {


    function showPromotedArticles(){
        const spinner = document.querySelector('#spinner');
        const promoContainer = document.querySelector('#promotedArticles');

        spinner.classList.add('hidden');
        promoContainer.classList.remove('hidden');
    }

    function articlesDOM (articles){
        const articlesContainer = document.querySelector('#promotedArticlesList');

        for(let i = 0; i < articles.length; i++) {

            const sectionListElement = document.createElement("li");
            sectionListElement.setAttribute('data-id', articles[i].section_id);
            sectionListElement.setAttribute('class', 'list-element--item');
            const sectionListElementLink = document.createElement("a");
            sectionListElementLink.setAttribute('class', 'recent-activity-item-link');
            sectionListElement.appendChild(sectionListElementLink);
            sectionListElementLink.setAttribute('href', articles[i].html_url);
            const articleName = document.createTextNode(articles[i].name);
            sectionListElementLink.appendChild(articleName);

            articlesContainer.appendChild(sectionListElement);

        }
    }

    function sectionsDOM(sections){
        const articleListElement = document.querySelectorAll('.list-element--item');

        for(let i = 0; i < articleListElement.length; i++){

            let result = sections.find(obj => {
                return obj.id === parseInt(articleListElement[i].dataset.id)
            });

            if(result === undefined){
                getData();
            }

            const breadcrumb = document.createElement("div");
            breadcrumb.setAttribute('class', 'breadcrumbs-wrapper');
            breadcrumb.setAttribute('id', 'breadcrumbsWrapper');
            const sectionLink = document.createElement("a");
            sectionLink.setAttribute('href', result.html_url);
            sectionLink.setAttribute('class', 'breadcrumb-element breadcrumb-category');
            breadcrumb.appendChild(sectionLink);
            const sectionName = document.createTextNode(result.name);
            sectionLink.appendChild(sectionName);
            articleListElement[i].setAttribute('data-category', result.category_id);
            articleListElement[i].appendChild(breadcrumb);
            const arrowWrapper = document.createElement("span");
            arrowWrapper.setAttribute('class', 'arrow-separator');
            const arrow = document.createTextNode('>');
            arrowWrapper.appendChild(arrow);
            breadcrumb.appendChild(arrowWrapper);
        }
    }

    function categoriesDOM(categories){
        const articleListElement = document.querySelectorAll('.list-element--item');
        const breadcrumb = document.querySelectorAll('.breadcrumbs-wrapper');
        for(let i = 0; i < breadcrumb.length; i++){

            let result = categories.find(obj => {
                return obj.id === parseInt(articleListElement[i].dataset.category)
            });

            const sectionLink = document.createElement("a");
            sectionLink.setAttribute('href', result.html_url);
            sectionLink.setAttribute('class', 'breadcrumb-element breadcrumb-category');
            const sectionName = document.createTextNode(result.name);
            sectionLink.appendChild(sectionName);
            breadcrumb[i].appendChild(sectionLink);


            if (i === breadcrumb.length - 1){
                showPromotedArticles();
            }
        }
    }


    function getArticles(data){
        let articles = [];
        if(data.page_count > 1){


            for(let i = 1; i < data.page_count + 1; i++){

                let url = 'https://techsupport.cambridgeaudio.com/api/v2/help_center/en-us/articles.json?page='+ i +'&per_page=100';
                fetch(url)
                    .then((resp) => resp.json()) // Transform the data into json
                    .then(function(data) {

                        if(data){
                            for(let i = 0; i < data.articles.length; i++){
                                if(data.articles[i].promoted === true && data.articles[i].draft === false){
                                    articles.push(data.articles[i]);
                                    console.log(data.articles[i]);
                                }

                            }
                            setTimeout(function(){
                                if (i === data.page_count){
                                    articlesDOM(articles)

                                }},500);
                        }else{

                        }
                    });

            }

        } else {
            for(let i = 0; i < data.articles.length; i++){
                articles.push(data.articles[i]);
            }
        }
    }

    function getSections(){
        let sections = [];
        let url = 'https://techsupport.cambridgeaudio.com/api/v2/help_center/en-us/sections.json?page=1&per_page=100';
        fetch(url)
            .then((resp) => resp.json()) // Transform the data into json
            .then(function(data) {
                if(data.page_count > 1){
                    for(let i = 1; i < data.page_count + 1; i++){
                        let url = 'https://techsupport.cambridgeaudio.com/api/v2/help_center/en-us/sections.json?page='+ i +'&per_page=100';
                        fetch(url)
                            .then((resp) => resp.json()) // Transform the data into json
                            .then(function(data) {

                                for(let i = 0; i < data.sections.length; i++){
                                    sections.push(data.sections[i]);
                                }
                                setTimeout(function(){
                                    if (i === data.page_count){
                                        sectionsDOM(sections)
                                        getCategories();

                                    }},500);
                            });
                    }
                } else {
                    for(let i = 0; i < data.sections.length; i++){
                        sections.push(data.sections[i]);
                        getCategories();
                    }
                }
            });

    }

    function getCategories(){
        let categories = [];
        let url = 'https://techsupport.cambridgeaudio.com/api/v2/help_center/en-us/categories.json?page=1&per_page=100';
        fetch(url)
            .then((resp) => resp.json()) // Transform the data into json
            .then(function(data) {

                if(data.page_count > 1){
                    for(let i = 2; i < data.page_count; i++){

                        let url = 'https://techsupport.cambridgeaudio.com/api/v2/help_center/en-us/categories.json?page='+ i +'&per_page=100';
                        fetch(url)
                            .then((resp) => resp.json()) // Transform the data into json
                            .then(function(data) {
                                console.log(data);

                                for(let i = 0; i < data.categories.length; i++){
                                    categories.push(data.categories[i]);
                                }
                                setTimeout(function(){
                                    if (i === data.page_count){
                                        // console.log(categories);
                                        categoriesDOM(categories);

                                    }},500);
                            });
                    }
                } else {
                    for(let i = 0; i < data.categories.length; i++){
                        categories.push(data.categories[i]);
                        setTimeout(function(){
                            if (i === data.categories.length - 1){
                                categoriesDOM(categories);

                            }},500);
                    }
                }
            });

    }


//STARTS HERE
    function getData() {


        const articleContainer = document.querySelector('#promotedArticles');
        const sectionList = document.createElement("ul");
        sectionList.setAttribute('id', 'promotedArticlesList');
        sectionList.setAttribute('class', 'promoted-articles-list');

        articleContainer.appendChild(sectionList);
        // console.log(document.querySelector('#promotedArticlesList'));

        let articlesCall = fetch("https://techsupport.cambridgeaudio.com/api/v2/help_center/en-us/articles.json?page=1&per_page=100");
        let sectionsCall = fetch("https://techsupport.cambridgeaudio.com/api/v2/help_center/en-us/sections.json");


        Promise.all([articlesCall, sectionsCall])
            .then(values => Promise.all(values.map(value => value.json())))
            .then(finalVals => {

                let articlesApiResp = finalVals[0];
                let sectionsApiResp = finalVals[1];



                getArticles(articlesApiResp);
                getSections(sectionsApiResp);


            });
    }


    getData();
});