import { useEffect, useState } from "react";
import { type Entry, type Map } from "../server";
import { MapView } from "./MapView";
import { codeToHtml } from "shiki";

export function MapEdit() {
  const [url, setUrl] = useState(
    "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Russian_Federation_%28orthographic_projection%29_-_All_Territorial_Disputes.svg/2880px-Russian_Federation_%28orthographic_projection%29_-_All_Territorial_Disputes.svg.png"
  );
  const [entries, setEntries] = useState<Entry[]>([]);

  const [newEntryName, setNewEntryName] = useState("");
  const [addingPointTo, setAddingPointTo] = useState("");

  function updateEntry(idx: number, update: Entry) {
    setEntries([...entries.slice(0, idx), update, ...entries.slice(idx + 1)]);
  }

  function updateEntryChild(entryIdx: number, childIdx: number, update: Map) {
    const entry = entries[entryIdx];
    updateEntry(entryIdx, {...entry, children: [
      ...entry.children.slice(0, childIdx),
      update,
      ...entry.children.slice(childIdx + 1),
    ]})
  }

  useEffect(() => {
    if (addingPointTo == "") {
      return;
    }

    const map = document
      .querySelector(addingPointTo)
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
      setAddingPointTo("");
      window.removeEventListener("mouseup", handler);
      document.body.className = "";
    }

    window.addEventListener("mouseup", handler);
    document.body.className = "cross";
  }, [addingPointTo]);

  return (
    <MapEditComponent
      addingPointTo={addingPointTo}
      setAddingPointTo={setAddingPointTo}
      url={url}
      setUrl={setUrl}
      entries={entries}
      setEntries={setEntries}
      updateEntry={updateEntry}
      newEntryTitle={newEntryName}
      setNewEntryTitle={setNewEntryName}
    />
  );
}

function wrap(setter: (val: string) => any) {
  return (event: any) => setter(event.target.value);
}

interface MapEditComponentProps {
  addingPointTo: string;
  setAddingPointTo(val: string): void;
  url: string;
  setUrl(val: string): void;
  entries: Entry[];
  setEntries(val: Entry[]): void;
  updateEntry(idx: number, val: Entry): void;
  updateEntryChild(entryIdx: number, childIdx: number, val: Map): void;
  newEntryTitle: string;
  setNewEntryTitle(val: string): void;
}

function MapEditComponent({
  addingPointTo,
  setAddingPointTo,
  url,
  setUrl,
  entries,
  setEntries,
  updateEntry,
  updateEntryChild,
  newEntryTitle,
  setNewEntryTitle,
}: MapEditComponentProps) {
  const [mapUid, _] = useState("map" + crypto.randomUUID());
  console.log({ id: "#" + mapUid });

  const map: Map = {
    url,
    entries,
  };

  const [code, setCode] = useState("");
  useEffect(() => {
    codeToHtml(JSON.stringify(map, null, 4), {
      lang: "json",
      theme: "one-dark-pro",
    }).then(setCode);
  }, [url, entries]);

  return (
    <div>
      <div className="grid">
        <MapView map={map} uid={mapUid} />
        <form aria-readonly={Boolean(addingPointTo)}>
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
                <input
                  type="button"
                  value="Delete"
                  onClick={() => setEntries(entries.toSpliced(idx, 1))}
                />
              </fieldset>
              <textarea
                placeholder="description"
                onInput={(event) =>
                  updateEntry(idx, {
                    ...entry,
                    description: event.currentTarget.value,
                  })
                }
                value={entry.description}
              />

              {entry.children.map((child, childIdx) => (
                <MapEditComponent
                  addingPointTo={addingPointTo}
                  setAddingPointTo={setAddingPointTo}
                  url={child.url}
                  setUrl={(url) => updateEntryChild(idx, childIdx, {...child, url})}
                  entries={child.entries}
                  setEntries={(entries) => updateEntryChild(idx, childIdx, {...child, entries})}
                  updateEntry={(entryIdx, update) => }
                  newEntryTitle={newEntryName}
                  setNewEntryTitle={setNewEntryName}
                />
              ))}
              <input
                type="button"
                value="Add child"
                onClick={() =>
                  updateEntry(idx, {
                    ...entry,
                    children: [...entry.children, { url: "", entries: [] }],
                  })
                }
              />
            </fieldset>
          ))}

          <fieldset role="group">
            <input
              placeholder="Name"
              type="text"
              value={newEntryTitle}
              onInput={wrap(setNewEntryTitle)}
            />
            <input
              type="button"
              value={addingPointTo ? "Click on the map" : "Add a point"}
              onClick={() => {
                if (!newEntryTitle) {
                  alert("must have a name");
                  return;
                }
                setAddingPointTo("#" + mapUid);
              }}
            />
          </fieldset>
        </form>
      </div>
      <div dangerouslySetInnerHTML={{ __html: code }} />
    </div>
  );
}
