import { useEffect, useState } from "react";
import { MapView } from "./MapView";

export function BranchPreview() {
  const query = new URLSearchParams(document.location.search);
  const uri = decodeURIComponent(query.get("data") || "");
  const [map, setMap] = useState(null);

  useEffect(() => {
    if (!uri) {
      return;
    }

    fetch(uri)
      .then((response) => response.json())
      .then(setMap);
  }, [uri]);

  if (!uri) {
    return <p>ERROR: NO DATA URI SPECIFIED</p>;
  }

  if (!map) {
    return <p>Loading...</p>;
  }

  return <MapView map={map} />;
}
