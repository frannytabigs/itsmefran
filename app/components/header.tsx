import Link from "next/link";

export default function Header() {
  return (
    <>
      {" "}
      <header className="bg-(--headerBackground) p-4 flex flex-row items-center md:block">
        <label
          htmlFor="navbar-toggle"
          className="cursor-pointer md:hidden mr-1"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6 hover:bg-(--hover) rounded-md transition"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </label>
        <nav className="flex justify-between">
          <h1 className="text-xl font-bold">AI CHAT</h1>
          <ul className="gap-8 hidden md:flex">
            <li>
              <Link
                href="/"
                className="p-2 rounded-md hover:bg-(--hover) transition"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="p-2 rounded-md hover:bg-(--hover) transition"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/chat"
                className="p-2 rounded-md hover:bg-(--hover) transition"
              >
                Chat
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <input type="checkbox" id="navbar-toggle" className="hidden peer" />
      <ul className="gap-8 hidden peer-checked:flex flex-col p-10 pt-5 bg-(--headerBackground) peer-checked:md:hidden text-center pb-5">
        <li>
          <Link
            href="/"
            className="p-2 rounded-md hover:bg-(--hover) transition"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            href="/"
            className="p-2 rounded-md hover:bg-(--hover) transition"
          >
            About
          </Link>
        </li>
        <li>
          <Link
            href="/chat"
            className="p-2 rounded-md hover:bg-(--hover) transition"
          >
            Chat
          </Link>
        </li>
      </ul>
    </>
  );
}
