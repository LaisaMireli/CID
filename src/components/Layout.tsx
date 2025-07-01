import {Menu} from "./Menu";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <Menu />
      <div className="ml-20 w-full">{children}</div>
    </div>
  );
}
