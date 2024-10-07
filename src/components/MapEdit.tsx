import { useEffect, useState } from "react";
import { type Entry, type Map } from "../server";
import { MapView } from "./MapView";
import { codeToHtml } from "shiki";

const EMPTY_ENTRY: Entry = {
  title: "",
  description: "",
  markerX: 0,
  markerY: 0,
  children: [],
};

export function MapEdit() {
  const [url, setUrl] = useState(
    "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Russian_Federation_%28orthographic_projection%29_-_All_Territorial_Disputes.svg/2880px-Russian_Federation_%28orthographic_projection%29_-_All_Territorial_Disputes.svg.png"
  );
  const [entries, setEntries] = useState<Entry[]>([]);

  const [newEntryName, setNewEntryName] = useState("");
  const [addingPoint, setAddingPoint] = useState(false);

  const [code, setCode] = useState("");

  const map: Map = {
    url,
    entries,
  };

  useEffect(() => {
    codeToHtml(JSON.stringify(map, null, 4), {
      lang: "json",
      theme: "one-dark-pro",
    }).then(setCode);
  }, [url, entries]);

  useEffect(() => {
    const map = document
      .querySelector(".points")
      ?.getBoundingClientRect() as DOMRect;

    function handler(event: MouseEvent) {
      const x = ((event.clientX - map.x) / map.width) * 100;
      const y = ((event.clientY - map.y) / map.height) * 100;
      console.log(entries, newEntryName);
      setEntries([
        ...entries,
        {
          title: newEntryName,
          description: "",
          markerX: x,
          markerY: y,
          children: [],
        },
      ]);
      setNewEntryName("");
      setAddingPoint(false);
      window.removeEventListener("mouseup", handler);
      document.body.className = "";
    }

    if (addingPoint) {
      window.addEventListener("mouseup", handler);
      document.body.className = "cross";
    }
  }, [addingPoint]);

  return (
    <div>
      <div className="grid">
        <MapView map={map} />
        <form aria-readonly={addingPoint}>
          <input
            placeholder="image url"
            type="url"
            onInput={wrap(setUrl)}
            value={url}
          />
          {map.entries.map((entry, idx) => (
            <fieldset key={entry.title}>
              <fieldset role="group">
                <input readOnly value={entry.title} />
                <input type="button" value="Delete" />
              </fieldset>
              <textarea placeholder="description">{entry.description}</textarea>
            </fieldset>
          ))}

          <fieldset role="group">
            <input
              placeholder="Name"
              type="text"
              value={newEntryName}
              onInput={wrap(setNewEntryName)}
            />
            <input
              type="button"
              value={addingPoint ? "Click on the map" : "Add a point"}
              onClick={() => {
                if (!newEntryName) {
                  alert("must have a name");
                  return;
                }
                setAddingPoint(true);
              }}
            />
          </fieldset>
        </form>
      </div>
      <div dangerouslySetInnerHTML={{ __html: code }} />
    </div>
  );
}

function wrap(setter: (val: string) => any) {
  return (event: any) => setter(event.target.value);
}
