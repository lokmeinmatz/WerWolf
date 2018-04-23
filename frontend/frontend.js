
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
            $.post('join', {groupID: groupID, nickname: nickname}, function(data, stat) {
                console.log(data, status)

                if(!data.groupExists) {}
            }, 'json')
        }

    })
})