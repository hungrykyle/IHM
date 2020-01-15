//Appel a l'api pour récuperer toutes les gares
export const allGare = store => {
  return new Promise(function(resolve) {
    var resultat_call = null;
    fetch(
      "https://data.sncf.com/api/records/1.0/search/?dataset=liste-des-gares&facet=fret&facet=voyageurs&rows=5000&start=&facet=code_ligne&facet=departement"
    ).then(response =>
      response
        .json()
        .then(data => ({
          data: data,
          status: response.status
        }))
        .then(res => {
          var mapAllGare = new Map();
          let communeToDepartement = new Map();
          resultat_call = res.data;
          var liste_gares = [];
          var liste_departements = [];
          var liste_communes = [];
          var liste_code = [];
          for (var i in resultat_call.records) {
            if (resultat_call.records[i].fields.c_geo != null) {
              var key = new Map();
              key.set("commune", resultat_call.records[i].fields.commune);
              key.set("departement", resultat_call.records[i].fields.departement);
              key.set("coordonnee", resultat_call.records[i].fields.c_geo);
              key.set("nom", resultat_call.records[i].fields.libelle);
              key.set("code_uic", resultat_call.records[i].fields.code_uic);
              liste_departements.push(resultat_call.records[i].fields.departement);
              liste_communes.push(resultat_call.records[i].fields.commune);
              liste_code.push(resultat_call.records[i].fields.code_uic);
              mapAllGare.set(resultat_call.records[i].fields.libelle, key);
              liste_gares.push(resultat_call.records[i].fields.libelle);
              try {
                
                communeToDepartement.set(
      
                  resultat_call.records[i].fields.code_uic,
                  resultat_call.records[i].fields.departement
                );
              } catch (error) {
                // eslint-disable-next-line no-console
                console.log(error);
              }
              
            }
          }
          // Commit de toutes les donnees necessaire
          store.commit("NAMECOMMUNE", liste_communes);
          store.commit("NAMEGARE", liste_gares);
          store.commit("QUERYLIST", liste_gares);
          store.commit("ALLGARE", mapAllGare);
          store.commit("QUERYMAP", mapAllGare);
          store.commit("DEPARTEMENTMAP", communeToDepartement);
          store.commit("CODE", liste_code);
          store.commit("NAMEDEPARTEMENT", liste_departements);

          var mapPage = new Map();
          for (var nbP = 1; nbP < 16; nbP++) {
            mapPage.set(nbP, mapAllGare.get(liste_gares[nbP - 1]));
          }
          store.commit("RESULT", mapPage);
          store.commit("MAPMARKER", mapPage);
          fetch(
            "https://data.sncf.com/api/records/1.0/search/?dataset=frequentation-gares&rows=3015&sort=nom_gare&facet=nom_gare"
          ).then(response =>
            response
              .json()
              .then(data => ({
                data: data,
                status: response.status
              }))
              .then(res => {
                resultat_call = res.data;
                let communetodepartement = store.state.departementmap;
                let national = new Map();
                    national.set(
                      "total_voyageurs_2015",
                      parseInt(0)
                    );
                    
                    national.set(
                      "total_voyageurs_2016",
                      parseInt(0)
                    );
                    national.set(
                      "totalvoyageurs2017",
                      parseInt(0)
                    );
        
                    national.set(
                      "total_voyageurs_2018",
                      parseInt(0)
                    );
                    national.set(
                      "total_voyageurs_non_voyageurs_2015",
                      parseInt(0)
                    );
                    national.set(
                      "total_voyageurs_non_voyageurs_2016",
                      parseInt(0)
                    );
                    national.set(
                      "total_voyageurs_non_voyageurs_2017",
                      parseInt()
                    );
        
                    national.set(
                      "total_voyageurs_non_voyageurs_2018",
                      parseInt(resultat_call.re)
                    );
                    //Création du tableau de données de la fréquentation par département
                let frequencedepartement = new Map();
                for (var i in resultat_call.records) {
                  if (resultat_call.records[i].fields.nom_gare != null) {
                    
                    var key = new Map();
        
                      key.set(
                        "total_voyageurs_2015",
                        parseInt(resultat_call.records[i].fields.total_voyageurs_2015)
                      );
                      
                      key.set(
                        "total_voyageurs_2016",
                        parseInt(resultat_call.records[i].fields.total_voyageurs_2016)
                      );
                      key.set(
                        "totalvoyageurs2017",
                        parseInt(resultat_call.records[i].fields.totalvoyageurs2017)
                      );
          
                      key.set(
                        "total_voyageurs_2018",
                        parseInt(resultat_call.records[i].fields.total_voyageurs_2018)
                      );
                      key.set(
                        "total_voyageurs_non_voyageurs_2015",
                        parseInt(resultat_call.records[i].fields.total_voyageurs_non_voyageurs_2015)
                      );
                      key.set(
                        "total_voyageurs_non_voyageurs_2016",
                        parseInt(resultat_call.records[i].fields.total_voyageurs_non_voyageurs_2016)
                      );
                      key.set(
                        "total_voyageurs_non_voyageurs_2017",
                        parseInt(resultat_call.records[i].fields.total_voyageurs_non_voyageurs_2017)
                      );
          
                      key.set(
                        "total_voyageurs_non_voyageurs_2018",
                        parseInt(resultat_call.records[i].fields.total_voyageurs_non_voyageurs_2018)
                      );
                    let nomgare = resultat_call.records[i].fields.code_uic_complet;
                    
                    let departement = communetodepartement.get(
                      (nomgare)
                    );
                    
                    try {
                      let temp = frequencedepartement.get(departement);
                      temp.get("code_uic_complet");
                      temp.forEach(function(valeur, clé) {
                        
                      temp.set(clé, parseInt(valeur) + parseInt(key.get(clé)));
                      national.set(clé, parseInt(valeur) + parseInt(national.get(clé)));
                    
                      });
                      frequencedepartement.set(departement, temp);
                     
                    } catch (error) {
                      frequencedepartement.set(departement, key);
                      
                    }
                  }
                }

                store.commit("DEPARTEMENTFREQUENTATION", frequencedepartement);
                store.commit("NATIONALEFREQUENTATION", national);
                //Promesse resolue
                resolve();
              })
          );
        })
    );
  }, 300);

  
};
//Appel quand l'utilisateur tape une requete
export const queryGare = (store, payload) => {
  var unique = {};
  //On supprime les gares en double
  payload.liste.forEach(function(i){
      if(!unique[i]){
          unique[i]=true;
      }
  });

  var liste = Object.keys(unique);
  var allGareQuery = new Map();
  store.commit('NUMPAGE',1);
  for(var i in liste){
      allGareQuery.set(liste[i],store.state.allgare.get(liste[i]));
  }
  var mapPage = new Map();
  for(var nbP=1; nbP<16;nbP++){
      if(nbP<= liste.length){
          mapPage.set(nbP, allGareQuery.get(liste[nbP-1]));
      }
      
  }
  store.commit('RESULT', mapPage);
  store.commit('MAPMARKER', mapPage);
  store.commit('QUERYLIST', payload.liste);
  store.commit('QUERYMAP', allGareQuery);
};


