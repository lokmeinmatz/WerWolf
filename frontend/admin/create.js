
$().ready(function() {
    console.log('loaded')

    $('#create form #loginButton').click(function() {
        const jUsername = $('#create #username')
        const jCreatorPIN = $('#create #creatorPIN')

        const username = jUsername.val()
        const creatorPIN = jCreatorPIN.val()
        console.log("click")
        
        jUsername.toggleClass('invalid', username == "")
        jCreatorPIN.toggleClass('invalid', creatorPIN == "")
        
        if(username && creatorPIN) {
            //send request
            const jLoader = $('#create .loader')
            jLoader.addClass('active')
            $.post('create', {username: username, PIN: creatorPIN}, function(data, stat) {
                console.log(data, status)
                
                jLoader.removeClass('active')
                
                //set groupInfo if invalid
                jUsername.toggleClass('invalid', !data.groupValid)
                $('.inputInfo#groupIDinfo').toggleClass('active', !data.groupValid)
                
                //set nameInfo if invalid
                jCreatorPIN.toggleClass('invalid',!data.nameValid)
                $('.inputInfo#nicknameInfo').toggleClass('active', !data.nameValid)
            }, 'json')
        }

    })
})