//Ensemble de mutateurs
export default {
	RESULT(state,result){
		state.result = result;
	},
	NBPAGE(state, nbpage){
		state.nbpage= nbpage;
	},
	ALLGARE(state,payload){
		state.allgare=payload;		
	},
	NAMEGARE(state, liste){
		state.nameGare = liste;
	},
	QUERYLIST(state, liste){
		state.queryList= liste;
	},
	QUERYMAP(state, mapR){
		state.queryMap = mapR;
	},
	NUMPAGE(state, num){
		state.numpage = num;
	},
	CURRENTGARE(state, gare){
		state.currentGare = gare;
	},
	NOMCURRENTGAREDEPARTEMENT(state, gare){
		state.currentdepartementGare = gare;
	},
	SETETATPAGE(state, i){
		state.etatPage = i;
	},
	MAPMARKER(state, i){
		state.mapMarker = i;
	},
	INDEXPAGE(state, i){
		state.indexPage = i;
	},
	ALLHORAIREGARE(state,payload){
		state.allhorairegare=payload;		
	},
	HORAIREGARE(state, liste){
		state.horaireGare = liste;
	},
	DATAFREQUENTATION(state,payload){
		state.datafrequentation=payload;		
	},
	NOMCURRENTGARE(state,string){
		state.currentGarename=string;
		if(state.historiqueGare.includes(string)){
			state.historiqueGare.splice(state.historiqueGare.indexOf(string),1);
		}
		state.historiqueGare.push(string);
		
	},
	UICGARE(state,string){
		state.uicgare = string;
	},
	DEPARTEMENTMAP(state,map){
		state.departementmap = map;
	},
	NATIONALEFREQUENTATION(state, nat){
		state.nationalfrequentation = nat;
	},
	NAMEDEPARTEMENT(state, dep){
		state.namedepartement = dep;
	},
	DEPARTEMENTFREQUENTATION(state,map){
		state.departementfrequentation =  map;
	},
	NAMECOMMUNE(state, commune){
		state.namecommune = commune;
	},
	FILTER(state, value){
		state.filter = value;
	},
	OBJETTROUVE(state, value){
		state.objettrouve = value
		state.objetCurrentPage = value.get(state.pageObjettrouve);
	},
	PAGEOBJET(state, value){
		state.pageObjettrouve= value;
		state.objetCurrentPage = state.objettrouve.get(parseInt(value));
	},
	CODE(state, value){
		state.liste_code = value;
	},
	STATSOBJET(state,value){
		state.statsnumber = value[0];
		state.statslabels = value[1];
	}
}

