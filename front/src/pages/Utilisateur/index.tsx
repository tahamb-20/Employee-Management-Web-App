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
import ReactPaginate from 'react-paginate';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pencil, PlusCircle, Trash2 } from 'lucide-react';
import AddUtilisateurs from '@/components/Forms/AddUtilisateurs';
import UpdateUtilisateurs from '@/components/Forms/UpdateUtilisateurs';
import userService from '@/services/utilisateur';
const Utilisateur = () => {
  const [open, setOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [openDialogDelete, setOpenDialogDelete] = useState(false);
  const [utilisateurs, setUtilisateurs] = useState([]);
  const [user, setUser] = useState();
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 8;
  const [pageCount, setPageCount] = useState(0); // Initialize pageCount state
  const [filtered, setFiltered] = useState(utilisateurs);  

  useEffect(() => {
    async function fetchData() {
      const result = await userService.getUtilisateur();
      setUtilisateurs(result);
      setFiltered(result);
      const pageCount = result.length > itemsPerPage ? Math.ceil(result.length / itemsPerPage) : 1;
      setPageCount(pageCount);
    }
    fetchData();
  }, [currentPage]);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const offset = currentPage * itemsPerPage;
  const currentPageData = filtered.slice(offset, offset + itemsPerPage);

  
  const closeDialogAddUtilisateurs = () => {
    setOpenDialog(false);
     };
  const closeDialog = () => {
    setOpen(false);
     };
 
   
    async function deleteFunction(id: string) {
      try {
        await userService.deleteUser(id);
        const result = await  userService.getUtilisateur()
        console.log("🚀 ~ useEffect ~ result:", result)
        setUtilisateurs(result)
        setFiltered(result)
        setOpenDialogDelete(false)
        setCurrentPage(0);

      } catch (error) {
        
      }
     }
     const handleFilterChange = (e) => {
      const filterValue = e.target.value.toLowerCase(); // Convert to lowercase for case insensitive search
      const filter = [...utilisateurs].filter(utilisateur => 
        utilisateur.username.toLowerCase().includes(filterValue)
      );
  
   
      setFiltered(filter)

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
          <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                  <DialogTrigger asChild> 
            <Button>
              <PlusCircle className="h-4 w-4 mr-2" />
              New Utilisateur
            </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]  overflow-y-scroll max-h-screen  ">
              <DialogHeader>
                <DialogTitle>Ajouter Utilisateur</DialogTitle>
              </DialogHeader>
              <AddUtilisateurs setUtilisateurs={setFiltered} closeDialog={closeDialogAddUtilisateurs} />
            </DialogContent>
          </Dialog>
      </div>
      <div className="rounded-md border">
        <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">username</TableHead>
            <TableHead>nom</TableHead>
            <TableHead>prenom</TableHead>
            <TableHead>telephone</TableHead>
            <TableHead>matricule</TableHead>
            <TableHead>cin</TableHead>
            <TableHead>image</TableHead>
            <TableHead>adresse</TableHead>
            <TableHead>email</TableHead>
            <TableHead>role</TableHead>
            <TableHead className="text-center" >action</TableHead>
           </TableRow>
        </TableHeader>
        <TableBody>
          {currentPageData.map((utilisateur :any) => (
          <TableRow key={utilisateur._id}>
            <TableCell className="font-medium">{utilisateur.username}</TableCell>
            <TableCell>{utilisateur.nom}</TableCell>
            <TableCell>{utilisateur.prenom}</TableCell>
            <TableCell>{utilisateur.telephone}</TableCell>
            <TableCell>{utilisateur.matricule}</TableCell>
            <TableCell>{utilisateur.cin}</TableCell>
            <TableCell><img src={utilisateur.image} /></TableCell>
            <TableCell>{utilisateur.adresse}</TableCell>
            <TableCell>{utilisateur.email}</TableCell>
             <TableCell>{utilisateur.role }</TableCell>
            <TableCell>
              <div className="flex justify-center ">
             
                     <Dialog open={open} onOpenChange={setOpen}>
                      <DialogTrigger asChild>
                        <Button variant="outline" onClick={() => setUser(utilisateur)}>
                          <Pencil className="h-4 w-4 " /> 
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]  overflow-y-scroll max-h-screen  ">
                        <DialogHeader>
                          <DialogTitle>Edit profile</DialogTitle> 
                        </DialogHeader>
                          
                        <UpdateUtilisateurs setUtilisateurs={setFiltered} utilisateur={user} closeDialog={closeDialog} />

                          
                      </DialogContent>
                      </Dialog>
                      
                      <Dialog  open={openDialogDelete} onOpenChange={setOpenDialogDelete}>
                      <DialogTrigger asChild>
                        <Button  className=" ms-2" variant="outline">
                            <Trash2 className="h-4 w-4  " onClick={() => setUser(utilisateur)} /> 
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
                          <Button type="submit" onClick={() => deleteFunction(user._id)} className="bg-red-700">Supprimer</Button>
                        </DialogFooter>
                      </DialogContent>
                      </Dialog>
                      
                   
              </div>
            </TableCell>
           </TableRow>

          ))}
        </TableBody>
      </Table>
      </div>
      {filtered.length > itemsPerPage && <ReactPaginate
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
export default Utilisateur;
