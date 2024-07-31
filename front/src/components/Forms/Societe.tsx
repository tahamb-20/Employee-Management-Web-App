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
import getSociete, { addSociete } from '@/services/societe';
 
const formSchema = z.object({
  nom_societe: z.string().min(2, {
      message: "La nom societe doit contenir au moins 2 caractères.",
    }),
    description: z.string().min(2, {
      message: "La description doit contenir au moins 2 caractères.",
    }),
    email:  z.string().email({
      message: "L'adresse e-mail doit être valide.",
    }).min(6, {
      message: "L'adresse e-mail doit contenir au moins 2 caractères.",
    }),
    adresse:  z.string().min(2, {
      message: "L'adresse doit contenir au moins 2 caractères.",
    }),
    telephone: z.string().min(8, {
      message: "Le numéro de téléphone doit contenir au moins 8 caractères.",
    }), // Assuming it's a string enum
   });
const AddSociete =  ({closeDialog, setSocietes}:{closeDialog:any, setSocietes:any}) => {
  
    const [isSubmitting, setIsSubmitting] = useState(false);
   
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
    });
  
    async function onSubmit(values: z.infer<typeof formSchema>) {
       try {
        await  addSociete(values)
        const result = await  getSociete()
        console.log("🚀 ~ useEffect ~ result:", result)
        setSocietes(result)
        closeDialog()
       } catch (error) {
        console.log("🚀 ~ onSubmit ~ error:", error)
        toast.error("Something went wrong");

       }
      console.log(values)
    }
  return (
    <div className="mt-3 "> 
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
 
        <FormField
          control={form.control}
          name="nom_societe"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom Societe</FormLabel>
              <FormControl>
                <Input  placeholder='Nom Societe' {...field} />
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
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="email" {...field} />
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
                <Input  placeholder="Adresse"  {...field} />
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
              <FormLabel>telephone </FormLabel>
              <FormControl>
                <Input  type='number' {...field} />
              </FormControl> 
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
        <Button type="submit" onClick={() => closeDialog()}>Save changes</Button>
      </DialogFooter>
      </form>
    </Form>
    </div>
  )
}
export default AddSociete;
