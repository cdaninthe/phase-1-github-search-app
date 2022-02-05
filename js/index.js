
document.addEventListener('DOMContentLoaded', function() {

    const form = document.getElementById('github-form')
    const search = document.getElementById('search')
    const userList = document.getElementById('user-list')
    const userRepos = document.getElementById('repos-list')
    createToggle()

    form.addEventListener('submit', handleSubmit)

    function createToggle(){
        const fieldset = document.createElement('fieldset')
        const legend = document.createElement('legend')
        legend.innerText = 'Search by'
        const usersInput = document.createElement('input')
        usersInput.type = 'radio'
        usersInput.id = 'users-search'
        usersInput.value = 'users'
        usersInput.checked = true

        const usersLabel = document.createElement('label')
        usersLabel.innerText = 'users'
        usersLabel.setAttribute('for', 'users-search')

        const reposInput = document.createElement('input')
        reposInput.type = 'radio'
        reposInput.id = 'repos-search'
        reposInput.value = 'repos'

        const reposLabel = document.createElement('label')
        reposLabel.innerText = 'repos'
        reposLabel.setAttribute('for', 'repos-search')

        form.appendChild(fieldset)
        form.insertBefore(fieldset, search)
        console.log(fieldset)
        fieldset.appendChild(legend)
        fieldset.appendChild(usersInput)
        fieldset.appendChild(usersLabel)
        fieldset.appendChild(reposInput)
        fieldset.appendChild(reposLabel)
    }

    const userSearch = document.getElementById('users-search')
    const repoSearch = document.getElementById('repos-search')

    userSearch.addEventListener('click', toggle)
    repoSearch.addEventListener('click', toggle)

    function toggle(event){
        console.log(event.target.id)
        const btn = document.getElementById(event.target.id)
        console.log(btn.id)
        
        if (btn.id === userSearch.id && btn.checked) {
            repoSearch.checked = false
        }
        else if (btn.id === repoSearch.id && btn.checked) {
            userSearch.checked = false
        }
    }

    //The index.html file has a form with a search input. When the form is submitted, it should take the value of the input and search GitHub for user matches using the User Search Endpoint.
    function handleSubmit(event){
        event.preventDefault()
        userList.innerText = ''
        userRepos.innerText = ''
        console.log(`${search.value}`)
        if (userSearch.checked){
            fetchUsers()
        }
        else if (repoSearch.checked){
            fetchAllRepos()
        }
    }

    function createUserCard(user){
        const li = document.createElement('li')
        li.style.borderBlockColor = 'black'
        
        const avatar = document.createElement('img')
        avatar.src = user.avatar_url
        avatar.style.borderRadius = `50%`
        avatar.style.width = `150px`
        avatar.style.height = `150px`
        //avatar.style.float = 'center'
       

       // style="border-top: 5px solid red;"

        const username = document.createElement('h3')
        username.innerText = `Username: ${user.login}`
        //username.style.textAlign = 'center'

        const profile = document.createElement('a')
        profile.href = user.html_url
        profile.innerText = `Link to Profile`
        profile.target = "_blank"
        //profile.style.textAlign = 'center'

        const br = document.createElement('br')
        const br2 = document.createElement('br')
        const hr = document.createElement('hr')
        hr.style.borderWidth = '2px'
        hr.style.borderColor = 'black'


        userList.appendChild(li)
        li.appendChild(br)
        li.appendChild(avatar)
        li.appendChild(username)
        li.appendChild(profile)
        
        li.appendChild(br2)
        li.appendChild(hr)

        //Clicking on one of these users should send a request to the User Repos Endpoint and return data about all the repositories for that user.
        li.addEventListener('click', () => {
            console.log('See repos')
            console.log(user.login)
            userRepos.innerText = ''
            const h2 = document.createElement('h2')
            h2.innerText = `${user.login} repos`
            userRepos.appendChild(h2)
            fetchRepos(user.login)
        })

    }

    //Using the results of the search, display information about the users to the page. (You might include showing their username, avatar and a link to their profile.)
    function displayUsers(arr){
        console.log(arr)
        userList.innerText = ''
        arr.forEach(user => {createUserCard(user)})
    }


    //Clicking on one of these users should send a request to the User Repos Endpoint and return data about all the repositories for that user.
    function fetchRepos(username){
        console.log(`repos from ` + username)
        console.log(`https://api.github.com/users/${username}/repos`)
        fetch(`https://api.github.com/users/${username}/repos`)
        .then(resp => resp.json())
        .then(data => {
            console.log(data)
            displayRepos(data)
        })
    }

    //Using the response from the Users Repos Endpoint, display all the repositories for that user on the page.
    function displayRepos(arr){
        console.log(`hello repos`)
        console.log(arr)
        arr.forEach(repo => {createRepos(repo)})
    }

    function createRepos(repo){
        const li = document.createElement('li')        
        const a = document.createElement('a')
        a.innerText = repo.html_url
        a.href = repo.html_url
        a.target = "_blank"
        userRepos.appendChild(li)
        li.appendChild(a)
    }


    //Bonus
    //Toggle the search bar between searching for users by keyword and searching for repos by keyword by adding an extra button. Hint: you can use the same search bar for this, but you may need to create a variable which stores what the current search type is (user or repo). The endpoint to search repositories by keyword is here.

    function fetchUsers(){
        fetch(`https://api.github.com/search/users?q=${search.value}`)
        .then(resp => resp.json())
        .then(data => {
            console.log(data.items)
            displayUsers(data.items)
            search.value = ''
        })
    }

    function fetchAllRepos(){
        fetch(`https://api.github.com/search/users?q=${search.value}`)
        .then(resp => resp.json())
        .then(data => {
            console.log(data)
            displayRepos(data.items)
            search.value = ''
        })
    }




})








