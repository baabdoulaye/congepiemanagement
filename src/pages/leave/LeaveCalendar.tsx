
import { useState, useMemo } from "react";
import MainLayout from "@/layouts/MainLayout";
import { Calendar as CalendarIcon, Search, Filter } from "lucide-react";
import { format, addMonths, startOfMonth, endOfMonth, eachDayOfInterval, isWeekend, isSameDay } from "date-fns";
import { fr } from "date-fns/locale";
import { LeaveRequest, LeaveRequestStatus } from "@/types/leave";
import { User } from "@/types/user";
import { leaveRequests, leaveTypes } from "@/data/mockData";
import { users, departments } from "@/data/mockUsers";
import { Button } from "@/components/ui/button";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Page de calendrier des congés
const LeaveCalendar = () => {
  // État pour contrôler la date affichée
  const [currentDate, setCurrentDate] = useState(new Date());
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);
  const [selectedLeaveTypes, setSelectedLeaveTypes] = useState<Record<string, boolean>>(
    Object.fromEntries(leaveTypes.map(type => [type.id, true]))
  );
  
  // Calcul des jours du mois courant
  const daysInMonth = useMemo(() => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(currentDate);
    return eachDayOfInterval({ start: monthStart, end: monthEnd });
  }, [currentDate]);
  
  // Mois précédent
  const goToPreviousMonth = () => {
    setCurrentDate(prev => addMonths(prev, -1));
  };
  
  // Mois suivant
  const goToNextMonth = () => {
    setCurrentDate(prev => addMonths(prev, 1));
  };
  
  // Filtrer les demandes de congés
  const filteredLeaveRequests = useMemo(() => {
    let filtered = [...leaveRequests];
    
    // Filtrer par statut (seulement les congés approuvés)
    filtered = filtered.filter(req => req.status === LeaveRequestStatus.APPROVED);
    
    // Filtrer par type de congés sélectionnés
    filtered = filtered.filter(req => selectedLeaveTypes[req.leaveTypeId]);
    
    // Filtrer par département
    if (selectedDepartment) {
      const departmentUserIds = users
        .filter(user => user.departmentId === selectedDepartment)
        .map(user => user.id);
      
      filtered = filtered.filter(req => departmentUserIds.includes(req.employeeId));
    }
    
    // Filtrer par terme de recherche
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(req => {
        const user = users.find(u => u.id === req.employeeId);
        if (!user) return false;
        
        return (
          user.firstName.toLowerCase().includes(searchLower) ||
          user.lastName.toLowerCase().includes(searchLower) ||
          `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchLower)
        );
      });
    }
    
    return filtered;
  }, [leaveRequests, selectedLeaveTypes, selectedDepartment, searchTerm]);
  
  // Obtenir les congés pour un jour spécifique
  const getLeavesForDay = (day: Date) => {
    return filteredLeaveRequests.filter(req => {
      const startDate = new Date(req.startDate);
      const endDate = new Date(req.endDate);
      return day >= startDate && day <= endDate;
    });
  };
  
  // Obtenir l'utilisateur associé à une demande
  const getUserForRequest = (request: LeaveRequest) => {
    return users.find(user => user.id === request.employeeId);
  };
  
  // Obtenir le type de congé associé à une demande
  const getLeaveTypeForRequest = (request: LeaveRequest) => {
    return leaveTypes.find(type => type.id === request.leaveTypeId);
  };

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Calendrier des congés</h1>
          <p className="text-lg text-gray-600">
            Visualisez les congés de tous les employés
          </p>
        </header>
        
        <div className="flex flex-col gap-6">
          {/* Contrôles du calendrier */}
          <div className="flex flex-wrap justify-between items-center gap-4 bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Button variant="outline" onClick={goToPreviousMonth}>
                  &lt;
                </Button>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="min-w-40">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {format(currentDate, "MMMM yyyy", { locale: fr })}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="month"
                      selected={currentDate}
                      onSelect={(date) => date && setCurrentDate(date)}
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
                <Button variant="outline" onClick={goToNextMonth}>
                  &gt;
                </Button>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Rechercher un employé..."
                  className="pl-8 w-64"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <Select
                onValueChange={(value) => setSelectedDepartment(value === "all" ? null : value)}
                defaultValue="all"
              >
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Tous les départements" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les départements</SelectItem>
                  {departments.map((dept) => (
                    <SelectItem key={dept.id} value={dept.id}>
                      {dept.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <Filter className="h-4 w-4" />
                    Types de congés
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  {leaveTypes.map((type) => (
                    <DropdownMenuCheckboxItem
                      key={type.id}
                      checked={selectedLeaveTypes[type.id]}
                      onCheckedChange={(checked) => {
                        setSelectedLeaveTypes({
                          ...selectedLeaveTypes,
                          [type.id]: checked
                        });
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: type.color }}
                        />
                        {type.name}
                      </div>
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          
          {/* Calendrier */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            {/* En-tête du calendrier */}
            <div className="grid grid-cols-7 border-b">
              {["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"].map((day, index) => (
                <div
                  key={day}
                  className={`p-2 text-center font-medium ${
                    index >= 5 ? "bg-gray-50 text-gray-500" : ""
                  }`}
                >
                  {day}
                </div>
              ))}
            </div>
            
            {/* Corps du calendrier */}
            <div className="grid grid-cols-7 auto-rows-fr">
              {daysInMonth.map((day, i) => {
                const dayNumber = day.getDate();
                const dayIndex = day.getDay();
                const isWeekendDay = isWeekend(day);
                const leaves = getLeavesForDay(day);
                
                return (
                  <div
                    key={i}
                    className={`min-h-24 p-2 border-b border-r ${
                      isWeekendDay ? "bg-gray-50" : ""
                    }`}
                  >
                    <div className="font-medium text-sm mb-1">
                      {dayNumber}
                    </div>
                    
                    <div className="space-y-1 overflow-y-auto max-h-20">
                      {leaves.map((leave) => {
                        const user = getUserForRequest(leave);
                        const leaveType = getLeaveTypeForRequest(leave);
                        
                        if (!user || !leaveType) return null;
                        
                        const isFirstDay = isSameDay(day, new Date(leave.startDate));
                        
                        return (
                          <div
                            key={leave.id}
                            className="text-xs bg-opacity-20 rounded p-1 truncate"
                            style={{ backgroundColor: `${leaveType.color}30` }}
                          >
                            {isFirstDay && (
                              <div 
                                className="w-2 h-2 rounded-full inline-block mr-1" 
                                style={{ backgroundColor: leaveType.color }}
                              />
                            )}
                            {user.firstName} {user.lastName.charAt(0)}.
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
          {/* Légende des types de congés */}
          <div className="flex flex-wrap gap-4 p-4 bg-white rounded-lg shadow-sm border border-gray-100">
            <div className="font-medium">Types de congés :</div>
            {leaveTypes.map((type) => (
              <div key={type.id} className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: type.color }}
                />
                <span>{type.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

// Composant Calendar simple pour la sélection de mois
interface CalendarProps {
  mode: "month";
  selected: Date;
  onSelect: (date: Date | undefined) => void;
  initialFocus?: boolean;
  className?: string;
}

const Calendar = ({ mode, selected, onSelect, className }: CalendarProps) => {
  const months = useMemo(() => {
    const now = new Date();
    return Array.from({ length: 12 }, (_, i) => {
      const month = new Date(now.getFullYear(), i, 1);
      return {
        date: month,
        name: format(month, "MMMM", { locale: fr })
      };
    });
  }, []);

  const years = useMemo(() => {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: 5 }, (_, i) => currentYear - 2 + i);
  }, []);

  const handleMonthSelect = (month: number) => {
    const newDate = new Date(selected);
    newDate.setMonth(month);
    onSelect(newDate);
  };

  const handleYearSelect = (year: number) => {
    const newDate = new Date(selected);
    newDate.setFullYear(year);
    onSelect(newDate);
  };

  return (
    <div className={`p-3 ${className}`}>
      <div className="grid grid-cols-3 gap-2 mb-2">
        {years.map((year) => (
          <Button
            key={year}
            variant={selected.getFullYear() === year ? "default" : "outline"}
            className="text-sm"
            onClick={() => handleYearSelect(year)}
          >
            {year}
          </Button>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-2">
        {months.map((month, index) => (
          <Button
            key={month.name}
            variant={selected.getMonth() === index ? "default" : "outline"}
            className="text-sm"
            onClick={() => handleMonthSelect(index)}
          >
            {month.name}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default LeaveCalendar;
