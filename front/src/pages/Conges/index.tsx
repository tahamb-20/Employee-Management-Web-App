import React, {useEffect, useState} from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import moment from 'moment';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import ReactPaginate from 'react-paginate';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check, Pencil, PlusCircle, Trash2, X } from 'lucide-react';
import Conge from '@/components/Forms/Conge';
import congeService from '@/services/conge';
import UpdateConge from '@/components/Forms/UpdateConge';
import toast from 'react-hot-toast';
 const Conges = () => {
  const [open, setOpen] = useState(false);
  const [conges, setConges] = useState([]);
  const [conge, setConge] = useState([]);
  const [openDialogDelete, setOpenDialogDelete] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 8;
  const [filteredConges, setFilteredConges] = useState(conges);  

  const [pageCount, setPageCount] = useState(0);  
  const userInfo =JSON.parse(localStorage.getItem("userInfo"))
  const role = localStorage.getItem("role")

     useEffect(() => {
      async function fetchData() {
        let result
        if (role == "ROLE_ADMIN") {
          result = await  congeService.getAllConges()
          
        }else{
          result = await  congeService.getCongeByUserId(userInfo.id)

        }
        const pageCount = result.length > itemsPerPage ? Math.ceil(result.length / itemsPerPage) : 1;
        setPageCount(pageCount);

         setConges(result)
         setFilteredConges(result)
 
      }
      fetchData();
    }, [currentPage]);
    const handlePageChange = ({ selected }) => {
      setCurrentPage(selected);
    };
  
    const offset = currentPage * itemsPerPage;
    const currentPageData = filteredConges.slice(offset, offset + itemsPerPage);
  
    const closeDialogAddConges = () => {
      setOpenDialog(false);
       };
    const closeDialog = () => {
      setOpen(false);
       };
  
    async function deleteFunction(id: string) {
      try {
        await congeService.deleteConge(id);
     
         const result = await  congeService.getCongeByUserId(userInfo.id)
         console.log("🚀 ~ useEffect ~ result:", result)
         setFilteredConges(result)
         setConges(result)

        setOpenDialogDelete(false)
        toast.success("Congé supprimé avec succès")
      } catch (error) {
        toast.error(error)
      }
     }
 
    async function accept(id: string) {
      try {
        await congeService.accepterConge(id);
        const result = await  congeService.getAllConges()

     
        console.log("🚀 ~ useEffect ~ result:", result)
        setConges(result)
        setFilteredConges(result)
        setOpenDialogDelete(false)
        toast.success("Congé accepter avec succès")

      } catch (error) {
        toast.error(error)

      }
     }
    async function refuser(id: string) {
      try {
        await congeService.refuserConge(id);
        const result = await  congeService.getAllConges()

        console.log("🚀 ~ useEffect ~ result:", result)
        setConges(result)
        setFilteredConges(result)

        setOpenDialogDelete(false)
        setCurrentPage(0);

        toast.success("Congé refuser avec succès")

      } catch (error) {
        toast.error(error)

      }
     }
     const handleFilterChange = (e) => {
      const filterValue = e.target.value.toLowerCase(); // Convert to lowercase for case insensitive search
      const filter = [...conges].filter(conge => 
        conge.user.username.toLowerCase().includes(filterValue)
      );
  
   
    setFilteredConges(filter)

    };
  return (
    <div className="p-3">
      <div className="card h-lvh bg-white  p-3">
      <div className="flex items-center py-4 justify-between">
      <Input
            placeholder="Filter utilisateurs..."
             onChange={handleFilterChange}
            className="max-w-sm"
          />
          {role != "ROLE_ADMIN" && role != "ROLE_RESPONSABLE" &&   <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogTrigger asChild>
          <Button>
            <PlusCircle className="h-4 w-4 mr-2" />
            Demander Congé
          </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]  overflow-y-scroll max-h-screen  ">
            <DialogHeader>
              <DialogTitle>Demander Congé</DialogTitle> 
            </DialogHeader>
              <div className="grid gap-4 py-4">
              <Conge setConges={setFilteredConges} userId={userInfo.id} role={role} closeDialog={closeDialogAddConges}  />
              </div>
    
          </DialogContent>
          </Dialog>}
      </div>
      <div className="rounded-md border">
        <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">matricule</TableHead>
            <TableHead>username</TableHead>
            <TableHead>nom</TableHead>
            <TableHead>prenom</TableHead>
            <TableHead>description</TableHead>
            <TableHead>dateDebut</TableHead>
            <TableHead>dateFin</TableHead>
            <TableHead>etatConge</TableHead>
            <TableHead>natureconge</TableHead> 
            <TableHead className="text-center">Action</TableHead> 
           </TableRow>
        </TableHeader>
        <TableBody>
          {currentPageData.map((c: any) =>(
          <TableRow key={c.idconge}>
            <TableCell className="font-medium">{c.user?.matricule}</TableCell>
            <TableCell>{c.user?.username}</TableCell>
            <TableCell>{c.user?.nom}</TableCell>
            <TableCell>{c.user?.prenom}</TableCell>
            <TableCell>{c.description}</TableCell>
            <TableCell>{moment(c.dateDebut).format('MMM DD, YYYY')}</TableCell>
            <TableCell>{moment(c.dateFin).format('MMM DD, YYYY')}</TableCell>
            <TableCell>
            {c.etatConge == "ENATTENTE" && <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">{c.etatConge}</span>}
              {c.etatConge == "CONFIRME" &&<span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">{c.etatConge}</span>}
              {c.etatConge == "REFUSE" &&<span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">{c.etatConge}</span>}
              </TableCell>
            <TableCell>{c.natureconge }</TableCell>
             <TableCell>
              <div className="flex justify-center ">
             {role == "ROLE_ADMIN" || role == "ROLE_RESPONSABLE"?(
              <>
               <div>
               <button onClick={()=>accept(c._id)} className="bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-2 border border-green-500 hover:border-transparent rounded-full">
               <Check size={18}   strokeWidth={2.75} />
              </button>               
              </div>
               <div>
               <button onClick={()=>refuser(c._id) }className="bg-transparent ms-2 hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-2 border border-red-500 hover:border-transparent rounded-full">
               <X size={18}    strokeWidth={2.75} />
              </button>  
               </div>
              </>
               
             )
              
             :
             (
              <>
              <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" onClick={() => setConge(c)}>
                  <Pencil className="h-4 w-4 " /> 
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]  overflow-y-scroll max-h-screen  ">
                <DialogHeader>
                  <DialogTitle>Edit Congé</DialogTitle> 
                </DialogHeader>
                  
                  <div className="grid gap-4 py-4">
                  <UpdateConge  setConges={setFilteredConges} role={role} userId={userInfo.id} conge={conge}  closeDialog={closeDialog} />
                  </div>
        
              </DialogContent>
              </Dialog>
              
              <Dialog>
              <DialogTrigger asChild>
                <Button onClick={() => setConge(c)}  className=" ms-2" variant="outline">
                    <Trash2 className="h-4 w-4  " /> 
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Supprimer utilisateur</DialogTitle> 
                </DialogHeader>
                  <DialogDescription>
                  Êtes-vous sûr de vouloir supprimer l'utilisateur ?
                  </DialogDescription>
                  <DialogFooter>
                  <Button type="submit"  onClick={() => deleteFunction(conge._id)} className="bg-red-700">Supprimer</Button>
                </DialogFooter>
              </DialogContent>
              </Dialog>
              </>
               
             )}
                    
              </div>
            </TableCell>
           </TableRow>
          ))}
        </TableBody>
      </Table>
    
      </div>
      {filteredConges.length > itemsPerPage && <ReactPaginate
            previousLabel={'Previous'}
            nextLabel={'Next'}
            breakLabel={'...'}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageChange}
            containerClassName="flex justify-center py-4"
            pageClassName="mx-2 mt-1"
            pageLinkClassName="px-3 py-1 rounded-md bg-white border border-gray-300 text-gray-600 hover:bg-gray-100"
            activeLinkClassName="px-3 py-1 mb-2 rounded-md bg-blue-500 text-orange-500	"
            previousClassName="px-3 py-1 rounded-md bg-white border border-gray-300 text-gray-600 hover:bg-gray-100 mr-2"
            nextClassName="px-3 py-1 rounded-md bg-white border border-gray-300 text-gray-600 hover:bg-gray-100 ml-2"
            previousLinkClassName="text-orange-600"
            nextLinkClassName="text-orange-600"
          />}
      </div>
     
    </div>
  )
}
export default Conges;
