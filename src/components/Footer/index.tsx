import Link from "next/link";
import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="flex items-center justify-center bg-black text-white w-full h-20">
      <ul className="flex flex-row flex-wrap items-center justify-center gap-4">
        <Link href="./" className="transition opacity-70 hover:opacity-100">
          About
        </Link>
        <Link href="./" className="transition opacity-70 hover:opacity-100">
          Blog
        </Link>
        <Link href="./" className="transition opacity-70 hover:opacity-100">
          News
        </Link>
        <Link href="./" className="transition opacity-70 hover:opacity-100">
          Careers
        </Link>
        <Link href="./" className="transition opacity-70 hover:opacity-100">
          FAQs
        </Link>
        <Link href="./" className="transition opacity-70 hover:opacity-100">
          Contact Us
        </Link>
      </ul>
    </footer>
  );
};

export default Footer;
