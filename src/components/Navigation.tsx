import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Users, 
  UserCheck, 
  Calendar, 
  Heart, 
  MessageSquare, 
  LogOut,
  Menu,
  X,
  Home
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  userRole: "admin" | "family" | "caretaker";
  userName?: string;
}

const Navigation = ({ currentPage, onNavigate, userRole, userName = "User" }: NavigationProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const adminMenuItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "patients", label: "Patients", icon: Users },
    { id: "caretakers", label: "Caretakers", icon: UserCheck },
    { id: "assignments", label: "Assignments", icon: Calendar },
    { id: "health-logs", label: "Health Logs", icon: Heart },
    { id: "feedback", label: "Feedback", icon: MessageSquare },
  ];

  const caretakerMenuItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "my-patients", label: "My Patients", icon: Users },
    { id: "schedule", label: "Schedule", icon: Calendar },
    { id: "health-logs", label: "Health Logs", icon: Heart },
  ];

  const menuItems = userRole === "caretaker" ? caretakerMenuItems : adminMenuItems;

  const handleLogout = () => {
    onNavigate("login");
  };

  const NavItems = ({ mobile = false }) => (
    <div className={cn(
      mobile 
        ? "flex flex-col space-y-2 p-4" 
        : "hidden md:flex md:items-center md:space-x-6"
    )}>
      {menuItems.map((item) => {
        const Icon = item.icon;
        return (
          <Button
            key={item.id}
            variant={currentPage === item.id ? "default" : "ghost"}
            className={cn(
              mobile && "justify-start w-full",
              "text-sm font-medium transition-colors"
            )}
            onClick={() => {
              onNavigate(item.id);
              if (mobile) setIsMobileMenuOpen(false);
            }}
          >
            <Icon className="mr-2 h-4 w-4" />
            {item.label}
          </Button>
        );
      })}
    </div>
  );

  return (
    <nav className="border-b bg-card shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <Heart className="h-8 w-8 text-primary mr-2" />
              <span className="text-xl font-bold text-foreground">CareTakers Pro</span>
            </div>
            <NavItems />
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-2">
              <span className="text-sm text-muted-foreground capitalize">{userRole}</span>
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="" alt={userName} />
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {userName.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex flex-col space-y-1 leading-none">
                    <p className="font-medium">{userName}</p>
                    <p className="w-[200px] truncate text-sm text-muted-foreground capitalize">
                      {userRole}
                    </p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              variant="ghost"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden border-t bg-card">
          <NavItems mobile />
        </div>
      )}
    </nav>
  );
};

export default Navigation;