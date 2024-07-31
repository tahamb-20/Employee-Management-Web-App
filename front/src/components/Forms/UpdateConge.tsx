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
import congeService from '@/services/conge';
import moment from 'moment';
 
const formSchema = z.object({
    description: z.string().min(2, {
      message: "La description doit contenir au moins 2 caractères.",
    }),
    dateDebut: z.string().nullable(),
    dateFin: z.string().nullable(),
    duree: z.number().min(1, {
      message: "La durée doit être un nombre positif ou nul.",
    }),
    // etatConge: z.string().nullable(), // Assuming it's a string enum
    natureconge: z.string().nullable(), // Assuming it's a string enum
  });
const UpdateConge = ({closeDialog, setConges, conge, role, userId}:{closeDialog:any, setConges:any, conge:any, userId:any,role:any}) => {
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  conge.dateFin =  moment(conge.dateFin).format('YYYY-MM-DD');
  conge.dateDebut =  moment(conge.dateDebut).format('YYYY-MM-DD');
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: conge

  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
  
    try {
      values.user = userId
      //@ts-ignore
      let result;
       await  congeService.updateConge(conge._id, values)
       if (role == "ROLE_ADMIN") {
        result = await  congeService.getAllConges()
        
      }else{
        result = await  congeService.getCongeByUserId(userId)

      }      console.log("🚀 ~ useEffect ~ result:", result)
      setConges(result)
      closeDialog()
     } catch (error) {
      console.log("🚀 ~ onSubmit ~ error:", error)
      
     }
    console.log(values)
  }
  return (
    <div className="mt-6 ">
 
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
          name="dateDebut"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date Debut</FormLabel>
              <FormControl>
                <Input type="date"  {...field} />
              </FormControl> 
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="dateFin"

          render={({ field }) => (
            <FormItem>
              <FormLabel>DateFin</FormLabel>
              <FormControl>
                <Input type="date" placeholder="Nom" {...field} />
              </FormControl> 
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="duree"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Duree</FormLabel>
              <FormControl>
                <Input type='number'   {...field} />
              </FormControl> 
              <FormMessage />
            </FormItem>
          )}
        />
        {/* <FormField
          control={form.control}
          name="etatConge"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Etat Conge </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez l'etat Conge." />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="CONFIRME">Confirmé </SelectItem>
                  <SelectItem value="ENATTENTE">En attente</SelectItem>
                  <SelectItem value="REFUSE">Refuser</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        /> */}
        <FormField
          control={form.control}
          name="natureconge"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nature Conge</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez la nature conge." />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="CONGES_MATERNITE">Congé maternite</SelectItem>
                  <SelectItem value="CONGES_PATERNITE">Congés paternité</SelectItem>
                  <SelectItem value="AUTRE">Autre</SelectItem>
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
            <Button type="submit"  >Save changes</Button>
          </DialogFooter>
      </form>
    </Form>
    </div>
  )
}
export default UpdateConge;
