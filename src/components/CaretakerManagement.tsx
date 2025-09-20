import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Edit, Trash2, Eye, Phone, Star } from "lucide-react";
import { toast } from "sonner";

interface Caretaker {
  id: number;
  name: string;
  gender: "Male" | "Female" | "Other";
  contact: string;
  experience: number;
  availability: "Available" | "Busy" | "Off Duty";
  rating: number;
  assignedPatients: number;
  specialization: string;
  joinDate: string;
}

const CaretakerManagement = () => {
  const [caretakers, setCaretakers] = useState<Caretaker[]>([
    {
      id: 1,
      name: "Maria Garcia",
      gender: "Female",
      contact: "+1 (555) 111-2222",
      experience: 8,
      availability: "Available",
      rating: 4.8,
      assignedPatients: 3,
      specialization: "Elderly Care",
      joinDate: "2023-06-15"
    },
    {
      id: 2,
      name: "David Smith",
      gender: "Male",
      contact: "+1 (555) 222-3333",
      experience: 12,
      availability: "Busy",
      rating: 4.9,
      assignedPatients: 4,
      specialization: "Post-Surgery Care",
      joinDate: "2022-03-10"
    },
    {
      id: 3,
      name: "Lisa Brown",
      gender: "Female",
      contact: "+1 (555) 333-4444",
      experience: 6,
      availability: "Available",
      rating: 4.7,
      assignedPatients: 2,
      specialization: "Rehabilitation",
      joinDate: "2023-11-20"
    }
  ]);

  const [newCaretaker, setNewCaretaker] = useState({
    name: "",
    gender: "Female" as Caretaker["gender"],
    contact: "",
    experience: "",
    availability: "Available" as Caretaker["availability"],
    specialization: ""
  });

  const [editingCaretaker, setEditingCaretaker] = useState<Caretaker | null>(null);
  const [viewingCaretaker, setViewingCaretaker] = useState<Caretaker | null>(null);

  const handleAddCaretaker = () => {
    if (!newCaretaker.name || !newCaretaker.contact || !newCaretaker.experience) {
      toast.error("Please fill in all required fields");
      return;
    }

    const caretaker: Caretaker = {
      id: Date.now(),
      name: newCaretaker.name,
      gender: newCaretaker.gender,
      contact: newCaretaker.contact,
      experience: parseInt(newCaretaker.experience),
      availability: newCaretaker.availability,
      rating: 5.0,
      assignedPatients: 0,
      specialization: newCaretaker.specialization,
      joinDate: new Date().toISOString().split('T')[0]
    };

    setCaretakers([...caretakers, caretaker]);
    setNewCaretaker({
      name: "",
      gender: "Female",
      contact: "",
      experience: "",
      availability: "Available",
      specialization: ""
    });
    toast.success("Caretaker added successfully!");
  };

  const handleEditCaretaker = (caretaker: Caretaker) => {
    setEditingCaretaker(caretaker);
  };

  const handleUpdateCaretaker = () => {
    if (!editingCaretaker) return;

    setCaretakers(caretakers.map(c => 
      c.id === editingCaretaker.id ? editingCaretaker : c
    ));
    setEditingCaretaker(null);
    toast.success("Caretaker updated successfully!");
  };

  const handleDeleteCaretaker = (id: number) => {
    setCaretakers(caretakers.filter(c => c.id !== id));
    toast.success("Caretaker removed successfully!");
  };

  const getAvailabilityColor = (availability: Caretaker["availability"]) => {
    switch (availability) {
      case "Available": return "success";
      case "Busy": return "warning";
      case "Off Duty": return "secondary";
      default: return "secondary";
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-3 w-3 ${i < Math.floor(rating) ? 'fill-warning text-warning' : 'text-muted-foreground'}`}
      />
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Caretaker Management</h2>
          <p className="text-muted-foreground">Manage caretaker profiles and track their availability</p>
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Caretaker
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Caretaker</DialogTitle>
              <DialogDescription>Register a new caretaker in the system.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="caretaker-name">Name *</Label>
                <Input
                  id="caretaker-name"
                  value={newCaretaker.name}
                  onChange={(e) => setNewCaretaker(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter caretaker name"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="gender">Gender</Label>
                <Select 
                  value={newCaretaker.gender} 
                  onValueChange={(value: Caretaker["gender"]) => 
                    setNewCaretaker(prev => ({ ...prev, gender: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Female">Female</SelectItem>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="caretaker-contact">Contact Number *</Label>
                <Input
                  id="caretaker-contact"
                  value={newCaretaker.contact}
                  onChange={(e) => setNewCaretaker(prev => ({ ...prev, contact: e.target.value }))}
                  placeholder="Enter contact number"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="experience">Experience (Years) *</Label>
                <Input
                  id="experience"
                  type="number"
                  value={newCaretaker.experience}
                  onChange={(e) => setNewCaretaker(prev => ({ ...prev, experience: e.target.value }))}
                  placeholder="Years of experience"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="specialization">Specialization</Label>
                <Input
                  id="specialization"
                  value={newCaretaker.specialization}
                  onChange={(e) => setNewCaretaker(prev => ({ ...prev, specialization: e.target.value }))}
                  placeholder="e.g., Elderly Care, Post-Surgery"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="availability">Availability</Label>
                <Select 
                  value={newCaretaker.availability} 
                  onValueChange={(value: Caretaker["availability"]) => 
                    setNewCaretaker(prev => ({ ...prev, availability: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Available">Available</SelectItem>
                    <SelectItem value="Busy">Busy</SelectItem>
                    <SelectItem value="Off Duty">Off Duty</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button onClick={handleAddCaretaker} className="w-full">
                Add Caretaker
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Registered Caretakers</CardTitle>
          <CardDescription>View and manage all caretakers in the system</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Caretaker</TableHead>
                <TableHead>Experience</TableHead>
                <TableHead>Specialization</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Availability</TableHead>
                <TableHead>Assigned Patients</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {caretakers.map((caretaker) => (
                <TableRow key={caretaker.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{caretaker.name}</div>
                      <div className="text-sm text-muted-foreground flex items-center gap-1">
                        <Phone className="h-3 w-3" />
                        {caretaker.contact}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{caretaker.experience} years</TableCell>
                  <TableCell>{caretaker.specialization}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      {renderStars(caretaker.rating)}
                      <span className="text-sm text-muted-foreground ml-1">
                        {caretaker.rating.toFixed(1)}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getAvailabilityColor(caretaker.availability) as "default"}>
                      {caretaker.availability}
                    </Badge>
                  </TableCell>
                  <TableCell>{caretaker.assignedPatients}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setViewingCaretaker(caretaker)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditCaretaker(caretaker)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteCaretaker(caretaker.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* View Caretaker Dialog */}
      {viewingCaretaker && (
        <Dialog open={!!viewingCaretaker} onOpenChange={() => setViewingCaretaker(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Caretaker Details</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Name</Label>
                  <p className="font-medium">{viewingCaretaker.name}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Gender</Label>
                  <p className="font-medium">{viewingCaretaker.gender}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Experience</Label>
                  <p className="font-medium">{viewingCaretaker.experience} years</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Specialization</Label>
                  <p className="font-medium">{viewingCaretaker.specialization}</p>
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Contact</Label>
                <p className="font-medium">{viewingCaretaker.contact}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Rating</Label>
                  <div className="flex items-center gap-1">
                    {renderStars(viewingCaretaker.rating)}
                    <span className="font-medium ml-1">{viewingCaretaker.rating.toFixed(1)}</span>
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Availability</Label>
                  <Badge variant={getAvailabilityColor(viewingCaretaker.availability) as "default"}>
                    {viewingCaretaker.availability}
                  </Badge>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Assigned Patients</Label>
                  <p className="font-medium">{viewingCaretaker.assignedPatients}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Join Date</Label>
                  <p className="font-medium">{viewingCaretaker.joinDate}</p>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Edit Caretaker Dialog */}
      {editingCaretaker && (
        <Dialog open={!!editingCaretaker} onOpenChange={() => setEditingCaretaker(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Caretaker</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="edit-caretaker-name">Name</Label>
                <Input
                  id="edit-caretaker-name"
                  value={editingCaretaker.name}
                  onChange={(e) => setEditingCaretaker(prev => prev ? { ...prev, name: e.target.value } : null)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-gender">Gender</Label>
                <Select 
                  value={editingCaretaker.gender} 
                  onValueChange={(value: Caretaker["gender"]) => 
                    setEditingCaretaker(prev => prev ? { ...prev, gender: value } : null)
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Female">Female</SelectItem>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-caretaker-contact">Contact</Label>
                <Input
                  id="edit-caretaker-contact"
                  value={editingCaretaker.contact}
                  onChange={(e) => setEditingCaretaker(prev => prev ? { ...prev, contact: e.target.value } : null)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-experience">Experience (Years)</Label>
                <Input
                  id="edit-experience"
                  type="number"
                  value={editingCaretaker.experience}
                  onChange={(e) => setEditingCaretaker(prev => prev ? { ...prev, experience: parseInt(e.target.value) } : null)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-specialization">Specialization</Label>
                <Input
                  id="edit-specialization"
                  value={editingCaretaker.specialization}
                  onChange={(e) => setEditingCaretaker(prev => prev ? { ...prev, specialization: e.target.value } : null)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-availability">Availability</Label>
                <Select 
                  value={editingCaretaker.availability} 
                  onValueChange={(value: Caretaker["availability"]) => 
                    setEditingCaretaker(prev => prev ? { ...prev, availability: value } : null)
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Available">Available</SelectItem>
                    <SelectItem value="Busy">Busy</SelectItem>
                    <SelectItem value="Off Duty">Off Duty</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button onClick={handleUpdateCaretaker} className="w-full">
                Update Caretaker
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default CaretakerManagement;