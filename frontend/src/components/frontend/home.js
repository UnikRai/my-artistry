"use client"

import { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  Search,
  Music2,
  Calendar,
  CreditCard,
  Star,
  Users,
  MessageSquare,
  Shield,
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Mail,
} from "lucide-react"
import Navbar from "./navbar"
import Footer from "./footer"

// Counter component for animating numbers
const CountUp = ({ end, duration = 2000, suffix = "" }) => {
  const [count, setCount] = useState(0)
  const countRef = useRef(null)
  const startTime = useRef(null)
  const endValue = useRef(Number.parseInt(end.replace(/,|\+/g, "")))

  useEffect(() => {
    startTime.current = Date.now()

    const animate = () => {
      const now = Date.now()
      const elapsed = now - startTime.current
      const progress = Math.min(elapsed / duration, 1)

      // Easing function for smoother animation
      const easeOutQuad = (t) => t * (2 - t)
      const easedProgress = easeOutQuad(progress)

      setCount(Math.floor(easedProgress * endValue.current))

      if (progress < 1) {
        countRef.current = requestAnimationFrame(animate)
      }
    }

    countRef.current = requestAnimationFrame(animate)

    return () => {
      if (countRef.current) {
        cancelAnimationFrame(countRef.current)
      }
    }
  }, [duration])

  // Format the number with commas
  const formattedCount = count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")

  return (
    <>
      {formattedCount}
      {suffix}
    </>
  )
}

