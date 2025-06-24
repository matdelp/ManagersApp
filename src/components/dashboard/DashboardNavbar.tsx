import { Menubar, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";
import Link from "next/link";

export const DashboardNavbar = () => {
  return (
    <>
      <Menubar className="flex justify-between px-5 py-8 bg-main-100 rounded-b-none">
        <MenubarMenu>
          <MenubarTrigger>
            <a className="text-xl font-semibold" href="/dashboard">
              Challenges
            </a>
          </MenubarTrigger>
          <MenubarTrigger>
            <Link
              href="/logout" //temporary
              className="bg-main-500 cursor-pointer w-20 p-2 rounded-md text-background-100 font-semibold"
            >
              Log Out{" "}
            </Link>
          </MenubarTrigger>
        </MenubarMenu>
      </Menubar>
    </>
  );
};
