import React from "react";
import Link from "next/link";
import Image from "next/image";

const Header = () => {
  return (
    <div>
      <Link href="/">
        <div className="flex mt-5">
          <h1 className="bold text-[3rem]">SHOPCALC</h1>
          <Image
            src="/logo1.png" // Route of the image file
            height={65} // Desired size with correct aspect ratio
            width={70} // Desired size with correct aspect ratio
            alt="ShopCalc logo"
            className="pl-2 self-start"
          />
        </div>
      </Link>
      <p className="mb-6 text-center italic">Shop math. Without the math.</p>
    </div>
  );
};

export default Header;