export default function Home() {
  const [token, setToken] = useState(null)
  const [role, setRole] = useState(null)
  const [isVisible, setIsVisible] = useState(false)
  const [startCounting, setStartCounting] = useState(false)
  const statsRef = useRef(null)

  useEffect(() => {
    // Get token and role from localStorage
    setToken(localStorage.getItem("token"))
    setRole(localStorage.getItem("role"))

    // Animation for elements to fade in
    const timeout = setTimeout(() => {
      setIsVisible(true)
    }, 100)

    // Set up intersection observer for stats section
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setStartCounting(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 },
    )

    if (statsRef.current) {
      observer.observe(statsRef.current)
    }

    return () => {
      clearTimeout(timeout)
      observer.disconnect()
    }
  }, [])

  // Platform statistics
  const stats = [
    { value: "10,000", label: "Musicians", suffix: "+", icon: <Music2 className="w-6 h-6 text-primary" /> },
    { value: "25,000", label: "Events Booked", suffix: "+", icon: <Calendar className="w-6 h-6 text-primary" /> },
    { value: "98", label: "Satisfaction Rate", suffix: "%", icon: <Star className="w-6 h-6 text-primary" /> },
    { value: "50", label: "Countries", suffix: "+", icon: <Users className="w-6 h-6 text-primary" /> },
  ]

  // How it works steps
  const steps = [
    {
      title: "Create Your Profile",
      description:
        "Sign up and build your musician profile with videos, photos, and details about your performance style.",
      icon: <Users className="w-10 h-10 text-primary" />,
    },
    {
      title: "Get Discovered",
      description:
        "Clients browse profiles and send booking requests based on their event needs and your availability.",
      icon: <Search className="w-10 h-10 text-primary" />,
    },
    {
      title: "Secure Booking",
      description:
        "Review and accept offers, with payments securely held in escrow until your performance is complete.",
      icon: <CreditCard className="w-10 h-10 text-primary" />,
    },
    {
      title: "Perform & Get Paid",
      description: "Deliver an amazing performance and receive payment directly to your account after the event.",
      icon: <Star className="w-10 h-10 text-primary" />,
    },
  ]

  // FAQ items
  const faqItems = [
    {
      question: "How do I sign up as a musician?",
      answer:
        "Creating a musician profile is easy! Click on 'Become a Musician' button, complete your profile with details about your performance style, upload media, and set your availability and rates.",
    },
    {
      question: "How does payment work?",
      answer:
        "We use a secure escrow system. When a client books you, the payment is held safely until the performance is complete. Once confirmed, the funds are released to your account within 2-3 business days.",
    },
    {
      question: "Can I hire multiple musicians at once?",
      answer:
        "You can hire individual musicians or bands. Our platform also allows you to create custom packages by selecting multiple artists for larger events.",
    },
    {
      question: "What if I need to cancel a booking?",
      answer:
        "We understand that circumstances change. Our cancellation policy varies depending on how close to the event date you cancel. Please refer to our Terms of Service for detailed information.",
    },
    {
      question: "How are musicians vetted?",
      answer:
        "All musicians go through a verification process that includes identity verification and review of their performance history. We also have a robust review system that helps maintain quality standards.",
    },
  ]

  // Featured musicians
  const featuredMusicians = [
    {
      name: "Alex Rivera",
      genre: "Jazz",
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.9,
      reviews: 124,
    },
    {
      name: "Sarah Chen",
      genre: "Classical",
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.8,
      reviews: 98,
    },
    {
      name: "Marcus Johnson",
      genre: "R&B",
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.7,
      reviews: 156,
    },
    {
      name: "Leila Patel",
      genre: "Pop",
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.9,
      reviews: 87,
    },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section - Enhanced with gradient and animation */}
        <section className="relative py-20 md:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10 -z-10"></div>
          <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/5 rounded-full blur-3xl -z-10 transform translate-x-1/2 -translate-y-1/2"></div>

          <div className="container mx-auto max-w-screen-xl px-4 grid gap-12 lg:grid-cols-2 items-center">
            <div
              className={`space-y-8 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            >
              <Badge
                variant="outline"
                className="px-4 py-1 text-sm font-medium bg-primary/10 border-primary/20 text-primary"
              >
                The #1 Platform for Musicians
              </Badge>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
                Discover and Hire the <span className="text-primary">Perfect Musician</span>
              </h1>

              <p className="text-muted-foreground text-lg max-w-xl">
                MyMusic connects talented musicians with clients looking for the perfect sound. Find the right talent
                for your next event, wedding, or project with ease.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
                <Button asChild size="lg" className="w-full sm:w-auto text-base">
                  <Link to={token ? "/find-artist" : "/login"}>
                    Hire a Musician <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="w-full sm:w-auto text-base">
                  <Link to={token && role ? "/find-artist" : "/login"}>Become a Musician</Link>
                </Button>
              </div>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                <span>No subscription fees</span>
                <span className="mx-2">•</span>
                <CheckCircle2 className="w-4 h-4 text-primary" />
                <span>Secure payments</span>
                <span className="mx-2">•</span>
                <CheckCircle2 className="w-4 h-4 text-primary" />
                <span>Verified musicians</span>
              </div>
            </div>

            <div
              className={`relative transition-all duration-700 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            >
              <div className="absolute -inset-4 bg-gradient-to-tr from-primary/20 to-primary/5 rounded-2xl blur-lg -z-10"></div>
              <img
                src="https://i.imgur.com/e1IneGq.png"
                alt="Musician performing"
                className="rounded-2xl shadow-xl w-full object-cover aspect-[4/3] border border-primary/10"
              />
              <div className="absolute -bottom-6 -right-6 bg-background rounded-lg shadow-lg p-4 flex items-center gap-3 border border-muted">
                <div className="bg-primary/10 rounded-full p-2">
                  <Star className="w-5 h-5 text-primary fill-primary" />
                </div>
                <div>
                  <p className="font-medium">Trusted by 10,000+ musicians</p>
                  <p className="text-sm text-muted-foreground">Join our growing community</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section - With Count Up Animation */}
        <section ref={statsRef} className="py-16 bg-muted/30">
          <div className="container mx-auto max-w-screen-xl px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className={`text-center transition-all duration-700 delay-${index * 100} ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                >
                  <div className="flex justify-center mb-4">{stat.icon}</div>
                  <div className="text-3xl md:text-4xl font-bold text-primary">
                    {startCounting ? <CountUp end={stat.value} suffix={stat.suffix} /> : "0" + stat.suffix}
                  </div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works - New Section */}
        <section className="py-24">
          <div className="container mx-auto max-w-screen-xl px-4 space-y-16">
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <Badge
                variant="outline"
                className="px-4 py-1 text-sm font-medium bg-primary/10 border-primary/20 text-primary"
              >
                Simple Process
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">How MyMusic Works</h2>
              <p className="text-muted-foreground text-lg">
                Our platform makes it easy to connect musicians with clients in just a few simple steps
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {steps.map((step, index) => (
                <Card
                  key={index}
                  className="border border-muted bg-background/50 hover:shadow-md transition-all duration-300"
                >
                  <CardContent className="pt-6">
                    <div className="rounded-full bg-primary/10 w-16 h-16 flex items-center justify-center mb-4">
                      {step.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-2">
                      <span className="text-primary mr-2">{index + 1}.</span> {step.title}
                    </h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Profile Benefits - Enhanced */}
        <section className="py-24 bg-muted/10 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-primary/5 rounded-full blur-3xl -z-10 transform -translate-x-1/2 -translate-y-1/2"></div>

          <div className="container mx-auto max-w-screen-xl px-4 grid gap-12 lg:grid-cols-2 items-center">
            <div className="relative order-2 lg:order-1">
              <div className="absolute -inset-4 bg-gradient-to-bl from-primary/10 to-transparent rounded-2xl blur-lg -z-10"></div>
              <img
                src="https://i.imgur.com/7B46oG5.png"
                alt="Profile Creation"
                className="rounded-2xl shadow-lg w-full object-cover aspect-[4/3] border border-primary/10"
              />
              <div className="absolute top-4 -left-6 bg-background rounded-lg shadow-lg p-3 flex items-center gap-2 border border-muted">
                <div className="bg-green-100 rounded-full p-1.5">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                </div>
                <div className="text-sm">
                  <p className="font-medium">Verified Profile</p>
                </div>
              </div>
            </div>

            <div className="space-y-8 order-1 lg:order-2">
              <Badge
                variant="outline"
                className="px-4 py-1 text-sm font-medium bg-primary/10 border-primary/20 text-primary"
              >
                For Musicians
              </Badge>

              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                Build a Standout Profile & Get Gig Offers
              </h2>

              <p className="text-muted-foreground text-lg">
                MyMusic gives you the tools to showcase your skills, grow your brand, and get discovered by event
                organizers worldwide.
              </p>

              <ul className="space-y-4">
                {[
                  "Create a professional profile with videos, photos, and audio samples",
                  "Set your own rates and availability for maximum flexibility",
                  "Receive booking requests directly from interested clients",
                  "Build your reputation with verified reviews and ratings",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="bg-primary/10 rounded-full p-1 mt-0.5">
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <Button asChild size="lg" className="gap-2">
                <Link to={token ? "/profile" : "/signup"}>
                  Create Your Profile <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Featured Musicians - New Section */}
        <section className="py-24">
          <div className="container mx-auto max-w-screen-xl px-4 space-y-16">
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <Badge
                variant="outline"
                className="px-4 py-1 text-sm font-medium bg-primary/10 border-primary/20 text-primary"
              >
                Top Talent
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Featured Musicians</h2>
              <p className="text-muted-foreground text-lg">
                Discover some of our highest-rated musicians ready to make your event special
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredMusicians.map((musician, index) => (
                <Card key={index} className="overflow-hidden hover:shadow-lg transition-all duration-300 group">
                  <div className="relative aspect-square">
                    <img
                      src={musician.image || "/placeholder.svg"}
                      alt={musician.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <Badge className="absolute top-3 right-3 bg-background/80 backdrop-blur-sm">{musician.genre}</Badge>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg">{musician.name}</h3>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        <span className="font-medium">{musician.rating}</span>
                        <span className="text-muted-foreground text-sm">({musician.reviews})</span>
                      </div>
                      <Button variant="ghost" size="sm" className="p-0 h-auto text-primary">
                        View Profile <ChevronRight className="w-4 h-4 ml-1" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-12">
              <Button asChild size="lg" variant="outline">
                <Link to="/find-artist">View All Musicians</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features - Enhanced */}
        <section className="py-24 bg-muted/10 relative overflow-hidden">
          <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-primary/5 rounded-full blur-3xl -z-10 transform translate-x-1/2 translate-y-1/2"></div>

          <div className="container mx-auto max-w-screen-xl px-4 space-y-16">
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <Badge
                variant="outline"
                className="px-4 py-1 text-sm font-medium bg-primary/10 border-primary/20 text-primary"
              >
                Key Features
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Streamline Your Music Hiring Process</h2>
              <p className="text-muted-foreground text-lg">
                Whether you're a musician or a client, our platform is designed to simplify collaboration and
                communication.
              </p>
            </div>

            <div className="grid gap-12 lg:grid-cols-2 items-center">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-tr from-primary/10 to-transparent rounded-2xl blur-lg -z-10"></div>
                <img
                  src="https://i.imgur.com/vRjO6kF.png"
                  alt="Platform Features"
                  className="rounded-2xl shadow-lg w-full object-cover aspect-video border border-primary/10"
                />
              </div>

              <div className="space-y-8">
                <Tabs defaultValue="clients" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-8">
                    <TabsTrigger value="clients">For Clients</TabsTrigger>
                    <TabsTrigger value="musicians">For Musicians</TabsTrigger>
                  </TabsList>

                  <TabsContent value="clients" className="space-y-6">
                    {[
                      {
                        icon: <Search className="w-8 h-8 text-primary" />,
                        title: "Easy Musician Discovery",
                        desc: "Find the ideal artist for your event or project with powerful filters and smart search tools.",
                      },
                      {
                        icon: <Shield className="w-8 h-8 text-primary" />,
                        title: "Secure Payments",
                        desc: "Built-in payment protection ensures that both clients and musicians are covered throughout the booking process.",
                      },
                      {
                        icon: <Star className="w-8 h-8 text-primary" />,
                        title: "Trusted Reviews",
                        desc: "See feedback from real clients before you book—transparency you can trust for confident decisions.",
                      },
                    ].map((item, idx) => (
                      <div key={idx} className="flex gap-4">
                        <div className="bg-primary/10 rounded-full p-3 h-fit">{item.icon}</div>
                        <div>
                          <h3 className="text-xl font-semibold">{item.title}</h3>
                          <p className="text-muted-foreground">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </TabsContent>

                  <TabsContent value="musicians" className="space-y-6">
                    {[
                      {
                        icon: <Calendar className="w-8 h-8 text-primary" />,
                        title: "Booking Management",
                        desc: "Easily manage your schedule, availability, and booking requests all in one place.",
                      },
                      {
                        icon: <CreditCard className="w-8 h-8 text-primary" />,
                        title: "Guaranteed Payments",
                        desc: "Our escrow system ensures you get paid for every gig, with funds released promptly after performance.",
                      },
                      {
                        icon: <MessageSquare className="w-8 h-8 text-primary" />,
                        title: "Client Communication",
                        desc: "Built-in messaging system keeps all your client communications organized and accessible.",
                      },
                    ].map((item, idx) => (
                      <div key={idx} className="flex gap-4">
                        <div className="bg-primary/10 rounded-full p-3 h-fit">{item.icon}</div>
                        <div>
                          <h3 className="text-xl font-semibold">{item.title}</h3>
                          <p className="text-muted-foreground">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </TabsContent>
                </Tabs>

                <Button asChild size="lg" className="gap-2">
                  <Link to="/features">
                    Explore All Features <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials - Enhanced */}
        <section className="py-24 bg-gradient-to-b from-background to-muted/20">
          <div className="container mx-auto max-w-screen-xl px-4 text-center space-y-12">
            <div className="space-y-4 max-w-2xl mx-auto">
              <Badge
                variant="outline"
                className="px-4 py-1 text-sm font-medium bg-primary/10 border-primary/20 text-primary"
              >
                Success Stories
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">What Our Users Say</h2>
              <p className="text-muted-foreground text-lg">
                Real feedback from users who have successfully hired or been hired through MyMusic.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  name: "John Doe",
                  role: "Event Organizer",
                  quote:
                    "MyMusic made it so easy to find the perfect musician for our wedding. The platform is user-friendly and the talent selection is top-notch. We found an amazing jazz quartet that made our special day unforgettable.",
                  avatar: "https://i.imgur.com/1X4n3vT.png",
                },
                {
                  name: "Sarah Miller",
                  role: "Restaurant Owner",
                  quote:
                    "I've used MyMusic several times to book musicians for our restaurant's weekend events. It's reliable, and the booking process is seamless from start to finish. Our customers love the variety of talent we've been able to bring in.",
                  avatar: "https://i.imgur.com/3Jm1N0r.png",
                },
                {
                  name: "Michael Johnson",
                  role: "Professional Guitarist",
                  quote:
                    "As a musician, this platform has completely transformed the way I find gigs. The booking process is transparent, payments are always on time, and I've built a solid client base through the platform. It's my go-to solution now.",
                  avatar: "https://i.imgur.com/Hp4yZWj.png",
                },
              ].map((client, index) => (
                <Card
                  key={index}
                  className="text-left shadow-md bg-background border-muted hover:shadow-lg transition-all duration-300"
                >
                  <CardHeader className="flex items-center gap-4 pb-2">
                    <Avatar className="w-12 h-12 border-2 border-primary/10">
                      <AvatarImage src={client.avatar} alt={client.name} />
                      <AvatarFallback>{client.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{client.name}</p>
                      <p className="text-sm text-muted-foreground">{client.role}</p>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-2">
                    <div className="flex mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      ))}
                    </div>
                    <blockquote className="text-muted-foreground text-base leading-relaxed">
                      "{client.quote}"
                    </blockquote>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section - New */}
        <section className="py-24 bg-muted/10">
          <div className="container mx-auto max-w-screen-xl px-4 grid md:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
              <Badge
                variant="outline"
                className="px-4 py-1 text-sm font-medium bg-primary/10 border-primary/20 text-primary"
              >
                FAQ
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Frequently Asked Questions</h2>
              <p className="text-muted-foreground text-lg">
                Find answers to common questions about using MyMusic for booking and performing.
              </p>
              <div className="pt-4">
                <Button asChild size="lg" variant="outline" className="gap-2">
                  <Link to="/support">
                    Visit Help Center <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </div>

            <div>
              <Accordion type="single" collapsible className="w-full">
                {faqItems.map((item, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left font-medium">{item.question}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">{item.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* CTA Section - New */}
        <section className="py-24 bg-primary/5 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent -z-10"></div>
          <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-primary/10 rounded-full blur-3xl -z-10 transform -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-primary/10 rounded-full blur-3xl -z-10 transform translate-x-1/2 translate-y-1/2"></div>

          <div className="container mx-auto max-w-screen-xl px-4 text-center space-y-8">
            <Badge
              variant="outline"
              className="px-4 py-1 text-sm font-medium bg-primary/10 border-primary/20 text-primary"
            >
              Get Started Today
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight max-w-3xl mx-auto">
              Ready to Transform Your Music Experience?
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Join thousands of musicians and clients already using MyMusic to create unforgettable musical experiences.
              Sign up today and discover the difference.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto pt-4">
              <Button asChild size="lg" className="w-full">
                <Link to="/signup">
                  Create Account <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="w-full">
                <Link to="/find-artist">Browse Musicians</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Newsletter Section - New */}
        <section className="py-16 bg-background">
          <div className="container mx-auto max-w-screen-xl px-4">
            <Card className="border border-primary/20 bg-primary/5 overflow-hidden">
              <CardContent className="p-8 md:p-12">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div className="space-y-4">
                    <h3 className="text-2xl md:text-3xl font-bold">Stay Updated</h3>
                    <p className="text-muted-foreground">
                      Subscribe to our newsletter for the latest music trends, platform updates, and special offers.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row gap-3">
                      <div className="relative flex-1">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                        <Input
                          type="email"
                          placeholder="Enter your email"
                          className="pl-10 bg-background border-muted"
                        />
                      </div>
                      <Button type="submit" className="sm:w-auto">
                        Subscribe
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