//Fonction pour next et prev
export const turnPage = (store, payload) => {
  store.commit("NUMPAGE", payload.page);
  var mapPage = new Map();
  var begin = (payload.page - 1) * 15;
  for (var nbP = begin; nbP < begin + 15; nbP++) {
    if (nbP < store.state.queryList.length) {
      mapPage.set(nbP, store.state.queryMap.get(store.state.queryList[nbP]));
    }
  }
  store.commit("MAPMARKER", mapPage);
  store.commit("RESULT", mapPage);
};

//Change la gare current quand l'utilisateur clique sur une gare
export const currentGare = (store, payload) => {
  store.commit("INDEXPAGE", store.state.queryList.indexOf(payload.gare));
  var currentgare = new Map();
  currentgare.set(
    store.state.queryList.indexOf(payload.gare),
    store.state.queryMap.get(payload.gare)
  );
  store.commit("CURRENTGARE", currentgare);
  let truc = currentgare;
  let t = truc
    .values()
    .next()
    .value.values();

 
  t.next().value;
  let dep = t.next().value;
  store.commit("NOMCURRENTGAREDEPARTEMENT", dep);
  t.next().value;
  let res = t.next().value;
  store.commit("MAPMARKER", currentgare);
  let uic = t.next().value;
  store.commit("UICGARE", uic);
  store.commit("NOMCURRENTGARE", res);
};

