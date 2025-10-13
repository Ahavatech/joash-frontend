'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { api, Social } from '@/lib/api';
import { auth } from '@/lib/auth';
import { toast } from 'sonner';
import { Plus, Trash2, Edit } from 'lucide-react';

export default function SocialsEditor() {
  // Socials are managed directly (no admin edits). Show read-only info and the current links for reference.
  const [socials, setSocials] = useState<Social[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await api.getSocials();
        if (Array.isArray(data)) setSocials(data);
        else if (data && Array.isArray((data as any).socials)) setSocials((data as any).socials);
        else setSocials([]);
      } catch (e) {
        setSocials([]);
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="w-8 h-8 border-4 border-[#5d21da] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
          <CardTitle className="text-white">Social Links (Read-only)</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-slate-400 mb-4">Social links are managed directly. This panel shows the current links for reference only.</p>
          <div className="grid gap-4">
            {Array.isArray(socials) && socials.length > 0 ? (
              socials.map((social) => (
                <div key={(social as any)._id || social.id} className="flex items-center gap-4 p-3 bg-slate-800 rounded-lg">
                  {social.icon && <img src={social.icon} alt={social.platform} className="w-8 h-8" />}
                  <div>
                    <div className="text-white font-medium">{social.platform}</div>
                    <div className="text-slate-400 text-sm">{social.url}</div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-slate-400">No social links found.</div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}