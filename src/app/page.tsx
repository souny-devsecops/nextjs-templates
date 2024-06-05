'use client'
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import AppRouter from "@/cores/constants/routes_path";
import ApiClinet from "@/lib/api_client";
import { useRouter } from "next/navigation";
export default function Home() {
  const router = useRouter()
  return (
    <MaxWidthWrapper>
      <main className="flex min-h-screen flex-col items-center justify-center">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Hello World ສະບາຍດີ</CardTitle>
            <CardDescription>Deploy your new project in one-click.</CardDescription>
            <Button className="w-full" onClick={() => {
              router.push(AppRouter.counter)
            }}>Go Counter Page</Button>
          </CardHeader>
        </Card>
      </main>
    </MaxWidthWrapper>
  );
}
