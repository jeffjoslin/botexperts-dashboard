"use client"

import * as React from "react"
import { AnimatedCard } from "./animated-card"
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { useIsMobile } from "@/hooks/use-mobile"

// Generate smooth data with a specific growth pattern
const generateSmoothData = (days: number, startDate: Date) => {
  const data = []
  let startCustomers = 1
  let endCustomers = 25
  let startAgents = 1
  let endAgents = 55

  if (days > 180) {
    startCustomers = 0
    startAgents = 0
  }

  const currentDate = new Date()
  const yearStart = new Date(currentDate.getFullYear(), 0, 1)

  if (days >= 365) {
    endCustomers = 40
    endAgents = 80
  } else if (days >= 180) {
    endCustomers = 32
    endAgents = 65
  }

  for (let i = 0; i < days; i++) {
    const date = new Date(startDate)
    date.setDate(startDate.getDate() + i)

    const progress = i / (days - 1)
    const easedProgress = progress < 0.5 ? 4 * progress * progress * progress : 1 - Math.pow(-2 * progress + 2, 3) / 2

    const customers = Math.round(startCustomers + (endCustomers - startCustomers) * easedProgress)
    const aiAgents = Math.round(startAgents + (endAgents - startAgents) * easedProgress)

    data.push({
      date: date.toISOString().split("T")[0],
      displayDate: date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      customers: customers,
      aiAgents: aiAgents,
    })
  }

  return data
}

// Get date for specific time periods
const getCurrentDate = () => new Date()
const getYearStartDate = () => {
  const now = new Date()
  return new Date(now.getFullYear(), 0, 1)
}
const getDateXMonthsAgo = (months: number) => {
  const now = new Date()
  return new Date(now.getFullYear(), now.getMonth() - months, now.getDate())
}
const getDateOneYearAgo = () => {
  const now = new Date()
  return new Date(now.getFullYear() - 1, now.getMonth(), now.getDate())
}

// Generate data for different time periods
const dataLastYear = generateSmoothData(365, getDateOneYearAgo())
const dataYTD = generateSmoothData(
  Math.floor((getCurrentDate().getTime() - getYearStartDate().getTime()) / (24 * 60 * 60 * 1000)),
  getYearStartDate(),
)
const data6m = generateSmoothData(180, getDateXMonthsAgo(6))
const data3m = generateSmoothData(90, getDateXMonthsAgo(3))
const data30d = generateSmoothData(30, getDateXMonthsAgo(1))
const data7d = generateSmoothData(7, getDateXMonthsAgo(0.25))