//Change la gare current quand l'utilisateur clique sur une gare
export const changeCurrentGare = (store, payload) => {
  store.commit("INDEXPAGE", payload.index);
  var currentgare = new Map();
  currentgare.set(
    payload.index,
    store.state.queryMap.get(store.state.queryList[payload.index])
  );
  store.commit("CURRENTGARE", currentgare);
  let truc = currentgare;
  let t = truc
    .values()
    .next()
    .value.values();

  t.next().value;
  t.next().value;
  t.next().value;
  let res = t.next().value;
  store.commit("MAPMARKER", currentgare);

  store.commit("NOMCURRENTGARE", res);
};

//Renvois les horaires d'une gare
//https://data.sncf.com/api/records/1.0/search/?dataset=horaires-des-gares1&sort=nom_normal&facet=nom_normal&facet=jour&refine.nom_normal=ville
export const horaireGare = (store, ville) => {
  let link =
    "https://data.sncf.com/api/records/1.0/search/?dataset=horaires-des-gares1&q=00" +
    ville.ville +
    "&rows=20&sort=nom_normal&facet=nom_normal&facet=jour";
  var resultat_call = null;
  fetch(link).then(response =>
    response
      .json()
      .then(data => ({
        data: data,
        status: response.status
      }))
      .then(res => {
        var mapAllGare = new Map();
        let newmap = new Map();
        mapAllGare.set("Lundi", new Map());
        mapAllGare.set("Mardi", new Map());
        mapAllGare.set("Mercredi", new Map());
        mapAllGare.set("Jeudi", new Map());
        mapAllGare.set("Vendredi", new Map());
        mapAllGare.set("Samedi", new Map());
        mapAllGare.set("Dimanche", new Map());
        resultat_call = res.data;
        var liste_gares = [];
        for (var i in resultat_call.records) {
          let jour = mapAllGare.get(resultat_call.records[i].fields.jour);
          var key = new Map();
          key.set("jour", resultat_call.records[i].fields.jour);
          key.set(
            "horaire_normal",
            resultat_call.records[i].fields.horaire_normal
          );
          key.set("nom_normal", resultat_call.records[i].fields.nom_normal);
          key.set(
            "horaire_ferie",
            resultat_call.records[i].fields.horaire_ferie
          );
          key.set(
            "uic",
            resultat_call.records[i].fields.uic
          );
          jour.set(resultat_call.records[i].recordid, key);
          liste_gares.push({ msg: resultat_call.records[i].recordid });
        }
        mapAllGare.forEach((map_jour, jour) => {
          mapAllGare.get(jour).forEach((maphoraire, id) => {
            newmap.set(id, maphoraire);
          });
        });
        store.commit("HORAIREGARE", liste_gares);
        store.commit("ALLHORAIREGARE", newmap);
        return newmap;
      })
  );

};
//Renvois la fréquentation d'une gare
export const frequentationGare = (store, ville) => {
  // eslint-disable-next-line no-unused-vars

  let link =
    "https://data.sncf.com/api/records/1.0/search/?dataset=frequentation-gares&q=" +
    ville.ville +
    "&sort=nom_gare&facet=nom_gare";
  var resultat_call = null;
  fetch(link).then(response =>
    response
      .json()
      .then(data => ({
        data: data,
        status: response.status
      }))
      .then(res => {
        var mapAllGare = new Map();
        resultat_call = res.data;

        var key = new Map();
        try {
          key.set(
            "total_voyageurs_2015",
            resultat_call.records[0].fields.total_voyageurs_2015
          );
          key.set(
            "total_voyageurs_2016",
            resultat_call.records[0].fields.total_voyageurs_2016
          );
          key.set(
            "totalvoyageurs2017",
            resultat_call.records[0].fields.totalvoyageurs2017
          );

          key.set(
            "total_voyageurs_2018",
            resultat_call.records[0].fields.total_voyageurs_2018
          );
          key.set(
            "total_voyageurs_non_voyageurs_2015",
            resultat_call.records[0].fields.total_voyageurs_non_voyageurs_2015
          );
          key.set(
            "total_voyageurs_non_voyageurs_2016",
            resultat_call.records[0].fields.total_voyageurs_non_voyageurs_2016
          );
          key.set(
            "total_voyageurs_non_voyageurs_2017",
            resultat_call.records[0].fields.total_voyageurs_non_voyageurs_2017
          );

          key.set(
            "total_voyageurs_non_voyageurs_2018",
            resultat_call.records[0].fields.total_voyageurs_non_voyageurs_2018
          );

          key.set("code_uic_complet", resultat_call.records[0].fields.code_uic_complet);
          mapAllGare.set(resultat_call.records[0].fields.code_uic_complet, key);
          store.commit("DATAFREQUENTATION", mapAllGare);
        } catch (error) {
          store.commit("DATAFREQUENTATION", mapAllGare);
        }
      })
  );
  return store;
};

