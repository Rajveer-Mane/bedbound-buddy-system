import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  UserCheck, 
  Calendar, 
  Heart, 
  TrendingUp, 
  AlertCircle,
  CheckCircle,
  Clock
} from "lucide-react";

interface DashboardProps {
  userRole: "admin" | "family" | "caretaker";
  userName: string;
}

const Dashboard = ({ userRole, userName }: DashboardProps) => {
  // Mock data - in real app this would come from your backend
  const adminStats = {
    totalPatients: 24,
    activeCaretakers: 18,
    todayAppointments: 8,
    pendingAssignments: 3
  };

  const caretakerStats = {
    assignedPatients: 4,
    todaySchedule: 2,
    completedLogs: 15,
    pendingTasks: 2
  };

  const recentPatients = [
    { id: 1, name: "Sarah Johnson", condition: "Post-surgery recovery", status: "stable", caretaker: "Maria Garcia" },
    { id: 2, name: "Robert Chen", condition: "Chronic illness", status: "attention", caretaker: "David Smith" },
    { id: 3, name: "Emma Davis", condition: "Rehabilitation", status: "improving", caretaker: "Lisa Brown" },
  ];

  const upcomingSchedule = [
    { time: "09:00 AM", patient: "Sarah Johnson", task: "Medication & Vitals", status: "pending" },
    { time: "11:30 AM", patient: "Robert Chen", task: "Physical Therapy", status: "pending" },
    { time: "02:00 PM", patient: "Emma Davis", task: "Health Assessment", status: "completed" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "stable": return "success";
      case "improving": return "success";
      case "attention": return "warning";
      case "critical": return "destructive";
      default: return "secondary";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed": return <CheckCircle className="h-4 w-4 text-success" />;
      case "pending": return <Clock className="h-4 w-4 text-warning" />;
      default: return <AlertCircle className="h-4 w-4 text-muted-foreground" />;
    }
  };

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg p-6">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Welcome back, {userName}!
        </h1>
        <p className="text-muted-foreground">
          {userRole === "caretaker" 
            ? "Here's your patient care overview for today"
            : "Here's your care management overview"
          }
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {userRole === "caretaker" ? (
          <>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Assigned Patients</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{caretakerStats.assignedPatients}</div>
                <p className="text-xs text-muted-foreground">Active assignments</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Today's Schedule</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{caretakerStats.todaySchedule}</div>
                <p className="text-xs text-muted-foreground">Appointments today</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Completed Logs</CardTitle>
                <Heart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{caretakerStats.completedLogs}</div>
                <p className="text-xs text-success">This month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Tasks</CardTitle>
                <AlertCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{caretakerStats.pendingTasks}</div>
                <p className="text-xs text-muted-foreground">Need attention</p>
              </CardContent>
            </Card>
          </>
        ) : (
          <>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{adminStats.totalPatients}</div>
                <p className="text-xs text-muted-foreground">+2 from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Caretakers</CardTitle>
                <UserCheck className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{adminStats.activeCaretakers}</div>
                <p className="text-xs text-success">All available</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Today's Appointments</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{adminStats.todayAppointments}</div>
                <p className="text-xs text-muted-foreground">Across all patients</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Assignments</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{adminStats.pendingAssignments}</div>
                <p className="text-xs text-warning">Need assignment</p>
              </CardContent>
            </Card>
          </>
        )}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Patients / My Patients */}
        <Card>
          <CardHeader>
            <CardTitle>
              {userRole === "caretaker" ? "My Patients" : "Recent Patients"}
            </CardTitle>
            <CardDescription>
              {userRole === "caretaker" 
                ? "Patients under your care"
                : "Latest patient registrations and updates"
              }
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentPatients.map((patient) => (
              <div key={patient.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="space-y-1">
                  <p className="font-medium">{patient.name}</p>
                  <p className="text-sm text-muted-foreground">{patient.condition}</p>
                  {userRole !== "caretaker" && (
                    <p className="text-xs text-muted-foreground">Caretaker: {patient.caretaker}</p>
                  )}
                </div>
                <Badge variant={getStatusColor(patient.status) as "default"}>
                  {patient.status}
                </Badge>
              </div>
            ))}
            <Button variant="outline" className="w-full">
              View All Patients
            </Button>
          </CardContent>
        </Card>

        {/* Schedule / Upcoming Tasks */}
        <Card>
          <CardHeader>
            <CardTitle>
              {userRole === "caretaker" ? "Today's Schedule" : "Upcoming Activities"}
            </CardTitle>
            <CardDescription>
              {userRole === "caretaker" 
                ? "Your scheduled patient care activities"
                : "System-wide scheduled activities"
              }
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingSchedule.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm">{item.time}</span>
                    {getStatusIcon(item.status)}
                  </div>
                  <p className="font-medium">{item.patient}</p>
                  <p className="text-sm text-muted-foreground">{item.task}</p>
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full">
              View Full Schedule
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;