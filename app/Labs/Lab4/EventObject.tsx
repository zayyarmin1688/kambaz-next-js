"use client";

import { useState } from "react";

type SerializableMouseEvent = { //had to do this because I'm 
  type: string;
  timeStamp: number;
  screenX: number;
  screenY: number;
  clientX: number;
  clientY: number;
  button: number;
  detail: number;
  targetHTML: string;
};

export default function EventObject() {
  const [event, setEvent] = useState<SerializableMouseEvent | null>(null);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const targetHTML = (e.target as HTMLElement).outerHTML;
    const ne = e.nativeEvent;

    const serializable: SerializableMouseEvent = {
      type: ne.type,
      timeStamp: ne.timeStamp,
      screenX: ne.screenX,
      screenY: ne.screenY,
      clientX: ne.clientX,
      clientY: ne.clientY,
      button: ne.button,
      detail: ne.detail,
      targetHTML,
    };

    setEvent(serializable);
  };

  return (
    <div>
      <h2>Event Object</h2>
      <button
        onClick={handleClick}
        className="btn btn-primary"
        id="wd-display-event-obj-click"
      >
        Display Event Object
      </button>
      <pre>{JSON.stringify(event, null, 2)}</pre>
      <hr />
    </div>
  );
}
