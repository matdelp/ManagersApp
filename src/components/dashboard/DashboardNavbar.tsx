import { Menubar, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";
import { Button } from "../ui/button";

export const DashboardNavbar = () => {
  return (
    <>
      <Menubar className="flex justify-between px-5 py-8 bg-main-100">
        <MenubarMenu>
          <MenubarTrigger>
            <a className="text-xl font-semibold" href="/challenges">
              Challenges
            </a>
          </MenubarTrigger>
          <MenubarTrigger>
            <Button className="bg-main-500 font-semibold" onClick={() => alert("not implemented yet")}>
              Log Out
            </Button>
          </MenubarTrigger>
        </MenubarMenu>
      </Menubar>
    </>
  );
};