//Change l'etat de la page
export const setEtatPage = (store, payload) => {
  store.commit("SETETATPAGE", payload.i);
};

export const returnListe = (store) => {
  store.commit('MAPMARKER', store.state.result);
}

//Quand l'utilisateur clique sur le bouton pour affiger toutes les gares
export const afficheToutesGares = (store) => {
  // eslint-disable-next-line no-console
  console.log("gares");
  store.commit("MAPMARKER", store.state.queryMap);
}

//Quand l'utilisateur change le filtre de recherche
export const changeFilter = (store, payload) => {
  store.commit("FILTER", payload.value);
}


//Appel a l'api pour les objet trouves de la current gare
export const objetTrouve = (store, payload) => {
  
  let link = "https://data.sncf.com/"+
  "/api/records/1.0/search/?dataset=objets-trouves-restitution&rows=200&sort=date&facet=date"+
  "&facet=gc_obo_date_heure_restitution_c&facet=gc_obo_gare_origine_r_name&"+
  "facet=gc_obo_nature_c&facet=gc_obo_type_c&facet=gc_obo_nom_recordtype_sc_c&"+
  "refine.gc_obo_gare_origine_r_code_uic_c=00"+
  payload.gare;
  fetch(link).then(response =>
    response
      .json()
      .then(data => ({
        data: data,
        status: response.status
      }))
      .then(res => {
        var resultat_call = res.data.records;
        var page = [];
        var mapObjet = new Map();
        var nbHits = res.data.nhits;
        if(nbHits !=0){
          if(nbHits>100){
            nbHits=100;
          }

          //Separation en page de 7
          for(var y=1; y<=Math.ceil(nbHits/7);y++){
            page=[];
            for(var i= (y-1)*7; i<((y-1)*7)+7; i++){
              if(i<resultat_call.length){
                page.push(resultat_call[i]);
              }
            }
            mapObjet.set(y, page);
          }

          store.commit("OBJETTROUVE", mapObjet);
          var statsNumber = [];
          var statsLabels = []

          for(var group in res.data.facet_groups[5].facets){
            statsNumber.push(res.data.facet_groups[5].facets[group].count);
            statsLabels.push(res.data.facet_groups[5].facets[group].path);
          }
          var statsObjet = [statsNumber,statsLabels]
          store.commit("STATSOBJET",statsObjet);
        }
        else{
          store.commit("OBJETTROUVE", new Map());
          store.commit("STATSOBJET", [[],[]]);
        }

      })
  );

}

//Change la page dans la liste des objet trouves
export const setPageObjet = (store, payload) => {
  // eslint-disable-next-line no-console
  console.log(payload.page);
  store.commit("PAGEOBJET", payload.page);
}