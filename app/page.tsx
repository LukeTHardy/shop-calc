import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <div className="link-container flex items-center flex-col">
        <Link href="/bfcalc" className="my-1 text-xl hover:font-bold ">
          Board Ft. Calculator
        </Link>
        <Link href="/units" className="my-1 text-xl hover:font-bold">
          Imperial/Metric Unit Conversion
        </Link>
        <Link href="/fractions" className="my-1 text-xl hover:font-bold">
          Fraction/Decimal Conversion
        </Link>
        <Link href="/triangles" className="my-1 text-xl hover:font-bold">
          Triangle Side Finder
        </Link>
        <Link href="/polygons" className="my-1 text-xl hover:font-bold">
          Polygon Angle Finder
        </Link>
        <Link href="/miters" className="my-1 text-xl hover:font-bold">
          Compound Miter Calculator
        </Link>
      </div>
    </main>
  );
}
