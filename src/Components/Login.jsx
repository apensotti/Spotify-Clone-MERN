import React from 'react'

function Login() {
    const handleClick = () => {
        const clientId = "fe899d8e6907453d9536a4e837b7d9a8";
        const redirectUrl = encodeURIComponent("http://localhost:3000/");
        const apiUrl = "https://accounts.spotify.com/authorize";
        const scope = [
            'user-read-email',
            'user-read-private',
            'user-read-playback-state',
            'user-modify-playback-state',
            'user-read-currently-playing',
            'user-read-playback-position',
            'user-top-read',
            'user-read-recently-played',
            "playlist-read-private",
            "playlist-read-collaborative"
        ].join(" "); // Convert array to space-separated string

        window.location.href = `${apiUrl}?client_id=${clientId}&redirect_uri=${redirectUrl}&scope=${encodeURIComponent(scope)}&response_type=token&show_dialog=true`;

    }
    return (
        <div id='loginPage'>
            <img src="https://storage.googleapis.com/pr-newsroom-wp/1/2023/05/Spotify_Full_Logo_RGB_Black-300x82.png" alt="Spotify" />
            <button onClick={handleClick}>Connect Spotify</button>
        </div>
    )
}

export default Login
