
$().ready(function() {
    console.log('loaded')

    $('#login form #connect').click(function() {
        const jCreatorID = $('#create #createID')
        const jNickname = $('#c #nickname')

        const jCreatorID = jGroupID.val()
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
            }, 'json')
        }

    })
})