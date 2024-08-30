import {router} from "./index";

const clients: any[] = [];

// Ruta para emitir eventos SSE
router.get('/events', (req: any, res: any) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    // Agregar cliente a la lista de clientes activos
    clients.push(res);

    req.on('close', () => {
        clients.splice(clients.indexOf(res), 1);
        console.log('Conexión cerrada');
    });
});

// Función para enviar eventos a todos los clientes conectados
function sendEvent(event: any) {
    clients.forEach(client => {
        client.write(`data: ${JSON.stringify(event)}\n\n`);
        console.log(`data: ${JSON.stringify(event)}\n\n`);
    });
}

export const events = { sendEvent };
export const eventsRouter = router
