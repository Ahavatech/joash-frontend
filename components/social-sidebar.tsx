"use client"

import { motion } from "framer-motion"
import { Github, Linkedin, Mail, Twitter } from "lucide-react"
import { useEffect, useState } from "react"

interface SocialLink {
  platform: string
  url: string
  icon: string
}

export default function SocialSidebar() {
  const [socials, setSocials] = useState<SocialLink[]>([])

  useEffect(() => {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 10000)

    const fallbackSocials = [
      { platform: "github", url: "https://github.com", icon: "github" },
      { platform: "linkedin", url: "https://linkedin.com", icon: "linkedin" },
      { platform: "email", url: "mailto:oyerinde13@gmail.com", icon: "email" },
      { platform: "twitter", url: "https://twitter.com", icon: "twitter" },
    ]

    fetch("https://joash-backend.onrender.com/api/socials", {
      signal: controller.signal,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`)
        }
        return res.json()
      })
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setSocials(data)
        } else {
          setSocials(fallbackSocials)
        }
      })
      .catch((err) => {
        if (err.name !== "AbortError") {
          console.error("Error fetching socials:", err.message)
        }
        setSocials(fallbackSocials)
      })
      .finally(() => {
        clearTimeout(timeoutId)
      })

    return () => {
      clearTimeout(timeoutId)
      controller.abort()
    }
  }, [])

  const getIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case "github":
        return <Github size={20} />
      case "linkedin":
        return <Linkedin size={20} />
      case "twitter":
        return <Twitter size={20} />
      case "email":
        return <Mail size={20} />
      default:
        return <Github size={20} />
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="fixed left-8 bottom-0 z-50"
    >
      <div className="flex flex-col items-center space-y-6">
        {socials.map((social, index) => (
          <motion.a
            key={social.platform}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -3, color: "#5d21da" }}
            className="text-gray-400 hover:text-[#5d21da] transition-colors"
          >
            {getIcon(social.platform)}
          </motion.a>
        ))}
        <div className="w-px h-24 bg-gray-600"></div>
      </div>
    </motion.div>
  )
}
