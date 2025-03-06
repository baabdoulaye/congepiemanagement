
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { User, UserRole } from "@/types/user";
import { users, departments, getUserDepartment } from "@/data/mockUsers";
import { Button } from "@/components/ui/button";
import { UserPlus, Pencil, Trash2, UserCheck, UserX } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import UserForm from "@/components/users/UserForm";
import { Badge } from "@/components/ui/badge";

// Page de gestion des utilisateurs (accessible aux administrateurs)
const UserManagement = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [userList, setUserList] = useState<User[]>(users);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // Fonction pour ajouter un nouvel utilisateur
  const handleAddUser = (userData: Partial<User>) => {
    // Dans une application réelle, cette fonction ferait un appel API
    const newUser: User = {
      id: `user${userList.length + 1}`,
      email: userData.email || "",
      firstName: userData.firstName || "",
      lastName: userData.lastName || "",
      role: userData.role || UserRole.EMPLOYEE,
      departmentId: userData.departmentId,
      managerId: userData.managerId,
      startDate: userData.startDate || new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: true
    };
    
    setUserList([...userList, newUser]);
    setIsAddDialogOpen(false);
    
    toast({
      title: "Utilisateur ajouté",
      description: `${newUser.firstName} ${newUser.lastName} a été ajouté avec succès.`
    });
  };

  // Fonction pour éditer un utilisateur existant
  const handleEditUser = (userData: Partial<User>) => {
    if (!selectedUser) return;
    
    // Dans une application réelle, cette fonction ferait un appel API
    const updatedUsers = userList.map(user => 
      user.id === selectedUser.id 
        ? { 
            ...user, 
            ...userData,
            updatedAt: new Date() 
          } 
        : user
    );
    
    setUserList(updatedUsers);
    setIsEditDialogOpen(false);
    setSelectedUser(null);
    
    toast({
      title: "Utilisateur modifié",
      description: "Les informations de l'utilisateur ont été mises à jour."
    });
  };

  // Fonction pour supprimer un utilisateur
  const handleDeleteUser = () => {
    if (!selectedUser) return;
    
    // Dans une application réelle, cette fonction ferait un appel API ou désactiverait l'utilisateur
    const updatedUsers = userList.map(user => 
      user.id === selectedUser.id 
        ? { ...user, isActive: false, updatedAt: new Date() } 
        : user
    );
    
    setUserList(updatedUsers);
    setIsDeleteDialogOpen(false);
    setSelectedUser(null);
    
    toast({
      title: "Utilisateur désactivé",
      description: `${selectedUser.firstName} ${selectedUser.lastName} a été désactivé.`,
      variant: "destructive"
    });
  };

  // Fonction pour réactiver un utilisateur
  const handleReactivateUser = (user: User) => {
    const updatedUsers = userList.map(u => 
      u.id === user.id 
        ? { ...u, isActive: true, updatedAt: new Date() } 
        : u
    );
    
    setUserList(updatedUsers);
    
    toast({
      title: "Utilisateur réactivé",
      description: `${user.firstName} ${user.lastName} a été réactivé.`
    });
  };

  // Rendu du badge de rôle
  const renderRoleBadge = (role: UserRole) => {
    switch (role) {
      case UserRole.ADMIN:
        return <Badge className="bg-red-500">Administrateur</Badge>;
      case UserRole.MANAGER:
        return <Badge className="bg-blue-500">Manager</Badge>;
      case UserRole.EMPLOYEE:
        return <Badge className="bg-green-500">Employé</Badge>;
      default:
        return <Badge>Inconnu</Badge>;
    }
  };

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Gestion des utilisateurs</h1>
          <p className="text-lg text-gray-600">
            Gérez les comptes utilisateurs, les rôles et les départements
          </p>
        </header>

        <div className="flex justify-between mb-6">
          <Button 
            onClick={() => setIsAddDialogOpen(true)}
            className="bg-epie-blue hover:bg-epie-blue/90"
          >
            <UserPlus className="mr-2 h-4 w-4" />
            Nouvel utilisateur
          </Button>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Rôle</TableHead>
                <TableHead>Département</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {userList.map((user) => {
                const department = getUserDepartment(user);
                
                return (
                  <TableRow key={user.id} className={!user.isActive ? "opacity-60" : ""}>
                    <TableCell className="font-medium">
                      {user.firstName} {user.lastName}
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{renderRoleBadge(user.role)}</TableCell>
                    <TableCell>{department?.name || "-"}</TableCell>
                    <TableCell>
                      {user.isActive ? (
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          Actif
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
                          Inactif
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        {user.isActive ? (
                          <>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => {
                                setSelectedUser(user);
                                setIsEditDialogOpen(true);
                              }}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="text-red-500 border-red-200 hover:bg-red-50"
                              onClick={() => {
                                setSelectedUser(user);
                                setIsDeleteDialogOpen(true);
                              }}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </>
                        ) : (
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="text-green-500 border-green-200 hover:bg-green-50"
                            onClick={() => handleReactivateUser(user)}
                          >
                            <UserCheck className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>

        {/* Dialog pour ajouter un utilisateur */}
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Ajouter un nouvel utilisateur</DialogTitle>
              <DialogDescription>
                Créez un nouveau compte utilisateur en remplissant le formulaire ci-dessous.
              </DialogDescription>
            </DialogHeader>
            <UserForm 
              departments={departments}
              users={users}
              onSubmit={handleAddUser}
              onCancel={() => setIsAddDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>

        {/* Dialog pour éditer un utilisateur */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Modifier l'utilisateur</DialogTitle>
              <DialogDescription>
                Modifiez les informations de l'utilisateur.
              </DialogDescription>
            </DialogHeader>
            {selectedUser && (
              <UserForm 
                user={selectedUser}
                departments={departments}
                users={users}
                onSubmit={handleEditUser}
                onCancel={() => {
                  setIsEditDialogOpen(false);
                  setSelectedUser(null);
                }}
              />
            )}
          </DialogContent>
        </Dialog>

        {/* Dialog pour confirmer la suppression d'un utilisateur */}
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Désactiver l'utilisateur</DialogTitle>
              <DialogDescription>
                Êtes-vous sûr de vouloir désactiver cet utilisateur ? 
                Ses accès seront révoqués mais ses données seront conservées.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Annuler</Button>
              </DialogClose>
              <Button 
                onClick={handleDeleteUser}
                variant="destructive"
              >
                <UserX className="mr-2 h-4 w-4" />
                Désactiver
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </MainLayout>
  );
};

export default UserManagement;
