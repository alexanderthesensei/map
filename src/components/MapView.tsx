import { useState } from "react";
import type { Map } from "../server";

export function MapView({ map: { url, entries } }: { map: Map }) {
  const modal = renderModal();
  const Modal = modal.Modal;

  return (
    <div className="mapview">
      <div style={{ position: "relative" }}>
        <img src={url} alt="map" />
        {entries.map((entry) => (
          <Marker
            x={entry.markerX}
            y={entry.markerY}
            name={entry.title}
            onClick={() => {
              modal.setOpen(true);
              modal.setTitle(entry.title);
              modal.setDescription(entry.description);
              modal.setImages(entry.images);
            }}
          />
        ))}
      </div>

      <Modal />
    </div>
  );
}

function Marker({
  x,
  y,
  name,
  onClick,
}: {
  x: number;
  y: number;
  name: string;
  onClick(name: string): void;
}) {
  return (
    <button
      className="marker"
      style={{ position: "absolute", left: x + "%", top: y + "%" }}
      onClick={() => onClick(name)}
    />
  );
}

function renderModal() {
  const [lastState, setLastState] = useState(false);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState<string[]>([]);

  const className = open
    ? "modal-open modal-is-" + (lastState ? "closing" : "opening")
    : "";

  function close() {
      setLastState(open);
      setTimeout(() => setOpen(false), 1000);
  }

  function handleClick(event: any) {
    if (event.target === event.currentTarget) {
      close()
    }
  }

  return {
    setOpen: (value: boolean) => {
      setLastState(open);
      setOpen(value);
    },
    setTitle,
    setDescription,
    setImages,
    Modal: () => (
      <div className={className}>
        <dialog open={open} onClick={handleClick}>
          <article className="grid">
            <div>
              <h2>
                {title + ' '}
                <button onClick={close}>X</button>
              </h2>
              <p>{description}</p>
            </div>
            <Gallery images={images} />
          </article>
        </dialog>
      </div>
    ),
  };
}

function Gallery({ images }: { images: string[] }) {
  return (
    <div>
      {images.map((url) => (
        <img src={url} />
      ))}
    </div>
  );
}
