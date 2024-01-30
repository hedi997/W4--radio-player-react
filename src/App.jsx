import { useEffect, useState } from "react";
import "./App.css";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [stations, setStations] = useState([]);

  useEffect(() => {
    fetch("https://api.sr.se/api/v2/channels?format=json&size=100")
      .then((result) => result.json())
      .then((data) => {
        setTimeout(() => {
          setIsLoading(false);
          setStations(data.channels);
        }, 2000);
        console.log(data);
      });
  }, []);

  const filteredChannels = stations.filter((channel) => {
    const channelName = channel.name.toLowerCase();
    const searchTermToLowerCase =
      typeof searchTerm === "string" ? searchTerm.toLowerCase() : "";
    return channelName.includes(searchTermToLowerCase);
  });

  return (
    <div>
      <div className="radioCon">
        <h1>Radioplayers</h1>
        <b>Search radiochannel</b>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        ></input>
        <div>
          {isLoading ? (
            <Skeleton count={10} />
          ) : (
            Array.isArray(filteredChannels) &&
            filteredChannels.map((channel) => (
              <div
                className="radio"
                key={channel.id}
                style={{
                  backgroundColor: "#" + channel.color,
                }}
              >
                <div>
                  <img className="img" src={channel.image} alt={channel.name} />
                </div>
                <div className="radio2">
                  <h1 className="title">{channel.name}</h1>

                  <audio className="audio" controls>
                    <source
                      src={channel.liveaudio.url}
                      type="audio/mpeg"
                    ></source>
                  </audio>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
