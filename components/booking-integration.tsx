'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { InlineWidget } from 'react-calendly';
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  ExternalLink,
  Mail,
  MessageSquareText,
  Sparkles,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { siteConfig } from '@/lib/site-config';

export default function BookingIntegration() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const callHighlights = [
    '20 to 30 minute discovery call',
    'Project scope and goals review',
    'Timeline and budget alignment',
    'Clear next steps after the call',
  ];

  const callSteps = [
    {
      title: 'Choose a slot',
      description: 'Pick a time that matches your timezone and schedule.',
      icon: CalendarDays,
    },
    {
      title: 'Share context',
      description: 'Add your project link, idea, or challenge in the booking form.',
      icon: MessageSquareText,
    },
    {
      title: 'Join prepared',
      description: 'I review your details ahead of time so the call stays focused.',
      icon: Sparkles,
    },
  ];

  return (
    <section
      id="schedule"
      className="py-20 px-4 bg-black text-white relative overflow-hidden"
    >
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(93,33,218,0.18),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(93,33,218,0.12),transparent_30%)]"></div>
        <div className="absolute top-12 left-8 h-40 w-40 rounded-full border border-white/10"></div>
        <div className="absolute bottom-12 right-8 h-56 w-56 rounded-full border border-[#5d21da]/20"></div>
      </div>

      <div className="container mx-auto relative z-10 px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <Badge className="mb-5 border border-[#5d21da]/30 bg-[#5d21da]/10 px-4 py-1.5 text-[#d7c6ff]">
            Schedule a Call
          </Badge>
          <h2 className="text-4xl font-bold tracking-tight md:text-5xl mb-6">
            Strategy first. Build second.
          </h2>
          <p className="mx-auto max-w-3xl text-lg text-slate-300 md:text-xl">
            Use this call to pressure-test your idea, define the right MVP, or
            unblock a product decision before development starts.
          </p>
        </motion.div>

        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-120px' }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur-xl"
          >
            <div className="mb-8 flex flex-wrap items-center gap-3">
              <Badge className="bg-white text-black hover:bg-white">
                Discovery Call
              </Badge>
              <div className="flex items-center gap-2 text-sm text-slate-300">
                <Clock3 className="h-4 w-4 text-[#a77bff]" />
                20-30 mins
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-3xl font-semibold leading-tight">
                Book a focused conversation, not a vague intro meeting.
              </h3>
              <p className="max-w-2xl text-slate-300">
                This works best if you already have an idea, an existing product
                that needs improvement, or a technical decision you want clarity on.
              </p>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {callHighlights.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-2xl border border-white/8 bg-black/30 px-4 py-4"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 text-[#8f5cff]" />
                  <span className="text-sm text-slate-200">{item}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button
                    size="lg"
                    className="h-12 rounded-full bg-[#5d21da] px-7 text-white hover:bg-[#4a1ba8]"
                  >
                    Open booking widget
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-5xl border-slate-800 bg-slate-950 p-0 text-white sm:max-w-5xl">
                  <DialogHeader className="border-b border-white/10 px-6 py-5">
                    <DialogTitle className="text-2xl">
                      Schedule your discovery call
                    </DialogTitle>
                    <DialogDescription className="text-slate-400">
                      Choose a slot and add project context so I can prepare before we meet.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="h-[75vh] min-h-[640px] overflow-hidden rounded-b-lg">
                    <InlineWidget
                      url={siteConfig.calendlyUrl}
                      styles={{ height: '100%', width: '100%' }}
                    />
                  </div>
                </DialogContent>
              </Dialog>

              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-12 rounded-full border-white/15 bg-transparent px-7 text-white hover:bg-white hover:text-black"
              >
                <a
                  href={siteConfig.calendlyUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  Open in new tab
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            </div>

            <p className="mt-4 text-sm text-slate-400">
              If the scheduler does not load, email{' '}
              <a
                href={`mailto:${siteConfig.email}`}
                className="text-white underline decoration-[#5d21da]/60 underline-offset-4"
              >
                {siteConfig.email}
              </a>{' '}
              and I will send available times manually.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-120px' }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-5"
          >
            {callSteps.map((step, index) => (
              <div
                key={step.title}
                className="rounded-[28px] border border-white/10 bg-slate-950/80 p-6"
              >
                <div className="mb-4 flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#5d21da]/15 text-[#b596ff]">
                    <step.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm uppercase tracking-[0.22em] text-slate-500">
                      Step {index + 1}
                    </p>
                    <h3 className="text-xl font-semibold text-white">
                      {step.title}
                    </h3>
                  </div>
                </div>
                <p className="text-slate-300">{step.description}</p>
              </div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-120px' }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="rounded-[28px] border border-[#5d21da]/20 bg-gradient-to-br from-[#5d21da]/15 via-slate-950 to-slate-950 p-6"
            >
              <div className="mb-4 flex items-center gap-3">
                <Mail className="h-5 w-5 text-[#c1a8ff]" />
                <h3 className="text-lg font-semibold">Before you book</h3>
              </div>
              <p className="text-slate-300">
                Bring any relevant links: Figma, website, deck, brief, or a short note
                on the problem you want solved. That makes the call materially more useful.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
