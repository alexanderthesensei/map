import { useState } from "react";
import type { Map } from "../server";

const OPENING_MODAL_DELAY = 600;

export function MapView({ map: { url, entries } }: { map: Map }) {
  const modal = renderModal();
  const Modal = modal.Modal;

  return (
    <div className="mapview">
      <div style={{ position: "relative" }} className="points">
        <img src={url} alt="Не могу загрузить карту" />
        {entries.map((entry) => (
          <Marker
            x={entry.markerX}
            y={entry.markerY}
            name={entry.title}
            onClick={() => {
              modal.setOpen(true);
              modal.setTitle(entry.title);
              modal.setDescription(entry.description || "");
              modal.setChildren(entry.children);
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
  const [children, setChildren] = useState<Map[]>([]);
  const [opening, setOpening] = useState(false);

  const className = open
    ? "modal-open" +
      (lastState ? " modal-is-closing" : "") +
      (opening ? " modal-is-opening" : "")
    : "";

  function close() {
    if (opening) {
      return;
    }
    setLastState(true);
    setTimeout(() => {
      setOpen(false);
      setLastState(false);
    }, OPENING_MODAL_DELAY);
  }

  function handleClick(event: any) {
    if (event.target === event.currentTarget) {
      close();
    }
  }

  return {
    setOpen: (value: boolean) => {
      setLastState(open);
      setOpen(value);
      setOpening(true);
      setTimeout(() => setOpening(false), OPENING_MODAL_DELAY);
    },
    setTitle,
    setDescription,
    setChildren,
    Modal: () => (
      <div className={className}>
        <dialog open={open} onClick={handleClick}>
          {description ? (
            <article className="grid">
              <div>
                <h2>
                  {title + " "}
                  <button onClick={close}>X</button>
                </h2>
                <p>{description}</p>
              </div>
              <div>
                {children.map((child) => (
                  <MapView map={child} />
                ))}
              </div>
            </article>
          ) : (
            <article>
              <h2>
                {title + " "}
                <button onClick={close}>X</button>
              </h2>
              {children.map((child) => (
                <MapView map={child} />
              ))}
            </article>
          )}
        </dialog>
      </div>
    ),
  };
}
