import { useState } from "react";
import type { Entry } from "../server";

export function MapView({ entries }: { entries: Entry[] }) {
  const modal = renderModal();
  const Modal = modal.Modal;

  return (
    <div>
      <div style={{ position: "relative" }}>
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
      <img
        src="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Forig11.deviantart.net%2F562f%2Ff%2F2016%2F089%2Fc%2Fb%2Fcb44bc8b275d1eafbbf7fcf13c400b7c-d9x29tt.jpg&f=1&nofb=1&ipt=0cc2a54840da7c00628d6e2af39e857f60d4fb1fd9501f9be5ba5a0752a27e8b&ipo=images"
        alt="map"
      />

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
      style={{ position: "absolute", left: x, top: y }}
      onClick={() => onClick(name)}
    >
      M
    </button>
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

  function handleClick(event: any) {
    if (event.target === event.currentTarget) {
      setLastState(open);
      setOpen(false);
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
              <h2>{title}</h2>
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
