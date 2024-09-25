import { memo, useMemo, useState, type MouseEventHandler } from "react";

type Position = [number, number];

export function MapView({ points }: { points: Position[] }) {
  const { setOpen: setModalOpen, Modal } = renderModal();

  return (
    <div>
      <div style={{ position: "relative" }}>
        {points.map((point) => (
          <Marker
            x={point[0]}
            y={point[1]}
            name="exampleMark"
            onClick={() => {
              setModalOpen(true);
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

  const images = [
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2F8b%2Ffe%2F2f%2F8bfe2fc268abda981133434a4c1ec8b3.jpg&f=1&nofb=1&ipt=9efc334a3893a5aa7ab67842980a322b1b8ee13b23c277477e1f301a90a0fe2c&ipo=images",
  ];

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
    Modal: () => (
      <div className={className}>
        <dialog open={open} onClick={handleClick}>
          <article className="grid">
            <div>
              <h2>Whatever the marker is about</h2>
              <p>lorem ipsum dolor sit amet</p>
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
