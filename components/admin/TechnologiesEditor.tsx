'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { api, Technology } from '@/lib/api';
import { auth } from '@/lib/auth';
import { toast } from 'sonner';
import { Plus, Trash2, Edit } from 'lucide-react';

export default function TechnologiesEditor() {
  const [technologies, setTechnologies] = useState<Technology[]>([]);
  const [editingTech, setEditingTech] = useState<Technology | null>(null);
  const [newTech, setNewTech] = useState({
    name: '',
    icon: '',
  });
  const [selectedIconFile, setSelectedIconFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    loadTechnologies();
  }, []);

  const loadTechnologies = async () => {
    try {
      const data = await api.getTechnologies();
      setTechnologies(data);
    } catch (error) {
      toast.error('Failed to load technologies');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const token = auth.getToken();
      if (!token) throw new Error('Not authenticated');
      
      await api.updateTechnologies(technologies, token);
      toast.success('Technologies updated successfully!');
    } catch (error) {
      toast.error('Failed to update technologies');
    } finally {
      setIsSaving(false);
    }
  };

  const addTechnology = async () => {
    if (!newTech.name || (!newTech.icon && !selectedIconFile)) return;
    const token = auth.getToken();
    if (!token) {
      toast.error('Not authenticated');
      return;
    }
    const formData = new FormData();
    formData.append('name', newTech.name);
    if (newTech.icon) formData.append('icon', newTech.icon);
    if (selectedIconFile) formData.append('icon', selectedIconFile);
    try {
      const response = await fetch('https://joash-backend.onrender.com/api/technologies', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      const data = await response.json();
      if (data.success && data.technology) {
        setTechnologies([...technologies, data.technology]);
        setNewTech({ name: '', icon: '' });
        setSelectedIconFile(null);
        toast.success('Technology added!');
      } else {
        toast.error(data.message || 'Failed to add technology');
      }
    } catch (error) {
      toast.error('Failed to add technology');
    }
  };

  const updateTechnology = (id: string, updates: Partial<Technology>) => {
    setTechnologies(technologies.map(tech => 
      tech.id === id ? { ...tech, ...updates } : tech
    ));
  };

  const deleteTechnology = (id: string) => {
    setTechnologies(technologies.filter(tech => tech.id !== id));
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
          <CardTitle className="text-white">Add New Technology</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label className="text-white">Name</Label>
              <Input
                value={newTech.name}
                onChange={(e) => setNewTech({ ...newTech, name: e.target.value })}
                className="bg-slate-800 border-slate-700 text-white"
                placeholder="React"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-white">Icon URL</Label>
              <Input
                value={newTech.icon}
                onChange={(e) => setNewTech({ ...newTech, icon: e.target.value })}
                className="bg-slate-800 border-slate-700 text-white"
                placeholder="https://example.com/icon.svg"
              />
              <Label className="text-white mt-2">Or Upload Icon File</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setSelectedIconFile(e.target.files[0]);
                  }
                }}
                className="bg-slate-800 border-slate-700 text-white"
              />
              {selectedIconFile && (
                <div className="mt-2 text-xs text-slate-400">Selected file: {selectedIconFile.name}</div>
              )}
            </div>
          </div>
          <Button
            onClick={addTechnology}
            className="bg-[#5d21da] hover:bg-[#4a1ba8] text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Technology
          </Button>
        </CardContent>
      </Card>

      <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
          <CardTitle className="text-white">Technologies List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {Array.isArray(technologies) &&
              technologies.map((tech) => (
                <div
                  key={tech.id}
                  className="flex items-center justify-between p-4 bg-slate-800 rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    {tech.icon && (
                      <img src={tech.icon} alt={tech.name} className="w-8 h-8" />
                    )}
                    <div>
                      <h3 className="text-white font-medium">{tech.name}</h3>
                      <p className="text-slate-400 text-sm">{tech.category}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setEditingTech(tech)}
                      className="border-slate-600 text-white hover:bg-slate-700"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => deleteTechnology(tech.id)}
                      className="border-red-600 text-red-400 hover:bg-red-900/20"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
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