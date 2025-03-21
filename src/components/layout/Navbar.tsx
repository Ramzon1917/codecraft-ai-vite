import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Menu, X, Code, Settings, LogOut, User, Plus } from "lucide-react";

interface NavbarProps {
  isAuthenticated?: boolean;
  userName?: string;
  userAvatar?: string;
}

const Navbar = ({
  isAuthenticated = false,
  userName = "User",
  userAvatar = "",
}: NavbarProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border h-16 px-4 md:px-6 flex items-center justify-between">
      {/* Logo */}
      <div className="flex items-center">
        <Link to="/" className="flex items-center space-x-2">
          <Code className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl">AppGen</span>
        </Link>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center space-x-6">
        {isAuthenticated ? (
          <>
            <Link
              to="/dashboard"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Dashboard
            </Link>
            <Link
              to="/projects"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              My Projects
            </Link>
            <Link
              to="/generation"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Generate
            </Link>
            <Button asChild variant="default" size="sm">
              <Link to="/new-project">
                <Plus className="mr-2 h-4 w-4" /> New Project
              </Link>
            </Button>
          </>
        ) : (
          <>
            <Link
              to="/features"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Features
            </Link>
            <Link
              to="/pricing"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Pricing
            </Link>
            <Link
              to="/about"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              About
            </Link>
          </>
        )}
      </div>

      {/* Authentication Controls */}
      <div className="flex items-center space-x-4">
        {isAuthenticated ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar>
                  <AvatarImage src={userAvatar} alt={userName} />
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {userName.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <div className="flex items-center justify-start gap-2 p-2">
                <div className="flex flex-col space-y-1 leading-none">
                  <p className="font-medium">{userName}</p>
                </div>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link
                  to="/profile"
                  className="cursor-pointer w-full flex items-center"
                >
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  to="/settings"
                  className="cursor-pointer w-full flex items-center"
                >
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link
                  to="/logout"
                  className="cursor-pointer w-full flex items-center"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <div className="hidden md:flex items-center space-x-2">
            <Button asChild variant="ghost">
              <Link to="/login">Login</Link>
            </Button>
            <Button asChild>
              <Link to="/signup">Sign Up</Link>
            </Button>
          </div>
        )}

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={toggleMobileMenu}
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </Button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-16 z-50 bg-background p-4 flex flex-col space-y-4">
          {isAuthenticated ? (
            <>
              <Link
                to="/dashboard"
                className="text-sm font-medium p-2 hover:bg-accent rounded-md"
                onClick={toggleMobileMenu}
              >
                Dashboard
              </Link>
              <Link
                to="/projects"
                className="text-sm font-medium p-2 hover:bg-accent rounded-md"
                onClick={toggleMobileMenu}
              >
                My Projects
              </Link>
              <Link
                to="/generation"
                className="text-sm font-medium p-2 hover:bg-accent rounded-md"
                onClick={toggleMobileMenu}
              >
                Generate
              </Link>
              <Link
                to="/profile"
                className="text-sm font-medium p-2 hover:bg-accent rounded-md"
                onClick={toggleMobileMenu}
              >
                Profile
              </Link>
              <Link
                to="/settings"
                className="text-sm font-medium p-2 hover:bg-accent rounded-md"
                onClick={toggleMobileMenu}
              >
                Settings
              </Link>
              <Link
                to="/logout"
                className="text-sm font-medium p-2 hover:bg-accent rounded-md"
                onClick={toggleMobileMenu}
              >
                Logout
              </Link>
              <Button asChild className="mt-2">
                <Link to="/new-project" onClick={toggleMobileMenu}>
                  <Plus className="mr-2 h-4 w-4" /> New Project
                </Link>
              </Button>
            </>
          ) : (
            <>
              <Link
                to="/features"
                className="text-sm font-medium p-2 hover:bg-accent rounded-md"
                onClick={toggleMobileMenu}
              >
                Features
              </Link>
              <Link
                to="/pricing"
                className="text-sm font-medium p-2 hover:bg-accent rounded-md"
                onClick={toggleMobileMenu}
              >
                Pricing
              </Link>
              <Link
                to="/about"
                className="text-sm font-medium p-2 hover:bg-accent rounded-md"
                onClick={toggleMobileMenu}
              >
                About
              </Link>
              <div className="flex flex-col space-y-2 mt-4">
                <Button asChild variant="outline">
                  <Link to="/login" onClick={toggleMobileMenu}>
                    Login
                  </Link>
                </Button>
                <Button asChild>
                  <Link to="/signup" onClick={toggleMobileMenu}>
                    Sign Up
                  </Link>
                </Button>
              </div>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