export function EnhancedChartAreaInteractive() {
  const isMobile = useIsMobile()
  const [timeRange, setTimeRange] = React.useState("3m")
  const canvasRef = React.useRef<HTMLCanvasElement>(null)
  const [tooltipData, setTooltipData] = React.useState<{
    visible: boolean
    x: number
    y: number
    date: string
    customers: number
    aiAgents: number
  }>({
    visible: false,
    x: 0,
    y: 0,
    date: "",
    customers: 0,
    aiAgents: 0,
  })

  React.useEffect(() => {
    if (isMobile) {
      setTimeRange("3m")
    }
  }, [isMobile])

  // Get data based on time range
  const data = React.useMemo(() => {
    switch (timeRange) {
      case "1y":
        return dataLastYear
      case "ytd":
        return dataYTD
      case "6m":
        return data6m
      case "3m":
        return data3m
      case "30d":
        return data30d
      case "7d":
        return data7d
      default:
        return data3m
    }
  }, [timeRange])

  // Get title based on time range
  const timeRangeTitle = React.useMemo(() => {
    switch (timeRange) {
      case "1y":
        return "Last Year"
      case "ytd":
        return "Year to Date"
      case "6m":
        return "Last 6 Months"
      case "3m":
        return "Last 3 Months"
      case "30d":
        return "Last 30 Days"
      case "7d":
        return "Last 7 Days"
      default:
        return "Last 3 Months"
    }
  }, [timeRange])

  // Draw chart whenever timeRange changes or component mounts
  React.useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Set dimensions
    const width = canvas.width
    const height = canvas.height
    const padding = { top: 20, right: 20, bottom: 40, left: 40 }
    const chartWidth = width - padding.left - padding.right
    const chartHeight = height - padding.top - padding.bottom

    // Find max value for scaling
    const maxValue = Math.max(...data.map((item) => item.customers + item.aiAgents)) * 1.1

    // Draw background grid with animation
    ctx.strokeStyle = "#333"
    ctx.lineWidth = 0.5

    // Horizontal grid lines
    for (let i = 0; i <= 4; i++) {
      const y = padding.top + chartHeight * (i / 4)
      ctx.beginPath()
      ctx.moveTo(padding.left, y)
      ctx.lineTo(width - padding.right, y)
      ctx.stroke()
    }

    // Draw x-axis labels
    ctx.fillStyle = "#888"
    ctx.font = "12px Arial"
    ctx.textAlign = "center"

    let labelFrequency = Math.ceil(data.length / 10)

    if (data.length > 180) labelFrequency = Math.ceil(data.length / 8)
    if (data.length > 300) labelFrequency = Math.ceil(data.length / 6)

    data.forEach((item, index) => {
      if (index % labelFrequency === 0 || index === data.length - 1) {
        const x = padding.left + chartWidth * (index / (data.length - 1))
        ctx.fillText(item.displayDate, x, height - padding.bottom + 15)
      }
    })

    // Function to create a smooth curve through points
    const createSmoothPath = (ctx: CanvasRenderingContext2D, points: { x: number; y: number }[], closePath = false) => {
      if (points.length < 2) return

      ctx.beginPath()
      ctx.moveTo(points[0].x, points[0].y)

      for (let i = 0; i < points.length - 1; i++) {
        const xc = (points[i].x + points[i + 1].x) / 2
        const yc = (points[i].y + points[i + 1].y) / 2
        ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc)
      }

      ctx.quadraticCurveTo(
        points[points.length - 1].x,
        points[points.length - 1].y,
        points[points.length - 1].x,
        points[points.length - 1].y,
      )

      if (closePath) {
        ctx.lineTo(points[points.length - 1].x, padding.top + chartHeight)
        ctx.lineTo(points[0].x, padding.top + chartHeight)
        ctx.closePath()
      }
    }

    // Function to draw area with enhanced gradients
    const drawArea = (dataKey: "customers" | "aiAgents", color: string, gradientColor: string, offset = 0) => {
      const points = data.map((item, index) => {
        const x = padding.left + chartWidth * (index / (data.length - 1))
        const y = padding.top + chartHeight - chartHeight * ((item[dataKey] + offset) / maxValue)
        return { x, y, data: item }
      })

      // Create enhanced gradient
      const gradient = ctx.createLinearGradient(0, padding.top, 0, padding.top + chartHeight)
      gradient.addColorStop(0, gradientColor)
      gradient.addColorStop(0.5, gradientColor.replace("0.5", "0.3"))
      gradient.addColorStop(1, "rgba(0,0,0,0.05)")

      // Draw filled area
      ctx.fillStyle = gradient
      createSmoothPath(ctx, points, true)
      ctx.fill()

      // Draw line with glow effect
      ctx.shadowColor = color
      ctx.shadowBlur = 10
      ctx.strokeStyle = color
      ctx.lineWidth = 3
      createSmoothPath(ctx, points)
      ctx.stroke()

      // Reset shadow
      ctx.shadowBlur = 0

      return points
    }

    // Draw areas with enhanced styling
    const aiAgentsPoints = drawArea("aiAgents", "#10b981", "rgba(16, 185, 129, 0.5)")

    const totalPoints = data.map((item, index) => {
      const x = padding.left + chartWidth * (index / (data.length - 1))
      const total = item.aiAgents + item.customers
      const y = padding.top + chartHeight - chartHeight * (total / maxValue)
      return { x, y, data: item }
    })

    // Draw customers area
    ctx.fillStyle = "rgba(59, 130, 246, 0.5)"
    ctx.beginPath()

    ctx.moveTo(totalPoints[0].x, totalPoints[0].y)

    for (let i = 1; i < totalPoints.length; i++) {
      const xc = (totalPoints[i - 1].x + totalPoints[i].x) / 2
      const yc = (totalPoints[i - 1].y + totalPoints[i].y) / 2
      ctx.quadraticCurveTo(totalPoints[i - 1].x, totalPoints[i - 1].y, xc, yc)
    }
    ctx.quadraticCurveTo(
      totalPoints[totalPoints.length - 1].x,
      totalPoints[totalPoints.length - 1].y,
      totalPoints[totalPoints.length - 1].x,
      totalPoints[totalPoints.length - 1].y,
    )

    for (let i = aiAgentsPoints.length - 1; i >= 0; i--) {
      const point = aiAgentsPoints[i]
      if (i === aiAgentsPoints.length - 1) {
        ctx.lineTo(point.x, point.y)
      } else {
        const xc = (aiAgentsPoints[i + 1].x + point.x) / 2
        const yc = (aiAgentsPoints[i + 1].y + point.y) / 2
        ctx.quadraticCurveTo(aiAgentsPoints[i + 1].x, aiAgentsPoints[i + 1].y, xc, yc)
      }
    }
    ctx.quadraticCurveTo(aiAgentsPoints[0].x, aiAgentsPoints[0].y, aiAgentsPoints[0].x, aiAgentsPoints[0].y)

    const customersGradient = ctx.createLinearGradient(0, padding.top, 0, padding.top + chartHeight)
    customersGradient.addColorStop(0, "rgba(59, 130, 246, 0.8)")
    customersGradient.addColorStop(0.5, "rgba(59, 130, 246, 0.4)")
    customersGradient.addColorStop(1, "rgba(59, 130, 246, 0.1)")

    ctx.fillStyle = customersGradient
    ctx.fill()

    // Draw the customers line with glow
    ctx.shadowColor = "#3b82f6"
    ctx.shadowBlur = 10
    ctx.strokeStyle = "#3b82f6"
    ctx.lineWidth = 3
    ctx.beginPath()
    ctx.moveTo(totalPoints[0].x, totalPoints[0].y)
    for (let i = 1; i < totalPoints.length; i++) {
      const xc = (totalPoints[i - 1].x + totalPoints[i].x) / 2
      const yc = (totalPoints[i - 1].y + totalPoints[i].y) / 2
      ctx.quadraticCurveTo(totalPoints[i - 1].x, totalPoints[i - 1].y, xc, yc)
    }
    ctx.quadraticCurveTo(
      totalPoints[totalPoints.length - 1].x,
      totalPoints[totalPoints.length - 1].y,
      totalPoints[totalPoints.length - 1].x,
      totalPoints[totalPoints.length - 1].y,
    )
    ctx.stroke()
    ctx.shadowBlur = 0

    // Enhanced tooltip handling
    canvas.onmousemove = (e) => {
      const rect = canvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      let closestPoint = null
      let minDistance = Number.POSITIVE_INFINITY

      totalPoints.forEach((point, index) => {
        const distance = Math.sqrt(Math.pow(point.x - x, 2) + Math.pow(point.y - y, 2))
        if (distance < minDistance && distance < 30) {
          minDistance = distance
          closestPoint = point
        }
      })

      if (closestPoint) {
        setTooltipData({
          visible: true,
          x: closestPoint.x,
          y: closestPoint.y,
          date: closestPoint.data.displayDate,
          customers: closestPoint.data.customers,
          aiAgents: closestPoint.data.aiAgents,
        })
      } else {
        setTooltipData((prev) => ({ ...prev, visible: false }))
      }
    }

    canvas.onmouseleave = () => {
      setTooltipData((prev) => ({ ...prev, visible: false }))
    }
  }, [timeRange, data])

  return (
    <AnimatedCard delay={800} className="@container/card">
      <CardHeader className="relative pb-0">
        <CardTitle>Total Visitors</CardTitle>
        <CardDescription>
          <span className="@[540px]/card:block hidden">{timeRangeTitle}</span>
          <span className="@[540px]/card:hidden">{timeRangeTitle}</span>
        </CardDescription>
        <div className="absolute right-4 top-4">
          <ToggleGroup
            type="single"
            value={timeRange}
            onValueChange={(value) => value && setTimeRange(value)}
            variant="outline"
            className="@[767px]/card:flex hidden"
          >
            <ToggleGroupItem value="1y" className="h-8 px-2.5 hover:scale-105 transition-transform">
              Last Year
            </ToggleGroupItem>
            <ToggleGroupItem value="ytd" className="h-8 px-2.5 hover:scale-105 transition-transform">
              Year to Date
            </ToggleGroupItem>
            <ToggleGroupItem value="6m" className="h-8 px-2.5 hover:scale-105 transition-transform">
              Last 6 Months
            </ToggleGroupItem>
            <ToggleGroupItem value="3m" className="h-8 px-2.5 hover:scale-105 transition-transform">
              Last 3 Months
            </ToggleGroupItem>
          </ToggleGroup>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="@[767px]/card:hidden flex w-40" aria-label="Select a time range">
              <SelectValue placeholder="Last 3 months" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="1y" className="rounded-lg">
                Last Year
              </SelectItem>
              <SelectItem value="ytd" className="rounded-lg">
                Year to Date
              </SelectItem>
              <SelectItem value="6m" className="rounded-lg">
                Last 6 Months
              </SelectItem>
              <SelectItem value="3m" className="rounded-lg">
                Last 3 Months
              </SelectItem>
              <SelectItem value="30d" className="rounded-lg">
                Last 30 Days
              </SelectItem>
              <SelectItem value="7d" className="rounded-lg">
                Last 7 Days
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>

      {/* Enhanced Legend */}
      <div className="flex items-center gap-6 px-6 pt-2 pb-4">
        <div className="flex items-center gap-2 hover:scale-105 transition-transform cursor-pointer">
          <div className="h-3 w-3 rounded-full bg-blue-500 shadow-lg shadow-blue-500/50"></div>
          <span className="text-sm text-muted-foreground">Customers</span>
        </div>
        <div className="flex items-center gap-2 hover:scale-105 transition-transform cursor-pointer">
          <div className="h-3 w-3 rounded-full bg-green-500 shadow-lg shadow-green-500/50"></div>
          <span className="text-sm text-muted-foreground">AI Agents</span>
        </div>
      </div>

      <CardContent className="px-2 pt-0 sm:px-6">
        <div className="h-[250px] w-full relative">
          <canvas ref={canvasRef} width={800} height={250} className="w-full h-full" />
          {tooltipData.visible && (
            <div
              className="absolute pointer-events-none bg-black/90 backdrop-blur-sm border border-gray-700 rounded-md p-3 shadow-xl z-10 animate-in fade-in-0 zoom-in-95 duration-200"
              style={{
                left: `${tooltipData.x + 10}px`,
                top: `${tooltipData.y - 80}px`,
                transform: "translateX(-50%)",
              }}
            >
              <div className="text-gray-300 text-xs mb-2 font-medium">{tooltipData.date}</div>
              <div className="flex items-center gap-2 text-sm mb-1">
                <span className="w-2 h-2 rounded-full bg-blue-500 shadow-sm"></span>
                <span className="text-white">Customers: {tooltipData.customers}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="w-2 h-2 rounded-full bg-green-500 shadow-sm"></span>
                <span className="text-white">AI Agents: {tooltipData.aiAgents}</span>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </AnimatedCard>
  )
}
