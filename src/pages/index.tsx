import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import React from ".";
import axios from "axios";

interface Artists {
  artists: {
    href: string;
    items: Array<{
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
    }>;
    limit: number;
    next: string;
    offset: number;
    previous: number | null;
    total: number;
  };
}

type Variables = { artist: string; country: string };

export default function Home() {
  // const data: Album[] = mataAlbums.items;
  const [nameInput, setNameInput] = useState("");
  const [countryInput, setCountryInput] = useState("");

  function useDebounce(value: string, delay: number) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      return () => {
        clearTimeout(handler);
      };
    }, [value, delay]);

    return debouncedValue;
  }
  const debouncedName = useDebounce(nameInput, 1000);
  const debouncedCountry = useDebounce(countryInput, 1000);
  const variables = { artist: debouncedName, country: debouncedCountry };

  const { isLoading, data } = useQuery<Artists, Variables>({
    queryKey: ["artist", variables],
    queryFn: () =>
      axios
        .get<Artists>(
          `https://api.spotify.com/v1/search?q=${nameInput}&type=artist${
            countryInput.length === 2 ? "&market=" + countryInput : ""
          }`,
          {
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_BEARER}`,
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          },
        )
        .then((res) => res.data),
    enabled: nameInput.length > 0,
    keepPreviousData: true,
  });

  const artists = data?.artists?.items.sort(function (obj1, obj2) {
    return obj2.followers.total - obj1.followers.total;
  });

  return (
    <>
      <Head>
        <title>Podcast Tracker</title>
        <meta
          name="description"
          content="Track your favourite spotify podcast's"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="container flex flex-col items-center justify-center gap-4 px-4 py-16 ">
          <h1 className="mb-4 text-5xl font-bold tracking-tight text-white sm:text-[5rem]">
            <span className="text-[hsl(280,100%,70%)]">
              Artist&apos;s Tracker
            </span>
          </h1>
          <input
            type="text"
            placeholder="Name: Drake, Eminem, etc."
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
            className="h-10 w-[90%] max-w-[400px] rounded-xl px-4"
          ></input>

          <input
            type="text"
            placeholder="Country code: GB, US, DE, FR, etc."
            value={countryInput}
            onChange={(e) => setCountryInput(e.target.value)}
            className="h-10 w-[90%] max-w-[400px] rounded-xl px-4"
          ></input>
          <div className="flex w-full flex-col items-center gap-4">
            {isLoading && nameInput && (
              <div className="text-slate-300">Loading...</div>
            )}
            {nameInput !== "" && !artists && !isLoading ? (
              <div className="text-slate-300">No artists</div>
            ) : (
              artists?.map((item) => (
                <Link
                  className="flex w-[90%] max-w-[800px] flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
                  href={process.env.NEXT_PUBLIC_URL + "artist/" + item?.id}
                  key={item.id}
                >
                  <div className="flex flex-row items-center gap-4">
                    {item.images[1] ? (
                      <Image
                        src={item.images[1].url}
                        width="64"
                        height="64"
                        alt="artist cover"
                        className="h-16 w-16"
                      />
                    ) : (
                      <div className="h-16 w-16 bg-gray-300"></div>
                    )}
                    <div>
                      <h3 className="text-2xl font-bold">
                        Artist name: {item.name} →
                      </h3>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </main>
    </>
  );
}
