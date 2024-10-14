import logo from "../../images/logo.jpg";
export default function Header() {
  return (
    <header className="w-full my-0  m-auto flex items-center justify-center pb-8">
      <img className="object-cover" src={logo} alt="" />
    </header>
  );
}
