import {
  GET_MENUS_REQUEST,
  GET_MENUS_ERROR,
  GET_MENUS_SUCCESS,
  DELETE_MENU_ERROR,
  DELETE_MENU_REQUEST,
  DELETE_MENU_SUCCESS,
  UPDATE_NAVINDEX,
  GET_LIST_ERROR,
  GET_LIST_SUCCESS,
  GET_LIST_REQUEST,
  VALIDATE_MENU_ERROR,
  VALIDATE_MENU_REQUEST,
  VALIDATE_MENU_SUCCESS,
  ADD_ERROR,
  DELETE_ERROR,
  BADGEUSE_IS_PRESENT,
  SET_USER_CONNECTED,
  GET_USER_PIN,
  GET_USER_UID,
  LOGIN_BADGE_REQUEST,
  LOGIN_BADGE_SUCCESS,
  LOGIN_BADGE_ERROR,
  DISCONNECT
} from "../constants"

import {fetchMenus, onTrashClick, fetchMenuList, fetchServed, loginBadge2} from '../Utils/apiCalls.js'



//Reccupération de la liste de Menus
export function getMenusRequest()
{
  return{
    type : GET_MENUS_REQUEST
  }
}

export function getMenusSuccess(listMenus)
{
  return{
    type : GET_MENUS_SUCCESS,
    listMenus : listMenus
  }
}

export function getMenusError(error)
{
  return{
    type : GET_MENUS_ERROR,
    error : error,
  }
}


export function getMenus(){
  return (dispatch)=>
  {
    dispatch(getMenusRequest());
    fetchMenus(
      (data)=>{
        dispatch(getMenusSuccess(data))
      },
      (err)=>{
        dispatch(getMenusError("Erreur : Liste de Menu"))
      }
    )
  }
}


// Supprimer un Menu de la Liste
export function deleteMenuRequest(idMenu){
  return{
    type : DELETE_MENU_REQUEST,
    idMenu : idMenu
  }
}

export function deleteMenuSuccess(){
  return{
    type : DELETE_MENU_SUCCESS
  }
}

export function deleteMenuError(error){
  return{
    type : DELETE_MENU_ERROR,
    error : error
  }
}

export function deleteMenus(idMenu){
  return (dispatch)=>
  {
    dispatch(deleteMenuRequest(idMenu));
    onTrashClick(idMenu,
    (data)=>{
      dispatch(deleteMenuSuccess())
    },
    (err)=>{
      dispatch(deleteMenuError("Erreur : Supression Menu"))
    })
  }
}


//Mise à jour du menu sélectionné
export function updateNavIndex(index){
  return{
    type : UPDATE_NAVINDEX,
    index : index
  }
}


//reccupérer l'ensemble des commandes d'un menu donné
export function getListRequest(idMenu){
  return{
    type: GET_LIST_REQUEST,
    idMenu: idMenu
  }
}

export function getListSuccess(listSales){
  return{
    type: GET_LIST_SUCCESS,
    listSales: listSales
  }
}

export function getListError(error){
  return{
    type: GET_LIST_ERROR,
    error : error
  }
}

export function getList(idMenu){
  return (dispatch)=>{

    dispatch(getListRequest(idMenu));
    if(idMenu!==null){
      fetchMenuList(
        idMenu,
        (data)=>{
          dispatch(getListSuccess(data))
        },
        (err)=>{
          dispatch(getListError("Erreur : Liste Servis"))
        })
    }
  }
}


//valider menu servi
export function validateMenuRequest(idMenu, listSales){
  return{
    type: VALIDATE_MENU_REQUEST,
    idMenu : idMenu
  }
}

export function validateMenuSuccess(idMenu, listSales){
  return{
    type: VALIDATE_MENU_SUCCESS,
    idMenu : idMenu,
    listSales : listSales
  }
}

export function validateMenuError(error){
  return{
    type: VALIDATE_MENU_ERROR,
    error : error
  }
}

export function validateMenu(idMenu, listSales){
  return (dispatch) =>{
    dispatch(validateMenuRequest(idMenu));
    fetchServed(
      idMenu,
      (data)=> {
        dispatch(validateMenuSuccess(idMenu, listSales))
      },
      (err)=>{
        dispatch(validateMenuError("Erreur : Validation Menu"))
      }
    )
  }
}


//Gestion des erreurs
export function addError(information){
  return{
    type : ADD_ERROR,
    information : information
  }
}

export function deleteError(){
  return{
    type : DELETE_ERROR,
  }
}



//gestion du websocket de badgeuse
export function badgeuseIsPresent(badgeuse){
  return{
    type: BADGEUSE_IS_PRESENT,
    badgeuse : badgeuse
  }
}

//rendre l'utilisateur actuel connecté
//faire passer son login en parametre
// TODO: autre choses à mettre?
export function setUserConnected(){
  return{
    type: SET_USER_CONNECTED
  }
}
// reccupération de l'uid du user
export function getUserUid(userUid){
  return{
    type: GET_USER_UID,
    userUid : userUid
  }
}

//reccupération du pin du user
export function getUserPin(userPin){
  return{
    type: GET_USER_PIN,
    userPin : userPin
  }
}


//requete de connexion par badge
export function loginBadgeRequest(userUid, userPin){
  return{
    type: LOGIN_BADGE_REQUEST,
    userUid : userUid,
    userPin : userPin
  }
}

export function loginBadgeSuccess(sessionId)
{
  return{
    type: LOGIN_BADGE_SUCCESS,
    sessionId : sessionId
  }
}

export function loginBadgeError(error)
{
  return{
    type : LOGIN_BADGE_ERROR,
    error : error
  }
}

export function loginBadge(userUid, userPin)
{
  return (dispatch) =>{
    dispatch(loginBadgeRequest(userUid, userPin));
    loginBadge2(
      userUid,
      userPin,
      (data)=> {
        dispatch(loginBadgeSuccess(data))
      },
      (err)=>{

        console.log(err)
        dispatch(loginBadgeError('Erreur : Connexion échouée'))
      }
    )
  }
}

export function disconnect()
{
  return{
    type : DISCONNECT
  }
}
