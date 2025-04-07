import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Settings, Upload, Star, MapPin, Mail, Phone, Music, User, DollarSign } from "lucide-react"
import Footer from "./footer"
import VideoCard from "./videocard"
import RCard from "./ratecard"
import Navbar from "./navbar"

// Mock sample user data
const userData = {
  name: "John Doe",
  genres: ["Pop", "Rock", "Indie"],
  type: "Solo Artist",
  pricePerShow: "$500",
  location: "New York, USA",
  email: "johndoe@example.com",
  phoneNo: "+1 234 567 890",
  bio: "Passionate artist with over 10 years of experience performing worldwide. I've played at various venues across the country and internationally, bringing energy and excitement to every performance.",
  coverPic: "https://i.imgur.com/v0f3l76.jpg",
  profilePic: "https://i.imgur.com/9tGn67W.jpg",
  stats: {
    followers: 1250,
    performances: 87,
    rating: 4.8,
  },
}

const ArtistProfile = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      {/* Cover Section */}
      <div className="relative w-full h-[300px] md:h-[400px] lg:h-[450px]">
        <img src={userData.coverPic || "/placeholder.svg"} alt="Cover" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>

        <div className="absolute -bottom-16 sm:-bottom-20 left-1/2 transform -translate-x-1/2 sm:left-10 sm:translate-x-0 w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 rounded-full overflow-hidden border-4 border-white shadow-lg">
          <img src={userData.profilePic || "/placeholder.svg"} alt="Profile" className="w-full h-full object-cover" />
        </div>
      </div>

      {/* Info Section */}
      <div className="mt-20 sm:mt-28 px-4 sm:px-6 lg:px-24 max-w-7xl mx-auto w-full">
        <div className="flex flex-col sm:flex-row items-center sm:items-end justify-between gap-4 mb-8">
          <div className="text-center sm:text-left">
            <h1 className="text-3xl md:text-4xl font-bold">{userData.name}</h1>
            <div className="flex items-center justify-center sm:justify-start mt-2 gap-2">
              <MapPin className="w-4 h-4 text-gray-600" />
              <span className="text-gray-600">{userData.location}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 justify-center sm:justify-end">
            <Button variant="outline" className="text-sm md:text-base gap-2">
              <Upload className="w-4 h-4" />
              Upload Media
            </Button>
            <Button className="text-sm md:text-base gap-2">
              <Settings className="w-4 h-4" />
              Settings
            </Button>
          </div>
        </div>

        <div className="flex flex-wrap gap-6 justify-center sm:justify-start mb-8">
          {userData.genres.map((genre, index) => (
            <Badge key={index} variant="secondary" className="text-sm px-3 py-1">
              {genre}
            </Badge>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <Card className="text-center p-4">
            <div className="text-2xl font-bold">{userData.stats.followers}</div>
            <div className="text-gray-500">Followers</div>
          </Card>
          <Card className="text-center p-4">
            <div className="text-2xl font-bold">{userData.stats.performances}</div>
            <div className="text-gray-500">Performances</div>
          </Card>
          <Card className="text-center p-4">
            <div className="text-2xl font-bold flex items-center justify-center">
              {userData.stats.rating} <Star className="w-5 h-5 ml-1 text-yellow-500 fill-yellow-500" />
            </div>
            <div className="text-gray-500">Average Rating</div>
          </Card>
        </div>

        <Tabs defaultValue="about" className="w-full mb-12">
          <TabsList className="grid grid-cols-3 mb-8">
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="videos">Videos</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>

          <TabsContent value="about" className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Artist Information</h3>
                <div className="grid gap-6 text-lg">
                  <InfoRow icon={<Music className="w-5 h-5" />} label="Genre" value={userData.genres.join(", ")} />
                  <InfoRow icon={<User className="w-5 h-5" />} label="Type" value={userData.type} />
                  <InfoRow icon={<DollarSign className="w-5 h-5" />} label="Price" value={userData.pricePerShow} />
                  <InfoRow icon={<MapPin className="w-5 h-5" />} label="Location" value={userData.location} />
                  <InfoRow icon={<Mail className="w-5 h-5" />} label="Email" value={userData.email} />
                  <InfoRow icon={<Phone className="w-5 h-5" />} label="Phone no" value={userData.phoneNo} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Biography</h3>
                <p className="text-gray-700 leading-relaxed">{userData.bio}</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="videos">
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-semibold">My Videos</h3>
                  <Button>
                    Upload Video <span className="ml-2">+</span>
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <VideoCard />
                  <VideoCard />
                  <VideoCard />
                  <VideoCard />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-6">Ratings & Reviews</h3>
                <div className="space-y-6">
                  {[...Array(4)].map((_, i) => (
                    <RCard key={i} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  )
}

const InfoRow = ({ icon, label, value }) => (
  <div className="grid grid-cols-1 md:grid-cols-4 items-center">
    <div className="font-semibold text-lg md:text-xl flex items-center gap-2">
      {icon}
      {label}
    </div>
    <div className="md:col-span-3 text-gray-700">{value}</div>
  </div>
)

export default ArtistProfile

