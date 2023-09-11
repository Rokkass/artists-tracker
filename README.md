<h1 align="center">
  Artist's Tracker
</h1>
<p align="center">Discover your favorite Spotify artists with ease. Search by artist name and dive into their world. Get insights into their followers, genres, and popularity, all according to Spotify. Explore the music you love like never before!</p>

<h2 id="getting-started">Getting Started</h2>

To experiment with this application, start by cloning the repository and executing the following commands:

```bash
pnpm install
```


Obtain the Client ID and Secret from your [Spotify for Developers Dashboard](https://developer.spotify.com/dashboard), and set them as environment variables `NEXT_PUBLIC_CLIENT_ID` and `NEXT_PUBLIC_CLIENT_SECRET`.

Generate a Bearer token by making an API call to Spotify. Use the following code, replacing `your-client-id` and `your-client-secret` with the values from your dashboard.
```bash
curl -X POST "https://accounts.spotify.com/api/token" \
-H "Content-Type: application/x-www-form-urlencoded" \
-d "grant_type=client_credentials&client_id=your-client-id&client_secret=your-client-secret"
```


Once your `.env` file is properly configured, run the development server:
```bash
pnpm run dev
```

<h2>Demo</h2>

![Zrzut ekranu 2023-09-11 o 16 34 49](https://github.com/Rokkass/artists-tracker/assets/68167831/8ab66763-e8a8-4893-892a-a145988fae9d)
![Zrzut ekranu 2023-09-11 o 16 34 59](https://github.com/Rokkass/artists-tracker/assets/68167831/c202b840-2709-4e5a-8d23-ccd38fc7ed7b)
![Zrzut ekranu 2023-09-11 o 16 34 41](https://github.com/Rokkass/artists-tracker/assets/68167831/85635ab7-f46a-48db-8fcd-cb1f39d808b6)

<h2>Create T3 App</h2>

This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`.
