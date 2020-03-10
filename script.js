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


    // function getArticles(data){
    //     let articles = [];
    //     if(data.page_count > 1){
    //
    //
    //         for(let i = 1; i < data.page_count + 1; i++){
    //
    //             let url = 'https://audiopartnership1571922554.zendesk.com/api/v2/help_center/en-us/articles.json?page='+ i +'&per_page=100';
    //             fetch(url)
    //                 .then((resp) => resp.json()) // Transform the data into json
    //                 .then(function(data) {
    //
    //                     if(data){
    //                         for(let i = 0; i < data.articles.length; i++){
    //                             if(data.articles[i].promoted === true && data.articles[i].draft === false){
    //                                 articles.push(data.articles[i]);
    //                                 console.log(data.articles[i]);
    //                             }
    //
    //                         }
    //                         setTimeout(function(){
    //                             if (i === data.page_count){
    //                                 articlesDOM(articles)
    //
    //                             }},500);
    //                     }else{
    //
    //                     }
    //                 });
    //
    //         }
    //
    //     } else {
    //         for(let i = 0; i < data.articles.length; i++){
    //             articles.push(data.articles[i]);
    //         }
    //     }
    // }

    // function getSections(){
    //     let sections = [];
    //     let url = 'https://audiopartnership1571922554.zendesk.com/api/v2/help_center/en-us/sections.json?page=1&per_page=100';
    //     fetch(url)
    //         .then((resp) => resp.json()) // Transform the data into json
    //         .then(function(data) {
    //             if(data.page_count > 1){
    //                 for(let i = 1; i < data.page_count + 1; i++){
    //                     let url = 'https://audiopartnership1571922554.zendesk.com/api/v2/help_center/en-us/sections.json?page='+ i +'&per_page=100';
    //                     fetch(url)
    //                         .then((resp) => resp.json()) // Transform the data into json
    //                         .then(function(data) {
    //
    //                             for(let i = 0; i < data.sections.length; i++){
    //                                 sections.push(data.sections[i]);
    //                             }
    //                             setTimeout(function(){
    //                                 if (i === data.page_count){
    //                                     sectionsDOM(sections)
    //                                     getCategories();
    //
    //                                 }},500);
    //                         });
    //                 }
    //             } else {
    //                 for(let i = 0; i < data.sections.length; i++){
    //                     sections.push(data.sections[i]);
    //                     getCategories();
    //                 }
    //             }
    //         });
    //
    // }

    // function getCategories(){
    //     let categories = [];
    //     let url = 'https://audiopartnership1571922554.zendesk.com/api/v2/help_center/en-us/categories.json?page=1&per_page=100';
    //     fetch(url)
    //         .then((resp) => resp.json()) // Transform the data into json
    //         .then(function(data) {
    //
    //             if(data.page_count > 1){
    //                 for(let i = 2; i < data.page_count; i++){
    //
    //                     let url = 'https://audiopartnership1571922554.zendesk.com/api/v2/help_center/en-us/categories.json?page='+ i +'&per_page=100';
    //                     fetch(url)
    //                         .then((resp) => resp.json()) // Transform the data into json
    //                         .then(function(data) {
    //                             console.log(data);
    //
    //                             for(let i = 0; i < data.categories.length; i++){
    //                                 categories.push(data.categories[i]);
    //                             }
    //                             setTimeout(function(){
    //                                 if (i === data.page_count){
    //                                     // console.log(categories);
    //                                     categoriesDOM(categories);
    //
    //                                 }},500);
    //                         });
    //                 }
    //             } else {
    //                 for(let i = 0; i < data.categories.length; i++){
    //                     categories.push(data.categories[i]);
    //                     setTimeout(function(){
    //                         if (i === data.categories.length - 1){
    //                             categoriesDOM(categories);
    //
    //                         }},500);
    //                 }
    //             }
    //         });
    //
    // }


