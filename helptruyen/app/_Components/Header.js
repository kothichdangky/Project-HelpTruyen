"use client";
import { useParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import Navigation from "./Navigation";
import Carousel from "./Carousel";

const image = ["/bg.jpg"];

function Header({session}) {
  const [show, setShow] = useState(false);
  const [position, setChangeColor] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setChangeColor(!entry.isIntersecting);
      },
      { threshold: 0 },
    );
    const sentinel = document.querySelector("#nav-sentinel");

    if (sentinel) observer.observe(sentinel);

    return () => observer.disconnect();
  }, []);


  async function handleShow() {
  await new Promise((res) => setTimeout(res, 200));

    setShow(!show);
  }

  return (
    <>
      <html className={` ${show ? "overflow-hidden" : null}`} />

      <Navigation session={session} position={position} handleShow={handleShow} show={show} />
      <div id="nav-sentinel" className="h-0" />
    </>
  );
}

export default Header;
