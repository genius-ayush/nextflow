import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function POST(
 req: Request,
 { params }: { params: { id: string } }
) {

 const workflow = await prisma.workflow.findUnique({
  where: { id: params.id }
 })

 const run = await prisma.workflowRun.create({
  data: {
   workflowId: workflow!.id,
   userId: workflow!.userId,
   status: "RUNNING"
  }
 })

 return NextResponse.json(run)
}