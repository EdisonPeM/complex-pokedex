import Popover from "bootstrap/js/dist/popover";
import { isValidElement, useLayoutEffect, useRef } from "react";
import { renderInDiv } from "../utils";

function PokePopup({
  content,
  title = "",
  className = "",
  children,
  ...otherProps
}) {
  const ref = useRef(null);
  useLayoutEffect(() => {
    if (!content) return;

    const element = ref.current;
    const html = isValidElement(content);
    new Popover(element, {
      trigger: "focus",
      content: html ? renderInDiv(content) : `${content}`,
      title,
      html
    });
  }, [content, title]);

  return (
    <button
      ref={ref}
      className={`btn btn-link p-0 text-decoration-none selectable ${className}`}
      {...otherProps}
    >
      {children}
    </button>
  );
}

export default PokePopup;
