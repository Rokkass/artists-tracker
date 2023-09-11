<h1 align="center">
  Artist's Tracker
</h1>
<p align="center">Discover your favorite Spotify artists with ease. Search by artist name and dive into their world. Get insights into their followers, genres, and popularity, all according to Spotify. Explore the music you love like never before!</p>

<h2>
  .env file
</h2>

Client Id and secret for `NEXT_PUBLIC_CLIENT_ID` and `NEXT_PUBLIC_CLIENT_SECRET` you can get from your [Spotify for Developers Dashboard](https://developer.spotify.com/dashboard).

For Bearer token, make a call to the Spotify API. You can do this with the following code, swaping out your-client-id and secret with values from dashboard:
`curl -X POST "https://accounts.spotify.com/api/token" \
-H "Content-Type: application/x-www-form-urlencoded" \
-d "grant_type=client_credentials&client_id=your-client-id&client_secret=your-client-secret"
`

<h2>Demo</h2>

![Zrzut ekranu 2023-09-11 o 16 34 49](https://github.com/Rokkass/artists-tracker/assets/68167831/8ab66763-e8a8-4893-892a-a145988fae9d)
![Zrzut ekranu 2023-09-11 o 16 34 59](https://github.com/Rokkass/artists-tracker/assets/68167831/c202b840-2709-4e5a-8d23-ccd38fc7ed7b)
![Zrzut ekranu 2023-09-11 o 16 34 41](https://github.com/Rokkass/artists-tracker/assets/68167831/85635ab7-f46a-48db-8fcd-cb1f39d808b6)

<h2>Create T3 App</h2>

This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`.
