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
import PresenceService from '@/services/presence';
import AddPresence from '@/components/Forms/AddPresence';
import UpdatePresence from '@/components/Forms/UpdatePresence';
import ReactPaginate from 'react-paginate';

const Presence = () => {
  const [open, setOpen] = useState(false);
  const [presences, setPresences] = useState([]);
  const [presence, setPresence] = useState([]);
  const [openDialogDelete, setOpenDialogDelete] = useState(false);
  const [usersCommand, setUsersCommand] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 8;
  const [pageCount, setPageCount] = useState(0); // Initialize pageCount state
  const [filtered, setFiltered] = useState(presence);  

     useEffect(() => {
      async function fetchData() {
         const result = await PresenceService.getAllPresence()
         const users = await userService.getUtilisateur()
         console.log("🚀 ~ fetchData ~ users:", users)
         setUsersCommand(users)
        console.log("🚀 ~ useEffect ~ result:", result)
        setPresences(result)
        setFiltered(result)
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
  
    
    const closeDialogAddPresences = () => {
      setOpenDialog(false);
       };
    const closeDialog = () => {
      setOpen(false);
       };
  
    async function deleteFunction(id: number) {
      try {
        await PresenceService.removePresence(id);
        const result = await PresenceService.getAllPresence()
        console.log("🚀 ~ useEffect ~ result:", result)
        setPresences(result)
        setFiltered(result)
        setOpenDialogDelete(false)
        setCurrentPage(0);

      } catch (error) {
        
      }
     }
     const handleFilterChange = (e) => {
      const filterValue = e.target.value.toLowerCase(); // Convert to lowercase for case insensitive search
      const filter = [...presences].filter(presence => 
        presence.user.username.toLowerCase().includes(filterValue)
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
        Ajout
      </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]  overflow-y-scroll max-h-screen  ">
        <DialogHeader>
          <DialogTitle></DialogTitle> 
        </DialogHeader>
          
          <div className="grid gap-4 py-4">
          <AddPresence usersCommand={usersCommand} setPresences={setFiltered}  closeDialog={closeDialogAddPresences} />
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
        <TableHead>Nom et Prenom</TableHead>
        <TableHead>heureArrivee</TableHead>
        <TableHead>heureSortie</TableHead>
        <TableHead>jour</TableHead>
        <TableHead>etatpresence</TableHead>
        <TableHead>naturepresence</TableHead>
        <TableHead className="text-center">Action</TableHead> 
       </TableRow>
    </TableHeader>
    <TableBody>
    {currentPageData.map((p:any) => (

      <TableRow key={p._id}>
        <TableCell className="font-medium">{p?.user?.matricule}</TableCell>
        <TableCell>{p?.user?.username}</TableCell>
        <TableCell>{p?.user?.nom + " " + p?.user?.prenom}</TableCell>
        <TableCell>{p?.heureArrivee}</TableCell>
        <TableCell>{p?.heureSortie}</TableCell>
        <TableCell>{moment(p.jour).format('MMM DD, YYYY')}</TableCell>
        <TableCell>
        {p?.etatpresence == "PRESENT" &&<span className="inline-flex  items-center rounded-md mt-3 bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">{p?.etatpresence.replace("_", " ").toLowerCase()}</span>}
          {p?.etatpresence  == "ABSENT" &&<span className="inline-flex  items-center rounded-md mt-3 bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">{p?.etatpresence.replace("_", " ").toLowerCase()}</span>}
        </TableCell>
        <TableCell>{p?.naturepresence.replace("_", " ").toLowerCase()} </TableCell>
         <TableCell>
          <div className="flex justify-center ">
         
                 <Dialog open={open} onOpenChange={setOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" onClick={() => setPresence(p)}>
                      <Pencil className="h-4 w-4 " /> 
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]  overflow-y-scroll max-h-screen  ">
                    <DialogHeader>
                      <DialogTitle>Edit profile</DialogTitle> 
                    </DialogHeader>
                      
                      <div className="grid gap-4 py-4">
                      <UpdatePresence usersCommand={usersCommand} setPresences={setFiltered} presence={presence} closeDialog={closeDialog}   />
                      </div>
            
                  </DialogContent>
                  </Dialog>
                  
                  <Dialog>
                  <DialogTrigger asChild>
                    <Button  className=" ms-2" variant="outline" onClick={() => setPresence(p)}>
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
                      <Button type="submit" onClick={() => deleteFunction(presence._id)}  className="bg-red-700">Supprimer</Button>
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
  {presences.length > itemsPerPage && <ReactPaginate
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
export default Presence;
