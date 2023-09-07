import SpotifyProvider from "next-auth/providers/spotify";
import NextAuth from "next-auth";

const options = {
	providers: [
		SpotifyProvider({
			clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
			clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
			// profile(profile) {
			// 	return {
			// 		id: profile.id,
			// 		name: profile.display_name,
			// 		email: profile.email,
			// 		image: profile.images?.[0]?.url
			// 	}
			// },
		}),
	],
}
export default (req, res) => NextAuth(req, res, options);