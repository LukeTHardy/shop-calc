import React from "react";
import Link from "next/link";

const Header = () => {
  return (
    <div>
      <Link href="/">
        <h1 className="text-center bold text-[3rem] mt-6">SHOPCALC</h1>
      </Link>
      <p className="mb-6 text-center italic">Shop math. Without the math.</p>
    </div>
  );
};

export default Header;
