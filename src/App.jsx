import { useState, useEffect } from 'react'
import './App.css'
import Carrousel from './Components/Carrousel/Carrousel.jsx'
import NROLL_32 from './assets/NROL_32.png'
import NROLL_30 from './assets/NROL_30.png'
import Al1g0Rocks from './assets/4l1g0R0cks.svg'
import NROLL_55 from './assets/NROL_55.png'
import NROLL_61 from './assets/NROL_61.png'
import NROLL_65 from './assets/NROL_65.png'
import NROLL_108 from './assets/NROL_108.png'
import Modal from './Components/Modal/Modal.jsx'
function App() {
  const [secretFlag, setSecretFlag] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [showHelpConfirm, setShowHelpConfirm] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  }
  const handleInputChange = (e) => {
    setSecretFlag(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const input = secretFlag
    if (input === 'Aligo{4l1g0R0cks}' || input === 'Aligo{4l1g0R0cks.svg}') {
      setIsHelpOpen(false); // Cierra ayuda si está abierta
      setIsModalOpen(true);
    }else if (input === '4l1g0R0cks' || input === '4l1g0R0cks.svg') {
      alert('Recuerda que el formato es Aligo{Aa-Zz 0-9}');
    }else {
      alert('Incorrecto. Inténtalo de nuevo.');
    }
  };

  return (
    <>
      <div className="background" />
      <div className="help">
        <button
          className="help-btn"
          onClick={() => isHelpOpen? setIsHelpOpen(!isHelpOpen) : setShowHelpConfirm(!showHelpConfirm)}
          aria-label="¿Quieres una pista?"
        >
          ?
        </button>
      </div>
      {showHelpConfirm && (
        <dialog open className="comic-dialog" tabIndex={-1}>
          <span>
            <b>¿Estás seguro de que quieres ver la pista?</b>
          </span>
          <div style={{marginTop: '18px', display: 'flex', gap: '16px'}}>
            <button
              className="btn"
              style={{width: '70px', padding: '8px 0'}}
              onClick={() => {
                setShowHelpConfirm(false);
                setIsHelpOpen(true);
              }}
            >Sí</button>
            <button
              className="btn"
              style={{width: '70px', padding: '8px 0', background: '#C90E28'}}
              onClick={() => setShowHelpConfirm(false)}
            >No</button>
          </div>
          <button
            className="modal-close"
            onClick={() => setShowHelpConfirm(false)}
            aria-label="Cerrar"
          >&times;</button>
        </dialog>
      )}
      {isHelpOpen && (
        <dialog open className="comic-dialog" tabIndex={-1}>
          <span>
            <b>Pista:</b> <br />
            ¡Las imágenes no son interesantes?.<br />
            ¿Has intentado inspeccionarlas bien?
          </span>
          <button
            className="modal-close"
            onClick={() => setIsHelpOpen(false)}
            aria-label="Cerrar"
          >&times;</button>
        </dialog>
      )}
      <div className="container">
        <div className="card">
          <div className="card-header">
            <h1>Misión: Aligo &#123;flag&#125;</h1>
          </div>
          <div className="card-body">
            <p>Tu desafio es claro: <br />
              En este sitio web se esconde un texto que no es acorde con los otros ejemplares. </p>
            <p>Ni brillará a simple vista... <br />
              Tendrás que ver más allá de lo que se muestra en pantalla. <br />
              Observa con atención las imágenes... <br />
              A veces lo más valioso no está en lo que ves, sino en dónde está. <br />
              Cuando la encuentres, escríbela en el campo oculto que aparecerá. <br />
              Eso desbloqueará una palabra clave secreta. </p>
          </div>
          <Carrousel>
            <img src={NROLL_32} alt='NROL 32' />
            <img src={NROLL_30} alt='NROL 30' />
            <img src={Al1g0Rocks} alt='4l1g0Rocks' />
            <img src={NROLL_55} alt='NROL 55' />
            <img src={NROLL_61} alt='NROL 61' />
            <img src={NROLL_65} alt='NROL 65' />
            <img src={NROLL_108} alt='NROL 108' />
          </Carrousel>
          <div className="card-footer">
            <input type="text" placeholder='Aligo&#123;flag&#125;' name='secretFlag' onChange={handleInputChange} />
            <input type="submit" value="Enviar" onClick={handleSubmit} onSubmit={handleSubmit} className='btn' />
          </div>
        </div>
        <Modal isOpen={isModalOpen} onClose={toggleModal}>
          <p>¡Felicidades! Has resuelto el reto y encontrado la secretFlag.</p>
          <p>Envia tu hoja de vida con el siguiente mensaje:</p>
          <p>A: </p>
          <p>Te esperamos </p>
        </Modal>
      </div>
    </>
  )
}

export default App
