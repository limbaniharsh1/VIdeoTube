import VideoCard from "./VIdeoCard"

export default function VideoGrid() {
  // Sample video data
  const videos = [
    {
      id: "1",
      thumbnail: "https://img.youtube.com/vi/XAm9QW3Q49Y/hqdefault.jpg",
      title: "How to Build a Next.js App with Tailwind CSS",
      channel: "Code with Me",
      channelImage: "/placeholder.svg?height=36&width=36",
      views: "120K views",
      timestamp: "2 days ago",
      duration: "12:34",
    },
    {
      id: "2",
      thumbnail: "https://img.youtube.com/vi/vW1ei0CyACk/hqdefault.jpg",
      title: "Learn React in 30 Minutes - Beginner's Tutorial",
      channel: "Web Dev Simplified",
      channelImage: "/placeholder.svg?height=36&width=36",
      views: "1.2M views",
      timestamp: "1 month ago",
      duration: "30:21",
    },
    {
      id: "3",
      thumbnail: "https://img.youtube.com/vi/L06OitvLhiE/hqdefault.jpg",
      title: "10 CSS Tricks You Didn't Know About",
      channel: "CSS Wizard",
      channelImage: "/placeholder.svg?height=36&width=36",
      views: "450K views",
      timestamp: "3 weeks ago",
      duration: "15:45",
    },
    {
      id: "4",
      thumbnail: "https://img.youtube.com/vi/kf_W8AkWV28/hqdefault.jpg",
      title: "Building a Full Stack App from Scratch",
      channel: "Tech Lead",
      channelImage: "/placeholder.svg?height=36&width=36",
      views: "780K views",
      timestamp: "5 days ago",
      duration: "42:18",
    },
    {
      id: "5",
      thumbnail: "https://img.youtube.com/vi/ti39UJYgc5s/hqdefault.jpg",
      title: "TypeScript Crash Course for Beginners",
      channel: "TypeScript Pro",
      channelImage: "/placeholder.svg?height=36&width=36",
      views: "320K views",
      timestamp: "2 weeks ago",
      duration: "28:55",
    },
    {
      id: "6",
      thumbnail: "https://img.youtube.com/vi/s7DbVTkaXn0/hqdefault.jpg",
      title: "Responsive Design in 2023 - Best Practices",
      channel: "UI/UX Masters",
      channelImage: "/placeholder.svg?height=36&width=36",
      views: "210K views",
      timestamp: "1 week ago",
      duration: "18:32",
    },
    {
      id: "7",
      thumbnail: "https://img.youtube.com/vi/SPgixVcfiCE/hqdefault.jpg",
      title: "JavaScript Array Methods You Should Know",
      channel: "JS Mastery",
      channelImage: "/placeholder.svg?height=36&width=36",
      views: "560K views",
      timestamp: "4 days ago",
      duration: "22:17",
    },
    {
      id: "8",
      thumbnail: "https://img.youtube.com/vi/AtGNpS9ZyJE/hqdefault.jpg",
      title: "Building a YouTube Clone with Next.js",
      channel: "Next.js Ninja",
      channelImage: "/placeholder.svg?height=36&width=36",
      views: "180K views",
      timestamp: "1 day ago",
      duration: "35:42",
    },
    {
      id: "Oi8q1zIGph0",
      thumbnail: "https://img.youtube.com/vi/Oi8q1zIGph0/hqdefault.jpg",
      title: "Building a YouTube Clone with Next.js",
      channel: "Next.js Ninja",
      channelImage: "/placeholder.svg?height=36&width=36",
      views: "180K views",
      timestamp: "1 day ago",
      duration: "35:42",
    },
  ]

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {videos.map((video) => (
        <VideoCard key={video.id} {...video} />
      ))}
    </div>
  )
}
