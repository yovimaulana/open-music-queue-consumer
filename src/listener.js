class Listener {
    constructor(playlistService, mailSender) {
        this._playlistService = playlistService
        this._mailSender = mailSender

        this.listen = this.listen.bind(this);
    }

    async listen(message) {
        try {
            const {userId, targetEmail, playlistId} = JSON.parse(message.content.toString())
            const playlist = await this._playlistService.getPlaylistSong(playlistId)
            const result = await this._mailSender.sendEmail(targetEmail, JSON.stringify(playlist))
            console.log(result)
        } catch (error) {
            console.error(error)
        }
    }
}

module.exports = Listener