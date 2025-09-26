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
  const [socials, setSocials] = useState<Social[]>([]);
  const [newSocial, setNewSocial] = useState({
    platform: '',
    url: '',
    icon: '',
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    loadSocials();
  }, []);

  const loadSocials = async () => {
    try {
      const data = await api.getSocials();
      setSocials(data);
    } catch (error) {
      toast.error('Failed to load social links');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const token = auth.getToken();
      if (!token) throw new Error('Not authenticated');
      
      await api.updateSocials(socials, token);
      toast.success('Social links updated successfully!');
    } catch (error) {
      toast.error('Failed to update social links');
    } finally {
      setIsSaving(false);
    }
  };

  const addSocial = () => {
    if (newSocial.platform && newSocial.url && newSocial.icon) {
      const social: Social = {
        id: Date.now().toString(),
        ...newSocial,
      };
      setSocials([...socials, social]);
      setNewSocial({ platform: '', url: '', icon: '' });
    }
  };

  const updateSocial = (id: string, updates: Partial<Social>) => {
    setSocials(socials.map(social => 
      social.id === id ? { ...social, ...updates } : social
    ));
  };

  const deleteSocial = (id: string) => {
    setSocials(socials.filter(social => social.id !== id));
  };

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
          <CardTitle className="text-white">Add New Social Link</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label className="text-white">Platform</Label>
              <Input
                value={newSocial.platform}
                onChange={(e) => setNewSocial({ ...newSocial, platform: e.target.value })}
                className="bg-slate-800 border-slate-700 text-white"
                placeholder="GitHub"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-white">URL</Label>
              <Input
                value={newSocial.url}
                onChange={(e) => setNewSocial({ ...newSocial, url: e.target.value })}
                className="bg-slate-800 border-slate-700 text-white"
                placeholder="https://github.com/username"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-white">Icon URL</Label>
              <Input
                value={newSocial.icon}
                onChange={(e) => setNewSocial({ ...newSocial, icon: e.target.value })}
                className="bg-slate-800 border-slate-700 text-white"
                placeholder="https://example.com/icon.svg"
              />
            </div>
          </div>
          <Button
            onClick={addSocial}
            className="bg-[#5d21da] hover:bg-[#4a1ba8] text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Social Link
          </Button>
        </CardContent>
      </Card>

      <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
          <CardTitle className="text-white">Social Links</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {Array.isArray(socials) && socials.length > 0 ? (
              socials.map((social) => (
                <div
                  key={social.id}
                  className="flex items-center justify-between p-4 bg-slate-800 rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    {social.icon && (
                      <img src={social.icon} alt={social.platform} className="w-8 h-8" />
                    )}
                    <div>
                      <h3 className="text-white font-medium">{social.platform}</h3>
                      <p className="text-slate-400 text-sm">{social.url}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => deleteSocial(social.id)}
                      className="border-red-600 text-red-400 hover:bg-red-900/20"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-slate-400">No social links found.</div>
            )}
          </div>

          <Button
            onClick={handleSave}
            disabled={isSaving}
            className="w-full mt-6 bg-[#5d21da] hover:bg-[#4a1ba8] text-white"
          >
            {isSaving ? 'Saving...' : 'Save All Changes'}
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}