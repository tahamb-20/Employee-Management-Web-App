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
import AddTache from '@/components/Forms/AddTache';
import TacheService from '@/services/Tache';
import userService from '@/services/utilisateur';
import moment from 'moment';
import UpdateTache from '@/components/Forms/UpdateTache';
import ReactPaginate from 'react-paginate';
const Taches = () => {
    const [open, setOpen] = useState(false);
    const [taches, setTaches] = useState([]);
    const [tache, setTache] = useState([]);
    const [openDialogDelete, setOpenDialogDelete] = useState(false);
    const [usersCommand, setUsersCommand] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 8;
    const [pageCount, setPageCount] = useState(0); // Initialize pageCount state
  
    const userInfo =JSON.parse(localStorage.getItem("userInfo"))
    const role = localStorage.getItem("role")
    useEffect(() => {
     async function fetchData() {
       
        const result = await TacheService.getAllTaches()
        const users = await userService.getUtilisateur()
        console.log("🚀 ~ fetchData ~ users:", users)
        setUsersCommand(users)
       console.log("🚀 ~ useEffect ~ result:", result)
       setTaches(result)
       const pageCount = result.length > itemsPerPage ? Math.ceil(result.length / itemsPerPage) : 1;
       setPageCount(pageCount);
     }
     fetchData();
   }, [currentPage]);

   const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const offset = currentPage * itemsPerPage;
  const currentPageData = taches.slice(offset, offset + itemsPerPage);

  
    const closeDialogAddTaches = () => {
      setOpenDialog(false);
       };
    const closeDialog = () => {
      setOpen(false);
       };
  
      async function deleteFunction(id: number) {
        try {
          await TacheService.removeTache(id);
          const result = await TacheService.getAllTaches()
          console.log("🚀 ~ useEffect ~ result:", result)
          setTaches(result)
          setOpenDialogDelete(false)
        } catch (error) {
          
        }
       }
   
  return (
    <div className="p-3">
    <div className="card h-lvh bg-white  p-3">
    <div className="flex items-center py-4 justify-between">
      {/* <Input
        placeholder="Filter Taches..."
      
    
        className="max-w-sm"
      />
         */}
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogTrigger asChild>
        <Button>
          <PlusCircle className="h-4 w-4 mr-2" />
          Ajouter Taches
        </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]  overflow-y-scroll max-h-screen  ">
          <DialogHeader>
            <DialogTitle></DialogTitle> 
          </DialogHeader>
            
            <div className="grid gap-4 py-4">
            <AddTache usersCommand={usersCommand} setTaches={setTaches} userId={userInfo.id} closeDialog={closeDialogAddTaches} />
            </div>
  
        </DialogContent>
        </Dialog>
    </div>
    <div className="rounded-md border">
      <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Matricule</TableHead>
          <TableHead>Username</TableHead>
          <TableHead>Nom et prenom</TableHead>
          <TableHead>Nom tache</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>DateDebut</TableHead>
          <TableHead>DateFin</TableHead>
          <TableHead>Etat tache</TableHead>
          <TableHead>Nature type tache</TableHead> 
          <TableHead className="text-center">Action</TableHead> 
         </TableRow>
      </TableHeader>
      <TableBody>
      {currentPageData.map((t:any) => (

        <TableRow key={t.idtache}>
          <TableCell className="font-medium">{t?.user?.matricule}</TableCell>
          <TableCell>{t?.user?.username}</TableCell>
          <TableCell>{t?.user?.nom + " " + t?.user?.prenom}</TableCell>
          <TableCell>{t?.nom_tache}</TableCell>
          <TableCell>{t?.description}</TableCell>
          <TableCell>{moment(t.dateDebut).format('MMM DD, YYYY')}</TableCell>
          <TableCell>{moment(t.dateFin).format('MMM DD, YYYY')}</TableCell> 
          {t.etattache == "EN_ATTENTE" && <span className="inline-flex w-[80px] items-center rounded-md mt-4 bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">{t.etattache.replace("_", " ").toLowerCase()}</span>}
          {t.etattache  == "TERMINEE" &&<span className="inline-flex w-[80px] items-center rounded-md mt-4 bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">{t.etattache.replace("_", " ").toLowerCase()}</span>}
          {t.etattache  == "EN_COURS" &&<span className="inline-flex w-[80px] items-center rounded-md mt-4 bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">{t.etattache.replace("_", " ").toLowerCase()}</span>}
             <TableCell> 
             
          {t.naturetypetache == "PAR_DEFAUT" && <span className="inline-flex items-center rounded-md bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700 ring-1 ring-inset ring-purple-700/10">{t.naturetypetache.replace("_", " ").toLowerCase()}</span>}
          {t.naturetypetache  == "SUPPLEMENTAIRE" &&<span className="inline-flex w-[110px] items-center rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10">{t.naturetypetache.replace("_", " ").toLowerCase()}</span>}
           </TableCell>
           <TableCell>
            <div className="flex justify-center ">
           
                   <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline" onClick={() => setTache(t)}>
                        <Pencil className="h-4 w-4 " /> 
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]  overflow-y-scroll max-h-screen  ">
                      <DialogHeader>
                        <DialogTitle>Edit profile</DialogTitle> 
                      </DialogHeader>
                        
                        <div className="grid gap-4 py-4">
                        <UpdateTache usersCommand={usersCommand} setTaches={setTaches} tache={tache} closeDialog={closeDialog}   />
                        </div>
              
                    </DialogContent>
                    </Dialog>
                    
                    <Dialog>
                    <DialogTrigger asChild>
                      <Button  className=" ms-2" variant="outline" onClick={() => setTache(t)}>
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
                        <Button type="submit" onClick={() => deleteFunction(tache.idtache)}  className="bg-red-700">Supprimer</Button>
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
    {taches.length > itemsPerPage && <ReactPaginate
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
export default Taches;
