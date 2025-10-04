"use client"

import { useState, useEffect } from "react"
import {
  BookOpen,
  Search,
  Heart,
  TrendingUp,
  Star,
  Users,
  Zap,
  Database,
  Sparkles,
  Menu,
  ArrowRight,
  Check,
  CreditCard,
  Twitter,
  Github,
  Linkedin,
} from "lucide-react"

export default function MangaDatabasePage() {
  const [typedText, setTypedText] = useState("")
  const [billingPlan, setBillingPlan] = useState<"monthly" | "annual">("monthly")

  const responses = [
    "Perfect! I found 247 manga matching your criteria:",
    "Great choice! Here are the top-rated action manga:",
    "Excellent! Discovering popular romance series:",
    "Perfect match! Showing trending fantasy manga:",
  ]

  useEffect(() => {
    let currentIndex = 0
    let charIndex = 0
    let currentText = responses[0]

    const typeText = () => {
      if (charIndex < currentText.length) {
        setTypedText(currentText.substring(0, charIndex + 1))
        charIndex++
        setTimeout(typeText, 40 + Math.random() * 30)
      } else {
        setTimeout(() => {
          currentIndex = (currentIndex + 1) % responses.length
          currentText = responses[currentIndex]
          charIndex = 0
          setTypedText("")
          setTimeout(typeText, 1500)
        }, 2000)
      }
    }

    setTimeout(typeText, 2000)
  }, [])

  const prices = {
    basic: { monthly: 0, annual: 0 },
    pro: { monthly: 12, annual: 115 },
    premium: { monthly: 25, annual: 240 },
  }

  return (
    <div className="antialiased text-slate-100 bg-slate-950 min-h-screen">
      {/* Background */}
      <div className="fixed top-0 w-full h-screen -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-950/20 via-slate-950 to-slate-950" />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(circle at 50% 0%, rgba(168,85,247,0.1), transparent 50%)",
          }}
        />
      </div>

      <div className="relative isolate overflow-hidden">
        {/* Nav */}
        <header className="max-w-7xl mx-auto pt-6 px-6">
          <div className="flex items-center justify-between">
            <a href="/" className="text-xl font-semibold text-white tracking-tight">
              MangaVerse
            </a>
            <nav className="hidden md:flex gap-8 text-sm text-slate-200/80 items-center">
              <a href="#features" className="hover:text-white transition">
                Browse
              </a>
              <a href="#pricing" className="hover:text-white transition">
                Pricing
              </a>
              <a href="#" className="hover:text-white transition">
                Community
              </a>
              <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-white/10 hover:bg-white/20 ring-1 ring-white/20 rounded-lg transition">
                Start Reading
              </button>
            </nav>
            <button className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 ring-1 ring-white/10">
              <Menu className="h-5 w-5" strokeWidth={1.5} />
            </button>
          </div>
        </header>

        {/* Hero */}
        <section className="lg:pt-32 lg:pb-32 max-w-7xl mx-auto pt-24 px-6 pb-24">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            {/* Left: Copy */}
            <div className="lg:col-span-7">
              <div className="animate-fade-in">
                <div className="inline-flex items-center gap-2 px-3 py-1 text-xs font-medium text-purple-300 bg-purple-400/10 ring-1 ring-purple-400/20 rounded-full mb-6">
                  <Sparkles className="h-3 w-3" strokeWidth={1.5} />
                  50,000+ Manga Series
                </div>

                <h1 className="text-5xl lg:text-7xl font-semibold text-white tracking-tight leading-[1.05] mb-6">
                  Discover Your Next
                  <br />
                  <span className="text-purple-400">Favorite Manga</span>
                </h1>

                <p className="text-xl text-slate-300 leading-relaxed max-w-2xl mb-8">
                  The ultimate manga database with advanced search, personalized recommendations, and a thriving
                  community. Track your reading progress and discover hidden gems.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 mb-12">
                  <button className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-purple-500 hover:bg-purple-400 rounded-lg transition shadow-lg">
                    Explore Manga
                    <ArrowRight className="ml-2 h-4 w-4" strokeWidth={1.5} />
                  </button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-8 pt-8 border-t border-white/10">
                  <div>
                    <div className="text-2xl font-semibold text-white">50k+</div>
                    <div className="text-sm text-slate-400">Manga Series</div>
                  </div>
                  <div>
                    <div className="text-2xl font-semibold text-white">2M+</div>
                    <div className="text-sm text-slate-400">Active Users</div>
                  </div>
                  <div>
                    <div className="text-2xl font-semibold text-white">4.9â˜…</div>
                    <div className="text-sm text-slate-400">User Rating</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Search Interface */}
            <div className="lg:col-span-5">
              <div className="relative">
                {/* Search card */}
                <div className="bg-black/40 backdrop-blur-xl ring-1 ring-white/10 rounded-2xl overflow-hidden shadow-2xl">
                  {/* Header */}
                  <div className="flex items-center justify-between p-4 border-b border-white/10">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-purple-400/20 flex items-center justify-center">
                        <Search className="h-4 w-4 text-purple-400" strokeWidth={1.5} />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-white">Smart Search</div>
                        <div className="text-xs text-slate-400">AI-Powered</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="h-2 w-2 bg-orange-400 rounded-full" />
                      <span className="text-xs text-slate-400">Active</span>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="p-4 space-y-4 h-80">
                    {/* User message */}
                    <div className="flex justify-end">
                      <div className="bg-purple-400/20 ring-1 ring-purple-400/30 rounded-2xl rounded-br-md px-4 py-2 max-w-xs">
                        <p className="text-sm text-white">Show me action manga with strong female leads</p>
                      </div>
                    </div>

                    {/* AI response */}
                    <div className="flex items-start gap-3">
                      <div className="h-6 w-6 rounded-full bg-purple-400/20 flex items-center justify-center flex-shrink-0 mt-1">
                        <BookOpen className="h-3 w-3 text-purple-400" strokeWidth={1.5} />
                      </div>
                      <div className="bg-white/5 ring-1 ring-white/10 rounded-2xl rounded-bl-md px-4 py-3 flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="h-1 w-1 bg-purple-400 rounded-full animate-pulse" />
                          <span className="text-xs text-slate-400">Searching database...</span>
                        </div>
                        <p className="text-sm text-white min-h-[60px]">{typedText}</p>

                        {/* Results preview */}
                        <div className="mt-3 space-y-2">
                          <div className="flex items-center gap-2 text-xs">
                            <div className="h-1 w-1 bg-orange-400 rounded-full" />
                            <span className="text-slate-300">Claymore - Rating: 4.8â˜…</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs">
                            <div className="h-1 w-1 bg-orange-400 rounded-full" />
                            <span className="text-slate-300">Black Lagoon - Rating: 4.7â˜…</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs">
                            <div className="h-1 w-1 bg-slate-400 rounded-full animate-pulse" />
                            <span className="text-slate-400">Loading more results...</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Input */}
                  <div className="p-4 border-t border-white/10">
                    <div className="flex items-center gap-2 bg-white/5 ring-1 ring-white/10 rounded-xl p-3">
                      <input
                        type="text"
                        placeholder="Search by genre, author, or theme..."
                        className="flex-1 bg-transparent text-sm text-white placeholder-slate-400 outline-none"
                      />
                      <button className="h-8 w-8 rounded-lg bg-purple-500 hover:bg-purple-400 flex items-center justify-center transition">
                        <Search className="h-4 w-4 text-white" strokeWidth={1.5} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Floating elements */}
                <div className="absolute -top-4 -right-4 h-12 w-12 rounded-xl bg-orange-400/20 ring-1 ring-orange-400/30 flex items-center justify-center backdrop-blur-sm">
                  <Zap className="h-5 w-5 text-orange-400" strokeWidth={1.5} />
                </div>

                <div className="absolute -bottom-4 -left-4 h-10 w-10 rounded-lg bg-white/10 ring-1 ring-white/20 flex items-center justify-center backdrop-blur-sm">
                  <Star className="h-4 w-4 text-slate-300" strokeWidth={1.5} />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Divider */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      {/* Features Section */}
      <section id="features" className="max-w-7xl mx-auto pt-24 px-6 pb-24">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 text-xs font-medium text-purple-300 bg-purple-400/10 ring-1 ring-purple-400/20 rounded-full mb-6">
            <Sparkles className="h-3 w-3" strokeWidth={1.5} />
            Powerful Features
          </div>
          <h2 className="text-4xl lg:text-5xl font-semibold text-white tracking-tight leading-tight mb-6">
            Everything you need to
            <span className="text-purple-400"> explore manga</span>
          </h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            From discovery to tracking, we provide all the tools you need for the ultimate manga reading experience.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div
            className="hover:ring-white/20 transition-all duration-300 bg-black/20 ring-white/10 ring-1 rounded-2xl p-8 backdrop-blur-sm relative overflow-hidden"
            style={{
              backgroundImage:
                "radial-gradient(1200px 600px at 50% -10%, rgba(168,85,247,0.12), transparent 60%), radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)",
              backgroundSize: "100% 100%, 22px 22px",
              backgroundPosition: "center, center",
            }}
          >
            <div
              className="absolute inset-0 pointer-events-none rounded-2xl"
              style={{ boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.06), inset 0 0 80px rgba(168,85,247,0.06)" }}
            />

            <div className="relative">
              <h3 className="text-xl font-semibold text-white mb-4">Advanced Search</h3>
              <p className="text-slate-300 leading-relaxed mb-6">
                Find exactly what you're looking for with filters for genre, demographics, status, rating, and more.
                AI-powered recommendations included.
              </p>
            </div>

            <div className="relative">
              <div className="w-full rounded-xl bg-black/40 ring-1 ring-white/10 backdrop-blur-sm overflow-hidden">
                <div className="px-4 py-3 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-orange-400" />
                    <span className="text-xs text-slate-300 font-medium">search-filters.tsx</span>
                  </div>
                </div>
                <div className="p-4 space-y-2 text-xs font-mono">
                  <div className="text-purple-300">// Multi-criteria search engine</div>
                  <div className="text-slate-200">const filters = {"{"}</div>
                  <div className="text-slate-200 pl-4">
                    genre: <span className="text-orange-400">'Action'</span>,
                  </div>
                  <div className="text-slate-200 pl-4">
                    rating: <span className="text-purple-400">4.5</span>+
                  </div>
                  <div className="text-slate-200">{"}"}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Feature 2 */}
          <div
            className="hover:ring-white/20 transition-all duration-300 bg-black/20 ring-white/10 ring-1 rounded-2xl p-8 backdrop-blur-sm relative overflow-hidden"
            style={{
              backgroundImage:
                "radial-gradient(1200px 600px at 50% -10%, rgba(251,146,60,0.12), transparent 60%), radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)",
              backgroundSize: "100% 100%, 22px 22px",
              backgroundPosition: "center, center",
            }}
          >
            <div
              className="absolute inset-0 pointer-events-none rounded-2xl"
              style={{ boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.06), inset 0 0 80px rgba(251,146,60,0.06)" }}
            />

            <div className="relative">
              <h3 className="text-xl font-semibold text-white mb-4">Reading Lists</h3>
              <p className="text-slate-300 leading-relaxed mb-6">
                Create custom lists, track your progress, and organize your collection. Sync across all your devices
                seamlessly.
              </p>
            </div>

            <div className="relative">
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 ring-1 ring-white/10">
                  <div className="h-8 w-8 rounded bg-gradient-to-r from-purple-400 to-orange-400" />
                  <div className="flex-1">
                    <div className="h-2 w-20 rounded bg-white/20 mb-1" />
                    <div className="h-1.5 w-16 rounded bg-white/10" />
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 ring-1 ring-white/10">
                  <div className="h-8 w-8 rounded bg-gradient-to-r from-orange-400 to-purple-400" />
                  <div className="flex-1">
                    <div className="h-2 w-24 rounded bg-white/20 mb-1" />
                    <div className="h-1.5 w-20 rounded bg-white/10" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Feature 3 */}
          <div
            className="hover:ring-white/20 transition-all duration-300 bg-black/20 ring-white/10 ring-1 rounded-2xl p-8 backdrop-blur-sm relative overflow-hidden"
            style={{
              backgroundImage:
                "radial-gradient(1200px 600px at 50% -10%, rgba(168,85,247,0.12), transparent 60%), radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)",
              backgroundSize: "100% 100%, 22px 22px",
              backgroundPosition: "center, center",
            }}
          >
            <div
              className="absolute inset-0 pointer-events-none rounded-2xl"
              style={{ boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.06), inset 0 0 80px rgba(168,85,247,0.06)" }}
            />

            <div className="relative">
              <h3 className="text-xl font-semibold text-white mb-4">Community Reviews</h3>
              <p className="text-slate-300 leading-relaxed mb-6">
                Read reviews from millions of manga fans. Share your thoughts and discover what others are reading.
              </p>
            </div>

            <div className="relative">
              <div className="w-full rounded-xl bg-black/40 ring-1 ring-white/10 backdrop-blur-sm p-4">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-white font-medium">User Reviews</span>
                  <div className="flex items-center gap-1">
                    <div className="h-2 w-2 rounded-full bg-orange-400" />
                    <span className="text-xs text-orange-400">Live</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-300">Average Rating</span>
                    <span className="text-xs text-white font-medium">4.7â˜…</span>
                  </div>
                  <div className="w-full h-1 rounded-full bg-white/10">
                    <div className="h-1 rounded-full bg-gradient-to-r from-purple-400 w-[94%]" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-300">Total Reviews</span>
                    <span className="text-xs text-white font-medium">12,847</span>
                  </div>
                  <div className="w-full h-1 rounded-full bg-white/10">
                    <div className="h-1 rounded-full bg-gradient-to-r from-orange-400 to-purple-400 w-5/6" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Feature 4 */}
          <div
            className="hover:ring-white/20 transition-all duration-300 bg-black/20 ring-white/10 ring-1 rounded-2xl p-8 backdrop-blur-sm relative overflow-hidden"
            style={{
              backgroundImage:
                "radial-gradient(1200px 600px at 50% -10%, rgba(251,146,60,0.12), transparent 60%), radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)",
              backgroundSize: "100% 100%, 22px 22px",
              backgroundPosition: "center, center",
            }}
          >
            <div
              className="absolute inset-0 pointer-events-none rounded-2xl"
              style={{ boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.06), inset 0 0 80px rgba(251,146,60,0.06)" }}
            />

            <div className="relative">
              <h3 className="text-xl font-semibold text-white mb-4">Personalized Recommendations</h3>
              <p className="text-slate-300 leading-relaxed mb-6">
                AI-powered suggestions based on your reading history and preferences. Discover hidden gems tailored just
                for you.
              </p>
            </div>

            <div className="relative">
              <div className="w-full rounded-xl bg-black/40 ring-1 ring-white/10 backdrop-blur-sm p-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-white font-medium">Match Score</span>
                    <div className="flex items-center gap-1">
                      <div className="h-2 w-2 rounded-full bg-orange-400" />
                      <span className="text-xs text-orange-400">98%</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-orange-400" />
                        <span className="text-xs text-slate-300">Genre Match</span>
                      </div>
                      <span className="text-xs text-orange-400">Perfect</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-orange-400" />
                        <span className="text-xs text-slate-300">Similar Readers</span>
                      </div>
                      <span className="text-xs text-orange-400">2,847</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-orange-400" />
                        <span className="text-xs text-slate-300">Trending Now</span>
                      </div>
                      <span className="text-xs text-orange-400">Top 10</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Feature 5 */}
          <div
            className="hover:ring-white/20 transition-all duration-300 bg-black/20 ring-white/10 ring-1 rounded-2xl p-8 backdrop-blur-sm relative overflow-hidden"
            style={{
              backgroundImage:
                "radial-gradient(1200px 600px at 50% -10%, rgba(168,85,247,0.12), transparent 60%), radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)",
              backgroundSize: "100% 100%, 22px 22px",
              backgroundPosition: "center, center",
            }}
          >
            <div
              className="absolute inset-0 pointer-events-none rounded-2xl"
              style={{ boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.06), inset 0 0 80px rgba(168,85,247,0.06)" }}
            />

            <div className="relative">
              <h3 className="text-xl font-semibold text-white mb-4">Release Tracking</h3>
              <p className="text-slate-300 leading-relaxed mb-6">
                Never miss a new chapter. Get notifications for your favorite series and track release schedules
                globally.
              </p>
            </div>

            <div className="relative">
              <div className="w-full rounded-xl bg-black/40 ring-1 ring-white/10 backdrop-blur-sm p-4">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-white font-medium">Recent Updates</span>
                  <div className="flex items-center gap-1">
                    <div className="h-2 w-2 rounded-full bg-purple-400" />
                    <span className="text-xs text-purple-400">Live</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="h-2 w-2 rounded-full bg-purple-400 mt-1.5" />
                    <div className="flex-1">
                      <div className="text-xs text-white font-medium">One Piece Ch. 1095</div>
                      <div className="text-xs text-slate-400">2 hours ago</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="h-2 w-2 rounded-full bg-orange-400 mt-1.5" />
                    <div className="flex-1">
                      <div className="text-xs text-white font-medium">Jujutsu Kaisen Ch. 245</div>
                      <div className="text-xs text-slate-400">5 hours ago</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="h-2 w-2 rounded-full bg-purple-400 mt-1.5" />
                    <div className="flex-1">
                      <div className="text-xs text-white font-medium">My Hero Academia Ch. 408</div>
                      <div className="text-xs text-slate-400">1 day ago</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Feature 6 */}
          <div
            className="hover:ring-white/20 transition-all duration-300 bg-black/20 ring-white/10 ring-1 rounded-2xl p-8 backdrop-blur-sm relative overflow-hidden"
            style={{
              backgroundImage:
                "radial-gradient(1200px 600px at 50% -10%, rgba(251,146,60,0.12), transparent 60%), radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)",
              backgroundSize: "100% 100%, 22px 22px",
              backgroundPosition: "center, center",
            }}
          >
            <div
              className="absolute inset-0 pointer-events-none rounded-2xl"
              style={{ boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.06), inset 0 0 80px rgba(251,146,60,0.06)" }}
            />

            <div className="relative">
              <h3 className="text-xl font-semibold text-white mb-4">Multi-Platform Sync</h3>
              <p className="text-slate-300 leading-relaxed mb-6">
                Access your library anywhere. Seamless sync across web, mobile, and tablet with offline reading support.
              </p>
            </div>

            <div className="relative">
              <div className="w-full rounded-xl bg-black/40 ring-1 ring-white/10 backdrop-blur-sm p-4">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-white font-medium">Sync Status</span>
                  <div className="flex items-center gap-1">
                    <div className="h-2 w-2 rounded-full bg-purple-400 animate-pulse" />
                    <span className="text-xs text-purple-400">Synced</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-purple-400" />
                      <span className="text-xs text-slate-300">Web Browser</span>
                    </div>
                    <span className="text-xs text-purple-400">Active</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-purple-400" />
                      <span className="text-xs text-slate-300">Mobile App</span>
                    </div>
                    <span className="text-xs text-purple-400">Synced</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-purple-400" />
                      <span className="text-xs text-slate-300">Offline Mode</span>
                    </div>
                    <span className="text-xs text-purple-400">Ready</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      {/* How it works */}
      <section className="max-w-7xl mx-auto pt-24 px-6 pb-24">
        <div className="grid lg:grid-cols-12 gap-20 items-center">
          {/* Left: Steps */}
          <div className="lg:col-span-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 text-xs font-medium text-purple-300 bg-purple-400/10 ring-1 ring-purple-400/20 rounded-full mb-8">
              <Database className="h-3 w-3" strokeWidth={1.5} />
              How it works
            </div>

            <h2 className="text-4xl lg:text-5xl font-semibold text-white tracking-tight leading-tight mb-6">
              Start your manga journey
              <span className="text-purple-400"> in three steps</span>
            </h2>

            <p className="text-xl text-slate-300 leading-relaxed mb-12">
              Join millions of manga fans discovering, tracking, and discussing their favorite series.
            </p>

            <div className="space-y-8">
              {/* Step 1 */}
              <div className="flex items-start gap-6">
                <div className="relative flex-shrink-0">
                  <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-purple-400/20 to-purple-400/5 ring-1 ring-purple-400/20 flex items-center justify-center shadow-lg">
                    <Search className="h-5 w-5 text-purple-400" strokeWidth={1.5} />
                  </div>
                  <div className="-translate-x-0.5 w-px bg-gradient-to-b from-purple-400/60 to-purple-400/10 h-8 absolute top-12 left-1/2" />
                </div>
                <div className="pt-1 flex-1">
                  <div className="flex items-center gap-3 mb-3 justify-between">
                    <h3 className="text-lg font-semibold text-white tracking-tight">Discover manga you'll love</h3>
                    <span className="inline-flex items-center px-2 py-0.5 text-xs font-medium text-purple-400 bg-purple-400/10 ring-1 ring-purple-400/20 rounded-full">
                      01
                    </span>
                  </div>
                  <p className="text-slate-300 leading-relaxed">
                    Browse our extensive database of 50,000+ manga series. Use advanced filters or let our AI recommend
                    titles based on your preferences.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex items-start gap-6">
                <div className="relative flex-shrink-0">
                  <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-orange-400/20 to-orange-400/5 ring-1 ring-orange-400/20 flex items-center justify-center shadow-lg">
                    <Heart className="h-5 w-5 text-orange-400" strokeWidth={1.5} />
                  </div>
                  <div className="absolute left-1/2 -translate-x-0.5 top-12 w-px h-8 bg-gradient-to-b from-orange-400/60 to-orange-400/10" />
                </div>
                <div className="pt-1 flex-1">
                  <div className="flex items-center gap-3 mb-3 justify-between">
                    <h3 className="text-lg font-semibold text-white tracking-tight">Track your reading progress</h3>
                    <span className="inline-flex items-center px-2 py-0.5 text-xs font-medium text-orange-400 bg-orange-400/10 ring-1 ring-orange-400/20 rounded-full">
                      02
                    </span>
                  </div>
                  <p className="text-slate-300 leading-relaxed">
                    Create custom lists, mark chapters as read, and sync your progress across all devices. Never lose
                    your place again.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex items-start gap-6">
                <div className="relative flex-shrink-0">
                  <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-purple-400/20 to-purple-400/5 ring-1 ring-purple-400/20 flex items-center justify-center shadow-lg">
                    <Users className="h-5 w-5 text-purple-400" strokeWidth={1.5} />
                  </div>
                </div>
                <div className="pt-1 flex-1">
                  <div className="flex items-center gap-3 mb-3 justify-between">
                    <h3 className="text-lg font-semibold text-white tracking-tight">Join the community</h3>
                    <span className="inline-flex items-center px-2 py-0.5 text-xs font-medium text-purple-400 bg-purple-400/10 ring-1 ring-purple-400/20 rounded-full">
                      03
                    </span>
                  </div>
                  <p className="text-slate-300 leading-relaxed">
                    Share reviews, discuss theories, and connect with fellow manga enthusiasts. Get notified when new
                    chapters drop.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Dashboard mockup */}
          <div className="lg:col-span-7">
            <div className="relative">
              <div
                className="absolute inset-0 -m-8 pointer-events-none rounded-3xl blur-sm"
                style={{ background: "radial-gradient(60% 50% at 70% 30%, rgba(168,85,247,0.12), transparent 60%)" }}
              />

              <div className="bg-black/40 backdrop-blur-xl ring-1 ring-white/10 rounded-2xl overflow-hidden shadow-2xl relative">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="h-3 w-3 rounded-full bg-purple-400" />
                    <span className="text-sm text-white font-medium">MangaVerse Dashboard</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-400">
                    <Heart className="h-4 w-4" />
                    <TrendingUp className="h-4 w-4" />
                  </div>
                </div>

                {/* Top actions */}
                <div className="grid md:grid-cols-2 gap-4 p-6">
                  <button className="group w-full text-left bg-white/5 hover:bg-white/10 ring-1 ring-white/10 rounded-xl p-4 transition-all duration-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-lg bg-purple-400/20 ring-1 ring-purple-400/30 flex items-center justify-center">
                          <Search className="h-4 w-4 text-purple-400" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-white">Explore manga</div>
                          <div className="text-xs text-slate-400">50,000+ series available</div>
                        </div>
                      </div>
                      <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-white transition-colors" />
                    </div>
                  </button>

                  <div className="w-full bg-white/5 ring-1 ring-white/10 rounded-xl p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-lg bg-white/10 ring-1 ring-white/10 flex items-center justify-center">
                          <BookOpen className="h-4 w-4 text-slate-300" />
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-medium text-white">My library</div>
                          <div className="text-xs text-slate-400">247 manga tracked</div>
                        </div>
                      </div>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-slate-300 ring-1 ring-white/10">
                        Active
                      </span>
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="px-6 py-4 border-t border-white/10">
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-base font-medium text-white">Reading Stats</span>
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <span>This month</span>
                      <span className="h-1 w-1 rounded-full bg-purple-400" />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-white/5 ring-1 ring-white/10 rounded-lg p-4">
                      <div className="text-xs text-slate-400 mb-2">Chapters Read</div>
                      <div className="text-2xl font-semibold text-white mb-1">142</div>
                      <div className="text-xs text-orange-400">+23%</div>
                    </div>
                    <div className="bg-white/5 ring-1 ring-white/10 rounded-lg p-4">
                      <div className="text-xs text-slate-400 mb-2">Hours Spent</div>
                      <div className="text-2xl font-semibold text-white mb-1">38h</div>
                      <div className="text-xs text-orange-400">+15%</div>
                    </div>
                    <div className="bg-white/5 ring-1 ring-white/10 rounded-lg p-4">
                      <div className="text-xs text-slate-400 mb-2">Series Started</div>
                      <div className="text-2xl font-semibold text-white mb-1">12</div>
                      <div className="text-xs text-orange-400">+4</div>
                    </div>
                  </div>

                  {/* Chart */}
                  <div className="w-full h-24 rounded-lg bg-white/5 ring-1 ring-white/10 p-4">
                    <div className="flex items-end justify-between gap-1 h-full">
                      {[35, 55, 70, 45, 85, 60, 92, 75, 65, 50, 80, 68].map((height, i) => (
                        <div
                          key={i}
                          className="w-2 bg-gradient-to-t from-purple-400/30 to-purple-400 rounded-sm"
                          style={{ height: `${height}%` }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      {/* Pricing */}
      <section id="pricing" className="max-w-7xl mx-auto pt-24 px-6 pb-24">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 text-xs font-medium text-purple-300 bg-purple-400/10 ring-1 ring-purple-400/20 rounded-full mb-6">
            <CreditCard className="h-3 w-3" strokeWidth={1.5} />
            Pricing
          </div>
          <h2 className="text-4xl lg:text-5xl font-semibold text-white tracking-tight leading-tight mb-4">
            Simple, transparent <span className="text-purple-400">pricing</span>
          </h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">Choose the plan that fits your reading habits.</p>
        </div>

        {/* Billing Toggle */}
        <div className="flex mb-14 items-center justify-center">
          <div className="inline-flex ring-1 ring-white/10 bg-black rounded-full p-1 relative shadow-lg space-x-1 items-center">
            <button
              type="button"
              onClick={() => setBillingPlan("annual")}
              className={`z-10 transition-colors text-sm font-medium rounded-full px-4 py-2 relative ${
                billingPlan === "annual" ? "text-slate-900 bg-white" : "text-white/70"
              }`}
            >
              Annual
            </button>
            <button
              type="button"
              onClick={() => setBillingPlan("monthly")}
              className={`z-10 transition-colors text-sm font-medium rounded-full px-4 py-2 relative ${
                billingPlan === "monthly" ? "text-slate-900 bg-white" : "text-white/70"
              }`}
            >
              Monthly
            </button>
          </div>
          {billingPlan === "annual" && (
            <span className="ml-3 px-2.5 py-1 text-xs font-medium rounded-full bg-orange-400/10 text-orange-300 ring-1 ring-orange-400/20">
              Save 20%
            </span>
          )}
        </div>

        {/* Cards */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Basic */}
          <div className="bg-black/40 backdrop-blur-xl ring-1 ring-white/10 rounded-3xl p-8 flex flex-col">
            <div className="flex items-center justify-between mb-8">
              <span className="px-3 py-1 text-xs font-medium rounded-full bg-white/5 text-slate-300 ring-1 ring-white/10">
                Free
              </span>
            </div>
            <div className="mb-3">
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-semibold tracking-tight text-white">${prices.basic[billingPlan]}</span>
                <span className="text-slate-400">/month</span>
              </div>
              <p className="text-slate-300 mt-3">Perfect for casual readers exploring manga.</p>
            </div>

            <div className="my-8 h-px bg-white/10" />

            <ul className="space-y-3 text-slate-300 flex-1">
              <li className="flex items-start gap-3">
                <Check className="h-4 w-4 text-purple-400 mt-0.5" />
                Access to 50,000+ manga
              </li>
              <li className="flex items-start gap-3">
                <Check className="h-4 w-4 text-purple-400 mt-0.5" />
                Basic search and filters
              </li>
              <li className="flex items-start gap-3">
                <Check className="h-4 w-4 text-purple-400 mt-0.5" />
                Create up to 3 reading lists
              </li>
              <li className="flex items-start gap-3">
                <Check className="h-4 w-4 text-purple-400 mt-0.5" />
                Community access
              </li>
            </ul>

            <div className="my-8 h-px bg-white/10" />

            <button className="w-full inline-flex items-center justify-center px-6 py-3 text-base font-medium text-slate-200 bg-white/5 hover:bg-white/10 ring-1 ring-white/10 rounded-xl transition">
              Get started
            </button>
          </div>

          {/* Pro */}
          <div className="relative bg-black/40 backdrop-blur-xl ring-1 ring-white/10 rounded-3xl p-8 flex flex-col">
            <div className="flex items-center justify-between mb-8">
              <span className="px-3 py-1 text-xs font-medium rounded-full bg-white/5 text-slate-300 ring-1 ring-white/10">
                Pro
              </span>
              <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-orange-400/10 text-orange-300 ring-1 ring-orange-400/20">
                Most popular
              </span>
            </div>
            <div className="mb-3">
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-semibold tracking-tight text-white">${prices.pro[billingPlan]}</span>
                <span className="text-slate-400">/month</span>
              </div>
              <p className="text-slate-300 mt-3">For dedicated manga fans who want more features.</p>
            </div>

            <div className="my-8 h-px bg-white/10" />

            <ul className="space-y-3 text-slate-300 flex-1">
              <li className="flex items-start gap-3">
                <Check className="h-4 w-4 text-purple-400 mt-0.5" />
                Everything in Free
              </li>
              <li className="flex items-start gap-3">
                <Check className="h-4 w-4 text-purple-400 mt-0.5" />
                Advanced search & AI recommendations
              </li>
              <li className="flex items-start gap-3">
                <Check className="h-4 w-4 text-purple-400 mt-0.5" />
                Unlimited reading lists
              </li>
              <li className="flex items-start gap-3">
                <Check className="h-4 w-4 text-purple-400 mt-0.5" />
                Release notifications
              </li>
              <li className="flex items-start gap-3">
                <Check className="h-4 w-4 text-purple-400 mt-0.5" />
                Offline reading mode
              </li>
            </ul>

            <div className="my-8 h-px bg-white/10" />

            <button className="w-full inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-purple-500 hover:bg-purple-400 rounded-xl ring-1 ring-purple-400/30 transition">
              Get started
            </button>
          </div>

          {/* Premium */}
          <div className="bg-black/40 backdrop-blur-xl ring-1 ring-white/10 rounded-3xl p-8 flex flex-col">
            <div className="flex items-center justify-between mb-8">
              <span className="px-3 py-1 text-xs font-medium rounded-full bg-white/5 text-slate-300 ring-1 ring-white/10">
                Premium
              </span>
            </div>
            <div className="mb-3">
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-semibold tracking-tight text-white">${prices.premium[billingPlan]}</span>
                <span className="text-slate-400">/month</span>
              </div>
              <p className="text-slate-300 mt-3">Ultimate experience for manga enthusiasts.</p>
            </div>

            <div className="my-8 h-px bg-white/10" />

            <ul className="space-y-3 text-slate-300 flex-1">
              <li className="flex items-start gap-3">
                <Check className="h-4 w-4 text-purple-400 mt-0.5" />
                Everything in Pro
              </li>
              <li className="flex items-start gap-3">
                <Check className="h-4 w-4 text-purple-400 mt-0.5" />
                Early access to new features
              </li>
              <li className="flex items-start gap-3">
                <Check className="h-4 w-4 text-purple-400 mt-0.5" />
                Priority support
              </li>
              <li className="flex items-start gap-3">
                <Check className="h-4 w-4 text-purple-400 mt-0.5" />
                Exclusive community events
              </li>
              <li className="flex items-start gap-3">
                <Check className="h-4 w-4 text-purple-400 mt-0.5" />
                Custom profile themes
              </li>
            </ul>

            <div className="my-8 h-px bg-white/10" />

            <button className="w-full inline-flex items-center justify-center px-6 py-3 text-base font-medium text-slate-200 bg-white/5 hover:bg-white/10 ring-1 ring-white/10 rounded-xl transition">
              Get started
            </button>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto pt-20 px-6 pb-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <h3 className="text-xl font-semibold text-white tracking-tight mb-4">MangaVerse</h3>
            <p className="text-slate-300/80 max-w-md mb-6">
              The ultimate manga database for discovering, tracking, and discussing your favorite series with millions
              of fans worldwide.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="p-2 rounded-lg bg-white/5 ring-1 ring-white/10 hover:bg-white/10 transition">
                <Twitter className="h-5 w-5 text-slate-300" strokeWidth={1.5} />
              </a>
              <a href="#" className="p-2 rounded-lg bg-white/5 ring-1 ring-white/10 hover:bg-white/10 transition">
                <Github className="h-5 w-5 text-slate-300" strokeWidth={1.5} />
              </a>
              <a href="#" className="p-2 rounded-lg bg-white/5 ring-1 ring-white/10 hover:bg-white/10 transition">
                <Linkedin className="h-5 w-5 text-slate-300" strokeWidth={1.5} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-normal text-white mb-4">Explore</h4>
            <ul className="space-y-3 text-sm text-slate-300/80">
              <li>
                <a href="#" className="hover:text-white transition">
                  Browse Manga
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Top Rated
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  New Releases
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Genres
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-normal text-white mb-4">Company</h4>
            <ul className="space-y-3 text-sm text-slate-300/80">
              <li>
                <a href="#" className="hover:text-white transition">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-400">Â© 2025 MangaVerse. All rights reserved.</p>
          <div className="flex items-center gap-6 text-sm text-slate-400">
            <a href="#" className="hover:text-white transition">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition">
              Terms of Service
            </a>
            <a href="#" className="hover:text-white transition">
              Cookie Policy
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
