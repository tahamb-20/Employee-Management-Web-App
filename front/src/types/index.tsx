export type TaskT = {
	id: string;
	title: string;
	description: string;
	priority: string;
	deadline: number;
	image?: string;
	alt?: string;
	tags: { title: string; bg: string; text: string }[];
};

type Column = {
	name: string;
	items: any[];
};

export type Columns = {
	[key: string]: Column;
};

export type RQUtilisateur = {
	user: { username: string; password: string; telephone: string; adresse: string; matricule: string; cin: string; nom: string;  prenom: string; image: string; email: string };
	role: string; 
};

export type Utilisateur = {
	idutilisateur: number;
	username: string;
	nom: string;
	prenom: string;
	telephone: string;
	matricule: string;
	cin: string;
	adresse: string;
	image: string;
	email: string;
	password: string;
	presences?: Presence[];
	taches?: Tache[];
	conges?: Conge[];
	societe?: Societe;
	roles?: Role[];
  }
  export interface UserInfoResponse {
	token: string;
	type: string;
	id: number;
	username: string;
	email: string;
	roles: string[];
	password: string;
  }
  
  export interface LoginRequest {
	email: string;
	password: string;
  }
  
  export interface SignupRequest {
	username: string;
	email: string;
	role?: string[];
	password: string;
	telephone: string;
	adresse: string;
	cin: string;
	nom: string;
	prenom: string;
	matricule: string;
	image: string;
  }
  
  export interface Presence {
	idpresence: number;
	heureArrivee?: string;  
	heureSortie?: string;  
	jour: string; 
	etatpresence: string; 
	naturepresence: string; 
	user?: any; 
  }
  
  export interface Tache {
    idtache: number;
    date_debut: Date;
    date_fin: Date;
    description: string;
    nom_tache: string;
    etattache: string; // Assuming EtatTache is an enum
    user: Utilisateur; // Assuming Utilisateur is a type representing a user
    naturetypetache: string; // Assuming Naturetypetache is an enum
}
  
  export interface Conge {
	// Define properties of the Conge class here
  }
  
  export interface Societe {
	idsociete: number;
	nom_societe: string;
	description: string;
	email: string;
	adresse: string;
	telephone: string;
	 
  }
  
  export interface Role {
	// Define properties of the Role class here
  }