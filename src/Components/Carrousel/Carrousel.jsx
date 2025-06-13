import React, { useEffect, useRef, useState } from "react";

function Carrousel({ children }) {
  const items = React.Children.toArray(children);
  const visibleCount = 3;
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [direction, setDirection] = useState("right");
  const [animating, setAnimating] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const intervalRef = useRef(null);

  const total = items.length;

  // Preload images logic
  useEffect(() => {
    // Get all image srcs from children
    const imgSrcs = [];
    items.forEach((child) => {
      // If the child is an image element
      if (child && child.type === "img" && child.props.src) {
        imgSrcs.push(child.props.src);
      }
      // If the child contains an image as its only child
      else if (
        child &&
        child.props &&
        child.props.children &&
        React.Children.count(child.props.children) === 1
      ) {
        const inner = React.Children.only(child.props.children);
        if (inner && inner.type === "img" && inner.props.src) {
          imgSrcs.push(inner.props.src);
        }
      }
    });

    if (imgSrcs.length === 0) {
      setImagesLoaded(true);
      return;
    }

    let loaded = 0;
    imgSrcs.forEach((src) => {
      const img = new window.Image();
      img.onload = img.onerror = () => {
        loaded++;
        if (loaded === imgSrcs.length) setImagesLoaded(true);
      };
      img.src = src;
    });
  }, [items]);

  // Cambia el índice antes de animar, y luego activa la animación
  const next = () => {
    if (animating) return;
    setDirection("right");
    setCurrentIndex((prev) => (prev + visibleCount) % total);
    setAnimating(true);
  };

  const prev = () => {
    if (animating) return;
    setDirection("left");
    setCurrentIndex((prev) => (prev - visibleCount + total) % total);
    setAnimating(true);
  };

  // Cuando animating cambia a true, desactívalo después de 300ms
  useEffect(() => {
    if (!animating) return;
    const timeout = setTimeout(() => setAnimating(false), 300);
    return () => clearTimeout(timeout);
  }, [animating]);

  useEffect(() => {
    if (!imagesLoaded) return;
    intervalRef.current = setInterval(next, 5000);
    return () => clearInterval(intervalRef.current);
    // eslint-disable-next-line
  }, [imagesLoaded, total]);

  // Obtener los 3 elementos a mostrar
  const visibleItems = [];
  for (let i = 0; i < visibleCount; i++) {
    visibleItems.push(items[(currentIndex + i) % total]);
  }

  if (!imagesLoaded) {
    // Puedes poner un loader aquí si quieres
    return (
      <div
        className="carrousel"
      >
        <span style={{ color: "#fff", fontSize: "1.5rem" }}>
          Cargando imágenes...
        </span>
      </div>
    );
  }

  return (
    <div className="carrousel" style={{ width: "100%" }}>
      <span
        className="carrousel-arrow left"
        onClick={animating ? undefined : prev}
        style={{
          cursor: animating ? "default" : "pointer",
          color: "#fff",
          fontSize: "2.5rem",
          userSelect: "none",
          marginRight: "10px",
        }}
      >
        &#60;
      </span>
      <div
        className={`carrousel-content carrousel-animate-${direction}${
          animating ? " animating" : ""
        }`}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "none",
          transition: "none",
        }}
      >
        {visibleItems.map((item, idx) => (
          <div
            key={idx}
            style={{
              flex: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "0 10px",
            }}
          >
            {item}
          </div>
        ))}
      </div>
      <span
        className="carrousel-arrow right"
        onClick={animating ? undefined : next}
        style={{
          cursor: animating ? "default" : "pointer",
          color: "#fff",
          fontSize: "2.5rem",
          userSelect: "none",
          marginLeft: "10px",
        }}
      >
        &#62;
      </span>
    </div>
  );
}

export default Carrousel;
