import * as React from "react";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent } from "@/src/components/ui/card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import { MoreHorizontal, Settings, LogOut } from "lucide-react";
import { useCurrentUser } from "@/src/hooks/user";

export default function SidebarProfile() {
  const { user } = useCurrentUser();

  return (
    <Card className="w-full max-w-[300px]">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src={user?.profileImageURL} alt={user?.firstName} />
              <AvatarFallback>{user?.firstName.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-sm font-semibold">{user?.firstName}</h2>
              <p className="text-xs text-muted-foreground">
                @{user?.firstName}
              </p>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="mt-4 flex justify-between text-sm text-muted-foreground">
          <div>
            <span className="font-medium text-foreground">{2000}</span>{" "}
            Followers
          </div>
          <div>
            <span className="font-medium text-foreground">{199}</span> Following
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
