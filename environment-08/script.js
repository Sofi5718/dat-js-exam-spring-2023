"use strict";

window.addEventListener("load", initapp);

let posts = []

async function initapp() {
    posts = await getPosts();
    console.log(posts);
    showPosts();
    
}

async function getPosts() {
    const response = await fetch("posts.json")
    const data = response.json();

    return data;
}

function showPosts() {
    document.querySelector("#posts-list").innerHTML = "";
    posts.sort((a,b)=> b.likes - a.likes)
    for (const post of posts) {
        document.querySelector("#posts-list").insertAdjacentHTML("beforeend", /* html */`
        <article>
                    <img src="${post.image}" alt="${post.caption}" />
                    <h2>${post.caption}</h2>
                    <p>Likes: ${post.likes} <button>like</button></p>
                </article>
        `)
        document.querySelector("#posts-list article:last-child button").addEventListener("click", () => likes(post))
    }
}

function likes(post) {
    post.likes++
    showPosts();

}

