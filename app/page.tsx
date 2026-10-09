import Image from "next/image";
import Navbar from "./components/layout/Navbar";

export default function Home() {
  return (
    <>
      {/* <h1>Hello world</h1> */}
      <Navbar/>
      {/* Center glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.06) 30%, transparent 65%)",
        }}
      />
    </>
  );
}
