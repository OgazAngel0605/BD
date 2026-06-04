const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());

app.use(express.static(__dirname));
app.use(cors());

const MONGO_URI = "mongodb+srv://dentista_dentaglat_db_aoom:UuizaYbYcFT55lb6@dentistadentaglat.4fgdqmm.mongodb.net/?appName=DentistaDentaGlat";

mongoose.connect(MONGO_URI)
    .then(() => console.log("¡Conectado exitosamente a MongoDB!"))
    .catch(err => console.error("Error al conectar a MongoDB:", err));

const indexSchema = new mongoose.Schema({
    id_paciente : String,
    nombre_paciente : String,
    edad_paciente : Number,
    genero_paciente : String,
    fecha_registro : String,
    dom_actual : String,
    ocupacion : String,
    tutor : String,
    tel : String,
    notas : String
});

const index = mongoose.model('Pacientes', indexSchema);
app.post('/api/pacientes', async (req, res) => {
    try{
        const nuevoPaciente = new index(req.body);
        await nuevoPaciente.save();
        res.json({mensaje: 'Paciente guardado en MongoDB correctamente'});
    } catch (error) {
        res.status(500).json({error: 'Error al guardar el paciente en MongoDB'});
    }

})

const PORT = 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));

async function agregarPaciente(){
    let id_paciente = document.getElementById('id_paciente').value;
    let nombre_paciente = document.getElementById('nombre_paciente').value;
    let edad_paciente = document.getElementById('edad_paciente').value;
    let genero_paciente = document.getElementById('genero_paciente').value;
    let fecha_registro = document.getElementById('fecha_registro').value;
    let dom_actual = document.getElementById('dom_actual').value;
    let ocupacion = document.getElementById('ocupacion').value;
    let tutor = document.getElementById('tutor').value;
    let tel = document.getElementById('tel').value;
    let notas = document.getElementById('notas').value;

    if(
        id_paciente === '' ||
        nombre_paciente === '' ||
        edad_paciente === '' ||
        genero_paciente === '' ||
        fecha_registro === '' ||
        dom_actual === '' ||
        ocupacion === '' ||
        tutor === '' ||
        tel === '' ||
        notas === ''
    ){
        alert('Por favor, complete todos los campos');
        return;
    }
    const datosPaciente = {
        id_paciente,
        nombre_paciente,
        edad_paciente,
        genero_paciente,
        fecha_registro,
        dom_actual,
        ocupacion,
        tutor,
        tel,
        notas
    };

    try{
        const respuesta = await fetch('/api/pacientes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datosPaciente)
        });

        const resultado = await respuesta.json();
        if(respuesta.ok) {
            let nuevaCard = document.createElement('div');
            nuevaCard.classList.add('card');
            nuevaCard.innerHTML = `
                <div class="card-body">
                    <h5 class="card-title">${nombre_paciente}</h5>
                    <p class="card-text">Edad: ${edad_paciente}</p>
                    <p class="card-text">Género: ${género_paciente}</p>
                    <p class="card-text">Fecha de Registro: ${fecha_registro}</p>
                    <p class="card-text">Domicilio Actual: ${dom_actual}</p>
                    <p class="card-text">Ocupación: ${ocupacion}</p>
                    <p class="card-text">Tutor: ${tutor}</p>
                    <p class="card-text">Teléfono: ${tel}</p>
                    <p class="card-text">Notas: ${notas}</p>
                </div>
            `;
            document.getElementById('pacientes').appendChild(nuevaCard);
            
            document.getElementById('id_paciente').value = '';
            document.getElementById('nombre_paciente').value = '';
            document.getElementById('edad_paciente').value = '';
            document.getElementById('género_paciente').value = '';
            document.getElementById('fecha_registro').value = '';
            document.getElementById('dom_actual').value = '';
            document.getElementById('ocupacion').value = '';
            document.getElementById('tutor').value = '';
            document.getElementById('tel').value = '';
            document.getElementById('notas').value = '';

            alert(resultado.mensaje);
        } else {
            alert(resultado.error);
        }
    }catch (error) {
        console.error('Error al enviar los datos:', error);
    }
}
const personalSchema = new mongoose.Schema({
    nombre_personal: String,
    genero_personal: String,
    edad_personal: Number,
    fecha_nacimiento: String,
    lugar_nacimiento: String,
    cargo: String,
    especialidad: String,
    tel_personal: String,
    email: String
});
const Personal = mongoose.model('Personal', personalSchema);
app.post('/api/personal', async (req, res) => {
    try {
        const nuevoPersonal = new Personal(req.body);
        await nuevoPersonal.save();
        res.send('<h1>Personal registrado con éxito</h1><a href="/Pe.html">Volver al formulario</a>');
    } catch (error) {
        res.status(500).send('Error al registrar el personal: ' + error.message);
    }
});

const examenSchema = new mongoose.Schema({
    id_exa_paciente: String,
    fecha_hora: String,
    motivo_consulta: String,
    signos_vitales: String,
    evaluacion_odontologica: String,
    diagnostico_presuntivo: String,
    pronostico: String,
    tratamiento_sugerido: String
});
const Examen = mongoose.model('Examenes', examenSchema);
app.post('/api/examenes', async (req, res) => {
    try {
        const nuevoExamen = new Examen(req.body);
        await nuevoExamen.save();
        res.send('<h1>Examen registrado con éxito</h1><a href="/Ex.html">Volver al formulario</a>');
    } catch (error) {
        res.status(500).send('Error al registrar el examen: ' + error.message);
    }
});

const tratamientoSchema = new mongoose.Schema({
    paciente: String,
    fecha_consulta: String,
    diagnostico: String,
    tratamiento: String,
    materiales: String,
    operador: String
});
const Tratamiento = mongoose.model('Tratamientos', tratamientoSchema);
app.post('/api/tratamientos', async (req, res) => {
    try {
        const nuevoTratamiento = new Tratamiento(req.body);
        await nuevoTratamiento.save();
        res.send('<h1>Ficha de tratamiento guardada</h1><a href="/Trata.html">Volver al formulario</a>');
    } catch (error) {
        res.status(500).send('Error al guardar el tratamiento: ' + error.message);
    }
});