"use client";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import { Lighticons, MoonIcons } from "../icons/icons";

function ThemeSwitchButton() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div
      onClick={() => {
        setTheme(theme === "dark" ? "white" : "dark");
      }}
      className=" cursor-pointer rounded-3xl p-1  ring-1 ring-purple-500 hover:bg-purple-500/10 "
    >
      {theme === "dark" ? <Lighticons /> : <MoonIcons />}
    </div>
  );
}

export default ThemeSwitchButton;
