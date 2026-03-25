import { useNavigate, useLocation } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { categoryGroups } from "@/data/products";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

const AppSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setOpenMobile } = useSidebar();
  const searchParams = new URLSearchParams(location.search);
  const activeSubcategory = searchParams.get("subcategory") || "";

  const handleClick = (subcategoryId: string) => {
    navigate(`/products?subcategory=${subcategoryId}`);
    setOpenMobile(false);
  };

  return (
    <Sidebar collapsible="offcanvas" className="border-r">
      <SidebarContent className="pt-4">
        <div className="px-4 pb-4">
          <h2 className="font-display text-lg font-bold text-foreground">Categories</h2>
          <p className="text-xs text-muted-foreground mt-0.5">Browse our collections</p>
        </div>

        {categoryGroups.map((group) => (
          <Collapsible key={group.label} defaultOpen className="group/collapsible">
            <SidebarGroup>
              <CollapsibleTrigger asChild>
                <SidebarGroupLabel className="cursor-pointer hover:bg-sidebar-accent rounded-md px-2 py-1.5 flex items-center justify-between text-xs uppercase tracking-wider font-semibold text-sidebar-foreground/70">
                  {group.label}
                  <ChevronDown className="h-3.5 w-3.5 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                </SidebarGroupLabel>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {group.subcategories.map((sub) => (
                      <SidebarMenuItem key={sub.id}>
                        <SidebarMenuButton
                          onClick={() => handleClick(sub.id)}
                          isActive={activeSubcategory === sub.id}
                          className="gap-3"
                        >
                          <span className="text-base">{sub.icon}</span>
                          <span className="font-body text-sm">{sub.name}</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>
        ))}
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
