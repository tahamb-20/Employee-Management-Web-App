import React, { useEffect, useState } from 'react'
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
import { RQUtilisateur, Utilisateur } from '@/types';
import userService from '@/services/utilisateur';
    
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
    // role: z.string({
    //   required_error: "Veuillez sélectionner un role.",
    // }),
  });
const Profile = () => {
     const [isSubmitting, setIsSubmitting] = useState(false);
     const [utilisateur, setUtilisateur] = useState();
     const userInfo =JSON.parse(localStorage.getItem("userInfo"))
     const [isLoading, setIsLoading] = useState(true); // Add loading state

     //@ts-ignore
     if (utilisateur?.roles) {
       utilisateur.role = utilisateur?.roles?.length > 0 ? utilisateur?.roles[0]?.name : ""
     }
     const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues:async () => await userService.getUtilisateurById(userInfo.id)
    });
     
    useEffect(() => {
      async function fetchData() {
        const result = await userService.getUtilisateurById(userInfo.id)
        setUtilisateur(result);
      }
      fetchData();
    }, []);
    
    //@ts-ignore
   
    async function onSubmit(values: z.infer<typeof formSchema>) {
      console.log("🚀 ~ onSubmit ~ values:", values)
    
       try {
        //@ts-ignore
        values.role =utilisateur.role
        await  userService.updateUser(userInfo.id, values)
        const result = await  userService.getUtilisateurById(userInfo.id);
        console.log("🚀 ~ useEffect ~ result:", result)
        setUtilisateur(result)
        toast.success("Mise à jour réussie !!")
       } catch (error) {
        console.log("🚀 ~ onSubmit ~ error:", error)
        toast.error(error.message)
       }
      console.log(values)
    }
  
    return (
         <div className="bg-white p-3 mt-5 shadow-sm rounded-sm">
            <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                <span className="text-green-500">
                    <svg className="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                </span>
                <span className="tracking-wide">Profile</span>
            </div>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="text-gray-700">
                    <div className="grid md:grid-cols-2 text-sm">
                        <div className="grid grid-cols-2">
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                  <Input  defaultValue={utilisateur?.username}  {...field} />
                                </FormControl>
                                <FormDescription>
                                  This is your public display name.
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className="grid grid-cols-2">
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                  <Input type='password'  {...field} />
                                </FormControl> 
                                <FormMessage />
                              </FormItem>
                            )}
                          /> 
                        </div>
                        <div className="grid grid-cols-2">
                          <FormField
                            control={form.control}
                            name="nom"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Nom</FormLabel>
                                <FormControl>
                                  <Input   {...field} />
                                </FormControl> 
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className="grid grid-cols-2">
                          <FormField
                            control={form.control}
                            name="prenom"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Prenom</FormLabel>
                                <FormControl>
                                  <Input     {...field} />
                                </FormControl> 
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className="grid grid-cols-2">
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
                        </div>
                        <div className="grid grid-cols-2">
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
                        </div>
                        <div className="grid grid-cols-2">
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
                        </div>
                        <div className="grid grid-cols-2">
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
                        </div>
                        <div className="grid grid-cols-2">
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
                        </div>
                        <div className="grid grid-cols-2">
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
                        </div>
                        <div className="grid grid-cols-2">
                        {/* <FormField
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
                            /> */}
                        </div>
                        <div className="grid mt-6 grid-cols-2">
                        <Button type="submit" >Update Profile</Button>
                        </div>
                    </div>
                </div>
              </form>
            </Form>
             
        </div>
     )
  }
  export default Profile;
  