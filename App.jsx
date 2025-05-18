import { useState } from 'react'

function App() {
  const [numeroDestino, setNumeroDestino] = useState('')
  const [mensaje, setMensaje] = useState('')
  const [respuesta, setRespuesta] = useState(null)
  const [loading, setLoading] = useState(false)

  const enviarMensaje = async () => {
    setLoading(true)
    try {
      const res = await fetch('https://agenda-kia-real.onrender.com/enviar-mensaje', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ numeroDestino, mensaje })
      })
      const data = await res.json()
      setRespuesta(data)
    } catch (err) {
      setRespuesta({ success: false, error: err.message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1>AgendaKIA Real 📲</h1>
      <input
        type="text"
        placeholder="Número de WhatsApp (ej. 51912345678)"
        value={numeroDestino}
        onChange={(e) => setNumeroDestino(e.target.value)}
        style={{ width: '100%', padding: '8px', margin: '8px 0' }}
      />
      <input
        type="text"
        placeholder="Mensaje a enviar"
        value={mensaje}
        onChange={(e) => setMensaje(e.target.value)}
        style={{ width: '100%', padding: '8px', margin: '8px 0' }}
      />
      <button onClick={enviarMensaje} disabled={loading} style={{ padding: '10px', width: '100%' }}>
        {loading ? 'Enviando...' : 'Enviar Mensaje'}
      </button>
      {respuesta && (
        <div style={{ marginTop: '1rem', color: respuesta.success ? 'green' : 'red' }}>
          {respuesta.success ? '✅ Mensaje enviado con éxito' : `❌ Error: ${respuesta.error}`}
        </div>
      )}
    </div>
  )
}

export default App
