// console.log("index.js: loaded");
async function main() {
    try {
        const userId = getUserId();
        const userInfo = await fetchUserInfo(userId);
        const view = createView(userInfo);
        displayView(view);
    } catch (error) {
        console.error(`エラーが発生しました (${error})`);
    }
}

function fetchUserInfo(userId) {
    return fetch(`https://api.github.com/users/${encodeURIComponent(userId)}`)
        .then(response => {
            if (!response.ok) {
                return Promise.reject(new Error(`${response.status}: ${response.statusText}`));
            } else {
                return response.json();
            }
        });
}

function getUserId() {
    return document.getElementById("userId").value;
}


function createView(userInfo) {
    return escapeHTML`
    <h4>${userInfo.name} (@${userInfo.login})</h4>
    <img src="${userInfo.avatar_url}" alt="${userInfo.login}" height="100">
    <dl>
        <dt>Location</dt>
        <dd>${userInfo.location}</dd>
        <dt>Repositories</dt>
        <dd>${userInfo.public_repos}</dd>
    </dl>
    `;
}


function displayView(view) {
    const result = document.getElementById("result");
    result.innerHTML = view;
}



// const heading = document.querySelector("h2");
// // h2要素に含まれるテキストコンテンツを取得する
// const headingText = heading.textContent;

// // // button要素を作成する
// // const button = document.createElement("button");
// // button.textContent = "Push Me";
// // // body要素の子要素としてbuttonを挿入する
// // document.body.appendChild(button);


// // const userId = "任意のGitHubユーザーID";
// const userId = "0xkf";
// // https://github.com/0xkf
// // fetch(`https://api.github.com/users/${encodeURIComponent(userId)}`)
// //     .then(response => {
// //         console.log(response.status); // => 200
// //         return response.json().then(userInfo => {
// //         // JSONパースされたオブジェクトが渡される
// //             console.log(userInfo); // => {...}
// //         });
// //     })
// //     .catch(error => {
// //         console.error(error);
// // });

// function fetchUserInfo(userId) {
//     fetch(`https://api.github.com/users/${encodeURIComponent(userId)}`)
//         .then(response => {
//             console.log(response.status);
//             // エラーレスポンスが返されたことを検知する
//             if (!response.ok) {
//                 console.error("エラーレスポンス", response);
//             } else {
//                 return response.json().then(userInfo => {
//                     console.log(userInfo);
//                 });
//             }
//         }).catch(error => {
//             console.error(error);
//         });
// }

// const view = `
// <h4>${userInfo.name} (@${userInfo.login})</h4>
// <img src="${userInfo.avatar_url}" alt="${userInfo.login}" height="100">
// <dl>
//     <dt>Location</dt>
//     <dd>${userInfo.location}</dd>
//     <dt>Repositories</dt>
//     <dd>${userInfo.public_repos}</dd>
// </dl>
// `;

// const result = document.getElementById("result");
// result.innerHTML = view;
// // const userId = "js-primer-example";
// // fetch(`https://api.github.com/users/${encodeURIComponent(userId)}`)
//     // .then(response => {
//     //     console.log(response.status); // => 200
//     //     return response.json().then(userInfo => {
//     //         // JSONパースされたオブジェクトが渡される
//     //         console.log(userInfo); // => {...}
//     //     });
//     // });

// function fetchUserInfo(userId) {
//     fetch(`https://api.github.com/users/${encodeURIComponent(userId)}`)
//         .then(response => {
//             if (!response.ok) {
//                 console.error("エラーレスポンス", response);
//             } else {
//                 return response.json().then(userInfo => {
//                     // HTMLの組み立て
//                     const view = escapeHTML`
//                     <h4>${userInfo.name} (@${userInfo.login})</h4>
//                     <img src="${userInfo.avatar_url}" alt="${userInfo.login}" height="100">
//                     <dl>
//                         <dt>Location</dt>
//                         <dd>${userInfo.location}</dd>
//                         <dt>Repositories</dt>
//                         <dd>${userInfo.public_repos}</dd>
//                     </dl>
//                     `;
//                     // HTMLの挿入
//                     const result = document.getElementById("result");
//                     result.innerHTML = view;
//                 });
//             }
//         }).catch(error => {
//             console.error(error);
//         });
// }

function escapeSpecialChars(str) {
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function escapeHTML(strings, ...values) {
    return strings.reduce((result, str, i) => {
        const value = values[i - 1];
        if (typeof value === "string") {
            return result + escapeSpecialChars(value) + str;
        } else {
            return result + String(value) + str;
        }
    });
}