const { Pool } = require('pg');

class PlaylistService {
    constructor() {
        this._pool = new Pool()
    }

    async getPlaylistSong(playlistId) {
        const queryPlaylist = {
            text: 'select p.id, p.name from playlists p join users u on u.id = p.owner where p.id = $1',
            values: [playlistId]
        }

        const querySong = {
            text: 'select s.id, s.title, s.performer from playlist_songs ps join songs s on s.id = ps.song_id where ps.playlist_id = $1',
            values: [playlistId]
        }

        const resultPlaylist = await this._pool.query(queryPlaylist)
        const resultSong = await this._pool.query(querySong)

        if(resultPlaylist.rows.length) {            
            const playlist = resultPlaylist.rows[0]
            playlist['songs'] = resultSong.rows
    
            return {
                "playlist": playlist
            }
        }

        return {
            "playlists": null
        }

    }
}

module.exports = PlaylistService