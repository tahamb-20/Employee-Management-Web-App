import {useEffect, useState} from 'react'
import {
  Table,
  TableBody,
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
 import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pencil, PlusCircle, Trash2 } from 'lucide-react';
 import AddSociete from '@/components/Forms/Societe';
import getSocietes, { deleteSociete } from '@/services/societe';
import UpdateSocietes from '@/components/Forms/UpdateSocietes';
import ReactPaginate from 'react-paginate';
const Societe = () => {
  const [open, setOpen] = useState(false);
  const [societes, setSocietes] = useState([]);
  const [data, setData] = useState();
  const [openDialogDelete, setOpenDialogDelete] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 8;
  const [pageCount, setPageCount] = useState(0); // Initialize pageCount state

  useEffect(() => {
    async function fetchData() {
      const result = await  getSocietes()
      console.log("🚀 ~ useEffect ~ result:", result)
      setSocietes(result)
      const pageCount = result.length > itemsPerPage ? Math.ceil(result.length / itemsPerPage) : 1;
      setPageCount(pageCount);
    }
    fetchData();
  }, [currentPage]);
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const offset = currentPage * itemsPerPage;
  const currentPageData = societes.slice(offset, offset + itemsPerPage);

  
  const closeDialogAddSocietes = () => {
    setOpenDialog(false);
     };
  const closeDialog = () => {
    setOpen(false);
     };
    async function deleteFunction(id: string) {
      try {
        await deleteSociete(id);
        const result = await getSocietes()
        console.log("🚀 ~ useEffect ~ result:", result)
        setSocietes(result)
        setOpenDialogDelete(false)
        setCurrentPage(0);

      } catch (error) {
        
      }
     }
  return (
    <div className="p-3">
      <div className="card h-lvh bg-white  p-3">
      <div className="flex items-center py-4 justify-between">
        <Input
          placeholder="Filter utilisateurs..."
        
      
          className="max-w-sm"
        />
          
          <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="h-4 w-4 mr-2" />
              Ajouter société
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] overflow-y-scroll max-h-screen  ">
            <DialogHeader>
              <DialogTitle>Ajouter société</DialogTitle> 
            </DialogHeader>
               <AddSociete setSocietes={setSocietes}  closeDialog={closeDialogAddSocietes} />
             
          </DialogContent>
          </Dialog>
      </div>
      <div className="rounded-md border">
        <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nom société</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Adresse</TableHead>
            <TableHead>Telephone</TableHead>
            <TableHead className="text-center">Action</TableHead> 
           </TableRow>
        </TableHeader>
        <TableBody>
          {currentPageData.map((societe:any) => (

          <TableRow key={societe.idsociete}>
            <TableCell className="font-medium">{societe.nom_societe}</TableCell>
            <TableCell>{societe.description}</TableCell>
            <TableCell>{societe.email}</TableCell>
            <TableCell>{societe.adresse}</TableCell>
            <TableCell>{societe.telephone}</TableCell>
             <TableCell>
              <div className="flex justify-center ">
                     <Dialog open={open} onOpenChange={setOpen}>
                      <DialogTrigger asChild>
                        <Button variant="outline" onClick={()=>setData(societe)}> 
                          <Pencil className="h-4 w-4 " />  
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px] overflow-y-scroll max-h-screen  ">
                        <DialogHeader>
                          <DialogTitle>Edit société</DialogTitle> 
                        </DialogHeader>
                        <UpdateSocietes setSocietes={setSocietes} societe={data} closeDialog={closeDialog} />                      
                      </DialogContent>
                      </Dialog>
                      <Dialog  open={openDialogDelete} onOpenChange={setOpenDialogDelete}>
                      <DialogTrigger asChild>
                        <Button  className=" ms-2" onClick={()=>setData(societe)} variant="outline">
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
                          <Button type="submit" onClick={() => deleteFunction(data.idsociete)} className="bg-red-700">Supprimer</Button>
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
      {societes.length > itemsPerPage && <ReactPaginate
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
export default Societe;
