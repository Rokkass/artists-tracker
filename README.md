# .env file

Client Id and secret for `NEXT_PUBLIC_CLIENT_ID` and `NEXT_PUBLIC_CLIENT_SECRET` you can get from your [Spotify for Developers Dashboard](https://developer.spotify.com/dashboard).

For Bearer token, make a call to the Spotify API. You can do this with the following code, swaping out your-client-id and secret with values from dashboard:
`curl -X POST "https://accounts.spotify.com/api/token" \
-H "Content-Type: application/x-www-form-urlencoded" \
-d "grant_type=client_credentials&client_id=your-client-id&client_secret=your-client-secret"
`

## Create T3 App

This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`.

