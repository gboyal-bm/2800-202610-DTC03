export default function Navbar() {
  return (
    <nav className="w-full bg-[#5eccf3] px-6 py-4 shadow-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        <h1 className="text-xl font-bold text-white">
          Shadesmar
        </h1>

        <ul className="flex gap-6 text-white font-medium">
          <li>
            <a href="#" className="hover:text-slate-100">
              Home
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-slate-100">
              About
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-slate-100">
              Contact
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}