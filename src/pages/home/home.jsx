import React, { useContext } from 'react'
import './home.scss'
import logo from '../../logo/image.png'
import { IoMdAdd } from "react-icons/io";
import Rightcomponants from './rightcomponants';
import Modal from '../../providers/modals/modal';
import { Modalcontext, modalconstant } from '../../providers/modalprovider';

export default function Home() {
    
    const modalfeature = useContext(Modalcontext)
    const opencreateplayground =()=> {
          modalfeature.openmodal(modalconstant.CREATE_PLAYGROUND)
    }

    return (
        <div className='home-container'>

            <div className='left'>
                <div className='items-container'>
                    <img src={logo} alt="" />
                    <h1>Code Space</h1>
                    <h2 style={{fontFamily: 'cursive'}}>Code.Compile.Debug</h2>
                    <button style={{cursor: 'pointer'}} onClick={opencreateplayground}>
                        <IoMdAdd style={{fontSize: '25px', fontWeight: 'bold'}}/>
                        <span>CreatePlayground</span>
                    </button>
                </div>
            </div>
           
            <Rightcomponants/>
            <Modal/>
        </div>
    )
}
