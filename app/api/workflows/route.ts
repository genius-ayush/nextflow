import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function POST(req: Request) {

 const body = await req.json()

 const workflow = await prisma.workflow.create({
  data: {
   name: body.name,
   userId: body.userId,
   nodes: body.nodes,
   edges: body.edges
  }
 })

 return NextResponse.json(workflow)
}

export async function GET(req: Request) {

 const { searchParams } = new URL(req.url)
 const userId = searchParams.get("userId")

 const workflows = await prisma.workflow.findMany({
  where: { userId }
 })

 return NextResponse.json(workflows)
}