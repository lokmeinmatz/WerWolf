let $ = require('./jquery')

$().ready(function() {
    console.log('loaded')

    $('header h2').text('not connected')

    $('#login form #connect').click(function() {
        const jGroupID = $('#login #groupID')
        const jNickname = $('#login #nickname')

        const groupID = jGroupID.val()
        const nickname = jNickname.val()
        console.log(jNickname)

        jGroupID.toggleClass('invalid', groupID == "")
        jNickname.toggleClass('invalid', nickname == "")

    })
})