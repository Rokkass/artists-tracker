import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import React from ".";
import axios from "axios";
import Input from "~/components/Input";
import useDebounce from "~/helpers/useDebounce";
import { type Artists } from "~/models/artists.model";

type Variables = { artist: string; country: string };

export default function Home() {
  const [nameInput, setNameInput] = useState("");
  const [countryInput, setCountryInput] = useState("");
  const debouncedName = useDebounce(nameInput, 1000);
  const debouncedCountry = useDebounce(countryInput, 1000);
  const variables: Variables = {
    artist: debouncedName,
    country: debouncedCountry,
  };

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
  });

  const sortedArtists = useMemo(() => {
    if (!data?.artists?.items) {
      return [];
    }

    return data.artists.items.slice().sort((obj1, obj2) => {
      return obj2.followers.total - obj1.followers.total;
    });
  }, [data]);

  return (
    <>
      <Head>
        <title>Artist&apos;s Tracker</title>
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
          <Input
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
            placeholder="Name: Drake, Eminem, etc."
          />
          <Input
            value={countryInput}
            onChange={(e) => setCountryInput(e.target.value)}
            placeholder="Country code: GB, US, DE, FR, etc."
          />
          <div className="flex w-full flex-col items-center gap-4">
            {isLoading && nameInput && (
              <div className="text-slate-300">Loading...</div>
            )}
            {nameInput !== "" && !sortedArtists && !isLoading ? (
              <div className="text-slate-300">No artists</div>
            ) : (
              sortedArtists?.map((item) => (
                <Link
                  className="flex w-[90%] max-w-[800px] flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
                  href={"artist/" + item?.id}
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
