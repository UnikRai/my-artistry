"use client"

import { useState, useEffect } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { Menu, Search, Bell, MessageSquare, User, LogOut, ChevronDown, Settings, HelpCircle, Music } from "lucide-react"

// Proper shadcn component imports
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export default function Navbar() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [notifications, setNotifications] = useState(3) // Example notification count
  const [messages, setMessages] = useState(2) // Example message count
  const location = useLocation()
  const navigate = useNavigate()

  // Check if user is logged in
  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) setLoggedIn(true)
  }, [])

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("role")
    setLoggedIn(false)
    navigate("/")
  }

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/find-artist", label: "Find Artist" },
    { path: "/my-booking", label: "My Booking" },
    { path: "/schedule", label: "Schedule" },
    { path: "/artist-profile", label: "My Profile" },
  ]

  return (
    <header
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-300",
        scrolled
          ? "bg-background/95 backdrop-blur-sm border-b shadow-sm text-foreground"
          : location.pathname === "/"
            ? "bg-transparent text-white"
            : "bg-background text-foreground border-b",
      )}
    >
      <div className="container mx-auto px-4 md:px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div
            className={cn(
              "rounded-full p-1.5",
              scrolled || location.pathname !== "/" ? "bg-primary/10" : "bg-white/10",
            )}
          >
            <Music className={cn("h-5 w-5", scrolled || location.pathname !== "/" ? "text-primary" : "text-white")} />
          </div>
          <span className="font-bold text-lg">MyMusic</span>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex gap-6 items-center">
          {navLinks.map(({ path, label }) => (
            <Link
              key={path}
              to={path}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary relative py-1.5",
                location.pathname === path && "text-primary",
              )}
            >
              {label}
              {location.pathname === path && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full" />
              )}
            </Link>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="hidden md:flex gap-3 items-center">
          {/* Search */}
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
            <Search className="h-5 w-5" />
          </Button>

          {loggedIn ? (
            <>
              {/* Notifications */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                    {notifications > 0 && (
                      <Badge
                        variant="destructive"
                        className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-[10px]"
                      >
                        {notifications}
                      </Badge>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80">
                  <div className="flex items-center justify-between p-4">
                    <h3 className="font-medium">Notifications</h3>
                    <Button variant="ghost" size="sm" className="h-auto p-0 text-xs text-primary">
                      Mark all as read
                    </Button>
                  </div>
                  <DropdownMenuSeparator />
                  <div className="max-h-80 overflow-y-auto">
                    {[...Array(3)].map((_, i) => (
                      <DropdownMenuItem key={i} className="p-4 cursor-pointer">
                        <div className="flex gap-3">
                          <Avatar className="h-9 w-9">
                            <AvatarImage src={`/placeholder.svg?height=36&width=36`} />
                            <AvatarFallback>U</AvatarFallback>
                          </Avatar>
                          <div className="space-y-1">
                            <p className="text-sm">
                              <span className="font-medium">Sarah Chen</span> sent you a booking request
                            </p>
                            <p className="text-xs text-muted-foreground">2 hours ago</p>
                          </div>
                        </div>
                      </DropdownMenuItem>
                    ))}
                  </div>
                  <DropdownMenuSeparator />
                  <div className="p-2 text-center">
                    <Button variant="ghost" size="sm" className="w-full text-primary">
                      View all notifications
                    </Button>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Messages */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <MessageSquare className="h-5 w-5" />
                    {messages > 0 && (
                      <Badge
                        variant="destructive"
                        className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-[10px]"
                      >
                        {messages}
                      </Badge>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80">
                  <div className="flex items-center justify-between p-4">
                    <h3 className="font-medium">Messages</h3>
                    <Button variant="ghost" size="sm" className="h-auto p-0 text-xs text-primary">
                      Mark all as read
                    </Button>
                  </div>
                  <DropdownMenuSeparator />
                  <div className="max-h-80 overflow-y-auto">
                    {[...Array(2)].map((_, i) => (
                      <DropdownMenuItem key={i} className="p-4 cursor-pointer">
                        <div className="flex gap-3">
                          <Avatar className="h-9 w-9">
                            <AvatarImage src={`/placeholder.svg?height=36&width=36`} />
                            <AvatarFallback>U</AvatarFallback>
                          </Avatar>
                          <div className="space-y-1">
                            <p className="text-sm font-medium">John Smith</p>
                            <p className="text-xs text-muted-foreground line-clamp-1">
                              Hi there! I'm interested in booking you for an event next month...
                            </p>
                            <p className="text-xs text-muted-foreground">30 min ago</p>
                          </div>
                        </div>
                      </DropdownMenuItem>
                    ))}
                  </div>
                  <DropdownMenuSeparator />
                  <div className="p-2 text-center">
                    <Button variant="ghost" size="sm" className="w-full text-primary">
                      View all messages
                    </Button>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder.svg?height=32&width=32" />
                      <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                    <span className="hidden lg:inline-block">My Account</span>
                    <ChevronDown className="h-4 w-4 opacity-50" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="flex items-center gap-2 p-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder.svg?height=32&width=32" />
                      <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col space-y-0.5">
                      <p className="text-sm font-medium">John Doe</p>
                      <p className="text-xs text-muted-foreground">john@example.com</p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/artist-profile" className="flex cursor-pointer items-center">
                      <User className="mr-2 h-4 w-4" />
                      <span>My Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/settings" className="flex cursor-pointer items-center">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/help" className="flex cursor-pointer items-center">
                      <HelpCircle className="mr-2 h-4 w-4" />
                      <span>Help & Support</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-red-500 focus:text-red-500 cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Button variant="outline" size="sm" asChild>
                <Link to="/login">Log In</Link>
              </Button>
              <Button size="sm" asChild>
                <Link to="/signup">Sign Up</Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>
            <div className="py-6 space-y-6">
              {loggedIn && (
                <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="/placeholder.svg?height=40&width=40" />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">John Doe</p>
                    <p className="text-sm text-muted-foreground">john@example.com</p>
                  </div>
                </div>
              )}

              <nav className="flex flex-col space-y-1">
                {navLinks.map(({ path, label }) => (
                  <SheetClose asChild key={path}>
                    <Link
                      to={path}
                      className={cn(
                        "flex items-center py-3 px-4 rounded-md text-sm font-medium transition-colors",
                        location.pathname === path ? "bg-primary/10 text-primary" : "hover:bg-muted",
                      )}
                    >
                      {label}
                    </Link>
                  </SheetClose>
                ))}
              </nav>

              {loggedIn ? (
                <div className="space-y-1 pt-4 border-t">
                  <SheetClose asChild>
                    <Link
                      to="/settings"
                      className="flex items-center py-3 px-4 rounded-md text-sm font-medium transition-colors hover:bg-muted"
                    >
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link
                      to="/help"
                      className="flex items-center py-3 px-4 rounded-md text-sm font-medium transition-colors hover:bg-muted"
                    >
                      <HelpCircle className="mr-2 h-4 w-4" />
                      Help & Support
                    </Link>
                  </SheetClose>
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center py-3 px-4 rounded-md text-sm font-medium transition-colors hover:bg-muted text-red-500"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </button>
                </div>
              ) : (
                <div className="space-y-4 pt-4 border-t">
                  <SheetClose asChild>
                    <Button asChild className="w-full">
                      <Link to="/login">Log In</Link>
                    </Button>
                  </SheetClose>
                  <SheetClose asChild>
                    <Button asChild variant="outline" className="w-full">
                      <Link to="/signup">Sign Up</Link>
                    </Button>
                  </SheetClose>
                </div>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}

