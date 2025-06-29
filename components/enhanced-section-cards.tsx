"use client"

import { TrendingUpIcon } from "lucide-react"
import { AnimatedCard } from "./animated-card"
import { AnimatedCounter } from "./animated-counter"
import { FloatingElement } from "./floating-elements"
import { ScrollReveal } from "./scroll-reveal"
import { Badge } from "@/components/ui/badge"
import { CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export function EnhancedSectionCards() {
  const cards = [
    {
      title: "Customers",
      value: 80,
      change: "+12.5%",
      description: "Trending up this month",
      subtitle: "Visitors for the last 6 months",
      delay: 0,
    },
    {
      title: "New Customers",
      value: 15,
      change: "+20%",
      description: "Down 20% this period",
      subtitle: "Acquisition needs attention",
      delay: 100,
    },
    {
      title: "Active Accounts",
      value: 45678,
      change: "+12.5%",
      description: "Strong user retention",
      subtitle: "Engagement exceed targets",
      delay: 200,
    },
    {
      title: "Growth Rate",
      value: 4.5,
      change: "+4.5%",
      description: "Steady performance",
      subtitle: "Meets growth projections",
      delay: 300,
      suffix: "%",
    },
  ]

  return (
    <ScrollReveal>
      <div className="@xl/main:grid-cols-2 @5xl/main:grid-cols-4 grid grid-cols-1 gap-4 px-4 lg:px-6">
        {cards.map((card, index) => (
          <FloatingElement key={card.title} intensity="low">
            <AnimatedCard
              delay={card.delay}
              direction="up"
              className="@container/card bg-gradient-to-t from-primary/5 to-card hover:from-primary/10 hover:to-card transition-all duration-300 hover:shadow-xl hover:shadow-primary/10"
            >
              <CardHeader className="relative">
                <CardDescription>{card.title}</CardDescription>
                <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
                  <AnimatedCounter value={card.value} suffix={card.suffix || ""} duration={1500 + index * 200} />
                </CardTitle>
                <div className="absolute right-4 top-4">
                  <Badge
                    variant="outline"
                    className="flex gap-1 rounded-lg text-xs hover:scale-105 transition-transform hover:shadow-md"
                  >
                    <TrendingUpIcon className="size-3" />
                    {card.change}
                  </Badge>
                </div>
              </CardHeader>
              <CardFooter className="flex-col items-start gap-1 text-sm">
                <div className="line-clamp-1 flex gap-2 font-medium">
                  {card.description} <TrendingUpIcon className="size-4" />
                </div>
                <div className="text-muted-foreground">{card.subtitle}</div>
              </CardFooter>
            </AnimatedCard>
          </FloatingElement>
        ))}
      </div>
    </ScrollReveal>
  )
}
