import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="p-10 pt-5 text-center items-center justify-center w-screen">
        This is a page where you can{" "}
        <Link
          href="/chat"
          className="text-xl font-bold underline hover:--hover"
        >
          chat
        </Link>{" "}
        with AI. Try it!
      </div>
    </>
  );
}
