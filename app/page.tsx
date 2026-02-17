import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Home() {
  return (
    <div className="section bg-slate-50">
      <div className="container space-y-8">
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(0,1fr)_640px]">
          <header className="space-y-4 pt-2">
            <p className="text-sm font-medium text-slate-700">National Park Passes Australia</p>
            <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-slate-900 md:text-5xl">
              Book national park passes in minutes.
            </h1>
            <p className="max-w-2xl text-lg text-slate-700">
              Find the right pass, checkout securely, and we submit on your behalf.
              Most passes are processed within 12 hours.
            </p>
            <p className="max-w-2xl rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm">
              National Park Passes is a private booking and application assistance service and is not
              affiliated with Australian state or territory governments.
            </p>
          </header>

          <Card className="w-full max-w-[640px] justify-self-end">
            <CardContent className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold text-slate-900">Find my pass</h2>
                <p className="mt-1 text-sm text-slate-600">
                  Tell us where you are going and what you need. We&apos;ll recommend the right products.
                </p>
              </div>

              <form className="space-y-5" action="/passes/results" method="get">
                <div className="space-y-2">
                  <Label htmlFor="jurisdiction">State or territory</Label>
                  <select
                    id="jurisdiction"
                    name="jurisdiction"
                    className="h-10 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2"
                    defaultValue="NSW"
                  >
                    <option value="NSW">New South Wales</option>
                    <option value="QLD">Queensland</option>
                    <option value="VIC">Victoria</option>
                    <option value="WA">Western Australia</option>
                    <option value="SA">South Australia</option>
                    <option value="TAS">Tasmania</option>
                    <option value="NT">Northern Territory</option>
                    <option value="ACT">Australian Capital Territory</option>
                  </select>
                </div>

                <fieldset className="space-y-2">
                  <legend className="text-sm font-medium text-slate-900">What are you doing?</legend>
                  <div className="space-y-2">
                    {[
                      ["VISIT", "Just visiting (entry pass)"],
                      ["CAMP", "Camping overnight"],
                      ["DRIVE", "Driving in a restricted area / beach / island"],
                      ["UNSURE", "Not sure (help me choose)"],
                    ].map(([value, label], idx) => (
                      <label
                        key={value}
                        className="flex items-start gap-3 rounded-lg border border-slate-200 bg-white px-3 py-2"
                      >
                        <input
                          type="radio"
                          name="activityType"
                          value={value}
                          defaultChecked={idx === 0}
                          className="mt-1 h-4 w-4 border-slate-300 text-slate-900"
                        />
                        <span className="text-sm text-slate-800">{label}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>

                <div className="space-y-2">
                  <Label htmlFor="parkId">Park or recreation area (optional)</Label>
                  <Input id="parkId" name="parkId" placeholder="e.g. K'gari or Kosciuszko" />
                </div>

                <div className="flex flex-wrap gap-3">
                  <Button type="submit">Find my pass</Button>
                  <Link
                    href="/how-it-works"
                    className="inline-flex h-10 items-center justify-center rounded-lg border border-slate-300 bg-white px-4 text-sm font-medium text-slate-900 hover:bg-slate-50"
                  >
                    How it works
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        <section className="grid gap-4 md:grid-cols-3">
          {[
            "Secure Stripe checkout",
            "Private service, not government",
            "Status updates by email",
          ].map((item) => (
            <div
              key={item}
              className="rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm"
            >
              {item}
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}
