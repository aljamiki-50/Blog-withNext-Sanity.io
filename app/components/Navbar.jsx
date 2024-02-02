import Link from "next/link";
import React from "react";
import ThemeSwitchButton from "./SwitchButton/ThemeSwitchButton";
import { Lilita_One } from "next/font/google";

const font = Lilita_One({ weight: "400", subsets: ["latin"] });

function Navbar() {
  return (
    <div className=" mx-auto  max-w-5xl px-24">
      <div className="flex  justify-between h-16  w-full items-center">
        <Link href="/">
          <div className={`${font.className} text-3xl dark:text-amber-50 `}>
            Dev <span className=" text-purple-500"> Block</span>
          </div>
        </Link>
        <div className="">
          <ThemeSwitchButton />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
