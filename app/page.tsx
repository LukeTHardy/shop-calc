import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <div className="link-container flex items-center justify-center w-[30rem] h-[17rem]">
        <div className="grid grid-rows-3 grid-cols-2 gap-8 h-full">
          <Link
            href="/bfcalc"
            className="border-2 border-neutral hover:border-accent rounded-3xl h-full w-full flex items-center justify-center text-xl"
          >
            <span>Board Ft. Calculator</span>
          </Link>
          <Link
            href="/units"
            className="border-2 border-neutral hover:border-accent rounded-3xl h-full w-full flex items-center justify-center text-xl"
          >
            <span className="text-center">Imperial/Metric Unit Conversion</span>
          </Link>
          <Link
            href="/fractions"
            className="border-2 border-neutral hover:border-accent rounded-3xl h-full w-full flex items-center justify-center text-xl"
          >
            <span className="text-center">Fraction/Decimal Conversion</span>
          </Link>
          <Link
            href="/triangles"
            className="border-2 border-neutral hover:border-accent rounded-3xl h-full w-full flex items-center justify-center text-xl"
          >
            Triangle Side Finder
          </Link>
          <Link
            href="/polygons"
            className="border-2 border-neutral hover:border-accent rounded-3xl h-full w-full flex items-center justify-center text-xl"
          >
            Polygon Angle Finder
          </Link>
          <Link
            href="/miters"
            className="border-2 border-neutral hover:border-accent rounded-3xl h-full w-full flex items-center justify-center text-xl"
          >
            <span className="text-center">Compound Miter Calculator</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
