import React, { useState } from 'react'
import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
 import toast from "react-hot-toast";
 import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

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
import { RQUtilisateur } from '@/types';
import userService from '@/services/utilisateur';
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
const formSchema = z.object({
  username: z.string().min(2, {
    message: "Le nom d'utilisateur doit contenir au moins 2 caractères.",
  }),
  password: z.string().min(6, {
    message: "Le mot de passe doit contenir au moins 6 caractères.",
  }),
  nom: z.string().min(2, {
    message: "Le nom doit contenir au moins 2 caractères.",
  }),
  prenom: z.string().min(2, {
    message: "Le prénom doit contenir au moins 2 caractères.",
  }), 
  email: z.string().email({
    message: "L'adresse e-mail doit être valide.",
  }).min(6, {
    message: "L'adresse e-mail doit contenir au moins 2 caractères.",
  }),
  adresse: z.string().min(2, {
    message: "L'adresse doit contenir au moins 2 caractères.",
  }),
  matricule: z.string().min(2, {
    message: "Le matricule doit contenir au moins 2 caractères.",
  }),
  cin: z.string().min(8, {
    message: "Le CIN doit contenir au moins 8 caractères.",
  }),
  telephone: z.string().min(8, {
    message: "Le numéro de téléphone doit contenir au moins 8 caractères.",
  }),
  image: z.string().url(),
 
  role: z.string({
    required_error: "Veuillez sélectionner un role.",
  }),
});
const AddUtilisateurs = ({closeDialog, setUtilisateurs}:{closeDialog:any, setUtilisateurs:any}) => {

    const [isSubmitting, setIsSubmitting] = useState(false);
   
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
    });
  
    async function onSubmit(values: z.infer<typeof formSchema>) {
  
      const request: RQUtilisateur = {
       values 
       
      };
       try {
        await  userService.addUser(request)
        const result = await  userService.getUtilisateur()
        console.log("🚀 ~ useEffect ~ result:", result)
        setUtilisateurs(result)
        closeDialog()
        toast.success("L'u'tilisateur a été ajoutée avec succès")

       } catch (error) {
        toast.error(error?.message)

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
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Username" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="password" {...field} />
                </FormControl> 
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="nom"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom</FormLabel>
                <FormControl>
                  <Input placeholder="Nom" {...field} />
                </FormControl> 
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="prenom"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Prenom</FormLabel>
                <FormControl>
                  <Input placeholder="Prenom " {...field} />
                </FormControl> 
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Email" {...field} />
                </FormControl> 
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="adresse"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Adresse</FormLabel>
                <FormControl>
                  <Input placeholder="Adresse" {...field} />
                </FormControl> 
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="matricule"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Matricule</FormLabel>
                <FormControl>
                  <Input placeholder="matricule" {...field} />
                </FormControl> 
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="cin"
            render={({ field }) => (
              <FormItem>
                <FormLabel>CIN</FormLabel>
                <FormControl>
                  <Input type='number' placeholder="CIN" {...field} />
                </FormControl> 
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="telephone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Telephone</FormLabel>
                <FormControl>
                  <Input placeholder="telephone" {...field} />
                </FormControl> 
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image</FormLabel>
                <FormControl>
                  <Input placeholder="image " {...field} />
                </FormControl> 
                <FormMessage />
              </FormItem>
            )}
          />
            <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
              <FormLabel>Role</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez un role." />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="ROLE_ADMIN">Admin</SelectItem>
                  <SelectItem value="ROLE_EMPLOYE">Employé</SelectItem>
                </SelectContent>
              </Select>
           
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
            <Button type="submit" >Save changes</Button>
          </DialogFooter>
         </form>
      </Form>
      </div>
     
    </>
  )
}
export default AddUtilisateurs;
