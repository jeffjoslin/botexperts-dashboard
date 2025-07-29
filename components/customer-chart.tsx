"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

const chartData = [
  { month: "Jan", conversations: 186, responses: 175 },
  { month: "Feb", conversations: 305, responses: 290 },
  { month: "Mar", conversations: 237, responses: 225 },
  { month: "Apr", conversations: 273, responses: 260 },
  { month: "May", conversations: 209, responses: 198 },
  { month: "Jun", conversations: 314, responses: 295 },
]

const chartConfig = {
  conversations: {
    label: "Conversations",
    color: "hsl(var(--chart-1))",
  },
  responses: {
    label: "Responses",
    color: "hsl(var(--chart-2))",
  },
}

export function CustomerChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Chatbot Performance</CardTitle>
        <CardDescription>Monthly conversation and response trends for your chatbots</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer width="100%" height={350}>
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="fillConversations" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-conversations)" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="var(--color-conversations)" stopOpacity={0.1} />
                </linearGradient>
                <linearGradient id="fillResponses" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-responses)" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="var(--color-responses)" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <YAxis tickLine={false} axisLine={false} tickMargin={8} />
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <Area
                dataKey="responses"
                type="natural"
                fill="url(#fillResponses)"
                fillOpacity={0.4}
                stroke="var(--color-responses)"
                stackId="a"
              />
              <Area
                dataKey="conversations"
                type="natural"
                fill="url(#fillConversations)"
                fillOpacity={0.4}
                stroke="var(--color-conversations)"
                stackId="a"
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
