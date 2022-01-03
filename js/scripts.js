
(function () {
    "use strict";

    document.addEventListener('DOMContentLoaded', function () {

        eventListeners();

    });
    
    var Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })

    function eventListeners() {


        // Mobile Menu
        const mobileMenu = document.querySelector('#mobile-menu');
        if (document.querySelector('#button-create')) {
            const buttonOpenForm = document.querySelector('#button-create');
            buttonOpenForm.addEventListener('click', showFormMenu);
        }
        mobileMenu.addEventListener('click', showMenu);
        adjustPlaceholder();
        window.addEventListener('resize', adjustPlaceholder);
    
        // InfiniteScroll
        if (document.querySelector('body.home-page')){
            window.addEventListener('scroll', infiniteScrollPosts);
            let containerListPosts = document.getElementById("container-list");
            containerListPosts.addEventListener('scroll', infiniteScrollPosts);
        }


        // Init Array List && Generate Individual Post
        initList();
        generatePost();

        document.querySelector('#form-test').addEventListener('submit', getValue)
    }

    var arr= [];

    function initList() {

        generateArray();
    }



    async function generateArray(init = 0, end = 6, width = null) {

        try {
            
            if (init == 0 && end == 6) {
                const response = await fetch('https://jsonplaceholder.typicode.com/posts');
                arr = await response.json();
                arr = arr.slice(init, end);
                list(arr);
            }else{
                const response = await fetch('https://jsonplaceholder.typicode.com/posts');
                let array = await response.json();
                array = array.slice(init, end);
                let arrayPlaceholder = arr.concat(array);
                arr = arrayPlaceholder;
                list(arr);
            }

        } catch (error) {

        }


    }


    function infiniteScrollPosts() {

        let mq = window.matchMedia("(max-width:992px)");
        scrollByWidth(mq);
        function scrollByWidth(mq) {
            if (mq.matches) {
                let htmlScroll = document.querySelector('html');
                if (htmlScroll.scrollTop == htmlScroll.scrollTopMax) {
                    generateArray(arr.length, (arr.length + 6));
                }
                
            } else {
                if (event.target.offsetHeight + event.target.scrollTop >= event.target.scrollHeight) {
                    generateArray(arr.length, (arr.length+6));
                }
            }
        }
    }
 


    //List Post

    function list(array) {

        const list = document.querySelector('#list-posts');

        let html = '';
        for (let i = 0; i < array.length; i++) {
            if (i == 0) {
                html = "<article class='article'>"
                html += "<div class='post'>"
                html += "<div class='image-post'>"
                html += "<div class='post-options'>"
                html += "<a href='/post.html?id=" + array[i].id + "'><i class='fas fa-eye view'></i></a>"
                html += "<i class='fas fa-edit edit' id='edit' postId=" + array[i].id + "></i>"
                html += "<i class='fas fa-trash-alt delete' id='delete' postId=" + array[i].id + "></i>"
                html += "</div>"
                html += "<img src='http://placekitten.com/250/250'>"
                html += "</div>"

                html += "<a href='/post.html?id=" + array[i].id + "'>"
                html += "<div class='content-post'>"
                html += "<h4 class='title-post'>" + array[i].title + "</h4>"
                html += "<span class='body-post'>" + array[i].body + "</span>"
                html += "</div>"
                html += "</div>"
                html += "</a>"

                html += "</article>"
                html += "</a>"
            } else {
                html += "<article class='article'>"
                html += "<div class='post'>"
                html += "<div class='image-post'>"
                html += "<div class='post-options'>"
                html += "<a href='/post.html?id=" + array[i].id + "'><i class='fas fa-eye view'></i></a>"
                html += "<i class='fas fa-edit edit' id='edit' postId=" + array[i].id + "></i>"
                html += "<i class='fas fa-trash-alt delete' id='delete' postId=" + array[i].id + "></i>"
                html += "</div>"
                html += "<img src='http://placekitten.com/250/250'>"
                html += "</div>"

                html += "<a href='/post.html?id=" + array[i].id + "'>"
                html += "<div class='content-post'>"
                html += "<h4 class='title-post'>" + array[i].title + "</h4>"
                html += "<span class='body-post'>" + array[i].body + "</span>"
                html += "</div>"
                html += "</div>"
                html += "</a>"

                html += "</article>"
                html += "</a>"
            }

        }
        list.innerHTML = html;
        let edits = document.querySelectorAll('#edit');
        let deletes = document.querySelectorAll('#delete');
        for (let i = 0; i < edits.length; i++) {
            edits[i].addEventListener('click', showFormMenu)
        }
        for (let i = 0; i < deletes.length; i++) {
            deletes[i].addEventListener('click', deletePost)
        }
    }

    async function generatePost(){
        try {
            if (document.querySelector('.post-page')) {
                var post;
                var comments;
                var postId = getParameterByName('id');

                const responsePost = await fetch('https://jsonplaceholder.typicode.com/posts/' + postId);
                post = await responsePost.json();

            
                const responseComments = await fetch('https://jsonplaceholder.typicode.com/posts/' + postId + '/comments');
                comments = await responseComments.json();


                getPostContent(post, comments);

            }

        } catch (error) {
            
        }
    }

    //Get Parameter
    function getParameterByName(name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }

    //Page post

    function getPostContent(post, comments) {
        if (document.querySelector('.post-page')) {
            document.title = 'Post De Gatos Nº'+post.id;
            let postContent = document.querySelector('#container-post');
            let postHtml = '';
            postHtml = "<h2 class='title-post'>"+post.title+"</h2>"
            postHtml += "<div class='image-post'>"
            postHtml += "<img src='http://placekitten.com/250/250' alt=''>"
            postHtml += "</div>"
            postHtml += "<div class='post-body-container'>"
            postHtml += "<p class='post-body'>"+post.body+"</p>"
            postHtml += "</div>"
            postHtml += "<div class='post-footer'>"
            postHtml += "</div>"
            postContent.innerHTML = postHtml;

            let commentsQuantity = document.querySelector('#comments-quantity');
            let quantity = "<h4 class='quantity'>"+comments.length+"</h4>";

            commentsQuantity.innerHTML = quantity;

            let commentsList = document.querySelector('#list-comments');
            var commentsHtml = '';
            for (let i = 0; i < comments.length; i++) {
                if (i == 0) {
                    commentsHtml = "<div class='post-comment'>"
                    commentsHtml += "<div class='user-image'>"
                    commentsHtml += "<img src='https://picsum.photos/100/100' alt=''>"
                    commentsHtml += "</div>"
                    commentsHtml += "<h5 class='user-name'>"+comments[i].name+"</h5>"
                    commentsHtml += "<p class='comment-body'>"+comments[i].body+"</p>"
                    commentsHtml += "</div>"
                } else {
                    commentsHtml += "<div class='post-comment'>"
                    commentsHtml += "<div class='user-image'>"
                    commentsHtml += "<img src='https://picsum.photos/100/100' alt=''>"
                    commentsHtml += "</div>"
                    commentsHtml += "<h5 class='user-name'>" + comments[i].name + "</h5>"
                    commentsHtml += "<p class='comment-body'>" + comments[i].body + "</p>"
                    commentsHtml += "</div>"
                }

            }

            commentsList.innerHTML = commentsHtml;
        }
    }

    //Show mobile menu
    function showMenu() {
        const menu = document.querySelector('.mobile-menu-container');
        const body = document.querySelector('body');
        const backdrop = document.querySelector('#sidebar-backdrop');
        if(document.querySelector('#form-container')){
            const form = document.querySelector('#form-container');
            if (!form.classList.contains('visible-left')) {
                body.classList.toggle('overflow-hidden');
                backdrop.classList.toggle('d-none');
            }
        } else {
            body.classList.toggle('overflow-hidden');
            backdrop.classList.toggle('d-none');
        }
       
        menu.classList.toggle('visible-right');
    }


    
    //Show Form Menu
    function showFormMenu(event){
        const formContainer = document.querySelector('#form-container');
        const body = document.querySelector('body');
        const backdrop = document.querySelector('#sidebar-backdrop');
        let html;
        if( event.target.value == ''){
            html = "<div class='container-close' id='container-close'>"
            html += "<span class='icon-close'><i class='fas fa-times'></i></span>"
            html += "</div>"

            html += "<form action='' id='form' type='create' method='POST' class='form'>"

            html += "<h2 class='form-title'>"
            html += "Crea Tu Post"
            html += "</h2>"

            html += "<div class='form-group'>"
            html += "<label for='user'>User ID</label>"
            html += "<input type='number' name='user' id='user'>"
            html += "</div>"

            html += "<input type='hidden' value='create' name='type'>"

            html += "<div class='form-group'>"
            html += "<label for='title'>Title</label>"
            html += "<input type='text' name='title' id='title'>"
            html += "</div>"

            html += "<div class='form-group'>"
            html += "<label for='body'>Body</label>"
            html += "<textarea name='body' id='body' ></textarea>"
            html += "</div>"

            html += "<div class='container-buttons-form'>"
            html += "<button id='cancel-form'>Cancelar</button>"
            html += "<button type='submit'>Guardar</button>"
            html += "</div>"
            html += "</form>"

        }else{

            let button = event.target;
            const id = button.getAttribute("postId");
            for(let i = 0; i < arr.length; i++){
                if(arr[i].id == id){
                    html = "<div class='container-close' id='container-close'>"
                    html += "<span class='icon-close'><i class='fas fa-times'></i></span>"
                    html += "</div>"
                    html += "<form action='' id='form' type='update' method='POST' class='form'>"
                    html += "<h2 class='form-title'>"
                    html += "Actualiza Tu Post"
                    html += "</h2>"
                    html += "<div class='form-group'>"
                    html += "<label for='user'>User ID</label>"
                    html += "<input type='number' name='user' id='user' value='"+arr[i].userId+"'>"
                    html += "</div>"
                    html += "<input type='hidden' value='update' name='type'>"
                    html += "<input type='hidden' value='"+arr[i].id+"' name='id'>"
                    html += "<div class='form-group'>"
                    html += "<label for='title'>Title</label>"
                    html += "<input type='text' name='title' id='title' value='"+arr[i].title+"'>"
                    html += "</div>"
                    html += "<div class='form-group'>"
                    html += "<label for='body'>Body</label>"
                    html += "<textarea name='body' id='body' >"+arr[i].body+"</textarea>"
                    html += "</div>"
                    html += "<div class='container-buttons-form'>"
                    html += "<button id='cancel-form'>Cancelar</button>"
                    html += "<button type='submit'>Guardar</button>"
                    html += "</div>"
                    html += "</form>"
                };
            }


        }
 

        formContainer.innerHTML = html;

        const form = document.querySelector('#form');
        const close = document.querySelector('#container-close span');
        const cancel = document.querySelector('#cancel-form');
        body.classList.add('overflow-hidden');
        formContainer.classList.toggle('visible-left');
        backdrop.classList.toggle('d-none');
        close.addEventListener('click', closeFormMenu);
        cancel.addEventListener('click', closeFormMenu);
        form.addEventListener('submit', sendForm);
        
    }
    //Close Form Menu
    function closeFormMenu() {
        event.preventDefault();
        const form = document.querySelector('#form-container');
        const body = document.querySelector('body');
        const backdrop = document.querySelector('#sidebar-backdrop');
        body.classList.toggle('overflow-hidden');
        form.classList.toggle('visible-left');
        backdrop.classList.toggle('d-none');

    }

    //Adjust Height Header
    function adjustPlaceholder() {
        const placeholder = document.querySelector('#placeholder-header');
        const header = document.querySelector('#header');
        if (document.querySelector('#form-container')) {
            const form = document.querySelector('#form-container');
            let mq = window.matchMedia("(max-width:768px)");
            dynamicPadding(mq);
            function dynamicPadding(mq) {
                if (mq.matches) {
                    form.setAttribute('style', 'padding-top:' + (header.clientHeight + 20) + 'px');
                } else {
                    form.setAttribute('style', 'padding-top: 50px');
                }
            }
        }
      
        placeholder.setAttribute('style', 'height:' + header.clientHeight + 'px;padding-bottom:25px;')
        
    }

    //Post Actions
    function sendForm(){
        event.preventDefault();
       
        if (event.target.type.value == 'create'){
            let userId = event.target.user.value;
            let title = event.target.title.value;
            let body = event.target.body.value;
            createPost(userId,title,body);

            closeFormMenu();
        }
        
        if (event.target.type.value == 'update'){
            let id = event.target.id.value;
            let userId = event.target.user.value;
            let title = event.target.title.value;
            let body = event.target.body.value;
            updatePost(id, title,body,userId);
        
            closeFormMenu();
        }


    }

    function createPost(userId,title,body){
        fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify({
                title: title,
                body: body,
                userId: userId,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((json) => {
                arr.push(json);
                Toast.fire({
                    icon: 'success',
                    title: 'Post created successfully'
                })
                list(arr);
            });

    }

    function updatePost(id, title, body, userId){
        if (parseInt(id) <= 100) {
            fetch('https://jsonplaceholder.typicode.com/posts/' + id, {
                method: 'PUT',
                body: JSON.stringify({
                    id: id,
                    title: title,
                    body: body,
                    userId: userId,
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
            .then((response) => response.json())
            .then((json) => {
                for (let i = 0; i < arr.length; i++) {
                    if (arr[i].id == json.id) {
                        arr[i].userId = json.userId;
                        arr[i].title = json.title;
                        arr[i].body = json.body;
                    }
                }
                list(arr);
                Toast.fire({
                    icon: 'success',
                    title: 'Post updated successfully'
                })
            });

        }else{
            for(let i = 0; i < arr.length; i++){
                if(arr[i].id == parseInt(id)){
                    arr[i].userId =userId;
                    arr[i].title = title;
                    arr[i].body = body;
                } 
            }
            list(arr);
            Toast.fire({
                icon: 'success',
                title: 'Post updated successfully'
            })
        }

 
    }



    function deletePost() {
        let button = event.target;
        let id = parseInt(button.getAttribute("postId"));
        fetch('https://jsonplaceholder.typicode.com/posts/'+id, {
            method: 'DELETE',
        }).then(response => {
            if (response.status == 200) {
                arr = arr.filter(function(post){
                    return post.id !== id;
                }) 
                list(arr);
                Toast.fire({
                    icon: 'success',
                    title: 'Post deleted successfully'
                })
            }
        });

    }
})();
