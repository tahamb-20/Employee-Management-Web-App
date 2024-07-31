import React, { useState } from 'react'
import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
     
 import { Button } from "@/components/ui/button"
 import {
   Form,
   FormControl,
   FormDescription,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
 } from "@/components/ui/form"
 import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils";
import { DialogClose, DialogFooter } from '../ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
  } from "@/components/ui/command"
  import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons';
import TacheService from '@/services/Tache';
const languages = [
    { label: "English", value: "en" },
    { label: "French", value: "fr" },
    { label: "German", value: "de" },
    { label: "Spanish", value: "es" },
    { label: "Portuguese", value: "pt" },
    { label: "Russian", value: "ru" },
    { label: "Japanese", value: "ja" },
    { label: "Korean", value: "ko" },
    { label: "Chinese", value: "zh" },
  ] as const
const formSchema = z.object({
  date_debut: z.string({
    required_error: "Veuillez sélectionner un date début.",
  }),  
  date_fin: z.string({
    required_error: "Veuillez sélectionner un date fin.",
  }),
  description: z.string().min(2, {
    message: "Le description doit contenir au moins 2 caractères.",
  }),
  nom_tache: z.string().min(2, {
    message: "Le nom du tache doit contenir au moins 2 caractères.",
  }), 
  // etattache: z
  // .string({
  //   required_error: "Veuillez sélectionner une tâche à afficher.",
  // }),
  naturetypetache: z.string().min(2, {
    message: "La nature type tache doit contenir au moins 2 caractères.",
  }),
  utilisateur: z.number({
    required_error: "Veuillez sélectionner un utilisateur.",
  }),
   
  
});
const AddTache = ({closeDialog, setTaches, usersCommand, userId}:{closeDialog:any, setTaches:any, usersCommand:any, userId:any}) => {
    console.log("🚀 ~ AddTache ~ userId:", userId)
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState("")
    const [isSubmitting, setIsSubmitting] = useState(false);
   
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
    });
    
    async function onSubmit(values: z.infer<typeof formSchema>) {
       console.log("🚀 ~ onSubmit ~ values:", values)
       
       try {
        
         const user  = usersCommand.find( (user) => user.idutilisateur === values.utilisateur )
        values.user = user
        console.log("🚀 ~ onSubmit ~ user:", user)
        await   TacheService.addTacheAndAssignToEmployee(values, user.idutilisateur)
        const result = await  TacheService.getAllTaches()
        setTaches(result)
        closeDialog()
        toast.success("La tâche a été ajoutée avec succès")

       } catch (error) {
        console.log("🚀 ~ onSubmit ~ error:", error)
        toast.error("Something went wrong");

       }
      console.log(values)
    }
  return (
    <>
      <div className="mt-6 ">
      
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="date_debut"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date debut</FormLabel>
                <FormControl>
                  <Input type='date'  {...field} />
                </FormControl> 
                <FormMessage />
              </FormItem>
            )}
          />
        
          <FormField
            control={form.control}
            name="date_fin"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date fin</FormLabel>
                <FormControl>
                  <Input type='date' {...field} />
                </FormControl> 
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input placeholder="Description" {...field} />
                </FormControl> 
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="nom_tache"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom Tache</FormLabel>
                <FormControl>
                  <Input   {...field} />
                </FormControl> 
                <FormMessage />
              </FormItem>
            )}
          />
          {/* <FormField
            control={form.control}
            name="etattache"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Etat tache</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez un type du tache à afficher." />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="EN_COURS">En cours</SelectItem>
                  <SelectItem value="EN_ATTENTE">En attente</SelectItem>
                  <SelectItem value="TERMINEE">Terminee</SelectItem>
                </SelectContent>
              </Select>
           
              <FormMessage />
              </FormItem>
            )}
          /> */}
          <FormField
            control={form.control}
            name="naturetypetache"
            render={({ field }) => (
              <FormItem>
              <FormLabel>Nature type tache</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez un type du tache à afficher." />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="PAR_DEFAUT">Par defaut</SelectItem>
                  <SelectItem value="SUPPLEMENTAIRE">supplementaire</SelectItem>
                </SelectContent>
              </Select>
           
              <FormMessage />
            </FormItem> 
            )}
          />
         <FormField
            control={form.control}
            name="utilisateur"
            render={({ field }) => (
              <FormItem>
                 <FormLabel>Utilisateur</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-[200px] justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? usersCommand.find(
                            (user) => user.idutilisateur === field.value
                          )?.username
                           
                        : "Sélectionnez utilisateur"}
                      <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput
                      placeholder="Rechercher un utilisateur..."
                      className="h-9"
                    />
                    <CommandEmpty>Aucun utilisateur trouvé.</CommandEmpty>
                    <CommandGroup>
                      {usersCommand.map((user) => (
                        <CommandItem
                          value={user.idutilisateur}
                          key={user.idutilisateur}
                          onSelect={() => {
                            form.setValue("utilisateur", user.idutilisateur)
                          }}
                        >
                          {user.matricule} {user.username}
                          <CheckIcon
                            className={cn(
                              "ml-auto h-4 w-4",
                              user.idutilisateur === field.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
            
              <FormMessage />
              </FormItem>
            )}
          />
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
            <Button type="submit" >Affecter Tache</Button>
          </DialogFooter>
         </form>
        
      </Form>
      </div>
     
    </>
  )
}
export default AddTache;
