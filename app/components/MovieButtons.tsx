"use client";

import { Button } from "@/components/ui/button";
import { InfoIcon, PlayCircle } from "lucide-react";
import { useState } from "react";
import PlayVideoModal from "./PlayVideoModal";

interface MovieButtonsProps {
  overview: string;
  id: number;
  age: number;
  title: string;
  releaseDate: number;
  duration: number;
  youtubeUrl: string;
}

const MovieButtons = ({
  age,
  duration,
  id,
  overview,
  releaseDate,
  title,
  youtubeUrl,
}: MovieButtonsProps) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)} className="text-lg font-medium">
        <PlayCircle className="mr-2 h-6 w-6" /> Play
      </Button>
      <Button
        onClick={() => setOpen(true)}
        className="text-lg font-medium bg-white/40 hover:bg-white/30 text-white"
      >
        <InfoIcon className="mr-2 h-6 w-6" /> Learn more
      </Button>

      <PlayVideoModal
        state={open}
        changeState={setOpen}
        age={age}
        duration={duration}
        key={id}
        overview={overview}
        title={title}
        youtubeUrl={youtubeUrl}
        release={releaseDate}
      />
    </>
  );
};

export default MovieButtons;
