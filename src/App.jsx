import { useCallback, useState } from "react";
import Background from "./components/Background";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import LoveLetter from "./components/LoveLetter";
import Memories from "./components/Memories";
import VideoSection from "./components/VideoSection";
import LoveQuiz from "./components/LoveQuiz";
import LoveCards from "./components/LoveCards";
import OpenWhen from "./components/OpenWhen";
import FinalSection from "./components/FinalSection";
import MusicPlayer from "./components/MusicPlayer";
import { useRevealOnScroll } from "./hooks";

export default function App() {
  const [entered, setEntered] = useState(false);
  const onEnter = useCallback(() => setEntered(true), []);

  useRevealOnScroll([entered]);

  return (
    <>
      <a className="skip" href="#carta">
        Saltar al contenido
      </a>

      <Background />
      <Nav hidden={!entered} />
      <MusicPlayer />

      <main className="app">
        <Hero onEnter={onEnter} entered={entered} />
        <LoveLetter />
        <Memories />
        <VideoSection />
        <LoveQuiz />
        <LoveCards />
        <OpenWhen />
        <FinalSection />
      </main>
    </>
  );
}
