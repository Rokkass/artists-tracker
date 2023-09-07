import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";
import axios from "axios";
import React from "~/pages";

interface Artist {
  external_urls: {
    spotify: string;
  };
  followers: {
    href: null;
    total: number;
  };
  genres: Array<string>;
  href: string;
  id: string;
  images: Array<{
    height: number;
    url: string;
    width: number;
  }>;
  name: string;
  popularity: number;
  type: string;
  uri: string;
}

export default function ArtistDetailsPage() {
  const router = useRouter();
  const artistId = router.query.id as string;

  const { isLoading, isError, error, data } = useQuery<Artist, Error>({
    queryKey: ["artist", artistId],
    queryFn: () =>
      axios
        .get<Artist>(`https://api.spotify.com/v1/artists/${artistId}`, {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_BEARER}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        })
        .then((res) => res.data),
  });

  useEffect(() => {
    if (isError) void router.push("/");
  }, [isError, router]);

  if (!data) return null;

  return (
    <main className="flex min-h-screen flex-col items-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-slate-300">
      <div className="container flex flex-col items-center justify-center gap-4 px-4 py-16 ">
        <h1 className="mb-8 text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
          <span className="text-[hsl(280,100%,70%)]">{data?.name}</span>
        </h1>
        {data.images[1] ? (
          <Image
            src={data.images[1]?.url}
            width="300"
            height="300"
            className="h-[300px] w-[300px]"
            alt="Artist image"
          />
        ) : (
          <div className="h-16 w-16 bg-gray-300"></div>
        )}
        <Link
          href={!!data ? data.external_urls.spotify : ""}
          className="underline"
        >
          Listen to {data.name} on Spotify
        </Link>
        <p>
          Followers:{" "}
          {data.followers.total
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, " ")}
        </p>
        <p>
          Genres:{" "}
          {data.genres.map((genre, index) => {
            return index + 1 < data.genres.length ? genre + ", " : genre;
          })}
        </p>
        <p>Popularity according to spotify: {data.popularity}/100</p>
      </div>
      <Link href="/" className="text-slate-300 hover:text-slate-600">
        Go back
      </Link>
    </main>
  );
}
