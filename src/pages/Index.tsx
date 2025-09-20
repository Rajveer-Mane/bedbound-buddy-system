import { useState } from "react";
import LoginForm from "@/components/LoginForm";
import Navigation from "@/components/Navigation";
import Dashboard from "@/components/Dashboard";
import PatientManagement from "@/components/PatientManagement";
import CaretakerManagement from "@/components/CaretakerManagement";

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<"admin" | "family" | "caretaker">("admin");
  const [userName, setUserName] = useState("User");
  const [currentPage, setCurrentPage] = useState("dashboard");

  const handleLogin = (role: "admin" | "family" | "caretaker", username: string) => {
    setUserRole(role);
    setUserName(username);
    setIsAuthenticated(true);
    setCurrentPage("dashboard");
  };

  const handleNavigate = (page: string) => {
    if (page === "login") {
      setIsAuthenticated(false);
      setCurrentPage("dashboard");
      return;
    }
    setCurrentPage(page);
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case "dashboard":
        return <Dashboard userRole={userRole} userName={userName} />;
      case "patients":
        return <PatientManagement />;
      case "caretakers":
        return <CaretakerManagement />;
      case "assignments":
        return <div className="p-8 text-center text-muted-foreground">Assignment Management - Coming Soon</div>;
      case "health-logs":
        return <div className="p-8 text-center text-muted-foreground">Health Logs - Coming Soon</div>;
      case "feedback":
        return <div className="p-8 text-center text-muted-foreground">Feedback System - Coming Soon</div>;
      case "my-patients":
        return <div className="p-8 text-center text-muted-foreground">My Patients - Coming Soon</div>;
      case "schedule":
        return <div className="p-8 text-center text-muted-foreground">Schedule Management - Coming Soon</div>;
      default:
        return <Dashboard userRole={userRole} userName={userName} />;
    }
  };

  if (!isAuthenticated) {
    return <LoginForm onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation 
        currentPage={currentPage} 
        onNavigate={handleNavigate} 
        userRole={userRole}
        userName={userName}
      />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderCurrentPage()}
      </main>
    </div>
  );
};

export default Index;