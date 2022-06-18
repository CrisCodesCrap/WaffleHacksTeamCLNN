import {auth} from '../firebase/client'
import NavButton, { NavImg } from './NavButton'
import { FaCompass,FaPalette, FaRegBookmark, FaUser } from 'react-icons/fa'
import { ImExit } from 'react-icons/im'
import { signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import Router from "next/router";

interface NavButtonProps {
    user:any
}

function NavButtonComponent() {
    return <FaCompass className='h-8 w-8 fill-white opacity-70 transition duration-150 hover:opacity-100 hover:scale-110'> 
        <text className="text-white ml-4 invisible group-hover:visible">Explore</text>
    </FaCompass>
}
export default function Navbar({user}:NavButtonProps) {

    const ICON_CLASS_NAME: string = 'h-8 w-8 fill-white opacity-70 transition duration-150 group-hover:opacity-100 group-hover:scale-110'
    const ICON_TEXT_CLASS_NAME: string = "text-white ml-4 hidden group-hover:block font-Verdana font-light"

    function handleSignOut(){
        signOut(auth)
        console.log("signed out")
        Router.push("/login")
    }

    return ( 
        <div className="h-fit py-4 bg-sky-500 w-full border-b border-slate-300 flex justify-between items-center">
            <span className='ml-16 text-white font-Verdana text-2xl font-light cursor-pointer'>
                ARTLY
            </span>
            <div className='divide-x-2 mr-0'>
                <div className='mr-8 inline-flex items-baseline justify-between'>
                    <NavButton
                        icon={ <FaCompass className={ICON_CLASS_NAME}/> }
                        text={<span className={ICON_TEXT_CLASS_NAME}>EXPLORE</span>}
                        onClick = {() => Router.push("/explore")}
                        margin={4} />
                    <NavButton 
                        icon={<FaPalette className={ICON_CLASS_NAME}/>} 
                        text={<span className={ICON_TEXT_CLASS_NAME}>DRAW</span>}
                        onClick = {() => Router.push(`/draw/${user?.id}`)} // Replace with id field
                        margin={4} />
                    <NavButton 
                        icon={<FaRegBookmark className={ICON_CLASS_NAME}/>} 
                        text={<span className={ICON_TEXT_CLASS_NAME}>COLLECTION</span>}
                        onClick = {() => Router.push(`/Collection`)} 
                        margin={4} />
                    <NavButton 
                        icon={<FaUser className={ICON_CLASS_NAME}/>} 
                        text={<span className={ICON_TEXT_CLASS_NAME}>PROFILE</span>}
                        onClick = {() => Router.push(`/user/${user?.id}`)} // Replace with id field
                        margin={4} />
                </div>
                <div className='inline-flex items-baseline justify-center'>
                    <NavButton 
                        icon={<ImExit className={ICON_CLASS_NAME}/>} 
                        text={<span className={ICON_TEXT_CLASS_NAME}>LOGOUT</span>}
                        onClick={handleSignOut} 
                        margin={12} />
                </div>
            </div>
            
        </div>
     )
}