//STARTS HERE
    function getData() {

        return {
            "allArticles": [
                {
                    "id": 360003390737,
                    "url": "https://audiopartnership1571922554.zendesk.com/api/v2/help_center/en-us/articles/360003390737-first-article.json",
                    "html_url": "https://audiopartnership1571922554.zendesk.com/hc/en-us/articles/360003390737-first-article",
                    "author_id": 367927678998,
                    "comments_disabled": false,
                    "draft": false,
                    "promoted": false,
                    "position": 0,
                    "vote_sum": 0,
                    "vote_count": 0,
                    "section_id": 360000899717,
                    "created_at": "2019-11-06T11:12:18Z",
                    "updated_at": "2020-03-09T10:07:41Z",
                    "name": "first article",
                    "title": "first article",
                    "source_locale": "en-us",
                    "locale": "en-us",
                    "outdated": false,
                    "outdated_locales": [],
                    "edited_at": "2019-11-06T11:12:42Z",
                    "user_segment_id": null,
                    "permission_group_id": 204358,
                    "label_names": [],
                    "body": "<p>sadsadsadsda asdsa </p>",
                    "section": {
                        "id": 360000899717,
                        "url": "https://audiopartnership1571922554.zendesk.com/api/v2/help_center/en-us/sections/360000899717-Additional-info.json",
                        "html_url": "https://audiopartnership1571922554.zendesk.com/hc/en-us/sections/360000899717-Additional-info",
                        "category_id": 360000429177,
                        "position": 0,
                        "sorting": "manual",
                        "created_at": "2019-10-31T11:03:03Z",
                        "updated_at": "2020-03-09T10:07:41Z",
                        "name": "Additional info",
                        "description": "",
                        "locale": "en-us",
                        "source_locale": "en-us",
                        "outdated": false,
                        "parent_section_id": null,
                        "theme_template": "section_page"
                    },
                    "category": {
                        "id": 360000429177,
                        "url": "https://audiopartnership1571922554.zendesk.com/api/v2/help_center/en-us/categories/360000429177-Other.json",
                        "html_url": "https://audiopartnership1571922554.zendesk.com/hc/en-us/categories/360000429177-Other",
                        "position": 0,
                        "created_at": "2019-10-31T11:02:22Z",
                        "updated_at": "2020-03-09T10:07:41Z",
                        "name": "Other",
                        "description": "",
                        "locale": "en-us",
                        "source_locale": "en-us",
                        "outdated": false
                    }
                },
                {
                    "id": 360003370677,
                    "url": "https://audiopartnership1571922554.zendesk.com/api/v2/help_center/en-us/articles/360003370677-section-name-category-name.json",
                    "html_url": "https://audiopartnership1571922554.zendesk.com/hc/en-us/articles/360003370677-section-name-category-name",
                    "author_id": 367927678998,
                    "comments_disabled": false,
                    "draft": false,
                    "promoted": true,
                    "position": 0,
                    "vote_sum": 0,
                    "vote_count": 0,
                    "section_id": 360000857577,
                    "created_at": "2019-11-05T14:39:13Z",
                    "updated_at": "2019-11-05T14:51:48Z",
                    "name": "section name/category name",
                    "title": "section name/category name",
                    "source_locale": "en-us",
                    "locale": "en-us",
                    "outdated": false,
                    "outdated_locales": [],
                    "edited_at": "2019-11-05T14:51:48Z",
                    "user_segment_id": null,
                    "permission_group_id": 204358,
                    "label_names": [],
                    "body": "<p>sadsadasdsad</p>",
                    "section": {
                        "id": 360000857577,
                        "url": "https://audiopartnership1571922554.zendesk.com/api/v2/help_center/en-us/sections/360000857577-Section-Name.json",
                        "html_url": "https://audiopartnership1571922554.zendesk.com/hc/en-us/sections/360000857577-Section-Name",
                        "category_id": 360000397617,
                        "position": 0,
                        "sorting": "manual",
                        "created_at": "2019-10-28T12:30:45Z",
                        "updated_at": "2019-11-05T14:51:48Z",
                        "name": "Section Name",
                        "description": "Section Description Section Description Section Description Section Description Section Description Section Description Section Description ",
                        "locale": "en-us",
                        "source_locale": "en-us",
                        "outdated": false,
                        "parent_section_id": null,
                        "theme_template": "section_page"
                    },
                    "category": {
                        "id": 360000397617,
                        "url": "https://audiopartnership1571922554.zendesk.com/api/v2/help_center/en-us/categories/360000397617-Category-Name.json",
                        "html_url": "https://audiopartnership1571922554.zendesk.com/hc/en-us/categories/360000397617-Category-Name",
                        "position": 0,
                        "created_at": "2019-10-28T12:30:02Z",
                        "updated_at": "2019-11-05T14:51:48Z",
                        "name": "Category Name",
                        "description": "Category Description Category Description Category Description Category Description",
                        "locale": "en-us",
                        "source_locale": "en-us",
                        "outdated": false
                    }
                },
                {
                    "id": 360003337258,
                    "url": "https://audiopartnership1571922554.zendesk.com/api/v2/help_center/en-us/articles/360003337258-example-3.json",
                    "html_url": "https://audiopartnership1571922554.zendesk.com/hc/en-us/articles/360003337258-example-3",
                    "author_id": 367927678998,
                    "comments_disabled": false,
                    "draft": false,
                    "promoted": true,
                    "position": 0,
                    "vote_sum": 0,
                    "vote_count": 0,
                    "section_id": 360000869277,
                    "created_at": "2019-11-05T14:35:44Z",
                    "updated_at": "2019-11-05T14:35:51Z",
                    "name": "example 3",
                    "title": "example 3",
                    "source_locale": "en-us",
                    "locale": "en-us",
                    "outdated": false,
                    "outdated_locales": [],
                    "edited_at": "2019-11-05T14:35:51Z",
                    "user_segment_id": null,
                    "permission_group_id": 204358,
                    "label_names": [],
                    "body": "<p>sadsadsadsad</p>",
                    "section": {
                        "id": 360000869277,
                        "url": "https://audiopartnership1571922554.zendesk.com/api/v2/help_center/en-us/sections/360000869277-Manuals-Documentation.json",
                        "html_url": "https://audiopartnership1571922554.zendesk.com/hc/en-us/sections/360000869277-Manuals-Documentation",
                        "category_id": 360000405857,
                        "position": 0,
                        "sorting": "manual",
                        "created_at": "2019-10-29T09:18:48Z",
                        "updated_at": "2019-11-05T14:35:51Z",
                        "name": "Manuals & Documentation",
                        "description": "",
                        "locale": "en-us",
                        "source_locale": "en-us",
                        "outdated": false,
                        "parent_section_id": null,
                        "theme_template": "section_page"
                    },
                    "category": {
                        "id": 360000405857,
                        "url": "https://audiopartnership1571922554.zendesk.com/api/v2/help_center/en-us/categories/360000405857-Edge-NQ.json",
                        "html_url": "https://audiopartnership1571922554.zendesk.com/hc/en-us/categories/360000405857-Edge-NQ",
                        "position": 0,
                        "created_at": "2019-10-29T09:17:18Z",
                        "updated_at": "2019-11-05T14:35:51Z",
                        "name": "Edge NQ",
                        "description": "",
                        "locale": "en-us",
                        "source_locale": "en-us",
                        "outdated": false
                    }
                },
                {
                    "id": 360003370377,
                    "url": "https://audiopartnership1571922554.zendesk.com/api/v2/help_center/en-us/articles/360003370377-example-new.json",
                    "html_url": "https://audiopartnership1571922554.zendesk.com/hc/en-us/articles/360003370377-example-new",
                    "author_id": 367927678998,
                    "comments_disabled": false,
                    "draft": false,
                    "promoted": true,
                    "position": 0,
                    "vote_sum": 0,
                    "vote_count": 0,
                    "section_id": 360000881458,
                    "created_at": "2019-11-05T14:34:52Z",
                    "updated_at": "2019-11-05T14:34:58Z",
                    "name": "example new",
                    "title": "example new",
                    "source_locale": "en-us",
                    "locale": "en-us",
                    "outdated": false,
                    "outdated_locales": [],
                    "edited_at": "2019-11-05T14:34:58Z",
                    "user_segment_id": null,
                    "permission_group_id": 204358,
                    "label_names": [],
                    "body": "<p>sadsadsadsad</p>",
                    "section": {
                        "id": 360000881458,
                        "url": "https://audiopartnership1571922554.zendesk.com/api/v2/help_center/en-us/sections/360000881458-Frequently-Asked-Questions.json",
                        "html_url": "https://audiopartnership1571922554.zendesk.com/hc/en-us/sections/360000881458-Frequently-Asked-Questions",
                        "category_id": 360000416878,
                        "position": 0,
                        "sorting": "manual",
                        "created_at": "2019-10-30T14:03:09Z",
                        "updated_at": "2019-11-05T14:34:59Z",
                        "name": "Frequently Asked Questions",
                        "description": "",
                        "locale": "en-us",
                        "source_locale": "en-us",
                        "outdated": false,
                        "parent_section_id": null,
                        "theme_template": "section_page"
                    },
                    "category": {
                        "id": 360000416878,
                        "url": "https://audiopartnership1571922554.zendesk.com/api/v2/help_center/en-us/categories/360000416878-Azur-851N.json",
                        "html_url": "https://audiopartnership1571922554.zendesk.com/hc/en-us/categories/360000416878-Azur-851N",
                        "position": 0,
                        "created_at": "2019-10-30T14:02:02Z",
                        "updated_at": "2019-11-05T14:37:50Z",
                        "name": "Azur 851N",
                        "description": "",
                        "locale": "en-us",
                        "source_locale": "en-us",
                        "outdated": false
                    }
                },
                {
                    "id": 360003362857,
                    "url": "https://audiopartnership1571922554.zendesk.com/api/v2/help_center/en-us/articles/360003362857-Azur-851C.json",
                    "html_url": "https://audiopartnership1571922554.zendesk.com/hc/en-us/articles/360003362857-Azur-851C",
                    "author_id": 367927678998,
                    "comments_disabled": false,
                    "draft": false,
                    "promoted": true,
                    "position": 0,
                    "vote_sum": 0,
                    "vote_count": 0,
                    "section_id": 360000881478,
                    "created_at": "2019-11-05T13:28:44Z",
                    "updated_at": "2019-11-05T14:36:27Z",
                    "name": "Azur 851C",
                    "title": "Azur 851C",
                    "source_locale": "en-us",
                    "locale": "en-us",
                    "outdated": false,
                    "outdated_locales": [],
                    "edited_at": "2019-11-05T13:28:54Z",
                    "user_segment_id": null,
                    "permission_group_id": 204358,
                    "label_names": [],
                    "body": "<ul class=\"attachments\">\n<li>\n<a href=\"https://techsupport.cambridgeaudio.com/hc/en-us/article_attachments/200290122/Azur_851C_User_Manual_Dutch.pdf\" target=\"_blank\" rel=\"noopener\">Azur 851C User Manual Dutch.pdf</a> (4 MB)</li>\n<li>\n<a href=\"https://techsupport.cambridgeaudio.com/hc/en-us/article_attachments/200290132/Azur_851C_User_Manual_Polish.pdf\" target=\"_blank\" rel=\"noopener\">Azur 851C User Manual Polish.pdf</a> (3 MB)</li>\n<li>\n<a href=\"https://techsupport.cambridgeaudio.com/hc/en-us/article_attachments/200290152/Azur_851C_User_Manual_German.pdf\" target=\"_blank\" rel=\"noopener\">Azur 851C User Manual German.pdf</a> (4 MB)</li>\n<li>\n<a href=\"https://techsupport.cambridgeaudio.com/hc/en-us/article_attachments/200281071/Azur_851C_User_Manual_French.pdf\" target=\"_blank\" rel=\"noopener\">Azur 851C User Manual French.pdf</a> (4 MB)</li>\n<li>\n<a href=\"https://techsupport.cambridgeaudio.com/hc/en-us/article_attachments/200281081/Azur_851C_User_Manual_Italian.pdf\" target=\"_blank\" rel=\"noopener\">Azur 851C User Manual Italian.pdf</a> (4 MB)</li>\n<li>\n<a href=\"https://techsupport.cambridgeaudio.com/hc/en-us/article_attachments/200290162/Azur_851C_User_Manual_Russian.pdf\" target=\"_blank\" rel=\"noopener\">Azur 851C User Manual Russian.pdf</a> (4 MB)</li>\n<li>\n<a href=\"https://techsupport.cambridgeaudio.com/hc/en-us/article_attachments/200290172/Azur_851C_User_Manual_Spanish.pdf\" target=\"_blank\" rel=\"noopener\">Azur 851C User Manual Spanish.pdf</a> (4 MB)</li>\n<li>\n<a href=\"https://techsupport.cambridgeaudio.com/hc/en-us/article_attachments/200281091/Azur_851C_User_Manual_Swedish.pdf\" target=\"_blank\" rel=\"noopener\">Azur 851C User Manual Swedish.pdf</a> (4 MB)</li>\n<li>\n<a href=\"https://techsupport.cambridgeaudio.com/hc/en-us/article_attachments/201553621/Azur_851C_Users_Manual_English.pdf\" target=\"_blank\" rel=\"noopener\">Azur 851C Users Manual English.pdf</a> (3 MB)</li>\n</ul>",
                    "section": {
                        "id": 360000881478,
                        "url": "https://audiopartnership1571922554.zendesk.com/api/v2/help_center/en-us/sections/360000881478-Manuals-Documentation.json",
                        "html_url": "https://audiopartnership1571922554.zendesk.com/hc/en-us/sections/360000881478-Manuals-Documentation",
                        "category_id": 360000416878,
                        "position": 0,
                        "sorting": "manual",
                        "created_at": "2019-10-30T14:03:59Z",
                        "updated_at": "2019-11-05T14:37:50Z",
                        "name": "Manuals & Documentation",
                        "description": "",
                        "locale": "en-us",
                        "source_locale": "en-us",
                        "outdated": false,
                        "parent_section_id": null,
                        "theme_template": "section_page"
                    },
                    "category": {
                        "id": 360000416878,
                        "url": "https://audiopartnership1571922554.zendesk.com/api/v2/help_center/en-us/categories/360000416878-Azur-851N.json",
                        "html_url": "https://audiopartnership1571922554.zendesk.com/hc/en-us/categories/360000416878-Azur-851N",
                        "position": 0,
                        "created_at": "2019-10-30T14:02:02Z",
                        "updated_at": "2019-11-05T14:37:50Z",
                        "name": "Azur 851N",
                        "description": "",
                        "locale": "en-us",
                        "source_locale": "en-us",
                        "outdated": false
                    }
                },
                {
                    "id": 360003228837,
                    "url": "https://audiopartnership1571922554.zendesk.com/api/v2/help_center/en-us/articles/360003228837-Footer-article.json",
                    "html_url": "https://audiopartnership1571922554.zendesk.com/hc/en-us/articles/360003228837-Footer-article",
                    "author_id": 367927678998,
                    "comments_disabled": false,
                    "draft": false,
                    "promoted": false,
                    "position": 0,
                    "vote_sum": 0,
                    "vote_count": 0,
                    "section_id": 360000899717,
                    "created_at": "2019-10-31T15:40:09Z",
                    "updated_at": "2019-10-31T16:24:30Z",
                    "name": "Footer article",
                    "title": "Footer article",
                    "source_locale": "en-us",
                    "locale": "en-us",
                    "outdated": false,
                    "outdated_locales": [],
                    "edited_at": "2019-10-31T16:10:28Z",
                    "user_segment_id": null,
                    "permission_group_id": 204358,
                    "label_names": [
                        "homepage"
                    ],
                    "body": "<p><strong>A member of our team will aim to respond to your query within 48 hours, Monday to Friday.</strong></p>\n<p>UK Office: 9am - 5pm (GMT)<br>US Office: 9am - 5pm (CDT)<br>Hong Kong Office: 9am - 5pm (HKT)</p>",
                    "section": {
                        "id": 360000899717,
                        "url": "https://audiopartnership1571922554.zendesk.com/api/v2/help_center/en-us/sections/360000899717-Additional-info.json",
                        "html_url": "https://audiopartnership1571922554.zendesk.com/hc/en-us/sections/360000899717-Additional-info",
                        "category_id": 360000429177,
                        "position": 0,
                        "sorting": "manual",
                        "created_at": "2019-10-31T11:03:03Z",
                        "updated_at": "2020-03-09T10:07:41Z",
                        "name": "Additional info",
                        "description": "",
                        "locale": "en-us",
                        "source_locale": "en-us",
                        "outdated": false,
                        "parent_section_id": null,
                        "theme_template": "section_page"
                    },
                    "category": {
                        "id": 360000429177,
                        "url": "https://audiopartnership1571922554.zendesk.com/api/v2/help_center/en-us/categories/360000429177-Other.json",
                        "html_url": "https://audiopartnership1571922554.zendesk.com/hc/en-us/categories/360000429177-Other",
                        "position": 0,
                        "created_at": "2019-10-31T11:02:22Z",
                        "updated_at": "2020-03-09T10:07:41Z",
                        "name": "Other",
                        "description": "",
                        "locale": "en-us",
                        "source_locale": "en-us",
                        "outdated": false
                    }
                },
                {
                    "id": 360003215657,
                    "url": "https://audiopartnership1571922554.zendesk.com/api/v2/help_center/en-us/articles/360003215657-How-can-we-help-.json",
                    "html_url": "https://audiopartnership1571922554.zendesk.com/hc/en-us/articles/360003215657-How-can-we-help-",
                    "author_id": 367927678998,
                    "comments_disabled": false,
                    "draft": false,
                    "promoted": false,
                    "position": 0,
                    "vote_sum": 0,
                    "vote_count": 0,
                    "section_id": 360000899717,
                    "created_at": "2019-10-31T11:03:13Z",
                    "updated_at": "2019-10-31T16:26:15Z",
                    "name": "How can we help?",
                    "title": "How can we help?",
                    "source_locale": "en-us",
                    "locale": "en-us",
                    "outdated": false,
                    "outdated_locales": [],
                    "edited_at": "2019-10-31T16:26:15Z",
                    "user_segment_id": null,
                    "permission_group_id": 204358,
                    "label_names": [
                        "homepage"
                    ],
                    "body": "<p>Simply use the search bar above or browse our archive of support articles via the drop down menu below to learn more about your product.<br><br>Still have a question? Get in contact with our dedicated technical support team by <a href=\"https://techsupport.cambridgeaudio.com/hc/en-us/requests/new\">submitting a request here.</a></p>",
                    "section": {
                        "id": 360000899717,
                        "url": "https://audiopartnership1571922554.zendesk.com/api/v2/help_center/en-us/sections/360000899717-Additional-info.json",
                        "html_url": "https://audiopartnership1571922554.zendesk.com/hc/en-us/sections/360000899717-Additional-info",
                        "category_id": 360000429177,
                        "position": 0,
                        "sorting": "manual",
                        "created_at": "2019-10-31T11:03:03Z",
                        "updated_at": "2020-03-09T10:07:41Z",
                        "name": "Additional info",
                        "description": "",
                        "locale": "en-us",
                        "source_locale": "en-us",
                        "outdated": false,
                        "parent_section_id": null,
                        "theme_template": "section_page"
                    },
                    "category": {
                        "id": 360000429177,
                        "url": "https://audiopartnership1571922554.zendesk.com/api/v2/help_center/en-us/categories/360000429177-Other.json",
                        "html_url": "https://audiopartnership1571922554.zendesk.com/hc/en-us/categories/360000429177-Other",
                        "position": 0,
                        "created_at": "2019-10-31T11:02:22Z",
                        "updated_at": "2020-03-09T10:07:41Z",
                        "name": "Other",
                        "description": "",
                        "locale": "en-us",
                        "source_locale": "en-us",
                        "outdated": false
                    }
                },
                {
                    "id": 360003153958,
                    "url": "https://audiopartnership1571922554.zendesk.com/api/v2/help_center/en-us/articles/360003153958-EDGE-NQ-Technical-Specifications.json",
                    "html_url": "https://audiopartnership1571922554.zendesk.com/hc/en-us/articles/360003153958-EDGE-NQ-Technical-Specifications",
                    "author_id": 367927678998,
                    "comments_disabled": false,
                    "draft": false,
                    "promoted": true,
                    "position": 0,
                    "vote_sum": 0,
                    "vote_count": 0,
                    "section_id": 360000869277,
                    "created_at": "2019-10-30T13:56:58Z",
                    "updated_at": "2019-10-30T13:57:17Z",
                    "name": "EDGE NQ - Technical Specifications",
                    "title": "EDGE NQ - Technical Specifications",
                    "source_locale": "en-us",
                    "locale": "en-us",
                    "outdated": false,
                    "outdated_locales": [],
                    "edited_at": "2019-10-30T13:57:17Z",
                    "user_segment_id": null,
                    "permission_group_id": 204358,
                    "label_names": [],
                    "body": "<ul class=\"attachments\">\n<li>\n<a href=\"https://techsupport.cambridgeaudio.com/hc/en-us/article_attachments/360000755617/Edge_NQ_Technical_Specifications_-_English.pdf\" target=\"_blank\" rel=\"noopener\">Edge NQ Technical Specifications - English.pdf</a> (2 MB)</li>\n<li>\n<a href=\"https://techsupport.cambridgeaudio.com/hc/en-us/article_attachments/360000745118/Edge_NQ_Technical_Specifications_-_Chinese_HK.pdf\" target=\"_blank\" rel=\"noopener\">Edge NQ Technical Specifications - Chinese HK.pdf</a> (10 MB)</li>\n<li>\n<a href=\"https://techsupport.cambridgeaudio.com/hc/en-us/article_attachments/360000755637/Edge_NQ_Technical_Specifications_-_German.pdf\" target=\"_blank\" rel=\"noopener\">Edge NQ Technical Specifications - German.pdf</a> (2 MB)</li>\n</ul>",
                    "section": {
                        "id": 360000869277,
                        "url": "https://audiopartnership1571922554.zendesk.com/api/v2/help_center/en-us/sections/360000869277-Manuals-Documentation.json",
                        "html_url": "https://audiopartnership1571922554.zendesk.com/hc/en-us/sections/360000869277-Manuals-Documentation",
                        "category_id": 360000405857,
                        "position": 0,
                        "sorting": "manual",
                        "created_at": "2019-10-29T09:18:48Z",
                        "updated_at": "2019-11-05T14:35:51Z",
                        "name": "Manuals & Documentation",
                        "description": "",
                        "locale": "en-us",
                        "source_locale": "en-us",
                        "outdated": false,
                        "parent_section_id": null,
                        "theme_template": "section_page"
                    },
                    "category": {
                        "id": 360000405857,
                        "url": "https://audiopartnership1571922554.zendesk.com/api/v2/help_center/en-us/categories/360000405857-Edge-NQ.json",
                        "html_url": "https://audiopartnership1571922554.zendesk.com/hc/en-us/categories/360000405857-Edge-NQ",
                        "position": 0,
                        "created_at": "2019-10-29T09:17:18Z",
                        "updated_at": "2019-11-05T14:35:51Z",
                        "name": "Edge NQ",
                        "description": "",
                        "locale": "en-us",
                        "source_locale": "en-us",
                        "outdated": false
                    }
                },
                {
                    "id": 360003143637,
                    "url": "https://audiopartnership1571922554.zendesk.com/api/v2/help_center/en-us/articles/360003143637-EDGE-NQ-Manual.json",
                    "html_url": "https://audiopartnership1571922554.zendesk.com/hc/en-us/articles/360003143637-EDGE-NQ-Manual",
                    "author_id": 367927678998,
                    "comments_disabled": true,
                    "draft": false,
                    "promoted": true,
                    "position": 0,
                    "vote_sum": 0,
                    "vote_count": 0,
                    "section_id": 360000869277,
                    "created_at": "2019-10-30T12:18:20Z",
                    "updated_at": "2019-10-30T12:18:23Z",
                    "name": "EDGE NQ - Manual",
                    "title": "EDGE NQ - Manual",
                    "source_locale": "en-us",
                    "locale": "en-us",
                    "outdated": false,
                    "outdated_locales": [],
                    "edited_at": "2019-10-30T12:18:23Z",
                    "user_segment_id": null,
                    "permission_group_id": 204358,
                    "label_names": [],
                    "body": "<ul class=\"attachments\">\n<li>\n<a href=\"https://techsupport.cambridgeaudio.com/hc/en-us/article_attachments/360000744918/Edge_NQ_Users_Manual_-_Chinese_HK.pdf\" target=\"_blank\" rel=\"noopener\">Edge NQ Users Manual - Chinese HK.pdf</a> (1 MB)</li>\n<li>\n<a href=\"https://techsupport.cambridgeaudio.com/hc/en-us/article_attachments/360000744938/Edge_NQ_Users_Manual_-_Chinese_CN.pdf\" target=\"_blank\" rel=\"noopener\">Edge NQ Users Manual - Chinese CN.pdf</a> (1 MB)</li>\n<li>\n<a href=\"https://techsupport.cambridgeaudio.com/hc/en-us/article_attachments/360000755577/Edge_NQ_Users_Manual_-_English.pdf\" target=\"_blank\" rel=\"noopener\">Edge NQ Users Manual - English.pdf</a> (900 KB)</li>\n<li>\n<a href=\"https://techsupport.cambridgeaudio.com/hc/en-us/article_attachments/360000744958/Edge_NQ_Users_Manual_-_French.pdf\" target=\"_blank\" rel=\"noopener\">Edge NQ Users Manual - French.pdf</a> (900 KB)</li>\n<li>\n<a href=\"https://techsupport.cambridgeaudio.com/hc/en-us/article_attachments/360000744978/Edge_NQ_Users_Manual_-_German.pdf\" target=\"_blank\" rel=\"noopener\">Edge NQ Users Manual - German.pdf</a> (900 KB)</li>\n<li>\n<a href=\"https://techsupport.cambridgeaudio.com/hc/en-us/article_attachments/360000744998/Edge_NQ_Users_Manual_-_Italian.pdf\" target=\"_blank\" rel=\"noopener\">Edge NQ Users Manual - Italian.pdf</a> (900 KB)</li>\n<li>\n<a href=\"https://techsupport.cambridgeaudio.com/hc/en-us/article_attachments/360000745018/Edge_NQ_Users_Manual_-_Russian.pdf\" target=\"_blank\" rel=\"noopener\">Edge NQ Users Manual - Russian.pdf</a> (1000 KB)</li>\n<li>\n<a href=\"https://techsupport.cambridgeaudio.com/hc/en-us/article_attachments/360000755597/Edge_NQ_Users_Manual_-_Japanese.pdf\" target=\"_blank\" rel=\"noopener\">Edge NQ Users Manual - Japanese.pdf</a> (1 MB)</li>\n<li>\n<a href=\"https://techsupport.cambridgeaudio.com/hc/en-us/article_attachments/360000745038/Edge_NQ_Users_Manual_-_Spanish.pdf\" target=\"_blank\" rel=\"noopener\">Edge NQ Users Manual - Spanish.pdf</a> (900 KB)</li>\n<li>\n<a href=\"https://techsupport.cambridgeaudio.com/hc/en-us/article_attachments/360000745058/Edge_NQ_Users_Manual_-_Swedish.pdf\" target=\"_blank\" rel=\"noopener\">Edge NQ Users Manual - Swedish.pdf</a> (900 KB)</li>\n</ul>\n<p> </p>\n<div class=\"section-tree pull-left\"> </div>",
                    "section": {
                        "id": 360000869277,
                        "url": "https://audiopartnership1571922554.zendesk.com/api/v2/help_center/en-us/sections/360000869277-Manuals-Documentation.json",
                        "html_url": "https://audiopartnership1571922554.zendesk.com/hc/en-us/sections/360000869277-Manuals-Documentation",
                        "category_id": 360000405857,
                        "position": 0,
                        "sorting": "manual",
                        "created_at": "2019-10-29T09:18:48Z",
                        "updated_at": "2019-11-05T14:35:51Z",
                        "name": "Manuals & Documentation",
                        "description": "",
                        "locale": "en-us",
                        "source_locale": "en-us",
                        "outdated": false,
                        "parent_section_id": null,
                        "theme_template": "section_page"
                    },
                    "category": {
                        "id": 360000405857,
                        "url": "https://audiopartnership1571922554.zendesk.com/api/v2/help_center/en-us/categories/360000405857-Edge-NQ.json",
                        "html_url": "https://audiopartnership1571922554.zendesk.com/hc/en-us/categories/360000405857-Edge-NQ",
                        "position": 0,
                        "created_at": "2019-10-29T09:17:18Z",
                        "updated_at": "2019-11-05T14:35:51Z",
                        "name": "Edge NQ",
                        "description": "",
                        "locale": "en-us",
                        "source_locale": "en-us",
                        "outdated": false
                    }
                },
                {
                    "id": 360003113538,
                    "url": "https://audiopartnership1571922554.zendesk.com/api/v2/help_center/en-us/articles/360003113538-EDGE-NQ-Technical-Specifications.json",
                    "html_url": "https://audiopartnership1571922554.zendesk.com/hc/en-us/articles/360003113538-EDGE-NQ-Technical-Specifications",
                    "author_id": 367927678998,
                    "comments_disabled": false,
                    "draft": false,
                    "promoted": true,
                    "position": 0,
                    "vote_sum": 0,
                    "vote_count": 0,
                    "section_id": 360000869277,
                    "created_at": "2019-10-29T11:53:51Z",
                    "updated_at": "2019-10-30T14:05:46Z",
                    "name": "EDGE NQ - Technical Specifications",
                    "title": "EDGE NQ - Technical Specifications",
                    "source_locale": "en-us",
                    "locale": "en-us",
                    "outdated": false,
                    "outdated_locales": [],
                    "edited_at": "2019-10-30T14:05:46Z",
                    "user_segment_id": null,
                    "permission_group_id": 204358,
                    "label_names": [],
                    "body": "<ul class=\"attachments\">\n<li>\n<a href=\"https://techsupport.cambridgeaudio.com/hc/en-us/article_attachments/360000755617/Edge_NQ_Technical_Specifications_-_English.pdf\" target=\"_blank\" rel=\"noopener\">Edge NQ Technical Specifications - English.pdf</a> (2 MB)</li>\n<li>\n<a href=\"https://techsupport.cambridgeaudio.com/hc/en-us/article_attachments/360000745118/Edge_NQ_Technical_Specifications_-_Chinese_HK.pdf\" target=\"_blank\" rel=\"noopener\">Edge NQ Technical Specifications - Chinese HK.pdf</a> (10 MB)</li>\n<li>\n<a href=\"https://techsupport.cambridgeaudio.com/hc/en-us/article_attachments/360000755637/Edge_NQ_Technical_Specifications_-_German.pdf\" target=\"_blank\" rel=\"noopener\">Edge NQ Technical Specifications - German.pdf</a> (2 MB)</li>\n</ul>",
                    "section": {
                        "id": 360000869277,
                        "url": "https://audiopartnership1571922554.zendesk.com/api/v2/help_center/en-us/sections/360000869277-Manuals-Documentation.json",
                        "html_url": "https://audiopartnership1571922554.zendesk.com/hc/en-us/sections/360000869277-Manuals-Documentation",
                        "category_id": 360000405857,
                        "position": 0,
                        "sorting": "manual",
                        "created_at": "2019-10-29T09:18:48Z",
                        "updated_at": "2019-11-05T14:35:51Z",
                        "name": "Manuals & Documentation",
                        "description": "",
                        "locale": "en-us",
                        "source_locale": "en-us",
                        "outdated": false,
                        "parent_section_id": null,
                        "theme_template": "section_page"
                    },
                    "category": {
                        "id": 360000405857,
                        "url": "https://audiopartnership1571922554.zendesk.com/api/v2/help_center/en-us/categories/360000405857-Edge-NQ.json",
                        "html_url": "https://audiopartnership1571922554.zendesk.com/hc/en-us/categories/360000405857-Edge-NQ",
                        "position": 0,
                        "created_at": "2019-10-29T09:17:18Z",
                        "updated_at": "2019-11-05T14:35:51Z",
                        "name": "Edge NQ",
                        "description": "",
                        "locale": "en-us",
                        "source_locale": "en-us",
                        "outdated": false
                    }
                },
                {
                    "id": 360003113997,
                    "url": "https://audiopartnership1571922554.zendesk.com/api/v2/help_center/en-us/articles/360003113997-How-can-I-connect-my-streaming-service-to-the-Azur-851N-.json",
                    "html_url": "https://audiopartnership1571922554.zendesk.com/hc/en-us/articles/360003113997-How-can-I-connect-my-streaming-service-to-the-Azur-851N-",
                    "author_id": 367927678998,
                    "comments_disabled": false,
                    "draft": false,
                    "promoted": true,
                    "position": 0,
                    "vote_sum": 0,
                    "vote_count": 0,
                    "section_id": 360000881458,
                    "created_at": "2019-10-29T09:26:44Z",
                    "updated_at": "2019-10-30T14:03:26Z",
                    "name": "How can I connect my streaming service to the Azur 851N?",
                    "title": "How can I connect my streaming service to the Azur 851N?",
                    "source_locale": "en-us",
                    "locale": "en-us",
                    "outdated": false,
                    "outdated_locales": [],
                    "edited_at": "2019-10-29T09:26:47Z",
                    "user_segment_id": null,
                    "permission_group_id": 204358,
                    "label_names": [
                        "cxa"
                    ],
                    "body": "<p><img src=\"https://techsupport.cambridgeaudio.com/hc/article_attachments/360000119818/mceclip0.png\"><strong>Spotify Connect</strong></p>\n<p>Cambridge Audio network players include the Spotify Connect service which allows you to play your music directly from the network player and using the Spotify app as a remote control.</p>\n<p>Select “Devices Available” from within the Mobile or Desktop app and choose the Cambridge Audio network player on the same network to take advantage of this feature.</p>\n<p>Compatible Streaming Services: Spotify Only</p>\n<p><img src=\"https://techsupport.cambridgeaudio.com/hc/article_attachments/360000119838/mceclip1.png\"> <strong>Apple AirPlay</strong></p>\n<p>You can play any streaming service on your network player using AirPlay from a compatible Apple device.</p>\n<p>Choose “More Devices” and select the Apple AirPlay icon <img class=\"\" src=\"https://techsupport.cambridgeaudio.com/hc/article_attachments/360000119858/mceclip2.png\"> from within your chosen App, Control Centre or iTunes (PC/Mac) and select your Network Player.</p>\n<p>Compatible Streaming Services: Spotify, Apple Music, Tidal, YouTube Music, Deezer, Amazon Music etc.</p>\n<p><img src=\"https://techsupport.cambridgeaudio.com/hc/article_attachments/360000121317/mceclip3.png\"> <strong>USB from my PC or Mac</strong></p>\n<p>Any desktop app can also be played from your PC or Mac through a USB connection to your Cambridge Audio network player when a direct point to point connection is implemented.</p>\n<p>Connect a USB A to B cable between your PC or Mac and the Cambridge Audio network player and select “USB Audio” as the desired digital input through the network players’ interface.</p>\n<p>Compatible Streaming Services: Spotify, Apple Music, Tidal, YouTube Music, Deezer, Amazon Music etc.</p>\n<p><img src=\"https://techsupport.cambridgeaudio.com/hc/article_attachments/360000119878/mceclip4.png\"> <strong>Bluetooth (aptX)</strong></p>\n<p>Audio can also be played over a Bluetooth connection available by connecting the optional BT100 Bluetooth receiver to the Cambridge Audio network player and pairing it to your smart device.  </p>\n<p>Compatible Streaming Services: Spotify, Apple Music, Tidal, YouTube Music, Deezer, Amazon Music etc.</p>\n<p> </p>\n<p><strong>TIDAL</strong></p>\n<p>Please see our FAQ on how to connect via the Cambridge Connect app <a href=\"https://techsupport.cambridgeaudio.com/hc/en-us/articles/360000621849-How-do-I-use-TIDAL-with-the-Cambridge-Audio-Connect-App-\">here</a>.</p>",
                    "section": {
                        "id": 360000881458,
                        "url": "https://audiopartnership1571922554.zendesk.com/api/v2/help_center/en-us/sections/360000881458-Frequently-Asked-Questions.json",
                        "html_url": "https://audiopartnership1571922554.zendesk.com/hc/en-us/sections/360000881458-Frequently-Asked-Questions",
                        "category_id": 360000416878,
                        "position": 0,
                        "sorting": "manual",
                        "created_at": "2019-10-30T14:03:09Z",
                        "updated_at": "2019-11-05T14:34:59Z",
                        "name": "Frequently Asked Questions",
                        "description": "",
                        "locale": "en-us",
                        "source_locale": "en-us",
                        "outdated": false,
                        "parent_section_id": null,
                        "theme_template": "section_page"
                    },
                    "category": {
                        "id": 360000416878,
                        "url": "https://audiopartnership1571922554.zendesk.com/api/v2/help_center/en-us/categories/360000416878-Azur-851N.json",
                        "html_url": "https://audiopartnership1571922554.zendesk.com/hc/en-us/categories/360000416878-Azur-851N",
                        "position": 0,
                        "created_at": "2019-10-30T14:02:02Z",
                        "updated_at": "2019-11-05T14:37:50Z",
                        "name": "Azur 851N",
                        "description": "",
                        "locale": "en-us",
                        "source_locale": "en-us",
                        "outdated": false
                    }
                },
                {
                    "id": 360003113777,
                    "url": "https://audiopartnership1571922554.zendesk.com/api/v2/help_center/en-us/articles/360003113777-Azur-851N-Manual.json",
                    "html_url": "https://audiopartnership1571922554.zendesk.com/hc/en-us/articles/360003113777-Azur-851N-Manual",
                    "author_id": 367927678998,
                    "comments_disabled": false,
                    "draft": false,
                    "promoted": true,
                    "position": 0,
                    "vote_sum": 0,
                    "vote_count": 0,
                    "section_id": 360000881478,
                    "created_at": "2019-10-29T09:19:02Z",
                    "updated_at": "2019-10-30T14:04:44Z",
                    "name": "Azur 851N - Manual",
                    "title": "Azur 851N - Manual",
                    "source_locale": "en-us",
                    "locale": "en-us",
                    "outdated": false,
                    "outdated_locales": [],
                    "edited_at": "2019-10-29T09:19:05Z",
                    "user_segment_id": null,
                    "permission_group_id": 204358,
                    "label_names": [],
                    "body": "<p>Azur 851N Users Manual Chinese.pdf (3 MB)<br>Azur 851N Users Manual German.pdf (2 MB)<br>Azur 851N Users Manual Dutch.pdf (2 MB)<br>Azur 851N Users Manual French.pdf (2 MB)<br>Azur 851N Users Manual English.pdf (2 MB)<br>Azur 851N Users Manual Italian.pdf (2 MB)<br>Azur 851N Users Manual Russian.pdf (2 MB)<br>Azur 851N Users Manual Polish.pdf (2 MB)<br>Azur 851N Users Manual Spanish.pdf (2 MB)<br>Azur 851N Users Manual English - Reference.pdf (2 MB)</p>",
                    "section": {
                        "id": 360000881478,
                        "url": "https://audiopartnership1571922554.zendesk.com/api/v2/help_center/en-us/sections/360000881478-Manuals-Documentation.json",
                        "html_url": "https://audiopartnership1571922554.zendesk.com/hc/en-us/sections/360000881478-Manuals-Documentation",
                        "category_id": 360000416878,
                        "position": 0,
                        "sorting": "manual",
                        "created_at": "2019-10-30T14:03:59Z",
                        "updated_at": "2019-11-05T14:37:50Z",
                        "name": "Manuals & Documentation",
                        "description": "",
                        "locale": "en-us",
                        "source_locale": "en-us",
                        "outdated": false,
                        "parent_section_id": null,
                        "theme_template": "section_page"
                    },
                    "category": {
                        "id": 360000416878,
                        "url": "https://audiopartnership1571922554.zendesk.com/api/v2/help_center/en-us/categories/360000416878-Azur-851N.json",
                        "html_url": "https://audiopartnership1571922554.zendesk.com/hc/en-us/categories/360000416878-Azur-851N",
                        "position": 0,
                        "created_at": "2019-10-30T14:02:02Z",
                        "updated_at": "2019-11-05T14:37:50Z",
                        "name": "Azur 851N",
                        "description": "",
                        "locale": "en-us",
                        "source_locale": "en-us",
                        "outdated": false
                    }
                },
                {
                    "id": 360003103478,
                    "url": "https://audiopartnership1571922554.zendesk.com/api/v2/help_center/en-us/articles/360003103478-Example-Article-Blah-blah.json",
                    "html_url": "https://audiopartnership1571922554.zendesk.com/hc/en-us/articles/360003103478-Example-Article-Blah-blah",
                    "author_id": 367927678998,
                    "comments_disabled": false,
                    "draft": false,
                    "promoted": true,
                    "position": 0,
                    "vote_sum": 0,
                    "vote_count": 0,
                    "section_id": 360000857577,
                    "created_at": "2019-10-28T17:00:16Z",
                    "updated_at": "2019-10-28T17:00:18Z",
                    "name": "Example Article Blah blah",
                    "title": "Example Article Blah blah",
                    "source_locale": "en-us",
                    "locale": "en-us",
                    "outdated": false,
                    "outdated_locales": [],
                    "edited_at": "2019-10-28T17:00:18Z",
                    "user_segment_id": 360000203398,
                    "permission_group_id": 204358,
                    "label_names": [],
                    "body": "<ul class=\"attachments\">\n<li>\n<a href=\"https://techsupport.cambridgeaudio.com/hc/en-us/article_attachments/205848229/Azur_851N_Users_Manual_Chinese.pdf\" target=\"_blank\" rel=\"noopener\">Azur 851N Users Manual Chinese.pdf</a> (3 MB)</li>\n<li>\n<a href=\"https://techsupport.cambridgeaudio.com/hc/en-us/article_attachments/205848249/Azur_851N_Users_Manual_German.pdf\" target=\"_blank\" rel=\"noopener\">Azur 851N Users Manual German.pdf</a> (2 MB)</li>\n<li>\n<a href=\"https://techsupport.cambridgeaudio.com/hc/en-us/article_attachments/205848269/Azur_851N_Users_Manual_Dutch.pdf\" target=\"_blank\" rel=\"noopener\">Azur 851N Users Manual Dutch.pdf</a> (2 MB)</li>\n<li>\n<a href=\"https://techsupport.cambridgeaudio.com/hc/en-us/article_attachments/205884905/Azur_851N_Users_Manual_French.pdf\" target=\"_blank\" rel=\"noopener\">Azur 851N Users Manual French.pdf</a> (2 MB)</li>\n<li>\n<a href=\"https://techsupport.cambridgeaudio.com/hc/en-us/article_attachments/205884925/Azur_851N_Users_Manual_English.pdf\" target=\"_blank\" rel=\"noopener\">Azur 851N Users Manual English.pdf</a> (2 MB)</li>\n<li>\n<a href=\"https://techsupport.cambridgeaudio.com/hc/en-us/article_attachments/205848309/Azur_851N_Users_Manual_Italian.pdf\" target=\"_blank\" rel=\"noopener\">Azur 851N Users Manual Italian.pdf</a> (2 MB)</li>\n<li>\n<a href=\"https://techsupport.cambridgeaudio.com/hc/en-us/article_attachments/205848329/Azur_851N_Users_Manual_Russian.pdf\" target=\"_blank\" rel=\"noopener\">Azur 851N Users Manual Russian.pdf</a> (2 MB)</li>\n<li>\n<a href=\"https://techsupport.cambridgeaudio.com/hc/en-us/article_attachments/205884945/Azur_851N_Users_Manual_Polish.pdf\" target=\"_blank\" rel=\"noopener\">Azur 851N Users Manual Polish.pdf</a> (2 MB)</li>\n<li>\n<a href=\"https://techsupport.cambridgeaudio.com/hc/en-us/article_attachments/205848349/Azur_851N_Users_Manual_Spanish.pdf\" target=\"_blank\" rel=\"noopener\">Azur 851N Users Manual Spanish.pdf</a> (2 MB)</li>\n<li>\n<a href=\"https://techsupport.cambridgeaudio.com/hc/en-us/article_attachments/360000103577/Azur_851N_Users_Manual_English_-_Reference.pdf\" target=\"_blank\" rel=\"noopener\">Azur 851N Users Manual English - Reference.pdf</a> (2 MB)</li>\n</ul>",
                    "section": {
                        "id": 360000857577,
                        "url": "https://audiopartnership1571922554.zendesk.com/api/v2/help_center/en-us/sections/360000857577-Section-Name.json",
                        "html_url": "https://audiopartnership1571922554.zendesk.com/hc/en-us/sections/360000857577-Section-Name",
                        "category_id": 360000397617,
                        "position": 0,
                        "sorting": "manual",
                        "created_at": "2019-10-28T12:30:45Z",
                        "updated_at": "2019-11-05T14:51:48Z",
                        "name": "Section Name",
                        "description": "Section Description Section Description Section Description Section Description Section Description Section Description Section Description ",
                        "locale": "en-us",
                        "source_locale": "en-us",
                        "outdated": false,
                        "parent_section_id": null,
                        "theme_template": "section_page"
                    },
                    "category": {
                        "id": 360000397617,
                        "url": "https://audiopartnership1571922554.zendesk.com/api/v2/help_center/en-us/categories/360000397617-Category-Name.json",
                        "html_url": "https://audiopartnership1571922554.zendesk.com/hc/en-us/categories/360000397617-Category-Name",
                        "position": 0,
                        "created_at": "2019-10-28T12:30:02Z",
                        "updated_at": "2019-11-05T14:51:48Z",
                        "name": "Category Name",
                        "description": "Category Description Category Description Category Description Category Description",
                        "locale": "en-us",
                        "source_locale": "en-us",
                        "outdated": false
                    }
                },
                {
                    "id": 360003103557,
                    "url": "https://audiopartnership1571922554.zendesk.com/api/v2/help_center/en-us/articles/360003103557-Another-article-.json",
                    "html_url": "https://audiopartnership1571922554.zendesk.com/hc/en-us/articles/360003103557-Another-article-",
                    "author_id": 367927678998,
                    "comments_disabled": false,
                    "draft": false,
                    "promoted": true,
                    "position": 0,
                    "vote_sum": 0,
                    "vote_count": 0,
                    "section_id": 360000857577,
                    "created_at": "2019-10-28T15:35:34Z",
                    "updated_at": "2019-10-28T15:37:18Z",
                    "name": "Another article ",
                    "title": "Another article ",
                    "source_locale": "en-us",
                    "locale": "en-us",
                    "outdated": false,
                    "outdated_locales": [],
                    "edited_at": "2019-10-28T15:35:36Z",
                    "user_segment_id": null,
                    "permission_group_id": 204358,
                    "label_names": [],
                    "body": "<p>article is article article is article article is article article is article article is article article is article article is article article is article article is article </p>\n<div id=\"gtx-trans\" style=\"position: absolute; left: 72px; top: 36px;\">\n<div class=\"gtx-trans-icon\"> </div>\n</div>",
                    "section": {
                        "id": 360000857577,
                        "url": "https://audiopartnership1571922554.zendesk.com/api/v2/help_center/en-us/sections/360000857577-Section-Name.json",
                        "html_url": "https://audiopartnership1571922554.zendesk.com/hc/en-us/sections/360000857577-Section-Name",
                        "category_id": 360000397617,
                        "position": 0,
                        "sorting": "manual",
                        "created_at": "2019-10-28T12:30:45Z",
                        "updated_at": "2019-11-05T14:51:48Z",
                        "name": "Section Name",
                        "description": "Section Description Section Description Section Description Section Description Section Description Section Description Section Description ",
                        "locale": "en-us",
                        "source_locale": "en-us",
                        "outdated": false,
                        "parent_section_id": null,
                        "theme_template": "section_page"
                    },
                    "category": {
                        "id": 360000397617,
                        "url": "https://audiopartnership1571922554.zendesk.com/api/v2/help_center/en-us/categories/360000397617-Category-Name.json",
                        "html_url": "https://audiopartnership1571922554.zendesk.com/hc/en-us/categories/360000397617-Category-Name",
                        "position": 0,
                        "created_at": "2019-10-28T12:30:02Z",
                        "updated_at": "2019-11-05T14:51:48Z",
                        "name": "Category Name",
                        "description": "Category Description Category Description Category Description Category Description",
                        "locale": "en-us",
                        "source_locale": "en-us",
                        "outdated": false
                    }
                },
                {
                    "id": 360003094058,
                    "url": "https://audiopartnership1571922554.zendesk.com/api/v2/help_center/en-us/articles/360003094058-article-title.json",
                    "html_url": "https://audiopartnership1571922554.zendesk.com/hc/en-us/articles/360003094058-article-title",
                    "author_id": 367927678998,
                    "comments_disabled": false,
                    "draft": false,
                    "promoted": true,
                    "position": 0,
                    "vote_sum": 0,
                    "vote_count": 0,
                    "section_id": 360000881478,
                    "created_at": "2019-10-28T12:31:27Z",
                    "updated_at": "2019-11-05T14:37:50Z",
                    "name": "article title",
                    "title": "article title",
                    "source_locale": "en-us",
                    "locale": "en-us",
                    "outdated": false,
                    "outdated_locales": [],
                    "edited_at": "2019-10-28T14:58:07Z",
                    "user_segment_id": null,
                    "permission_group_id": 204358,
                    "label_names": [],
                    "body": "<p>Article content Article content Article content Article content Article content Article content Article content Article content Article content Article content Article content Article content Article content Article content Article content Article content Article content Article content Article content Article content Article content Article content Article content Article content Article content Article content Article content Article content Article content Article content Article content Article content Article content Article content Article content Article content Article content Article content Article content Article content Article content Article content Article content </p>\n<div id=\"gtx-trans\" style=\"position: absolute; left: 619px; top: 132px;\">\n<div class=\"gtx-trans-icon\"> </div>\n</div>",
                    "section": {
                        "id": 360000881478,
                        "url": "https://audiopartnership1571922554.zendesk.com/api/v2/help_center/en-us/sections/360000881478-Manuals-Documentation.json",
                        "html_url": "https://audiopartnership1571922554.zendesk.com/hc/en-us/sections/360000881478-Manuals-Documentation",
                        "category_id": 360000416878,
                        "position": 0,
                        "sorting": "manual",
                        "created_at": "2019-10-30T14:03:59Z",
                        "updated_at": "2019-11-05T14:37:50Z",
                        "name": "Manuals & Documentation",
                        "description": "",
                        "locale": "en-us",
                        "source_locale": "en-us",
                        "outdated": false,
                        "parent_section_id": null,
                        "theme_template": "section_page"
                    },
                    "category": {
                        "id": 360000416878,
                        "url": "https://audiopartnership1571922554.zendesk.com/api/v2/help_center/en-us/categories/360000416878-Azur-851N.json",
                        "html_url": "https://audiopartnership1571922554.zendesk.com/hc/en-us/categories/360000416878-Azur-851N",
                        "position": 0,
                        "created_at": "2019-10-30T14:02:02Z",
                        "updated_at": "2019-11-05T14:37:50Z",
                        "name": "Azur 851N",
                        "description": "",
                        "locale": "en-us",
                        "source_locale": "en-us",
                        "outdated": false
                    }
                },
                {
                    "id": 360003041438,
                    "url": "https://audiopartnership1571922554.zendesk.com/api/v2/help_center/en-us/articles/360003041438-34hwh.json",
                    "html_url": "https://audiopartnership1571922554.zendesk.com/hc/en-us/articles/360003041438-34hwh",
                    "author_id": 367927678998,
                    "comments_disabled": false,
                    "draft": true,
                    "promoted": true,
                    "position": 0,
                    "vote_sum": 0,
                    "vote_count": 0,
                    "section_id": 360000831918,
                    "created_at": "2019-10-24T13:12:22Z",
                    "updated_at": "2019-10-24T13:12:22Z",
                    "name": "34hwh",
                    "title": "34hwh",
                    "source_locale": "en-us",
                    "locale": "en-us",
                    "outdated": false,
                    "outdated_locales": [],
                    "edited_at": "2019-10-24T13:12:22Z",
                    "user_segment_id": 360000203398,
                    "permission_group_id": 204358,
                    "label_names": [
                        "cxa"
                    ],
                    "body": "<p>shsdhsdhsdhhsdhsdhsh</p>",
                    "section": {
                        "id": 360000831918,
                        "url": "https://audiopartnership1571922554.zendesk.com/api/v2/help_center/en-us/sections/360000831918-FAQ.json",
                        "html_url": "https://audiopartnership1571922554.zendesk.com/hc/en-us/sections/360000831918-FAQ",
                        "category_id": 360000380458,
                        "position": 0,
                        "sorting": "manual",
                        "created_at": "2019-10-24T13:11:36Z",
                        "updated_at": "2019-10-24T13:12:22Z",
                        "name": "FAQ",
                        "description": "",
                        "locale": "en-us",
                        "source_locale": "en-us",
                        "outdated": false,
                        "parent_section_id": null,
                        "theme_template": "section_page"
                    },
                    "category": {
                        "id": 360000380458,
                        "url": "https://audiopartnership1571922554.zendesk.com/api/v2/help_center/en-us/categories/360000380458-General.json",
                        "html_url": "https://audiopartnership1571922554.zendesk.com/hc/en-us/categories/360000380458-General",
                        "position": 0,
                        "created_at": "2019-10-24T13:11:35Z",
                        "updated_at": "2019-10-24T13:12:22Z",
                        "name": "General",
                        "description": "",
                        "locale": "en-us",
                        "source_locale": "en-us",
                        "outdated": false
                    }
                },
                {
                    "id": 360003041398,
                    "url": "https://audiopartnership1571922554.zendesk.com/api/v2/help_center/en-us/articles/360003041398-How-can-agents-leverage-knowledge-to-help-customers-.json",
                    "html_url": "https://audiopartnership1571922554.zendesk.com/hc/en-us/articles/360003041398-How-can-agents-leverage-knowledge-to-help-customers-",
                    "author_id": 367927678998,
                    "comments_disabled": false,
                    "draft": false,
                    "promoted": false,
                    "position": 0,
                    "vote_sum": 0,
                    "vote_count": 0,
                    "section_id": 360000831918,
                    "created_at": "2019-10-24T13:11:36Z",
                    "updated_at": "2019-10-24T13:11:36Z",
                    "name": "How can agents leverage knowledge to help customers?",
                    "title": "How can agents leverage knowledge to help customers?",
                    "source_locale": "en-us",
                    "locale": "en-us",
                    "outdated": false,
                    "outdated_locales": [],
                    "edited_at": "2019-10-24T13:11:36Z",
                    "user_segment_id": null,
                    "permission_group_id": 204358,
                    "label_names": [],
                    "body": "<p>You can use our <a href=\"https://support.zendesk.com/hc/en-us/articles/115012706488\" target=\"_blank\">Knowledge Capture app</a> to leverage your team’s collective knowledge.</p>\n<p>Using the app, agents can:\n</p><ul>\n  <li>Search the Help Center without leaving the ticket</li>\n  <li>Insert links to relevant Help Center articles in ticket comments</li>\n  <li>Add inline feedback to existing articles that need updates</li>\n  <li>Create new articles while answering tickets using a pre-defined template</li>\n</ul>\n\n\n<p>Agents never have to leave the ticket interface to share, flag, or create knowledge, so they can help the customer, while also improving your self-service offerings for other customers.</p>\n\n<p>To get started, see our <a href=\"https://support.zendesk.com/hc/en-us/articles/360001975088\" target=\"_blank\">Knowledge Capture documentation</a>.</p>\n\n<p>And before your agents can start creating new knowledge directly from tickets, you’ll need to <a href=\"https://support.zendesk.com/hc/en-us/articles/115002374987\" target=\"_blank\">create a template</a> for them to use. To help you along, we’ve provided some template ideas below. You can copy and paste any sample template below into a new article, add the <strong>KCTemplate</strong> label to the article, and you’ll be all set.</p>\n\n<h4>Q&amp;A template:</h4>\n\n<blockquote>\n\n<p>\n</p>\n<h3>[Title]</h3>\n\n\n<p>\n</p>\n<h3>Question</h3>\nwrite the question here.\n\n\n<p>\n</p>\n<h3>Answer</h3>\nwrite the answer here.\n\n\n</blockquote>\n\n<h4>Solution template:</h4>\n\n<blockquote>\n\n<p>\n</p>\n<h3>[Title]</h3>\n\n\n<p>\n</p>\n<h3>Symptoms</h3>\nwrite the symptoms here.\n\n\n<p>\n</p>\n<h3>Resolution</h3>\nwrite the resolution here.\n\n\n<p>\n</p>\n<h3>Cause</h3>\nwrite the cause here.\n\n\n</blockquote>\n\n<h4>How-to template:</h4>\n\n<blockquote>\n\n<p>\n</p>\n<h3>[Title]</h3>\n\n\n<p>\n</p>\n<h3>Objective</h3>\nwrite the purpose or task here.\n\n\n<p>\n</p>\n<h3>Procedure</h3>\nwrite the steps here.\n\n\n</blockquote>\n",
                    "section": {
                        "id": 360000831918,
                        "url": "https://audiopartnership1571922554.zendesk.com/api/v2/help_center/en-us/sections/360000831918-FAQ.json",
                        "html_url": "https://audiopartnership1571922554.zendesk.com/hc/en-us/sections/360000831918-FAQ",
                        "category_id": 360000380458,
                        "position": 0,
                        "sorting": "manual",
                        "created_at": "2019-10-24T13:11:36Z",
                        "updated_at": "2019-10-24T13:12:22Z",
                        "name": "FAQ",
                        "description": "",
                        "locale": "en-us",
                        "source_locale": "en-us",
                        "outdated": false,
                        "parent_section_id": null,
                        "theme_template": "section_page"
                    },
                    "category": {
                        "id": 360000380458,
                        "url": "https://audiopartnership1571922554.zendesk.com/api/v2/help_center/en-us/categories/360000380458-General.json",
                        "html_url": "https://audiopartnership1571922554.zendesk.com/hc/en-us/categories/360000380458-General",
                        "position": 0,
                        "created_at": "2019-10-24T13:11:35Z",
                        "updated_at": "2019-10-24T13:12:22Z",
                        "name": "General",
                        "description": "",
                        "locale": "en-us",
                        "source_locale": "en-us",
                        "outdated": false
                    }
                },
                {
                    "id": 360003041378,
                    "url": "https://audiopartnership1571922554.zendesk.com/api/v2/help_center/en-us/articles/360003041378-How-do-I-publish-my-content-in-other-languages-.json",
                    "html_url": "https://audiopartnership1571922554.zendesk.com/hc/en-us/articles/360003041378-How-do-I-publish-my-content-in-other-languages-",
                    "author_id": 367927678998,
                    "comments_disabled": false,
                    "draft": false,
                    "promoted": false,
                    "position": 0,
                    "vote_sum": 0,
                    "vote_count": 0,
                    "section_id": 360000831918,
                    "created_at": "2019-10-24T13:11:36Z",
                    "updated_at": "2019-10-24T13:11:36Z",
                    "name": "How do I publish my content in other languages?",
                    "title": "How do I publish my content in other languages?",
                    "source_locale": "en-us",
                    "locale": "en-us",
                    "outdated": false,
                    "outdated_locales": [],
                    "edited_at": "2019-10-24T13:11:36Z",
                    "user_segment_id": null,
                    "permission_group_id": 204358,
                    "label_names": [],
                    "body": "<p>If you have <a href=\"https://support.zendesk.com/hc/en-us/articles/224857687\" target=\"_blank\">configured your Help Center to support multiple languages</a>, you can publish content in your supported languages. </p>\n\n<p>Here's the workflow for localizing your Help Center content into other languages:</p>\n\n<ol>\n<li>Get your content translated in the other languages.</li>\n<li>Configure the Help Center to support all your languages.</li>\n<li>Add the translated content to the Help Center.</li>\n</ol>\n\n\n<p>For complete instructions, see <a href=\"https://support.zendesk.com/hc/en-us/articles/203664336#topic_inn_3qy_43\" target=\"_blank\">Localizing the Help Center</a>.</p>",
                    "section": {
                        "id": 360000831918,
                        "url": "https://audiopartnership1571922554.zendesk.com/api/v2/help_center/en-us/sections/360000831918-FAQ.json",
                        "html_url": "https://audiopartnership1571922554.zendesk.com/hc/en-us/sections/360000831918-FAQ",
                        "category_id": 360000380458,
                        "position": 0,
                        "sorting": "manual",
                        "created_at": "2019-10-24T13:11:36Z",
                        "updated_at": "2019-10-24T13:12:22Z",
                        "name": "FAQ",
                        "description": "",
                        "locale": "en-us",
                        "source_locale": "en-us",
                        "outdated": false,
                        "parent_section_id": null,
                        "theme_template": "section_page"
                    },
                    "category": {
                        "id": 360000380458,
                        "url": "https://audiopartnership1571922554.zendesk.com/api/v2/help_center/en-us/categories/360000380458-General.json",
                        "html_url": "https://audiopartnership1571922554.zendesk.com/hc/en-us/categories/360000380458-General",
                        "position": 0,
                        "created_at": "2019-10-24T13:11:35Z",
                        "updated_at": "2019-10-24T13:12:22Z",
                        "name": "General",
                        "description": "",
                        "locale": "en-us",
                        "source_locale": "en-us",
                        "outdated": false
                    }
                },
                {
                    "id": 360003041358,
                    "url": "https://audiopartnership1571922554.zendesk.com/api/v2/help_center/en-us/articles/360003041358-How-do-I-customize-my-Help-Center-.json",
                    "html_url": "https://audiopartnership1571922554.zendesk.com/hc/en-us/articles/360003041358-How-do-I-customize-my-Help-Center-",
                    "author_id": 367927678998,
                    "comments_disabled": false,
                    "draft": false,
                    "promoted": false,
                    "position": 0,
                    "vote_sum": 0,
                    "vote_count": 0,
                    "section_id": 360000831918,
                    "created_at": "2019-10-24T13:11:36Z",
                    "updated_at": "2019-10-24T13:11:36Z",
                    "name": "How do I customize my Help Center?",
                    "title": "How do I customize my Help Center?",
                    "source_locale": "en-us",
                    "locale": "en-us",
                    "outdated": false,
                    "outdated_locales": [],
                    "edited_at": "2019-10-24T13:11:36Z",
                    "user_segment_id": null,
                    "permission_group_id": 204358,
                    "label_names": [],
                    "body": "<p>You can modify the look and feel of your Help Center by changing colors and fonts. See <a href=\"https://support.zendesk.com/hc/en-us/articles/206177737\" target=\"_blank\">Branding your Help Center</a> to learn how.</p>\n\n<p>You can also change the design of your Help Center. If you're comfortable working with page code, you can dig in to the site's HTML, CSS, and Javascript to customize your theme. To get started, see <a href=\"https://support.zendesk.com/hc/en-us/articles/203664326\" target=\"_blank\">Customizing the Help Center</a>.</p>",
                    "section": {
                        "id": 360000831918,
                        "url": "https://audiopartnership1571922554.zendesk.com/api/v2/help_center/en-us/sections/360000831918-FAQ.json",
                        "html_url": "https://audiopartnership1571922554.zendesk.com/hc/en-us/sections/360000831918-FAQ",
                        "category_id": 360000380458,
                        "position": 0,
                        "sorting": "manual",
                        "created_at": "2019-10-24T13:11:36Z",
                        "updated_at": "2019-10-24T13:12:22Z",
                        "name": "FAQ",
                        "description": "",
                        "locale": "en-us",
                        "source_locale": "en-us",
                        "outdated": false,
                        "parent_section_id": null,
                        "theme_template": "section_page"
                    },
                    "category": {
                        "id": 360000380458,
                        "url": "https://audiopartnership1571922554.zendesk.com/api/v2/help_center/en-us/categories/360000380458-General.json",
                        "html_url": "https://audiopartnership1571922554.zendesk.com/hc/en-us/categories/360000380458-General",
                        "position": 0,
                        "created_at": "2019-10-24T13:11:35Z",
                        "updated_at": "2019-10-24T13:12:22Z",
                        "name": "General",
                        "description": "",
                        "locale": "en-us",
                        "source_locale": "en-us",
                        "outdated": false
                    }
                },
                {
                    "id": 360003041338,
                    "url": "https://audiopartnership1571922554.zendesk.com/api/v2/help_center/en-us/articles/360003041338-What-are-these-sections-and-articles-doing-here-.json",
                    "html_url": "https://audiopartnership1571922554.zendesk.com/hc/en-us/articles/360003041338-What-are-these-sections-and-articles-doing-here-",
                    "author_id": 367927678998,
                    "comments_disabled": false,
                    "draft": false,
                    "promoted": false,
                    "position": 0,
                    "vote_sum": 0,
                    "vote_count": 0,
                    "section_id": 360000831918,
                    "created_at": "2019-10-24T13:11:36Z",
                    "updated_at": "2019-10-24T13:11:36Z",
                    "name": "What are these sections and articles doing here?",
                    "title": "What are these sections and articles doing here?",
                    "source_locale": "en-us",
                    "locale": "en-us",
                    "outdated": false,
                    "outdated_locales": [],
                    "edited_at": "2019-10-24T13:11:36Z",
                    "user_segment_id": null,
                    "permission_group_id": 204358,
                    "label_names": [],
                    "body": "<p>This FAQ is a section in the General category of your Help Center knowledge base. We created this category and a few common sections to help you get started with your Help Center.</p>\n\n<p>The knowledge base in the Help Center consists of three main page types: category pages, section pages, and articles. Here's the structure:</p>\n\n<p><img src=\"//static.zdassets.com/hc/assets/sample-articles/article0_image.png\" alt=\"image\"></p>\n\n<p>You can create your own categories, sections, and articles and modify or completely delete ours. See the <a href=\"https://support.zendesk.com/hc/en-us/articles/218222877\" target=\"_blank\">Organizing knowledge base content</a> and <a href=\"https://support.zendesk.com/hc/en-us/articles/203664366\" target=\"_blank\">Creating articles in the Help Center</a> to learn how.</p>",
                    "section": {
                        "id": 360000831918,
                        "url": "https://audiopartnership1571922554.zendesk.com/api/v2/help_center/en-us/sections/360000831918-FAQ.json",
                        "html_url": "https://audiopartnership1571922554.zendesk.com/hc/en-us/sections/360000831918-FAQ",
                        "category_id": 360000380458,
                        "position": 0,
                        "sorting": "manual",
                        "created_at": "2019-10-24T13:11:36Z",
                        "updated_at": "2019-10-24T13:12:22Z",
                        "name": "FAQ",
                        "description": "",
                        "locale": "en-us",
                        "source_locale": "en-us",
                        "outdated": false,
                        "parent_section_id": null,
                        "theme_template": "section_page"
                    },
                    "category": {
                        "id": 360000380458,
                        "url": "https://audiopartnership1571922554.zendesk.com/api/v2/help_center/en-us/categories/360000380458-General.json",
                        "html_url": "https://audiopartnership1571922554.zendesk.com/hc/en-us/categories/360000380458-General",
                        "position": 0,
                        "created_at": "2019-10-24T13:11:35Z",
                        "updated_at": "2019-10-24T13:12:22Z",
                        "name": "General",
                        "description": "",
                        "locale": "en-us",
                        "source_locale": "en-us",
                        "outdated": false
                    }
                },
                {
                    "id": 360003041318,
                    "url": "https://audiopartnership1571922554.zendesk.com/api/v2/help_center/en-us/articles/360003041318-Welcome-to-your-Help-Center-.json",
                    "html_url": "https://audiopartnership1571922554.zendesk.com/hc/en-us/articles/360003041318-Welcome-to-your-Help-Center-",
                    "author_id": 367927678998,
                    "comments_disabled": false,
                    "draft": false,
                    "promoted": false,
                    "position": 0,
                    "vote_sum": 0,
                    "vote_count": 0,
                    "section_id": 360000831898,
                    "created_at": "2019-10-24T13:11:35Z",
                    "updated_at": "2019-10-24T13:11:35Z",
                    "name": "Welcome to your Help Center!",
                    "title": "Welcome to your Help Center!",
                    "source_locale": "en-us",
                    "locale": "en-us",
                    "outdated": false,
                    "outdated_locales": [],
                    "edited_at": "2019-10-24T13:11:35Z",
                    "user_segment_id": null,
                    "permission_group_id": 204358,
                    "label_names": [],
                    "body": "<p>You're looking at your new <a href=\"https://www.zendesk.com/self-service\" target=\"_blank\">Help Center</a>. We populated it with placeholder content to help you get started. Feel free to edit or delete this content.</p>\n\n<p>The Help Center is designed to provide a complete self-service support option for your customers. The Help Center contains: a knowledge base and, on Guide Professional and Enterprise, a Customer Portal for support requests. You can also add a community to your Help Center if you have Zendesk Gather.</p>\n\n<p>Your customers can search for knowledge base articles to learn a task or search the community, if available, to ask fellow users questions. If your customers can't find an answer, they can submit a support request.</p>\n\n<p>For more information, see <a href=\"https://support.zendesk.com/hc/en-us/articles/203664386\" target=\"_blank\">Help Center guide for end users</a>.</p><p>Each user has a Help Center profile (Guide Professional and Enterprise), so your Help Center users can get to know one another better. Profiles contain relevant information about the user, along with their activities and contributions.</p>",
                    "section": {
                        "id": 360000831898,
                        "url": "https://audiopartnership1571922554.zendesk.com/api/v2/help_center/en-us/sections/360000831898-Announcements.json",
                        "html_url": "https://audiopartnership1571922554.zendesk.com/hc/en-us/sections/360000831898-Announcements",
                        "category_id": 360000380458,
                        "position": 0,
                        "sorting": "manual",
                        "created_at": "2019-10-24T13:11:35Z",
                        "updated_at": "2019-10-24T13:11:35Z",
                        "name": "Announcements",
                        "description": "",
                        "locale": "en-us",
                        "source_locale": "en-us",
                        "outdated": false,
                        "parent_section_id": null,
                        "theme_template": "section_page"
                    },
                    "category": {
                        "id": 360000380458,
                        "url": "https://audiopartnership1571922554.zendesk.com/api/v2/help_center/en-us/categories/360000380458-General.json",
                        "html_url": "https://audiopartnership1571922554.zendesk.com/hc/en-us/categories/360000380458-General",
                        "position": 0,
                        "created_at": "2019-10-24T13:11:35Z",
                        "updated_at": "2019-10-24T13:12:22Z",
                        "name": "General",
                        "description": "",
                        "locale": "en-us",
                        "source_locale": "en-us",
                        "outdated": false
                    }
                }
            ],
            "promotedArticles": [
                {
                    "id": 360003370677,
                    "url": "https://audiopartnership1571922554.zendesk.com/api/v2/help_center/en-us/articles/360003370677-section-name-category-name.json",
                    "html_url": "https://audiopartnership1571922554.zendesk.com/hc/en-us/articles/360003370677-section-name-category-name",
                    "author_id": 367927678998,
                    "comments_disabled": false,
                    "draft": false,
                    "promoted": true,
                    "position": 0,
                    "vote_sum": 0,
                    "vote_count": 0,
                    "section_id": 360000857577,
                    "created_at": "2019-11-05T14:39:13Z",
                    "updated_at": "2019-11-05T14:51:48Z",
                    "name": "section name/category name",
                    "title": "section name/category name",
                    "source_locale": "en-us",
                    "locale": "en-us",
                    "outdated": false,
                    "outdated_locales": [],
                    "edited_at": "2019-11-05T14:51:48Z",
                    "user_segment_id": null,
                    "permission_group_id": 204358,
                    "label_names": [],
                    "body": "<p>sadsadasdsad</p>",
                    "section": {
                        "id": 360000857577,
                        "url": "https://audiopartnership1571922554.zendesk.com/api/v2/help_center/en-us/sections/360000857577-Section-Name.json",
                        "html_url": "https://audiopartnership1571922554.zendesk.com/hc/en-us/sections/360000857577-Section-Name",
                        "category_id": 360000397617,
                        "position": 0,
                        "sorting": "manual",
                        "created_at": "2019-10-28T12:30:45Z",
                        "updated_at": "2019-11-05T14:51:48Z",
                        "name": "Section Name",
                        "description": "Section Description Section Description Section Description Section Description Section Description Section Description Section Description ",
                        "locale": "en-us",
                        "source_locale": "en-us",
                        "outdated": false,
                        "parent_section_id": null,
                        "theme_template": "section_page"
                    },
                    "category": {
                        "id": 360000397617,
                        "url": "https://audiopartnership1571922554.zendesk.com/api/v2/help_center/en-us/categories/360000397617-Category-Name.json",
                        "html_url": "https://audiopartnership1571922554.zendesk.com/hc/en-us/categories/360000397617-Category-Name",
                        "position": 0,
                        "created_at": "2019-10-28T12:30:02Z",
                        "updated_at": "2019-11-05T14:51:48Z",
                        "name": "Category Name",
                        "description": "Category Description Category Description Category Description Category Description",
                        "locale": "en-us",
                        "source_locale": "en-us",
                        "outdated": false
                    }
                },
                {
                    "id": 360003337258,
                    "url": "https://audiopartnership1571922554.zendesk.com/api/v2/help_center/en-us/articles/360003337258-example-3.json",
                    "html_url": "https://audiopartnership1571922554.zendesk.com/hc/en-us/articles/360003337258-example-3",
                    "author_id": 367927678998,
                    "comments_disabled": false,
                    "draft": false,
                    "promoted": true,
                    "position": 0,
                    "vote_sum": 0,
                    "vote_count": 0,
                    "section_id": 360000869277,
                    "created_at": "2019-11-05T14:35:44Z",
                    "updated_at": "2019-11-05T14:35:51Z",
                    "name": "example 3",
                    "title": "example 3",
                    "source_locale": "en-us",
                    "locale": "en-us",
                    "outdated": false,
                    "outdated_locales": [],
                    "edited_at": "2019-11-05T14:35:51Z",
                    "user_segment_id": null,
                    "permission_group_id": 204358,
                    "label_names": [],
                    "body": "<p>sadsadsadsad</p>",
                    "section": {
                        "id": 360000869277,
                        "url": "https://audiopartnership1571922554.zendesk.com/api/v2/help_center/en-us/sections/360000869277-Manuals-Documentation.json",
                        "html_url": "https://audiopartnership1571922554.zendesk.com/hc/en-us/sections/360000869277-Manuals-Documentation",
                        "category_id": 360000405857,
                        "position": 0,
                        "sorting": "manual",
                        "created_at": "2019-10-29T09:18:48Z",
                        "updated_at": "2019-11-05T14:35:51Z",
                        "name": "Manuals & Documentation",
                        "description": "",
                        "locale": "en-us",
                        "source_locale": "en-us",
                        "outdated": false,
                        "parent_section_id": null,
                        "theme_template": "section_page"
                    },
                    "category": {
                        "id": 360000405857,
                        "url": "https://audiopartnership1571922554.zendesk.com/api/v2/help_center/en-us/categories/360000405857-Edge-NQ.json",
                        "html_url": "https://audiopartnership1571922554.zendesk.com/hc/en-us/categories/360000405857-Edge-NQ",
                        "position": 0,
                        "created_at": "2019-10-29T09:17:18Z",
                        "updated_at": "2019-11-05T14:35:51Z",
                        "name": "Edge NQ",
                        "description": "",
                        "locale": "en-us",
                        "source_locale": "en-us",
                        "outdated": false
                    }
                },
                {
                    "id": 360003370377,
                    "url": "https://audiopartnership1571922554.zendesk.com/api/v2/help_center/en-us/articles/360003370377-example-new.json",
                    "html_url": "https://audiopartnership1571922554.zendesk.com/hc/en-us/articles/360003370377-example-new",
                    "author_id": 367927678998,
                    "comments_disabled": false,
                    "draft": false,
                    "promoted": true,
                    "position": 0,
                    "vote_sum": 0,
                    "vote_count": 0,
                    "section_id": 360000881458,
                    "created_at": "2019-11-05T14:34:52Z",
                    "updated_at": "2019-11-05T14:34:58Z",
                    "name": "example new",
                    "title": "example new",
                    "source_locale": "en-us",
                    "locale": "en-us",
                    "outdated": false,
                    "outdated_locales": [],
                    "edited_at": "2019-11-05T14:34:58Z",
                    "user_segment_id": null,
                    "permission_group_id": 204358,
                    "label_names": [],
                    "body": "<p>sadsadsadsad</p>",
                    "section": {
                        "id": 360000881458,
                        "url": "https://audiopartnership1571922554.zendesk.com/api/v2/help_center/en-us/sections/360000881458-Frequently-Asked-Questions.json",
                        "html_url": "https://audiopartnership1571922554.zendesk.com/hc/en-us/sections/360000881458-Frequently-Asked-Questions",
                        "category_id": 360000416878,
                        "position": 0,
                        "sorting": "manual",
                        "created_at": "2019-10-30T14:03:09Z",
                        "updated_at": "2019-11-05T14:34:59Z",
                        "name": "Frequently Asked Questions",
                        "description": "",
                        "locale": "en-us",
                        "source_locale": "en-us",
                        "outdated": false,
                        "parent_section_id": null,
                        "theme_template": "section_page"
                    },
                    "category": {
                        "id": 360000416878,
                        "url": "https://audiopartnership1571922554.zendesk.com/api/v2/help_center/en-us/categories/360000416878-Azur-851N.json",
                        "html_url": "https://audiopartnership1571922554.zendesk.com/hc/en-us/categories/360000416878-Azur-851N",
                        "position": 0,
                        "created_at": "2019-10-30T14:02:02Z",
                        "updated_at": "2019-11-05T14:37:50Z",
                        "name": "Azur 851N",
                        "description": "",
                        "locale": "en-us",
                        "source_locale": "en-us",
                        "outdated": false
                    }
                },
                {
                    "id": 360003362857,
                    "url": "https://audiopartnership1571922554.zendesk.com/api/v2/help_center/en-us/articles/360003362857-Azur-851C.json",
                    "html_url": "https://audiopartnership1571922554.zendesk.com/hc/en-us/articles/360003362857-Azur-851C",
                    "author_id": 367927678998,
                    "comments_disabled": false,
                    "draft": false,
                    "promoted": true,
                    "position": 0,
                    "vote_sum": 0,
                    "vote_count": 0,
                    "section_id": 360000881478,
                    "created_at": "2019-11-05T13:28:44Z",
                    "updated_at": "2019-11-05T14:36:27Z",
                    "name": "Azur 851C",
                    "title": "Azur 851C",
                    "source_locale": "en-us",
                    "locale": "en-us",
                    "outdated": false,
                    "outdated_locales": [],
                    "edited_at": "2019-11-05T13:28:54Z",
                    "user_segment_id": null,
                    "permission_group_id": 204358,
                    "label_names": [],
                    "body": "<ul class=\"attachments\">\n<li>\n<a href=\"https://techsupport.cambridgeaudio.com/hc/en-us/article_attachments/200290122/Azur_851C_User_Manual_Dutch.pdf\" target=\"_blank\" rel=\"noopener\">Azur 851C User Manual Dutch.pdf</a> (4 MB)</li>\n<li>\n<a href=\"https://techsupport.cambridgeaudio.com/hc/en-us/article_attachments/200290132/Azur_851C_User_Manual_Polish.pdf\" target=\"_blank\" rel=\"noopener\">Azur 851C User Manual Polish.pdf</a> (3 MB)</li>\n<li>\n<a href=\"https://techsupport.cambridgeaudio.com/hc/en-us/article_attachments/200290152/Azur_851C_User_Manual_German.pdf\" target=\"_blank\" rel=\"noopener\">Azur 851C User Manual German.pdf</a> (4 MB)</li>\n<li>\n<a href=\"https://techsupport.cambridgeaudio.com/hc/en-us/article_attachments/200281071/Azur_851C_User_Manual_French.pdf\" target=\"_blank\" rel=\"noopener\">Azur 851C User Manual French.pdf</a> (4 MB)</li>\n<li>\n<a href=\"https://techsupport.cambridgeaudio.com/hc/en-us/article_attachments/200281081/Azur_851C_User_Manual_Italian.pdf\" target=\"_blank\" rel=\"noopener\">Azur 851C User Manual Italian.pdf</a> (4 MB)</li>\n<li>\n<a href=\"https://techsupport.cambridgeaudio.com/hc/en-us/article_attachments/200290162/Azur_851C_User_Manual_Russian.pdf\" target=\"_blank\" rel=\"noopener\">Azur 851C User Manual Russian.pdf</a> (4 MB)</li>\n<li>\n<a href=\"https://techsupport.cambridgeaudio.com/hc/en-us/article_attachments/200290172/Azur_851C_User_Manual_Spanish.pdf\" target=\"_blank\" rel=\"noopener\">Azur 851C User Manual Spanish.pdf</a> (4 MB)</li>\n<li>\n<a href=\"https://techsupport.cambridgeaudio.com/hc/en-us/article_attachments/200281091/Azur_851C_User_Manual_Swedish.pdf\" target=\"_blank\" rel=\"noopener\">Azur 851C User Manual Swedish.pdf</a> (4 MB)</li>\n<li>\n<a href=\"https://techsupport.cambridgeaudio.com/hc/en-us/article_attachments/201553621/Azur_851C_Users_Manual_English.pdf\" target=\"_blank\" rel=\"noopener\">Azur 851C Users Manual English.pdf</a> (3 MB)</li>\n</ul>",
                    "section": {
                        "id": 360000881478,
                        "url": "https://audiopartnership1571922554.zendesk.com/api/v2/help_center/en-us/sections/360000881478-Manuals-Documentation.json",
                        "html_url": "https://audiopartnership1571922554.zendesk.com/hc/en-us/sections/360000881478-Manuals-Documentation",
                        "category_id": 360000416878,
                        "position": 0,
                        "sorting": "manual",
                        "created_at": "2019-10-30T14:03:59Z",
                        "updated_at": "2019-11-05T14:37:50Z",
                        "name": "Manuals & Documentation",
                        "description": "",
                        "locale": "en-us",
                        "source_locale": "en-us",
                        "outdated": false,
                        "parent_section_id": null,
                        "theme_template": "section_page"
                    },
                    "category": {
                        "id": 360000416878,
                        "url": "https://audiopartnership1571922554.zendesk.com/api/v2/help_center/en-us/categories/360000416878-Azur-851N.json",
                        "html_url": "https://audiopartnership1571922554.zendesk.com/hc/en-us/categories/360000416878-Azur-851N",
                        "position": 0,
                        "created_at": "2019-10-30T14:02:02Z",
                        "updated_at": "2019-11-05T14:37:50Z",
                        "name": "Azur 851N",
                        "description": "",
                        "locale": "en-us",
                        "source_locale": "en-us",
                        "outdated": false
                    }
                },
                {
                    "id": 360003153958,
                    "url": "https://audiopartnership1571922554.zendesk.com/api/v2/help_center/en-us/articles/360003153958-EDGE-NQ-Technical-Specifications.json",
                    "html_url": "https://audiopartnership1571922554.zendesk.com/hc/en-us/articles/360003153958-EDGE-NQ-Technical-Specifications",
                    "author_id": 367927678998,
                    "comments_disabled": false,
                    "draft": false,
                    "promoted": true,
                    "position": 0,
                    "vote_sum": 0,
                    "vote_count": 0,
                    "section_id": 360000869277,
                    "created_at": "2019-10-30T13:56:58Z",
                    "updated_at": "2019-10-30T13:57:17Z",
                    "name": "EDGE NQ - Technical Specifications",
                    "title": "EDGE NQ - Technical Specifications",
                    "source_locale": "en-us",
                    "locale": "en-us",
                    "outdated": false,
                    "outdated_locales": [],
                    "edited_at": "2019-10-30T13:57:17Z",
                    "user_segment_id": null,
                    "permission_group_id": 204358,
                    "label_names": [],
                    "body": "<ul class=\"attachments\">\n<li>\n<a href=\"https://techsupport.cambridgeaudio.com/hc/en-us/article_attachments/360000755617/Edge_NQ_Technical_Specifications_-_English.pdf\" target=\"_blank\" rel=\"noopener\">Edge NQ Technical Specifications - English.pdf</a> (2 MB)</li>\n<li>\n<a href=\"https://techsupport.cambridgeaudio.com/hc/en-us/article_attachments/360000745118/Edge_NQ_Technical_Specifications_-_Chinese_HK.pdf\" target=\"_blank\" rel=\"noopener\">Edge NQ Technical Specifications - Chinese HK.pdf</a> (10 MB)</li>\n<li>\n<a href=\"https://techsupport.cambridgeaudio.com/hc/en-us/article_attachments/360000755637/Edge_NQ_Technical_Specifications_-_German.pdf\" target=\"_blank\" rel=\"noopener\">Edge NQ Technical Specifications - German.pdf</a> (2 MB)</li>\n</ul>",
                    "section": {
                        "id": 360000869277,
                        "url": "https://audiopartnership1571922554.zendesk.com/api/v2/help_center/en-us/sections/360000869277-Manuals-Documentation.json",
                        "html_url": "https://audiopartnership1571922554.zendesk.com/hc/en-us/sections/360000869277-Manuals-Documentation",
                        "category_id": 360000405857,
                        "position": 0,
                        "sorting": "manual",
                        "created_at": "2019-10-29T09:18:48Z",
                        "updated_at": "2019-11-05T14:35:51Z",
                        "name": "Manuals & Documentation",
                        "description": "",
                        "locale": "en-us",
                        "source_locale": "en-us",
                        "outdated": false,
                        "parent_section_id": null,
                        "theme_template": "section_page"
                    },
                    "category": {
                        "id": 360000405857,
                        "url": "https://audiopartnership1571922554.zendesk.com/api/v2/help_center/en-us/categories/360000405857-Edge-NQ.json",
                        "html_url": "https://audiopartnership1571922554.zendesk.com/hc/en-us/categories/360000405857-Edge-NQ",
                        "position": 0,
                        "created_at": "2019-10-29T09:17:18Z",
                        "updated_at": "2019-11-05T14:35:51Z",
                        "name": "Edge NQ",
                        "description": "",
                        "locale": "en-us",
                        "source_locale": "en-us",
                        "outdated": false
                    }
                },
                {
                    "id": 360003143637,
                    "url": "https://audiopartnership1571922554.zendesk.com/api/v2/help_center/en-us/articles/360003143637-EDGE-NQ-Manual.json",
                    "html_url": "https://audiopartnership1571922554.zendesk.com/hc/en-us/articles/360003143637-EDGE-NQ-Manual",
                    "author_id": 367927678998,
                    "comments_disabled": true,
                    "draft": false,
                    "promoted": true,
                    "position": 0,
                    "vote_sum": 0,
                    "vote_count": 0,
                    "section_id": 360000869277,
                    "created_at": "2019-10-30T12:18:20Z",
                    "updated_at": "2019-10-30T12:18:23Z",
                    "name": "EDGE NQ - Manual",
                    "title": "EDGE NQ - Manual",
                    "source_locale": "en-us",
                    "locale": "en-us",
                    "outdated": false,
                    "outdated_locales": [],
                    "edited_at": "2019-10-30T12:18:23Z",
                    "user_segment_id": null,
                    "permission_group_id": 204358,
                    "label_names": [],
                    "body": "<ul class=\"attachments\">\n<li>\n<a href=\"https://techsupport.cambridgeaudio.com/hc/en-us/article_attachments/360000744918/Edge_NQ_Users_Manual_-_Chinese_HK.pdf\" target=\"_blank\" rel=\"noopener\">Edge NQ Users Manual - Chinese HK.pdf</a> (1 MB)</li>\n<li>\n<a href=\"https://techsupport.cambridgeaudio.com/hc/en-us/article_attachments/360000744938/Edge_NQ_Users_Manual_-_Chinese_CN.pdf\" target=\"_blank\" rel=\"noopener\">Edge NQ Users Manual - Chinese CN.pdf</a> (1 MB)</li>\n<li>\n<a href=\"https://techsupport.cambridgeaudio.com/hc/en-us/article_attachments/360000755577/Edge_NQ_Users_Manual_-_English.pdf\" target=\"_blank\" rel=\"noopener\">Edge NQ Users Manual - English.pdf</a> (900 KB)</li>\n<li>\n<a href=\"https://techsupport.cambridgeaudio.com/hc/en-us/article_attachments/360000744958/Edge_NQ_Users_Manual_-_French.pdf\" target=\"_blank\" rel=\"noopener\">Edge NQ Users Manual - French.pdf</a> (900 KB)</li>\n<li>\n<a href=\"https://techsupport.cambridgeaudio.com/hc/en-us/article_attachments/360000744978/Edge_NQ_Users_Manual_-_German.pdf\" target=\"_blank\" rel=\"noopener\">Edge NQ Users Manual - German.pdf</a> (900 KB)</li>\n<li>\n<a href=\"https://techsupport.cambridgeaudio.com/hc/en-us/article_attachments/360000744998/Edge_NQ_Users_Manual_-_Italian.pdf\" target=\"_blank\" rel=\"noopener\">Edge NQ Users Manual - Italian.pdf</a> (900 KB)</li>\n<li>\n<a href=\"https://techsupport.cambridgeaudio.com/hc/en-us/article_attachments/360000745018/Edge_NQ_Users_Manual_-_Russian.pdf\" target=\"_blank\" rel=\"noopener\">Edge NQ Users Manual - Russian.pdf</a> (1000 KB)</li>\n<li>\n<a href=\"https://techsupport.cambridgeaudio.com/hc/en-us/article_attachments/360000755597/Edge_NQ_Users_Manual_-_Japanese.pdf\" target=\"_blank\" rel=\"noopener\">Edge NQ Users Manual - Japanese.pdf</a> (1 MB)</li>\n<li>\n<a href=\"https://techsupport.cambridgeaudio.com/hc/en-us/article_attachments/360000745038/Edge_NQ_Users_Manual_-_Spanish.pdf\" target=\"_blank\" rel=\"noopener\">Edge NQ Users Manual - Spanish.pdf</a> (900 KB)</li>\n<li>\n<a href=\"https://techsupport.cambridgeaudio.com/hc/en-us/article_attachments/360000745058/Edge_NQ_Users_Manual_-_Swedish.pdf\" target=\"_blank\" rel=\"noopener\">Edge NQ Users Manual - Swedish.pdf</a> (900 KB)</li>\n</ul>\n<p> </p>\n<div class=\"section-tree pull-left\"> </div>",
                    "section": {
                        "id": 360000869277,
                        "url": "https://audiopartnership1571922554.zendesk.com/api/v2/help_center/en-us/sections/360000869277-Manuals-Documentation.json",
                        "html_url": "https://audiopartnership1571922554.zendesk.com/hc/en-us/sections/360000869277-Manuals-Documentation",
                        "category_id": 360000405857,
                        "position": 0,
                        "sorting": "manual",
                        "created_at": "2019-10-29T09:18:48Z",
                        "updated_at": "2019-11-05T14:35:51Z",
                        "name": "Manuals & Documentation",
                        "description": "",
                        "locale": "en-us",
                        "source_locale": "en-us",
                        "outdated": false,
                        "parent_section_id": null,
                        "theme_template": "section_page"
                    },
                    "category": {
                        "id": 360000405857,
                        "url": "https://audiopartnership1571922554.zendesk.com/api/v2/help_center/en-us/categories/360000405857-Edge-NQ.json",
                        "html_url": "https://audiopartnership1571922554.zendesk.com/hc/en-us/categories/360000405857-Edge-NQ",
                        "position": 0,
                        "created_at": "2019-10-29T09:17:18Z",
                        "updated_at": "2019-11-05T14:35:51Z",
                        "name": "Edge NQ",
                        "description": "",
                        "locale": "en-us",
                        "source_locale": "en-us",
                        "outdated": false
                    }
                },
                {
                    "id": 360003113538,
                    "url": "https://audiopartnership1571922554.zendesk.com/api/v2/help_center/en-us/articles/360003113538-EDGE-NQ-Technical-Specifications.json",
                    "html_url": "https://audiopartnership1571922554.zendesk.com/hc/en-us/articles/360003113538-EDGE-NQ-Technical-Specifications",
                    "author_id": 367927678998,
                    "comments_disabled": false,
                    "draft": false,
                    "promoted": true,
                    "position": 0,
                    "vote_sum": 0,
                    "vote_count": 0,
                    "section_id": 360000869277,
                    "created_at": "2019-10-29T11:53:51Z",
                    "updated_at": "2019-10-30T14:05:46Z",
                    "name": "EDGE NQ - Technical Specifications",
                    "title": "EDGE NQ - Technical Specifications",
                    "source_locale": "en-us",
                    "locale": "en-us",
                    "outdated": false,
                    "outdated_locales": [],
                    "edited_at": "2019-10-30T14:05:46Z",
                    "user_segment_id": null,
                    "permission_group_id": 204358,
                    "label_names": [],
                    "body": "<ul class=\"attachments\">\n<li>\n<a href=\"https://techsupport.cambridgeaudio.com/hc/en-us/article_attachments/360000755617/Edge_NQ_Technical_Specifications_-_English.pdf\" target=\"_blank\" rel=\"noopener\">Edge NQ Technical Specifications - English.pdf</a> (2 MB)</li>\n<li>\n<a href=\"https://techsupport.cambridgeaudio.com/hc/en-us/article_attachments/360000745118/Edge_NQ_Technical_Specifications_-_Chinese_HK.pdf\" target=\"_blank\" rel=\"noopener\">Edge NQ Technical Specifications - Chinese HK.pdf</a> (10 MB)</li>\n<li>\n<a href=\"https://techsupport.cambridgeaudio.com/hc/en-us/article_attachments/360000755637/Edge_NQ_Technical_Specifications_-_German.pdf\" target=\"_blank\" rel=\"noopener\">Edge NQ Technical Specifications - German.pdf</a> (2 MB)</li>\n</ul>",
                    "section": {
                        "id": 360000869277,
                        "url": "https://audiopartnership1571922554.zendesk.com/api/v2/help_center/en-us/sections/360000869277-Manuals-Documentation.json",
                        "html_url": "https://audiopartnership1571922554.zendesk.com/hc/en-us/sections/360000869277-Manuals-Documentation",
                        "category_id": 360000405857,
                        "position": 0,
                        "sorting": "manual",
                        "created_at": "2019-10-29T09:18:48Z",
                        "updated_at": "2019-11-05T14:35:51Z",
                        "name": "Manuals & Documentation",
                        "description": "",
                        "locale": "en-us",
                        "source_locale": "en-us",
                        "outdated": false,
                        "parent_section_id": null,
                        "theme_template": "section_page"
                    },
                    "category": {
                        "id": 360000405857,
                        "url": "https://audiopartnership1571922554.zendesk.com/api/v2/help_center/en-us/categories/360000405857-Edge-NQ.json",
                        "html_url": "https://audiopartnership1571922554.zendesk.com/hc/en-us/categories/360000405857-Edge-NQ",
                        "position": 0,
                        "created_at": "2019-10-29T09:17:18Z",
                        "updated_at": "2019-11-05T14:35:51Z",
                        "name": "Edge NQ",
                        "description": "",
                        "locale": "en-us",
                        "source_locale": "en-us",
                        "outdated": false
                    }
                },
                {
                    "id": 360003113997,
                    "url": "https://audiopartnership1571922554.zendesk.com/api/v2/help_center/en-us/articles/360003113997-How-can-I-connect-my-streaming-service-to-the-Azur-851N-.json",
                    "html_url": "https://audiopartnership1571922554.zendesk.com/hc/en-us/articles/360003113997-How-can-I-connect-my-streaming-service-to-the-Azur-851N-",
                    "author_id": 367927678998,
                    "comments_disabled": false,
                    "draft": false,
                    "promoted": true,
                    "position": 0,
                    "vote_sum": 0,
                    "vote_count": 0,
                    "section_id": 360000881458,
                    "created_at": "2019-10-29T09:26:44Z",
                    "updated_at": "2019-10-30T14:03:26Z",
                    "name": "How can I connect my streaming service to the Azur 851N?",
                    "title": "How can I connect my streaming service to the Azur 851N?",
                    "source_locale": "en-us",
                    "locale": "en-us",
                    "outdated": false,
                    "outdated_locales": [],
                    "edited_at": "2019-10-29T09:26:47Z",
                    "user_segment_id": null,
                    "permission_group_id": 204358,
                    "label_names": [
                        "cxa"
                    ],
                    "body": "<p><img src=\"https://techsupport.cambridgeaudio.com/hc/article_attachments/360000119818/mceclip0.png\"><strong>Spotify Connect</strong></p>\n<p>Cambridge Audio network players include the Spotify Connect service which allows you to play your music directly from the network player and using the Spotify app as a remote control.</p>\n<p>Select “Devices Available” from within the Mobile or Desktop app and choose the Cambridge Audio network player on the same network to take advantage of this feature.</p>\n<p>Compatible Streaming Services: Spotify Only</p>\n<p><img src=\"https://techsupport.cambridgeaudio.com/hc/article_attachments/360000119838/mceclip1.png\"> <strong>Apple AirPlay</strong></p>\n<p>You can play any streaming service on your network player using AirPlay from a compatible Apple device.</p>\n<p>Choose “More Devices” and select the Apple AirPlay icon <img class=\"\" src=\"https://techsupport.cambridgeaudio.com/hc/article_attachments/360000119858/mceclip2.png\"> from within your chosen App, Control Centre or iTunes (PC/Mac) and select your Network Player.</p>\n<p>Compatible Streaming Services: Spotify, Apple Music, Tidal, YouTube Music, Deezer, Amazon Music etc.</p>\n<p><img src=\"https://techsupport.cambridgeaudio.com/hc/article_attachments/360000121317/mceclip3.png\"> <strong>USB from my PC or Mac</strong></p>\n<p>Any desktop app can also be played from your PC or Mac through a USB connection to your Cambridge Audio network player when a direct point to point connection is implemented.</p>\n<p>Connect a USB A to B cable between your PC or Mac and the Cambridge Audio network player and select “USB Audio” as the desired digital input through the network players’ interface.</p>\n<p>Compatible Streaming Services: Spotify, Apple Music, Tidal, YouTube Music, Deezer, Amazon Music etc.</p>\n<p><img src=\"https://techsupport.cambridgeaudio.com/hc/article_attachments/360000119878/mceclip4.png\"> <strong>Bluetooth (aptX)</strong></p>\n<p>Audio can also be played over a Bluetooth connection available by connecting the optional BT100 Bluetooth receiver to the Cambridge Audio network player and pairing it to your smart device.  </p>\n<p>Compatible Streaming Services: Spotify, Apple Music, Tidal, YouTube Music, Deezer, Amazon Music etc.</p>\n<p> </p>\n<p><strong>TIDAL</strong></p>\n<p>Please see our FAQ on how to connect via the Cambridge Connect app <a href=\"https://techsupport.cambridgeaudio.com/hc/en-us/articles/360000621849-How-do-I-use-TIDAL-with-the-Cambridge-Audio-Connect-App-\">here</a>.</p>",
                    "section": {
                        "id": 360000881458,
                        "url": "https://audiopartnership1571922554.zendesk.com/api/v2/help_center/en-us/sections/360000881458-Frequently-Asked-Questions.json",
                        "html_url": "https://audiopartnership1571922554.zendesk.com/hc/en-us/sections/360000881458-Frequently-Asked-Questions",
                        "category_id": 360000416878,
                        "position": 0,
                        "sorting": "manual",
                        "created_at": "2019-10-30T14:03:09Z",
                        "updated_at": "2019-11-05T14:34:59Z",
                        "name": "Frequently Asked Questions",
                        "description": "",
                        "locale": "en-us",
                        "source_locale": "en-us",
                        "outdated": false,
                        "parent_section_id": null,
                        "theme_template": "section_page"
                    },
                    "category": {
                        "id": 360000416878,
                        "url": "https://audiopartnership1571922554.zendesk.com/api/v2/help_center/en-us/categories/360000416878-Azur-851N.json",
                        "html_url": "https://audiopartnership1571922554.zendesk.com/hc/en-us/categories/360000416878-Azur-851N",
                        "position": 0,
                        "created_at": "2019-10-30T14:02:02Z",
                        "updated_at": "2019-11-05T14:37:50Z",
                        "name": "Azur 851N",
                        "description": "",
                        "locale": "en-us",
                        "source_locale": "en-us",
                        "outdated": false
                    }
                },
                {
                    "id": 360003113777,
                    "url": "https://audiopartnership1571922554.zendesk.com/api/v2/help_center/en-us/articles/360003113777-Azur-851N-Manual.json",
                    "html_url": "https://audiopartnership1571922554.zendesk.com/hc/en-us/articles/360003113777-Azur-851N-Manual",
                    "author_id": 367927678998,
                    "comments_disabled": false,
                    "draft": false,
                    "promoted": true,
                    "position": 0,
                    "vote_sum": 0,
                    "vote_count": 0,
                    "section_id": 360000881478,
                    "created_at": "2019-10-29T09:19:02Z",
                    "updated_at": "2019-10-30T14:04:44Z",
                    "name": "Azur 851N - Manual",
                    "title": "Azur 851N - Manual",
                    "source_locale": "en-us",
                    "locale": "en-us",
                    "outdated": false,
                    "outdated_locales": [],
                    "edited_at": "2019-10-29T09:19:05Z",
                    "user_segment_id": null,
                    "permission_group_id": 204358,
                    "label_names": [],
                    "body": "<p>Azur 851N Users Manual Chinese.pdf (3 MB)<br>Azur 851N Users Manual German.pdf (2 MB)<br>Azur 851N Users Manual Dutch.pdf (2 MB)<br>Azur 851N Users Manual French.pdf (2 MB)<br>Azur 851N Users Manual English.pdf (2 MB)<br>Azur 851N Users Manual Italian.pdf (2 MB)<br>Azur 851N Users Manual Russian.pdf (2 MB)<br>Azur 851N Users Manual Polish.pdf (2 MB)<br>Azur 851N Users Manual Spanish.pdf (2 MB)<br>Azur 851N Users Manual English - Reference.pdf (2 MB)</p>",
                    "section": {
                        "id": 360000881478,
                        "url": "https://audiopartnership1571922554.zendesk.com/api/v2/help_center/en-us/sections/360000881478-Manuals-Documentation.json",
                        "html_url": "https://audiopartnership1571922554.zendesk.com/hc/en-us/sections/360000881478-Manuals-Documentation",
                        "category_id": 360000416878,
                        "position": 0,
                        "sorting": "manual",
                        "created_at": "2019-10-30T14:03:59Z",
                        "updated_at": "2019-11-05T14:37:50Z",
                        "name": "Manuals & Documentation",
                        "description": "",
                        "locale": "en-us",
                        "source_locale": "en-us",
                        "outdated": false,
                        "parent_section_id": null,
                        "theme_template": "section_page"
                    },
                    "category": {
                        "id": 360000416878,
                        "url": "https://audiopartnership1571922554.zendesk.com/api/v2/help_center/en-us/categories/360000416878-Azur-851N.json",
                        "html_url": "https://audiopartnership1571922554.zendesk.com/hc/en-us/categories/360000416878-Azur-851N",
                        "position": 0,
                        "created_at": "2019-10-30T14:02:02Z",
                        "updated_at": "2019-11-05T14:37:50Z",
                        "name": "Azur 851N",
                        "description": "",
                        "locale": "en-us",
                        "source_locale": "en-us",
                        "outdated": false
                    }
                },
                {
                    "id": 360003103478,
                    "url": "https://audiopartnership1571922554.zendesk.com/api/v2/help_center/en-us/articles/360003103478-Example-Article-Blah-blah.json",
                    "html_url": "https://audiopartnership1571922554.zendesk.com/hc/en-us/articles/360003103478-Example-Article-Blah-blah",
                    "author_id": 367927678998,
                    "comments_disabled": false,
                    "draft": false,
                    "promoted": true,
                    "position": 0,
                    "vote_sum": 0,
                    "vote_count": 0,
                    "section_id": 360000857577,
                    "created_at": "2019-10-28T17:00:16Z",
                    "updated_at": "2019-10-28T17:00:18Z",
                    "name": "Example Article Blah blah",
                    "title": "Example Article Blah blah",
                    "source_locale": "en-us",
                    "locale": "en-us",
                    "outdated": false,
                    "outdated_locales": [],
                    "edited_at": "2019-10-28T17:00:18Z",
                    "user_segment_id": 360000203398,
                    "permission_group_id": 204358,
                    "label_names": [],
                    "body": "<ul class=\"attachments\">\n<li>\n<a href=\"https://techsupport.cambridgeaudio.com/hc/en-us/article_attachments/205848229/Azur_851N_Users_Manual_Chinese.pdf\" target=\"_blank\" rel=\"noopener\">Azur 851N Users Manual Chinese.pdf</a> (3 MB)</li>\n<li>\n<a href=\"https://techsupport.cambridgeaudio.com/hc/en-us/article_attachments/205848249/Azur_851N_Users_Manual_German.pdf\" target=\"_blank\" rel=\"noopener\">Azur 851N Users Manual German.pdf</a> (2 MB)</li>\n<li>\n<a href=\"https://techsupport.cambridgeaudio.com/hc/en-us/article_attachments/205848269/Azur_851N_Users_Manual_Dutch.pdf\" target=\"_blank\" rel=\"noopener\">Azur 851N Users Manual Dutch.pdf</a> (2 MB)</li>\n<li>\n<a href=\"https://techsupport.cambridgeaudio.com/hc/en-us/article_attachments/205884905/Azur_851N_Users_Manual_French.pdf\" target=\"_blank\" rel=\"noopener\">Azur 851N Users Manual French.pdf</a> (2 MB)</li>\n<li>\n<a href=\"https://techsupport.cambridgeaudio.com/hc/en-us/article_attachments/205884925/Azur_851N_Users_Manual_English.pdf\" target=\"_blank\" rel=\"noopener\">Azur 851N Users Manual English.pdf</a> (2 MB)</li>\n<li>\n<a href=\"https://techsupport.cambridgeaudio.com/hc/en-us/article_attachments/205848309/Azur_851N_Users_Manual_Italian.pdf\" target=\"_blank\" rel=\"noopener\">Azur 851N Users Manual Italian.pdf</a> (2 MB)</li>\n<li>\n<a href=\"https://techsupport.cambridgeaudio.com/hc/en-us/article_attachments/205848329/Azur_851N_Users_Manual_Russian.pdf\" target=\"_blank\" rel=\"noopener\">Azur 851N Users Manual Russian.pdf</a> (2 MB)</li>\n<li>\n<a href=\"https://techsupport.cambridgeaudio.com/hc/en-us/article_attachments/205884945/Azur_851N_Users_Manual_Polish.pdf\" target=\"_blank\" rel=\"noopener\">Azur 851N Users Manual Polish.pdf</a> (2 MB)</li>\n<li>\n<a href=\"https://techsupport.cambridgeaudio.com/hc/en-us/article_attachments/205848349/Azur_851N_Users_Manual_Spanish.pdf\" target=\"_blank\" rel=\"noopener\">Azur 851N Users Manual Spanish.pdf</a> (2 MB)</li>\n<li>\n<a href=\"https://techsupport.cambridgeaudio.com/hc/en-us/article_attachments/360000103577/Azur_851N_Users_Manual_English_-_Reference.pdf\" target=\"_blank\" rel=\"noopener\">Azur 851N Users Manual English - Reference.pdf</a> (2 MB)</li>\n</ul>",
                    "section": {
                        "id": 360000857577,
                        "url": "https://audiopartnership1571922554.zendesk.com/api/v2/help_center/en-us/sections/360000857577-Section-Name.json",
                        "html_url": "https://audiopartnership1571922554.zendesk.com/hc/en-us/sections/360000857577-Section-Name",
                        "category_id": 360000397617,
                        "position": 0,
                        "sorting": "manual",
                        "created_at": "2019-10-28T12:30:45Z",
                        "updated_at": "2019-11-05T14:51:48Z",
                        "name": "Section Name",
                        "description": "Section Description Section Description Section Description Section Description Section Description Section Description Section Description ",
                        "locale": "en-us",
                        "source_locale": "en-us",
                        "outdated": false,
                        "parent_section_id": null,
                        "theme_template": "section_page"
                    },
                    "category": {
                        "id": 360000397617,
                        "url": "https://audiopartnership1571922554.zendesk.com/api/v2/help_center/en-us/categories/360000397617-Category-Name.json",
                        "html_url": "https://audiopartnership1571922554.zendesk.com/hc/en-us/categories/360000397617-Category-Name",
                        "position": 0,
                        "created_at": "2019-10-28T12:30:02Z",
                        "updated_at": "2019-11-05T14:51:48Z",
                        "name": "Category Name",
                        "description": "Category Description Category Description Category Description Category Description",
                        "locale": "en-us",
                        "source_locale": "en-us",
                        "outdated": false
                    }
                },
                {
                    "id": 360003103557,
                    "url": "https://audiopartnership1571922554.zendesk.com/api/v2/help_center/en-us/articles/360003103557-Another-article-.json",
                    "html_url": "https://audiopartnership1571922554.zendesk.com/hc/en-us/articles/360003103557-Another-article-",
                    "author_id": 367927678998,
                    "comments_disabled": false,
                    "draft": false,
                    "promoted": true,
                    "position": 0,
                    "vote_sum": 0,
                    "vote_count": 0,
                    "section_id": 360000857577,
                    "created_at": "2019-10-28T15:35:34Z",
                    "updated_at": "2019-10-28T15:37:18Z",
                    "name": "Another article ",
                    "title": "Another article ",
                    "source_locale": "en-us",
                    "locale": "en-us",
                    "outdated": false,
                    "outdated_locales": [],
                    "edited_at": "2019-10-28T15:35:36Z",
                    "user_segment_id": null,
                    "permission_group_id": 204358,
                    "label_names": [],
                    "body": "<p>article is article article is article article is article article is article article is article article is article article is article article is article article is article </p>\n<div id=\"gtx-trans\" style=\"position: absolute; left: 72px; top: 36px;\">\n<div class=\"gtx-trans-icon\"> </div>\n</div>",
                    "section": {
                        "id": 360000857577,
                        "url": "https://audiopartnership1571922554.zendesk.com/api/v2/help_center/en-us/sections/360000857577-Section-Name.json",
                        "html_url": "https://audiopartnership1571922554.zendesk.com/hc/en-us/sections/360000857577-Section-Name",
                        "category_id": 360000397617,
                        "position": 0,
                        "sorting": "manual",
                        "created_at": "2019-10-28T12:30:45Z",
                        "updated_at": "2019-11-05T14:51:48Z",
                        "name": "Section Name",
                        "description": "Section Description Section Description Section Description Section Description Section Description Section Description Section Description ",
                        "locale": "en-us",
                        "source_locale": "en-us",
                        "outdated": false,
                        "parent_section_id": null,
                        "theme_template": "section_page"
                    },
                    "category": {
                        "id": 360000397617,
                        "url": "https://audiopartnership1571922554.zendesk.com/api/v2/help_center/en-us/categories/360000397617-Category-Name.json",
                        "html_url": "https://audiopartnership1571922554.zendesk.com/hc/en-us/categories/360000397617-Category-Name",
                        "position": 0,
                        "created_at": "2019-10-28T12:30:02Z",
                        "updated_at": "2019-11-05T14:51:48Z",
                        "name": "Category Name",
                        "description": "Category Description Category Description Category Description Category Description",
                        "locale": "en-us",
                        "source_locale": "en-us",
                        "outdated": false
                    }
                },
                {
                    "id": 360003094058,
                    "url": "https://audiopartnership1571922554.zendesk.com/api/v2/help_center/en-us/articles/360003094058-article-title.json",
                    "html_url": "https://audiopartnership1571922554.zendesk.com/hc/en-us/articles/360003094058-article-title",
                    "author_id": 367927678998,
                    "comments_disabled": false,
                    "draft": false,
                    "promoted": true,
                    "position": 0,
                    "vote_sum": 0,
                    "vote_count": 0,
                    "section_id": 360000881478,
                    "created_at": "2019-10-28T12:31:27Z",
                    "updated_at": "2019-11-05T14:37:50Z",
                    "name": "article title",
                    "title": "article title",
                    "source_locale": "en-us",
                    "locale": "en-us",
                    "outdated": false,
                    "outdated_locales": [],
                    "edited_at": "2019-10-28T14:58:07Z",
                    "user_segment_id": null,
                    "permission_group_id": 204358,
                    "label_names": [],
                    "body": "<p>Article content Article content Article content Article content Article content Article content Article content Article content Article content Article content Article content Article content Article content Article content Article content Article content Article content Article content Article content Article content Article content Article content Article content Article content Article content Article content Article content Article content Article content Article content Article content Article content Article content Article content Article content Article content Article content Article content Article content Article content Article content Article content Article content </p>\n<div id=\"gtx-trans\" style=\"position: absolute; left: 619px; top: 132px;\">\n<div class=\"gtx-trans-icon\"> </div>\n</div>",
                    "section": {
                        "id": 360000881478,
                        "url": "https://audiopartnership1571922554.zendesk.com/api/v2/help_center/en-us/sections/360000881478-Manuals-Documentation.json",
                        "html_url": "https://audiopartnership1571922554.zendesk.com/hc/en-us/sections/360000881478-Manuals-Documentation",
                        "category_id": 360000416878,
                        "position": 0,
                        "sorting": "manual",
                        "created_at": "2019-10-30T14:03:59Z",
                        "updated_at": "2019-11-05T14:37:50Z",
                        "name": "Manuals & Documentation",
                        "description": "",
                        "locale": "en-us",
                        "source_locale": "en-us",
                        "outdated": false,
                        "parent_section_id": null,
                        "theme_template": "section_page"
                    },
                    "category": {
                        "id": 360000416878,
                        "url": "https://audiopartnership1571922554.zendesk.com/api/v2/help_center/en-us/categories/360000416878-Azur-851N.json",
                        "html_url": "https://audiopartnership1571922554.zendesk.com/hc/en-us/categories/360000416878-Azur-851N",
                        "position": 0,
                        "created_at": "2019-10-30T14:02:02Z",
                        "updated_at": "2019-11-05T14:37:50Z",
                        "name": "Azur 851N",
                        "description": "",
                        "locale": "en-us",
                        "source_locale": "en-us",
                        "outdated": false
                    }
                },
                {
                    "id": 360003041438,
                    "url": "https://audiopartnership1571922554.zendesk.com/api/v2/help_center/en-us/articles/360003041438-34hwh.json",
                    "html_url": "https://audiopartnership1571922554.zendesk.com/hc/en-us/articles/360003041438-34hwh",
                    "author_id": 367927678998,
                    "comments_disabled": false,
                    "draft": true,
                    "promoted": true,
                    "position": 0,
                    "vote_sum": 0,
                    "vote_count": 0,
                    "section_id": 360000831918,
                    "created_at": "2019-10-24T13:12:22Z",
                    "updated_at": "2019-10-24T13:12:22Z",
                    "name": "34hwh",
                    "title": "34hwh",
                    "source_locale": "en-us",
                    "locale": "en-us",
                    "outdated": false,
                    "outdated_locales": [],
                    "edited_at": "2019-10-24T13:12:22Z",
                    "user_segment_id": 360000203398,
                    "permission_group_id": 204358,
                    "label_names": [
                        "cxa"
                    ],
                    "body": "<p>shsdhsdhsdhhsdhsdhsh</p>",
                    "section": {
                        "id": 360000831918,
                        "url": "https://audiopartnership1571922554.zendesk.com/api/v2/help_center/en-us/sections/360000831918-FAQ.json",
                        "html_url": "https://audiopartnership1571922554.zendesk.com/hc/en-us/sections/360000831918-FAQ",
                        "category_id": 360000380458,
                        "position": 0,
                        "sorting": "manual",
                        "created_at": "2019-10-24T13:11:36Z",
                        "updated_at": "2019-10-24T13:12:22Z",
                        "name": "FAQ",
                        "description": "",
                        "locale": "en-us",
                        "source_locale": "en-us",
                        "outdated": false,
                        "parent_section_id": null,
                        "theme_template": "section_page"
                    },
                    "category": {
                        "id": 360000380458,
                        "url": "https://audiopartnership1571922554.zendesk.com/api/v2/help_center/en-us/categories/360000380458-General.json",
                        "html_url": "https://audiopartnership1571922554.zendesk.com/hc/en-us/categories/360000380458-General",
                        "position": 0,
                        "created_at": "2019-10-24T13:11:35Z",
                        "updated_at": "2019-10-24T13:12:22Z",
                        "name": "General",
                        "description": "",
                        "locale": "en-us",
                        "source_locale": "en-us",
                        "outdated": false
                    }
                }
            ]
        }

    }

    function zendeskInit(){
        console.log(getData());

        articlesDOM(getData().allArticles);
    }


    zendeskInit();
});