'use client';

import { 
  ChevronDown, 
  Landmark, 
  BetweenHorizonalEnd,
  KeyRound,
} from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarHeader,
    SidebarFooter,
} from "@/components/ui/sidebar"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const items = [
  {
    title: "Contas",
    url: "",
    options: [
      { title: "Inserir", url: "/bankAccount/add" },
      { title: "Pesquisar", url: "/bankAccount" },
    ],
    icon: Landmark,
  },
  {
    title: "Plano de Contas",
    options: [
      { title: "Inserir", url: "/accountPlan/add" },
      { title: "Pesquisar", url: "/accountPlan" },
    ],
    icon: BetweenHorizonalEnd,
  },
]

const utilities = [
  {
    title: "Gerenciar Senhas",
    options: [
      { title: "Usuários", url: "/user" },
      { title: "Grupos de Usuários", url: "/userGroup" },
    ],
    icon: KeyRound,
  },
  { 
    title: "Trocar a Senha", 
    url: "/change-password",
    icon: KeyRound 
  },
  
]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <SidebarGroupLabel>Sistema Financeiro V1.0</SidebarGroupLabel>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>

              <SidebarMenuItem>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <SidebarMenuButton>
                      Cadastros
                      <ChevronDown className="ml-auto" />
                    </SidebarMenuButton>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-[--radix-popper-anchor-width]">
                    {items.map((item) => (
                        item.options && item.options.length > 0 ? (
                          <DropdownMenuSub key={item.title}>
                            <DropdownMenuSubTrigger>
                              <item.icon className="h-4 w-4 mr-2" />
                              <span className="text-sm">{item.title}</span>
                            </DropdownMenuSubTrigger>
                            <DropdownMenuSubContent className="text-xs">
                              {item?.options?.map((option) => (
                                <DropdownMenuItem key={option.title} className="flex items-start gap-2">
                                  <SidebarMenuButton asChild>
                                    <a href={option.url}>{option.title}</a>
                                  </SidebarMenuButton>
                                </DropdownMenuItem>
                              ))}
                            </DropdownMenuSubContent>
                          </DropdownMenuSub>
                        ):(
                            <DropdownMenuItem key={item.title} className="flex items-start gap-2">
                              <SidebarMenuButton asChild>
                                <a href={item?.url}>
                                  <item.icon className="h-4 w-4 mr-2" />
                                  <span className="text-sm">{item.title}</span>
                                </a>
                              </SidebarMenuButton>
                            </DropdownMenuItem>
                        )
                      ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <SidebarMenuButton>
                      Utilitários
                      <ChevronDown className="ml-auto" />
                    </SidebarMenuButton>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-[--radix-popper-anchor-width]">
                    {utilities.map((utility) => (
                      utility.options && utility.options.length > 0 ? (
                        <DropdownMenuSub key={utility.title}>
                          <DropdownMenuSubTrigger>
                            <utility.icon className="h-4 w-4 mr-2" />
                            <span className="text-sm">{utility.title}</span>
                          </DropdownMenuSubTrigger>
                          <DropdownMenuSubContent className="text-xs">
                            {utility?.options?.map((option) => (
                              <DropdownMenuItem key={option.title} className="flex items-start gap-2">
                                <SidebarMenuButton asChild>
                                  <a href={option.url}>{option.title}</a>
                                </SidebarMenuButton>
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuSubContent>
                        </DropdownMenuSub>
                      ):(
                          <DropdownMenuItem key={utility.title} className="flex items-start gap-2">
                            <SidebarMenuButton asChild>
                              <a href={utility.url}>
                                <utility.icon className="h-4 w-4 mr-2" />
                                <span className="text-sm">{utility.title}</span>
                              </a>
                            </SidebarMenuButton>
                          </DropdownMenuItem>
                      )
                    ))} 
                  </DropdownMenuContent>
                </DropdownMenu>
              </SidebarMenuItem>

            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup />
      </SidebarContent>
      
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <a href="/logout">
                <span>Logout</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
