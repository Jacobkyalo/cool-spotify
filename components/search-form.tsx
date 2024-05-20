"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function SearchForm() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [accessToken, setAccessToken] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios("https://accounts.spotify.com/api/token", {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        // Authorization: `Basic ${btoa(
        //   "725550abf4564499b3abe0be3d7f98a1" +
        //     ":" +
        //     "20f752a1bfa54e4aa48c45d23a31eeb7"
        // )}`,

        Authorization: `Basic ${btoa(
          `${process.env.NEXT_PUBLIC_CLIENT_ID}:${process.env.NEXT_PUBLIC_CLIENT_SECRET}`
        )}`,
      },
      data: "grant_type=client_credentials",
      method: "POST",
    })
      .then((tokenResponse: any) => {
        setAccessToken(tokenResponse.data.access_token);
      })
      .catch((error: any) => {
        console.error("Error fetching access token:", error);
      });
  }, []);

  const handleChange = (event: any) => {
    setSearchTerm(event.target.value);
  };

  const searchSong = async (e: any) => {
    e.preventDefault();

    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.spotify.com/v1/search?q=${searchTerm}&type=track&limit=10`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log(response.data);
      setSearchResults(response.data.tracks.items);
      setLoading(false);
    } catch (error) {
      console.error("Error searching for song:", error);
      setLoading(false);
    }
  };

  return (
    <section className="my-20">
      <form
        className="flex flex-col gap-4 sm:flex-row mb-10 justify-center"
        onSubmit={searchSong}
      >
        <input
          type="text"
          className="flex-1 grow border-2 border-gray-600 focus:border-green-600 active:border-green-600 p-3 rounded-lg outline-none"
          placeholder="Search for a song..."
          value={searchTerm}
          onChange={handleChange}
        />
        <button className="bg-green-600 text-white py-3 px-6 rounded-lg">
          Search
        </button>
      </form>

      {searchResults.length > 0 && (
        <div className="mb-6">
          <span className="text-lg font-bold">`{searchTerm}`</span>
          <span className="text-lg"> results</span>
        </div>
      )}

      {loading && <p>Loading data...</p>}
      <div>
        {searchResults.map((track: any) => (
          <>
            {track?.preview_url && (
              <>
                <div
                  key={track.id}
                  className="mb-6 w-full rounded-lg bg-green-200 p-4"
                >
                  <p>
                    <span className="font-bold">Song:</span>
                    <span> {track.name}</span>
                  </p>
                  <p>
                    <span className="font-bold">Artists: </span>
                    {track.artists.map((artist: any) => artist.name).join(", ")}
                  </p>
                  <p>
                    <span className="font-bold">Album:</span> {track.album.name}
                  </p>
                  <p className="mb-6">
                    <span className="font-bold">Release Date:</span>{" "}
                    {track.album.release_date}
                  </p>
                  {track.preview_url && (
                    <audio controls>
                      <source src={track.preview_url} type="audio/mpeg" />
                    </audio>
                  )}
                </div>
              </>
            )}
          </>
        ))}
      </div>
    </section>
  );
}
