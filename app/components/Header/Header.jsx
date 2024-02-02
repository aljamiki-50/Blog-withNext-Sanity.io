import Link from "next/link";
import React from "react";

function Header({ title, tags }) {
  return (
    <header className="  py-14 px-4 mb-12 text-center  border-b dark:border-b-purple-950">
      <h2 className="  uppercase text-3xl  mx-auto  max-w-2xl  bg-red-500 font-bold">
        {title}
      </h2>
      {tags && (
        <Link
          className=" text-start text-xl font-bold  tracking-wider  mt-3 hover:text-purple-600"
          href={"/tag"}
        >
          #Tags
        </Link>
      )}
    </header>
  );
}

export default Header;
