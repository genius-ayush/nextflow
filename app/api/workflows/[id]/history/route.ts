import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET(
 req: Request,
 { params }: { params: { id: string } }
) {

 const runs = await prisma.workflowRun.findMany({
  where: {
   workflowId: params.id
  },
  orderBy: {
   startedAt: "desc"
  }
 })

 return NextResponse.json(runs)
}