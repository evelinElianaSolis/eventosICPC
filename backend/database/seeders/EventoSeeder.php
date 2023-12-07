<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\Evento;
class EventoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('evento')->insert([
            'tituloEvento' => 'Taller de programacion en Python',
            'fechaInicioEvento' => '2023-12-20',
            'fechaFinEvento' => '2023-12-27',
          //  'modalidad' => 'Presencial', // Agregado nuevo campo 'modalidad'
        'participacion' => 'Equipo', // Agregado nuevo campo 'participacion'
        'numParticipantes' => 8, // Agregado nuevo campo 'numParticipantes'
        'numEntrenadores' => 2,
            'descripcionEvento' => 'Descripción del Taller de Programación en Python:

            El Taller de Programación en Python es una experiencia inmersiva diseñada para introducir a los participantes en el mundo del desarrollo de software utilizando uno de los lenguajes más versátiles y poderosos: Python.
            
            Durante este taller, los participantes explorarán los fundamentos de la programación y se sumergirán en la sintaxis elegante y legible de Python. Aprenderán a construir aplicaciones funcionales desde cero, abordando proyectos prácticos que abarcan desde la automatización de tareas simples hasta la creación de programas más complejos.
            
            Los temas cubiertos incluirán:
            
            - Variables y tipos de datos en Python.
            - Estructuras de control (condicionales y bucles).
            - Funciones y modularidad en la programación.
            - Trabajo con listas, diccionarios y otras estructuras de datos.
            - Manipulación de archivos y entrada/salida.
            - Conceptos avanzados como programación orientada a objetos.
            
            Además, se fomentará la resolución de problemas y la creatividad a través de desafíos prácticos y proyectos que permitirán a los participantes aplicar lo aprendido en situaciones del mundo real.
            
            Al finalizar el taller, los participantes estarán equipados con habilidades sólidas en programación en Python y estarán listos para abordar proyectos más ambiciosos o incluso seguir explorando áreas especializadas como el desarrollo web, la ciencia de datos o la inteligencia artificial.
            
            ¡Únete a nosotros y comienza tu viaje en el emocionante mundo de la programación con Python!',
            'aficheEvento' => 'afiche.jpg',
            'estadoEvento' => true,
            'horaInicioEvento' => '09:00:00',
            'requisitosEvento' => 'Requisitos para el Taller de Programación en Python:

            1. Laptop o Computadora Personal:
               - Se requiere que cada participante traiga su propia laptop o computadora personal.
               
            2. Sistema Operativo:
               - Windows, macOS o Linux. Se recomienda tener un sistema operativo actualizado.
            
            3. Instalación de Python:
               - Es necesario tener Python instalado en la máquina. Se recomienda la versión 3.x.
               
            4. Editor de Texto o IDE:
               - Se debe contar con un editor de texto o un entorno de desarrollo integrado (IDE) adecuado para Python. Ejemplos incluyen Visual Studio Code, PyCharm, Sublime Text o cualquier otro de preferencia personal.
            
            5. Conexión a Internet:
               - Se recomienda disponer de una conexión a internet para acceder a recursos y documentación adicional durante el taller.
            
            6. Ganas de Aprender:
               - Actitud positiva, curiosidad y disposición para participar activamente en las actividades del taller.
            
            7. Conocimientos Previos (Opcionales pero Beneficiosos):
               - No se requiere experiencia previa en programación, pero tener nociones básicas de lógica y algoritmos sería útil.
            
            8. Energía y Entusiasmo:
               - ¡Prepárate para sumergirte en un mundo de creatividad y resolución de problemas!
            
            Recuerda que estamos aquí para apoyarte y guiar tu aprendizaje. No dudes en preguntar si necesitas ayuda con la instalación o cualquier otro aspecto relacionado con el taller. ¡Estamos emocionados de tenerte en el taller de programación en Python!',
            'ubicacion' => 'Calle monde carlo esq. Roosell',
            'reglas'=>'prohebido llevar mascotas',
            'idAdministrador' => '87654321',
            'idTipoEvento' => '2', 
        ]);
    }
}
