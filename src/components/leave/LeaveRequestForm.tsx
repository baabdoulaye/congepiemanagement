
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { format, differenceInBusinessDays, addDays } from "date-fns";
import { fr } from "date-fns/locale";
import { toast } from "@/hooks/use-toast";
import { LeaveType } from "@/types/leave";

// Schéma de validation pour le formulaire
const leaveRequestSchema = z.object({
  leaveTypeId: z.string({
    required_error: "Veuillez sélectionner un type de congé",
  }),
  startDate: z.date({
    required_error: "Veuillez sélectionner une date de début",
  }),
  endDate: z.date({
    required_error: "Veuillez sélectionner une date de fin",
  }).refine(date => date instanceof Date, {
    message: "Veuillez sélectionner une date de fin valide",
  }),
  reason: z.string().optional(),
  halfDayStart: z.boolean().default(false),
  halfDayEnd: z.boolean().default(false),
}).refine(data => data.endDate >= data.startDate, {
  message: "La date de fin doit être après la date de début",
  path: ["endDate"],
});

// Type pour les valeurs du formulaire
type LeaveRequestFormValues = z.infer<typeof leaveRequestSchema>;

// Props du composant
interface LeaveRequestFormProps {
  leaveTypes: LeaveType[];
  onSubmit: (values: LeaveRequestFormValues & { businessDays: number }) => void;
}

// Composant de formulaire de demande de congés
const LeaveRequestForm = ({ leaveTypes, onSubmit }: LeaveRequestFormProps) => {
  // Initialisation du formulaire
  const form = useForm<LeaveRequestFormValues>({
    resolver: zodResolver(leaveRequestSchema),
    defaultValues: {
      halfDayStart: false,
      halfDayEnd: false,
    },
  });
  
  // Surveiller les changements de dates pour calculer le nombre de jours
  const startDate = form.watch("startDate");
  const endDate = form.watch("endDate");
  const halfDayStart = form.watch("halfDayStart");
  const halfDayEnd = form.watch("halfDayEnd");
  
  // Calculer le nombre de jours ouvrés
  const calculateBusinessDays = () => {
    if (startDate && endDate) {
      // Calculer les jours ouvrés
      let days = differenceInBusinessDays(addDays(endDate, 1), startDate);
      
      // Ajuster pour les demi-journées
      if (halfDayStart) days -= 0.5;
      if (halfDayEnd) days -= 0.5;
      
      return Math.max(days, 0);
    }
    return 0;
  };
  
  // Nombre de jours calculés
  const businessDays = calculateBusinessDays();
  
  // Gestion de la soumission
  const handleSubmit = (values: LeaveRequestFormValues) => {
    onSubmit({
      ...values,
      businessDays
    });
    
    // Afficher une notification de confirmation
    toast({
      title: "Demande envoyée",
      description: `Votre demande de congés a été soumise avec succès. Elle est en attente de validation.`,
    });
    
    // Réinitialiser le formulaire
    form.reset();
  };
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="leaveTypeId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type de congé</FormLabel>
              <Select 
                onValueChange={field.onChange} 
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez un type de congé" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {leaveTypes.map((type) => (
                    <SelectItem key={type.id} value={type.id}>
                      <div className="flex items-center">
                        <div 
                          className="h-2 w-2 rounded-full mr-2" 
                          style={{ backgroundColor: type.color }}
                        />
                        <span>{type.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
  
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Date de début</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP", { locale: fr })
                        ) : (
                          <span>Choisir une date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date < new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
  
          <FormField
            control={form.control}
            name="endDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Date de fin</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP", { locale: fr })
                        ) : (
                          <span>Choisir une date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => 
                        date < (startDate || new Date())
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
  
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="halfDayStart"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                <FormControl>
                  <Input
                    type="checkbox"
                    checked={field.value}
                    onChange={field.onChange}
                    className="w-5 h-5"
                  />
                </FormControl>
                <FormLabel>Demi-journée le premier jour</FormLabel>
              </FormItem>
            )}
          />
  
          <FormField
            control={form.control}
            name="halfDayEnd"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                <FormControl>
                  <Input
                    type="checkbox"
                    checked={field.value}
                    onChange={field.onChange}
                    className="w-5 h-5"
                  />
                </FormControl>
                <FormLabel>Demi-journée le dernier jour</FormLabel>
              </FormItem>
            )}
          />
        </div>
  
        <FormField
          control={form.control}
          name="reason"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Motif (optionnel)</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Précisez le motif de votre demande si nécessaire" 
                  {...field} 
                />
              </FormControl>
              <FormDescription>
                Un motif est obligatoire pour certains types de congés comme la maladie.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
  
        <div className="bg-gray-50 p-4 rounded-md">
          <div className="font-medium mb-2">Récapitulatif</div>
          <div className="text-sm text-gray-600">
            {startDate && endDate ? (
              <div>
                <p>Période: du {format(startDate, "PPP", { locale: fr })} au {format(endDate, "PPP", { locale: fr })}</p>
                <p className="font-semibold mt-1">
                  Durée: {businessDays} jour{businessDays !== 1 ? 's' : ''} ouvré{businessDays !== 1 ? 's' : ''}
                </p>
              </div>
            ) : (
              <p>Veuillez sélectionner les dates de début et de fin</p>
            )}
          </div>
        </div>
  
        <Button 
          type="submit" 
          className="w-full bg-epie-blue hover:bg-epie-blue-dark"
        >
          Soumettre ma demande
        </Button>
      </form>
    </Form>
  );
};

export default LeaveRequestForm;
