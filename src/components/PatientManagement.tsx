import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Edit, Trash2, Eye, Phone, MapPin } from "lucide-react";
import { toast } from "sonner";

interface Patient {
  id: number;
  name: string;
  age: number;
  illness: string;
  address: string;
  contact: string;
  status: "stable" | "attention" | "critical" | "improving";
  caretaker?: string;
  admissionDate: string;
}

const PatientManagement = () => {
  const [patients, setPatients] = useState<Patient[]>([
    {
      id: 1,
      name: "Sarah Johnson",
      age: 67,
      illness: "Post-surgery recovery",
      address: "123 Oak Street, Springfield",
      contact: "+1 (555) 123-4567",
      status: "stable",
      caretaker: "Maria Garcia",
      admissionDate: "2024-01-15"
    },
    {
      id: 2,
      name: "Robert Chen",
      age: 72,
      illness: "Chronic heart condition",
      address: "456 Pine Avenue, Springfield",
      contact: "+1 (555) 234-5678",
      status: "attention",
      caretaker: "David Smith",
      admissionDate: "2024-02-03"
    },
    {
      id: 3,
      name: "Emma Davis",
      age: 58,
      illness: "Stroke rehabilitation",
      address: "789 Maple Drive, Springfield",
      contact: "+1 (555) 345-6789",
      status: "improving",
      caretaker: "Lisa Brown",
      admissionDate: "2024-02-20"
    }
  ]);

  const [newPatient, setNewPatient] = useState({
    name: "",
    age: "",
    illness: "",
    address: "",
    contact: "",
    status: "stable" as Patient["status"]
  });

  const [editingPatient, setEditingPatient] = useState<Patient | null>(null);
  const [viewingPatient, setViewingPatient] = useState<Patient | null>(null);

  const handleAddPatient = () => {
    if (!newPatient.name || !newPatient.age || !newPatient.illness) {
      toast.error("Please fill in all required fields");
      return;
    }

    const patient: Patient = {
      id: Date.now(),
      name: newPatient.name,
      age: parseInt(newPatient.age),
      illness: newPatient.illness,
      address: newPatient.address,
      contact: newPatient.contact,
      status: newPatient.status,
      admissionDate: new Date().toISOString().split('T')[0]
    };

    setPatients([...patients, patient]);
    setNewPatient({
      name: "",
      age: "",
      illness: "",
      address: "",
      contact: "",
      status: "stable"
    });
    toast.success("Patient added successfully!");
  };

  const handleEditPatient = (patient: Patient) => {
    setEditingPatient(patient);
  };

  const handleUpdatePatient = () => {
    if (!editingPatient) return;

    setPatients(patients.map(p => 
      p.id === editingPatient.id ? editingPatient : p
    ));
    setEditingPatient(null);
    toast.success("Patient updated successfully!");
  };

  const handleDeletePatient = (id: number) => {
    setPatients(patients.filter(p => p.id !== id));
    toast.success("Patient removed successfully!");
  };

  const getStatusColor = (status: Patient["status"]) => {
    switch (status) {
      case "stable": return "success";
      case "improving": return "success";
      case "attention": return "warning";
      case "critical": return "destructive";
      default: return "secondary";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Patient Management</h2>
          <p className="text-muted-foreground">Manage patient information and monitor their care status</p>
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Patient
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Patient</DialogTitle>
              <DialogDescription>Enter patient information to register them in the system.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Patient Name *</Label>
                <Input
                  id="name"
                  value={newPatient.name}
                  onChange={(e) => setNewPatient(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter patient name"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="age">Age *</Label>
                <Input
                  id="age"
                  type="number"
                  value={newPatient.age}
                  onChange={(e) => setNewPatient(prev => ({ ...prev, age: e.target.value }))}
                  placeholder="Enter age"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="illness">Medical Condition *</Label>
                <Textarea
                  id="illness"
                  value={newPatient.illness}
                  onChange={(e) => setNewPatient(prev => ({ ...prev, illness: e.target.value }))}
                  placeholder="Describe the medical condition"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  value={newPatient.address}
                  onChange={(e) => setNewPatient(prev => ({ ...prev, address: e.target.value }))}
                  placeholder="Enter address"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="contact">Contact Number</Label>
                <Input
                  id="contact"
                  value={newPatient.contact}
                  onChange={(e) => setNewPatient(prev => ({ ...prev, contact: e.target.value }))}
                  placeholder="Enter phone number"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Initial Status</Label>
                <Select 
                  value={newPatient.status} 
                  onValueChange={(value: Patient["status"]) => 
                    setNewPatient(prev => ({ ...prev, status: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="stable">Stable</SelectItem>
                    <SelectItem value="attention">Needs Attention</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                    <SelectItem value="improving">Improving</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button onClick={handleAddPatient} className="w-full">
                Add Patient
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Registered Patients</CardTitle>
          <CardDescription>View and manage all patients in the system</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patient</TableHead>
                <TableHead>Age</TableHead>
                <TableHead>Condition</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Caretaker</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {patients.map((patient) => (
                <TableRow key={patient.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{patient.name}</div>
                      <div className="text-sm text-muted-foreground flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {patient.address}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{patient.age}</TableCell>
                  <TableCell>
                    <div className="max-w-xs truncate">{patient.illness}</div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusColor(patient.status) as "default"}>
                      {patient.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{patient.caretaker || "Unassigned"}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Phone className="h-3 w-3" />
                      {patient.contact}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setViewingPatient(patient)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditPatient(patient)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeletePatient(patient.id)}
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

      {/* View Patient Dialog */}
      {viewingPatient && (
        <Dialog open={!!viewingPatient} onOpenChange={() => setViewingPatient(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Patient Details</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Name</Label>
                  <p className="font-medium">{viewingPatient.name}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Age</Label>
                  <p className="font-medium">{viewingPatient.age} years</p>
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Medical Condition</Label>
                <p className="font-medium">{viewingPatient.illness}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Address</Label>
                <p className="font-medium">{viewingPatient.address}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Contact</Label>
                  <p className="font-medium">{viewingPatient.contact}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Status</Label>
                  <Badge variant={getStatusColor(viewingPatient.status) as "default"}>
                    {viewingPatient.status}
                  </Badge>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Assigned Caretaker</Label>
                  <p className="font-medium">{viewingPatient.caretaker || "Not assigned"}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Admission Date</Label>
                  <p className="font-medium">{viewingPatient.admissionDate}</p>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Edit Patient Dialog */}
      {editingPatient && (
        <Dialog open={!!editingPatient} onOpenChange={() => setEditingPatient(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Patient</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="edit-name">Patient Name</Label>
                <Input
                  id="edit-name"
                  value={editingPatient.name}
                  onChange={(e) => setEditingPatient(prev => prev ? { ...prev, name: e.target.value } : null)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-age">Age</Label>
                <Input
                  id="edit-age"
                  type="number"
                  value={editingPatient.age}
                  onChange={(e) => setEditingPatient(prev => prev ? { ...prev, age: parseInt(e.target.value) } : null)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-illness">Medical Condition</Label>
                <Textarea
                  id="edit-illness"
                  value={editingPatient.illness}
                  onChange={(e) => setEditingPatient(prev => prev ? { ...prev, illness: e.target.value } : null)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-address">Address</Label>
                <Input
                  id="edit-address"
                  value={editingPatient.address}
                  onChange={(e) => setEditingPatient(prev => prev ? { ...prev, address: e.target.value } : null)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-contact">Contact Number</Label>
                <Input
                  id="edit-contact"
                  value={editingPatient.contact}
                  onChange={(e) => setEditingPatient(prev => prev ? { ...prev, contact: e.target.value } : null)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-status">Status</Label>
                <Select 
                  value={editingPatient.status} 
                  onValueChange={(value: Patient["status"]) => 
                    setEditingPatient(prev => prev ? { ...prev, status: value } : null)
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="stable">Stable</SelectItem>
                    <SelectItem value="attention">Needs Attention</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                    <SelectItem value="improving">Improving</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button onClick={handleUpdatePatient} className="w-full">
                Update Patient
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default PatientManagement;