
$().ready(function() {
    console.log('loaded')

    $('header h2').text('not connected')

    $('#login form #connect').click(function() {
        const jGroupID = $('#login #groupID')
        const jNickname = $('#login #nickname')

        const groupID = jGroupID.val()
        const nickname = jNickname.val()
        
        jGroupID.toggleClass('invalid', groupID == "")
        jNickname.toggleClass('invalid', nickname == "")
        
        if(groupID && nickname) {
            console.log(groupID, nickname)
            //send request
            const jLoader = $('#login .loader')
            jLoader.addClass('active')
            $.post('join', {groupID: groupID, nickname: nickname}, function(data, stat) {
                console.log(data, status)
                
                jLoader.removeClass('active')
                
                //set groupInfo if invalid
                jGroupID.toggleClass('invalid', !data.groupValid)
                $('.inputInfo#groupIDinfo').toggleClass('active', !data.groupValid)
                
                //set nameInfo if invalid
                jNickname.toggleClass('invalid',!data.nameValid)
                $('.inputInfo#nicknameInfo').toggleClass('active', !data.nameValid)

                if(data.groupValid && data.nameValid) window.location.reload()
            }, 'json')
        }

    })
})