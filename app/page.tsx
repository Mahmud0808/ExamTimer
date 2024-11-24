import CountdownTimer from "@/components/CountDownTimer";

export default function Home() {
  return (
    <main className="container mx-auto min-h-screen min-w-screen flex items-center justify-center">
      <div className="flex justify-center items-center gap-4">
        <CountdownTimer />
      </div>
    </main>
  );
}
