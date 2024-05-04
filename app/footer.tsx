import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <div>
      {/* Your header content goes here */}
      <Link href="/inventory">
        <h1 className="text-center text-[2rem] mt-6">[MY INVENTORY]</h1>
      </Link>
      <Link href="/woods">
        <h1 className="text-center text-[2rem] mt-6">[WOOD INDEX]</h1>
      </Link>
    </div>
  );
};

export default Footer;
