console.log('Hello World')

const CLIENT_ID = '881df030e55242c78f17f59d913957af';
const CLIENT_SECRET = 'e793ee44926e4a28a7251f806c1948bc';

let audio;

const getToken = async () => {
    const tokenUrl = 'https://accounts.spotify.com/api/token';
    const options = {
        method: "POST",
        body: 'grant_type=client_credentials',
        headers: {
            "Content-Type": 'application/x-www-form-urlencoded',
            'Authorization': `Basic ${btoa(CLIENT_ID + ':' + CLIENT_SECRET)}`
        }
    };
    const res = await fetch(tokenUrl, options);
    const data = await res.json();
    return data.access_token
};

const getSong = async (track, artist, access_token) => {
    const searchUrl = `https://api.spotify.com/v1/search?q=${track},${artist}&type=track&limit=3`

    const res = await fetch(searchUrl, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${access_token}`
        }
    });
    const data = await res.json();
    const song = data.tracks.items[0].preview_url
    return song
};

const startSong = (song) => {
    if (audio){
        audio.pause()
    }
    
    audio = new Audio(song)
    audio.volume = .2
    audio.play()
};

const stopSong = () => {
    if (audio){
        audio.pause()
    }
};

const clickedEvent = async (imgAlt) => {
    const [track, artist] = imgAlt.split(' - ')

    const access_token = await getToken();
    const song = await getSong(track, artist, access_token);

    startSong(song);
};


fetch(url)